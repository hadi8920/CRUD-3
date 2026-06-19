import express from 'express'
import authControllers from '../controllers/auth.controller.js'


const router = express.Router()

router.post('/register' , authControllers.registerUser)
router.post('/login' , authControllers.loginUser)
router.post('/logout' , authControllers.logoutUser)

export default router