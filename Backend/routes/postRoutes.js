import express from "express"
import { CreatePost, DeleteComment, DeletePost, GetPost,GetpostedByPost,LikeDislikePost, Reply ,getFeedPosts} from "../controllers/PostControllers.js"
import Authorization from "../middlewares/Authorization.js"
import Upload from "../middlewares/multer.js"
const router=express.Router()
router.post('/create',Authorization,Upload.single('image'),CreatePost)
router.get('/getpost/:id',GetPost)
router.get('/getpostpostedBy/:postedBy',GetpostedByPost)
router.get('/feed',Authorization,getFeedPosts)
router.delete('/deletepost/:id',Authorization,DeletePost)
router.post('/like&dislike/:id',Authorization,LikeDislikePost)
router.post('/reply/:id',Authorization,Reply)
router.delete('/deletecomment/:pId/:commentId',Authorization,DeleteComment)
export default router
