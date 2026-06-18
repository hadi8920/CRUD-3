import mongoose from 'mongoose'

const taskSchema = await mongoose.Schema({
    title:{
        type:String,
        required : true
    },
    description : {
        type : String,
        required :  true
    },
    status : {
        type : String,
        enum : ["pending" , "completed"],
        default : "pending"
    },
    priority:{
        type :String,
        enum : ["low" , "medium" ,"high"],
        default : "medium"
    }
} , {timestamps : true})

const taskModel = await mongoose.model("tasks" , taskSchema)

export default taskModel