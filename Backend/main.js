import express from 'express'
import dotenv from 'dotenv'
import Database from './database/database.js'
import userModel from './models/userModel.js'
const app=express()
app.use(express.json())
//initializing database
Database()
//app listining to the port
dotenv.config()
const port=process.env.PORT
app.listen(port,()=>{
    console.log(`server is running on port http://localhost:/${port}`)
})
