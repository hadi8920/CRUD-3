import express from 'express'
import taskController from '../controllers/task.controller.js'



const router = express.Router()

router.post("/create_task" , taskController.createTask )
router.get('/get_all_task' , taskController.getAllTask)
router.patch('/update_task/:id' , taskController.updateTask)
router.delete('/delete_task/:id' , taskController.deleteTask)
router.get('/get_task/:id' , taskController.getTask)


export default router

