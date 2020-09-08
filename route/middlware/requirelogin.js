const jwt=require('jsonwebtoken')
const jwtSecret="secret"
const mongoose=require('mongoose')
const User =mongoose.model ('User')
module.exports=(req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization){ res.status(401).json({error:'you must be logged in '})}
   
    jwt.verify(authorization,jwtSecret,(err,payload)=>{
        if (err){ return res.status(401).json({error:'you must be logged ib'})}
        const{_id}=payload
        User.findById(_id).then (userdata=>{
            req.user=userdata
            next()
        })
        
    })
}