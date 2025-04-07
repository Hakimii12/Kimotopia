import express from 'express'
import {signUp} from '../controllers/signUp.js'
const router=express.Router()


router.post('/sign-Up',signUp)



export default router