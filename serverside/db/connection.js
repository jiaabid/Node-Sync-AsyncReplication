const mysql = require('mysql')
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'headquarter'
})
const conn2=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"system2"
})
const conn3=mysql.createConnection({
    host:'192.168.43.72',
    user:'root',
    password:'',
    database:'system1'
})

conn.connect((err)=>{
    if(err)
    throw err
    console.log('db connected')
})
conn2.connect((err)=>{
    if(err)
    throw err
    console.log("db2 is connected")
})
conn3.connect((err)=>{
    if(err)
    throw err
    console.log("db3 is connected")
})

module.exports={conn
   ,conn2
  ,conn3
}