import app from "./src/app.js";
import connectDB from "./src/dbConfig/db.js";
import dotenv from 'dotenv'

dotenv.config()
connectDB()



app.listen("3000" , () => {
  console.log("Server is connected to port 3000")
})