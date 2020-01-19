const router = require('express').Router()
const {conn
    //,conn2
}= require('../db/connection')
const asyncController=require('../controller/async')
router.post('/add',asyncController.add)
router.get('/edit',asyncController.edit)
router.get('/dlt',asyncController.dlt)
router.get('/replicate_inserted',asyncController.replicate_inserted)
router.get('/replicate_updated',asyncController.replicate_updated)
router.get('/replicate_deleted',asyncController.replicate_deleted)
module.exports=router