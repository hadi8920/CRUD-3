import mongoose from "mongoose";

async function connectDB(){

    try {
        console.log('process.env.MONGO_URI',process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to DB successfuly")
    } catch (err) {
        console.log("Failed connecting to DB : " , err)
    }

}

export default connectDB