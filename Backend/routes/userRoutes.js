import express from 'express'
import {followUnfollow, login, logout, signUp} from '../controllers/Credential.js'
import Authorization from '../middlewares/Authorization.js'
const router=express.Router()


router.post('/signUp',signUp)
router.post('/login',login)
router.post('/logout',logout)
router.post('/followunfollow/:id',Authorization,followUnfollow)



export default router