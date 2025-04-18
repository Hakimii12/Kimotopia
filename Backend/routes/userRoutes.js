import express from 'express'
import {followUnfollow, getUser, getUserId, login, logout, signUp, update} from '../controllers/UserActivities.js'
import Authorization from '../middlewares/Authorization.js'
import Upload from '../middlewares/multer.js'
const router=express.Router()
router.post('/signUp',signUp)
router.post('/login',login)
router.post('/logout',logout)
router.post('/followunfollow/:id',Authorization,followUnfollow)
router.put('/update/:id',Authorization,Upload.single('profilepic'),update)
router.get('/profile/:username',Authorization, getUser)
router.get('/profilebyId/:id',Authorization, getUserId)
export default router