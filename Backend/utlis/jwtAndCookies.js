import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
function jwtToken(userId,res){
    dotenv.config()
    const token=jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        {expiresIn:"3h"}
    )
    res.cookie("jwt",token,{
        httpOnly:true,
        maxAge:3*60*60*1000,
        sameSite:"strict"
    })
    return token
}
export default jwtToken
