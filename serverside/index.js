const express=require('express')
const app=express()
const path=require('path')
const hbs=require('hbs')
const syncRoute =require('./routes/syncRoute')
const asyncRoute=require('./routes/asyncRoutes')
require('../serverside/db/connection')

app.use(express.static(path.join(__dirname,'../client/public')))
app.use(express.json())
app.get('/',(req,res)=>{
    res.render('index')
})
app.set('view engine','html')
app.set('view',path.join(__dirname,'../client/public'))
app.use('/sync',syncRoute)
app.use('/async',asyncRoute)
app.listen('4000',()=>{
    console.log("server connected")
})