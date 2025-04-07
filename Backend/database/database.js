import mongoose from "mongoose";
import dotenv from 'dotenv'
function Database() {
   dotenv.config()
   const db_string=process.env.DB_CONNNECTION_STRING
    mongoose.connect(db_string)
    const db=mongoose.connection
    db.on('error',(error)=>{
        console.log('Error connecting to databse:'+error)
    })
    db.once('open',()=>{
        console.log("successfully connected to the database")
    })
}
export default Database
