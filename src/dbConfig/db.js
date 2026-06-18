import mongoose from "mongoose";

async function connectDB(){

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to DB successfuly")
    } catch (err) {
        console.log("Failed connecting to DB : " , err)
    }

}

export default connectDB