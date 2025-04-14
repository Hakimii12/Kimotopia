import express from 'express'
import dotenv from 'dotenv'
import Database from './database/database.js'
import cors from "cors"
import multer from 'multer'
import userModel from './models/userModel.js'
import postModel from './models/postModel.js'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoutes.js'
import postRouter from './routes/postRoutes.js'
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));
//initializing database
Database()
//initializing model
userModel
postModel
//intializing routes
app.use('/api/user',userRouter)
app.use('/api/post',postRouter)
//app listining to the port
dotenv.config()
const port=process.env.PORT
app.listen(port,()=>{
    console.log(`server is running on port http://localhost:/${port}`)
})
