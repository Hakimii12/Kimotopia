import express from "express"
import { CreatePost, DeletePost, GetPost,LikeDislikePost, Reply ,getFeedPosts} from "../controllers/PostControllers.js"
import Authorization from "../middlewares/Authorization.js"
const router=express.Router()
router.post('/create',Authorization,CreatePost)
router.get('/getpost/:id',GetPost)
router.get('/feed',Authorization,getFeedPosts)
router.delete('/deletepost/:id',Authorization,DeletePost)
router.post('/like&dislike/:id',Authorization,LikeDislikePost)
router.post('/reply/:id',Authorization,Reply)
export default router
