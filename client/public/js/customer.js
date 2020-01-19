window.onload=()=>{
    function del(e){
        const id = e.target.parentElement
        console.log(id)
    }
    fetch('/sync?table=customer').then(async(result)=>{
        const parsedData=await result.json()
        let tbody=document.querySelector('tbody')
        console.log(tbody)
console.log(parsedData)
const arr = parsedData.result
        for(i of arr)
        {
            tbody.innerHTML+=`<tr id='${i.cust_account_number}'>
            <td>${i.cust_account_number}</td>
            <td>${i.cust_name}</td>
            <td>${i.cust_email}</td>
            <td>${i.cust_current_balance}</td>
            <td><a class='update' data-toggle="modal" href="#updateModal">update</a><a class='del' href="/sync/dlt?table=customer&acc_no=${i.cust_account_number}" >delete</a></td>
            </tr>`
        }
    })
    const updateForm = document.getElementById('updateForm')
    updateForm.addEventListener('submit',(e)=>{
        const name = document.getElementById('name').value
        const mail=document.getElementById('email').value
        const acc_no = document.getElementById('acc').value
        fetch(`/sync/edit?table=customer&name=${name}&mail=${mail}&acc_no=${acc_no}`).then(result=>{
            result.json().then(data=>{
                alert(data)
            })
        })
    })
    const insertForm =document.getElementById('insertForm')
    insertForm.addEventListener('submit',(e)=>{
        const name = document.getElementById('i_name').value
        const mail=document.getElementById('i_email').value
        const acc_no = document.getElementById('i_acc').value
        const bal =document.getElementById('balance').value
        const obj={
            cust_name:name,
            cust_account_number:acc_no,
            cust_current_balance:bal,
            cust_email:mail
        }
        fetch(`/async/add?table=customer`,{
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