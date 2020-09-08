const express = require('express')
const router=express.Router()
const mongoose=require('mongoose')
const requirelogin=require('./middlware/requirelogin')
const User =mongoose.model ('User')
const bcrypt =require('bcryptjs')
const jwt=require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
router.get('/protect',requirelogin,(req,res)=>{res.send ('hello world')})
router.post('/signup',(req,res)=>{
    const { name,email,password,pic}=req.body
    if (!name || !email || !password ){
       res.status(422). json({error:'please add all the fields'})
    }
    User.findOne({email:email})
    .then ((saveduser)=>{
        if (saveduser){return res.status(422).json({error:'user is already exist'})
    }
    bcrypt.hash(password,12)
    .then (hashp=>{ const user = new User({ 
        name,email,password:hashp,pic:pic
    })
    user.save()
     })
  
    
    .then (user=>{ res.json({message:'register succesfully'})
    })
    .catch (err=>{console.log(err)})
    }
    )
    .catch (err=>{console.log(err)})  
 })
 router.post('/signin',(req,res)=>{

    const { email,password}=req.body
    if ( !email || !password )
    {
       res.status(422). json({error:'please add all the fields'})
    }
    User.findOne({email:email})
    .then (saveduser=> {
        if (!saveduser){return res.status(422).json({error:'email or password invalid'})}
    bcrypt.compare(password,saveduser.password)
    .then(doMatch=>{
        if (doMatch){
        const token=jwt.sign({_id:saveduser._id},JWT_SECRET)
        const {_id,name,email,followers,following,pic}=saveduser
        res.json({token,user:{_id,name,email,followers,following,pic}})
        }
        //{res.json('succesfully sign in')}
        else { return res.status(422).json({error:'email or password invalid'})} 
    })
    .catch (err=>{console.log(err)})
    })
    
    })
   
module.exports=router