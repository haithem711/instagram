const express = require('express')
const router=express.Router()
const mongoose=require('mongoose')
const requirelogin =require('./middlware/requirelogin')
const Post =mongoose.model('Post')
const User =mongoose.model ('User')
router.get('/user/:id',requirelogin,(req,res)=> {
    User.findOne({_id:req.params.id})
    .select('-password')
    .then(user=>{
        Post.find({postedby:req.params.id})
        .populate('postedby','_id name')
        .exec((err,post)=>{
            if(err){
                return res.status(422).json({error:err})
                }
                res.json({user,post})
            })
        
    }).catch(err=>{
        return res.status(404).json({error:'User not found'})
    })
})

router.put('/follow',requirelogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      User.findByIdAndUpdate(req.user._id,{
          $push:{following:req.body.followId}
          
      },{new:true}).select("-password").then(result=>{
          res.json(result)
      }).catch(err=>{
          return res.status(422).json({error:err})
      })

    }
    )
})
router.put('/unfollow',requirelogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      User.findByIdAndUpdate(req.user._id,{
          $pull:{following:req.body.unfollowId}
          
      },{new:true}).select("-password").then(result=>{
          res.json(result)
      }).catch(err=>{
          return res.status(422).json({error:err})
      })

    }
    )
})

router.put('/updatepic',requirelogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},
        (err,result)=>{
         if(err){
             return res.status(422).json({error:"pic canot post"})
         }
         res.json(result)
    })
})
router.put('/updatemail',requirelogin,(req,res)=>{
    const { email}=req.body
    User.findOne({email:email})
    .then (saveduser=> {
        if (saveduser){return res.status(422).json({error:'email or password invalid'})}
   
    User.findByIdAndUpdate(req.user._id, {
       
        $set:{email:email}},{new:true},
        
        
        (err,result)=>{
            
        if(err){
             return res.status(422).json({error:"email canot post"})
         }
         res.json(result)
        })
    })
})

module.exports=router