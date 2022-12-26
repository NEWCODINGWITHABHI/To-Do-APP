import React, { useEffect, useState } from 'react'
import './style.css'


const getLocalData=()=>{
    const lists=localStorage.getItem("mytodoList");
    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
}




function Todo() {
   const [inputData,setInputData]=useState("");
   const[data,setData]=useState(getLocalData());
  const [editData,setEditData]=useState("");
  const [toggle,setToggle]=useState(false);

   function addData(){
    if(!inputData){
        alert("plZ fill the data")
    }
    else if(inputData && toggle){
        setData(
            data.map((currElem)=>{
                if(currElem.id===editData){
                    return {...currElem,name:inputData}
                }
                return currElem;

            })
        )
        setInputData("");
        setEditData(null);
        setToggle(false);
    }
    else{

        const newInputData={
            id:new Date().getTime().toString(),
            name:inputData,
        }
        setData([...data,newInputData])
        setInputData("");
    }
   }

   function editItem(id){
       const editedData=data.find((currElem)=>{
       return currElem.id===id;
       });
       
       setToggle(true);
       setInputData(editedData.name);
       setEditData(id);
   }

   function delItem(id){
       const updatedItems=data.filter((curr)=>{
        return curr.id!==id;
       })
       setData(updatedItems);
   }

   function allRemove(){
   
    setData([]);
   }

  useEffect(()=>{
     localStorage.setItem("mytodoList",JSON.stringify(data));
   },[data]); 
  return (
    <div className='todo-main-container'>
      <div className='todo-wrapper'>
        
        <div className='todo-img-box'>
         <figure>
            <img src="./checklist.webp" alt="todo-img" />
            <figcaption>Add Your List Here</figcaption>
         </figure>
        </div>

       <div className='input-all-container'>
        <div className='add-items'>
             <input type="Add Items" className='add-input'
             placeholder='Add Title Here'
             value={inputData}
             onChange={(e)=>setInputData(e.target.value)}
              />
              {toggle? ( <i class="edit-icon-top fa-solid fa-pen-to-square"
              onClick={()=>addData()}
              ></i>):

             (<i class="fa-solid fa-plus" style={{color:"black"}}
             onClick={addData}></i>)
              }
        </div>

        <div className='show-items'>

        {data.map((currItem)=>(
            <div key={currItem.id}className='each-item'>
           <h3>{currItem.name}</h3>
           <div className='edit-del-box'>
           <i class="fa-solid fa-pen-to-square" style={{color:"black"}}
           onClick={()=>editItem(currItem.id)}
           ></i>
           <i class="fa-solid fa-trash-can" style={{color:"black"}}
           onClick={()=>delItem(currItem.id)}
           ></i>
           </div>
          </div>
        ))}
         
        </div>

        <div className='remove-and-check'>
            <button onClick={allRemove}>Remove All</button>
            
        </div>
        </div>
      </div>
    </div>
  )
}

export default Todo
