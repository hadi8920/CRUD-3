import app from "./src/app.js";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
import connectDB from "./src/dbConfig/db.js";
import dotenv from 'dotenv'

dotenv.config()
connectDB()



app.listen("3000" , () => {
  console.log("Server is connected to port 3000")
})