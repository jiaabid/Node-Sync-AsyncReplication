const {conn,conn2,conn3}=require('../db/connection')
const add=(req,res)=>{
    const obj={
        table:req.query.table,
        val:req.body
    }
    const Query='INSERT INTO ?? SET ?';
    
    conn.query(Query,[req.query.table,req.body],(err,result)=>{
if(err)
throw err
const Query2='INSERT INTO ?? SET ?';
conn.query(Query2,[`${req.query.table}_insert_temp`,{info:JSON.stringify(obj)}],(err,result)=>{
    if(err)
    throw err
    console.log(result)
})
    })
    res.send('data inserted')    
}
const edit =(req,res)=>{
        const obj={
            table:req.query.table,
            val:req.body
        }
        const Query='UPDATE ?? SET ? WHERE p_id=?'
        conn.query(Query,[req.query.table,req.body,req.query.acc_no],(err,result)=>{
            if(err)
            throw err
            const Query2="INSERT INTO ?? SET ?"
            conn.query(Query2,[`${obj.table}_update_temp`,{info:JSON.stringify(obj)}],(err,result)=>{
                if(err)
                throw err
                res.status(200).send('data updated')
            })
            
        })
        //conn.query(Query,[req.body.table,req.body.value,req.body.id])
        
    }

const dlt =(req,res)=>{
    const obj={
        table:req.query.table,
        val:req.query.acc_no
    }
        const Query='DELETE FROM ?? WHERE cust_account_number=?'
        conn.query(Query,[req.query.table,req.query.acc_no],(err,result)=>{
            if(err)
            throw err
            const Query2="INSERT INTO ?? SET ?"
            conn.query(Query2,[`${req.query.table}_update_temp`,{info:JSON.stringify(obj)}],(err,result)=>{
                if(err)
                throw err
                res.status(200).send('data deleted and sent into temp')
            })
            
        })
        
    }

const replicate_inserted=(req,res)=>{
    const Query="SELECT * FROM ??"
    conn.query(Query,req.query.table,(err,result)=>{
        if(err)
        throw err
        for(i of result)
        {
            const row = JSON.parse(i.info)
            const temp_query="INSERT INTO ?? SET ?"
            conn2.query(temp_query,[row.table,row.val],(err,result)=>{
                if(err)
                throw err
            })
            conn3.query(temp_query,[row.table,row.val],(err,result)=>{
                if(err)
                throw err
            })
        }
        conn.query('TRUNCATE Table customer_insert_temp')
        res.send("inserted data replicated")
    })
} 
const replicate_updated=(req,res)=>{
    const Query="SELECT * FROM ??"
    conn.query(Query,req.query.table,(err,result)=>{
        if(err)
        throw err
        for(i of result)
        {
            const row = JSON.parse(i.info)
            const temp_query="UPDATE ?? SET ? WHERE p_id=?"
            conn2.query(temp_query,[row.table,row.body,row.p_id],(err,result)=>{
                if(err)
                throw err
        
            })
            conn3.query(temp_query,[row.table,row.body,row.p_id],(err,result)=>{
                if(err)
                throw err
        
            })
        }
        conn.query('TRUNCATE Table customer_update_temp')
        res.send("updated data replicated")
    })
}
const replicate_deleted=(req,res)=>{
    const Query="SELECT * FROM ??"
    conn.query(Query,req.body.table,(err,result)=>{
        if(err)
        throw err
        for(i of result)
        {
            const row = JSON.parse(i.info)
            const temp_query="DELETE FROM ?? WHERE p_id=?"
            conn2.query(temp_query,[row.table,row.p_id],(err,result)=>{
                if(err)
                throw err
        
            })
            conn3.query(temp_query,[row.table,row.p_id],(err,result)=>{
                if(err)
                throw err
        
            })
        }
        conn.query('TRUNCATE Table customer_delete_temp')
        res.send("deleted  data replicated")
    })
}
module.exports={
    add,
    edit,
    dlt,
    replicate_inserted,
    replicate_updated,
    replicate_deleted
}