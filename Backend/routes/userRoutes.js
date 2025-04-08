import express from 'express'
import {followUnfollow, login, logout, signUp, update} from '../controllers/Credential.js'
import Authorization from '../middlewares/Authorization.js'
const router=express.Router()


router.post('/signUp',signUp)
router.post('/login',login)
router.post('/logout',logout)
router.post('/followunfollow/:id',Authorization,followUnfollow)
router.post('/update/:id',Authorization,update)



export default router