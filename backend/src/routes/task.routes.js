import express from 'express'
import taskController from '../controllers/task.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'



const router = express.Router()

router.post("/create_task" , authMiddleware , taskController.createTask )
router.get('/get_all_task', authMiddleware , taskController.getAllTask)
router.patch('/update_task/:id', authMiddleware , taskController.updateTask)
router.delete('/delete_task/:id', authMiddleware , taskController.deleteTask)
router.get('/get_task/:id', authMiddleware , taskController.getTask)


export default router

