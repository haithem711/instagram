const  express = require('express')
const app=express()
const PORT = process.env.PORT|| 5000
const mongoose=require('mongoose')
const {MONGOURI} = require('./config/keys')


mongoose.connect(MONGOURI,{ useUnifiedTopology: true, useNewUrlParser: true },(err)=>{if (err)throw err 
    console.log('data base connected...')})
    require('./models/User')
    require('./models/Post')
    app.use(express.json())
    app.use(require('./route/auth'))
    app.use(require('./route/post'))
    app.use(require('./route/user'))






    if(process.env.NODE_ENV=="production"){
        app.use(express.static('client/build'))
        const path = require('path')
        app.get("*",(req,res)=>{
            res.sendFile(path.resolve(__dirname,'client','build','index.html'))
        })
    }


app.listen (PORT,()=>{ console.log('server workin !!')})