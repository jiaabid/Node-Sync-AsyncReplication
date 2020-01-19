window.onload=()=>{
    function del(e){
        const id = e.target.parentElement
        console.log(id)
    }
    fetch('/sync?table=cust_transaction').then(async(result)=>{
        const parsedData=await result.json()
        let tbody=document.querySelector('tbody')
        console.log(tbody)
console.log(parsedData)
const arr = parsedData.result
        for(i of arr)
        {
            tbody.innerHTML+=`<tr id='${i.cust_trans}'>
            <td>${i.cust_trans}</td>
            <td>${i.cust_account_number}</td>
            <td>${i.cust_transaction}</td>
            <td>${i.cust_date}</td>
            <td>${i.cust_remaining_bal}</td>
            <td><a class='update' data-toggle="modal" href="#trans_update">update</a><a class='del' href="/sync/dlt?table=cust_transaction&acc_no=${i.cust_account_number}" >delete</a></td>
            </tr>`
        }
    })
    const updateForm = document.getElementById('t_updateForm')
    updateForm.addEventListener('submit',(e)=>{
        const acc_no = document.getElementById('acc_no').value
        const transaction=document.getElementById('t_trans').value
         const obj={cust_transaction:transaction}
        fetch(`/sync/edit?table=cust_transaction&acc_no=${acc_no}`,{
            method:"PUT",
            headers:{
                'Content-Type':'Application/json'
            },
            body:JSON.stringify(obj)
        }).then(result=>{
            result.json().then(data=>{
                alert("updated")
            })
        })
    })
    const insertForm =document.getElementById('t_insertForm')
    insertForm.addEventListener('submit',(e)=>{
        const id = document.getElementById('i_t_id').value
        const acc_no=document.getElementById('i_acc_no').value
        const trans = document.getElementById('i_trans').value
        const bal =document.getElementById('i_balance').value
        const date =document.getElementById('i_date').value

        const obj={cust_trans:id,
        cust_account_number:acc_no,
        cust_transaction:trans,
        cust_remaining_bal:bal,
        cust_date:date}
        fetch(`/sync/add?table=cust_transaction`,{
            method:"POST",
            headers:{
                'Content-Type':'Application/json'  
            },
            body:JSON.stringify(obj)
        }).then(result=>{
            result.json().then(data=>{
                alert(data)
                window.reload()
            })
        })
    })
    
}