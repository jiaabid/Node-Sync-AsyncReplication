const { conn, conn2, conn3 } = require('../db/connection')
const add = (req, res) => {
    console.log(req.body)
    const Query = 'INSERT INTO ?? SET ?';
    conn.query(Query, [req.query.table, req.body], (err, result) => {
        if (err)
            throw err
        console.log(result)
        conn2.query(Query, [req.query.table, req.body])
        conn3.query(Query, [req.query.table, req.body])
        res.status(201).send('created')
    })

}
const edit = (req, res) => {
    const obj = req.query
    console.log(req.body)
    const Query = 'UPDATE ?? SET ? WHERE cust_account_number=?'
    conn.query(Query, [req.query.table, req.body, req.query.acc_no], (err, result) => {
        if (err)
            throw err
        console.log(result)
        conn2.query(Query, [req.query.table, req.body, req.query.acc_no])
        conn3.query(Query, [req.query.table, req.body, req.query.acc_no])
        res.status(200).send('updated')
    })
}
const dlt = (req, res) => {
    const obj = req.query
    const Query = 'DELETE FROM ?? WHERE cust_account_number=?'
    conn.query(Query, [req.query.table, req.query.acc_no], (err, result) => {
        if (err)
            throw err
        conn2.query(Query, [obj.table, obj.acc_no])
        conn3.query(Query, [obj.table, obj.acc_no])
        res.status(200).send("deleted")
    })

}
const check = (req, res) => {
    const obj = {
        id: 1,
        title: "hello world",
        cc: {
            tell: "gth"
        }
    }
    const json_obj = JSON.stringify(obj)
    const Query = "INSERT INTO checking SET ?"
    const a = conn.query(Query, { val: json_obj }, (err, result) => {
        if (err)
            throw err
        console.log(result)
    })

}
module.exports = { add, edit, dlt, check }