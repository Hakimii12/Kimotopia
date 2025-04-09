import express from "express"
import { CreatePost } from "../controllers/PostControllers.js"
import Authorization from "../middlewares/Authorization.js"
const router=express.Router()
router.post('/create',Authorization,CreatePost)
export default router
