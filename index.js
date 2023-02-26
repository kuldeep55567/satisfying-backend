const express = require("express");
const swaggerJSdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/userRoute");
const { productRouter } = require("./routes/productRoute");
const { authenticate } = require("./middleware/auth");
const cors = require("cors")
require("dotenv").config();
const app = express();
app.use(cors())
app.use(express.json())
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Learning Swagger",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:4500"
            }
        ]
    },
    apis: ["./routes/*.js"]
}
const swaggerSpec = swaggerJSdoc(options)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
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