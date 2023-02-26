const express = require("express");
const { userModel } = require("../model/usermodel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
userRouter.get("/", async (req, res) => {
    res.send(await userModel.find())
})
userRouter.post("/register", async (req, res) => {
    const { name, age, gender, email, password } = req.body
    try {
        bcrypt.hash(password, 8, async (err, hashed) => {
            if (err) {
                res.send({ "mssg": "Something went wrong", "error": err.message })
            } else {
                const user = new userModel({ name, email, gender, password: hashed, age });
                await user.save()
                res.send({ "mssg": "User Registered Successfully" })
            }
        });
    } catch (error) {
        res.send({ "mssg": "Error while Registering", "error": err.message })
    }
})
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, "masai");
                    res.send({ "mssg": "Log In Successfull", "token": token, "admin": user[0].is_admin, "name": user[0].name })
                } else {
                    res.send({ "mssg": "wrong-Credentials" })
                }
            });
        } else {
            res.send({ "mssg": "Something went wrong" })
        }
    } catch (error) {
        res.send({ "mssg": "Something went wrong", "error": err.message })
    }
})
userRouter.patch("/update/:id", async (req, res) => {
    let id = req.params.id
    try {
        await userModel.findByIdAndUpdate({ "_id": id }, req.body)
        res.send({ "mssg": "User Role Revised" })
    } catch (error) {
        res.send({ "mssg": "Something went wrong", "error": error.message })
    }
})
module.exports = { userRouter }