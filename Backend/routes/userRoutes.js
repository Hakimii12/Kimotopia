import express from 'express'
import {login, logout, signUp} from '../controllers/Credential.js'
const router=express.Router()


router.post('/signUp',signUp)
router.post('/login',login)
router.post('/logout',logout)



export default router