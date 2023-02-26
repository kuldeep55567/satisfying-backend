const express = require("express");
const { connection } = require("./config/db")
const { userRouter } = require("./routes/userRoute");
const { productRouter } = require("./routes/productRoute");
const { authenticate } = require("./middleware/auth");
const cors = require("cors")
require("dotenv").config();
const app = express();
app.use(cors())
app.use(express.json())
app.use("/users", userRouter)
app.use(authenticate)
app.use("/products", productRouter)
app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Successfully Connected to Database")
    } catch (error) {
        console.log("Error occured while connecting")
    }
    console.log(`Server is running at port ${process.env.port}`)
})