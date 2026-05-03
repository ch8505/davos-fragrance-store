require("dotenv").config()
const express = require('express')
const cors = require('cors')

const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const { default: mongoose } = require("mongoose")

const PORT = process.env.PORT || 1000
const app = express()
connectDB()

//middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

//routes
app.use("/api/product", require("./routes/product"))
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/cart", require("./routes/cartRoutes"))

app.get("/", (req, res) => {
    res.send("this is the home page")
})

//run
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`server running on ${PORT}`))
})
mongoose.connection.on('error', err => {
    console.log(err)
})

