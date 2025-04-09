import express from "express"
import { CreatePost, DeletePost, GetPost } from "../controllers/PostControllers.js"
import Authorization from "../middlewares/Authorization.js"
const router=express.Router()
router.post('/create',Authorization,CreatePost)
router.get('/getpost/:id',GetPost)
router. delete('/deletepost/:id',Authorization,DeletePost)
export default router
