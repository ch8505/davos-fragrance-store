const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
    } catch (error) {
        console.log("error connection to DB\n"+error);
    }
}

module.exports = connectDB