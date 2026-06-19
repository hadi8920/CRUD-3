import express from 'express'
import cookieParser from 'cookie-parser'
import taskRoutes from '../src/routes/task.routes.js'
import authRoutes from './routes/auth.routes.js'



const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/task" , taskRoutes)
app.use('/api/auth' , authRoutes)




export default app