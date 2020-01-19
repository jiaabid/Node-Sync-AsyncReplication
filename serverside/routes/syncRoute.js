const router = require('express').Router()
const {conn
    //,conn2
}= require('../db/connection')
const syncController=require('../controller/sync')
const asyncController=require('../controller/async')
router.get('/createtable',(req,res)=>{
    const Query='CREATE TABLE products(p_id int AUTO_INCREMENT PRIMARY KEY,p_name VARCHAR(255),p_price int,p_supplier VARCHAR(255))';
    conn.query(Query,(err,result)=>{
        if(err)
        throw err
        res.send('table created')
    })
})
router.get('/addproduct',(req,res)=>{
    const product={
        p_name:"oreo",
        p_price:20,
        p_supplier:"US"
    }
    const Query='INSERT INTO products SET ?';
    conn.query(Query,product,(err,result)=>{
        if(err)
        throw err
        res.send('inserted')
    })
    // conn2.query(Query,product,(err,result)=>{
    //     if(err)
    //     throw err
    // })
})
router.get('/asyncadd',(req,res)=>{
    const product={
        p_name:"kur",
        p_price:20,
        p_supplier:"US"
    }
    const Query='INSERT INTO products SET ?';
    const Query2='INSERT INTO temp SET ?';
    conn.query(Query2,product)
    conn.query(Query,product)
    conn.on('error',()=>{
        console.log('any error')
        
    })
res.send('data inserted')
})

router.get('/',(req,res)=>{
    const obj={
        table:'products'
    }
    const Query=`SELECT * FROM ${req.query.table}`
    //conn.query(Query,[req.body.table])
    conn.query(Query,(err,result)=>{
        if(err)
        throw err
        console.log(result)
        res.status(200).send({result})
    })
    
    
})
router.post('/add',syncController.add)
router.put('/edit',syncController.edit)
router.get('/dlt',syncController.dlt)

router.get('/check',syncController.check)
module.exports=router