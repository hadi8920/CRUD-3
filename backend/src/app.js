import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import taskRoutes from '../src/routes/task.routes.js'
import authRoutes from './routes/auth.routes.js'
import abcd from './middlewares/error.middleware.js'



const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: '*',
    methods : ["GET" ,"POST" ,"PATCH" , "DELETE"],
    credentials : true
}

app.use(cors(corsOptions))


app.use("/api/task" , taskRoutes)
app.use('/api/auth' , authRoutes)
app.use(abcd.errorHandler)



export default app