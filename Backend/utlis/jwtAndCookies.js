import jwt from 'jsonwebtoken'
function jwtToken(userId,res){
    const token=jwt.sign(
        {userId},
        "my-secrate-key",
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
