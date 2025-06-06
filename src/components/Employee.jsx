import React, { useState } from "react";

function Employee({employee, employee,handleEdit, handleDelete}) {
  const [edit,setEdit] = useState(false)
  const [roleEdit,setroleEdit] = useState(employee.role)

  function handleSubmit(e){
    e.preventDefault()
    const editedEmployee = {
      ...employee,
      role: roleEdit
    }
    handleEdit(editedEmployee)
    //setting this to false allows us to edit and remove from our employee list!
    setEdit(false)
  }

  return (
    <tr>
        <td>{employee.firstName}</td>
        <td>{employee.lastName}</td>
        <td onClick={()=>setEdit(true)}>{
              edit ? 
               <form onSubmit={(e)=>handleSubmit(e)} >
                <input onChange={(e) => setroleEdit(e.target.value)} value={roleEdit}/>
              </form>
              : employee.role}</td>
        <td>
          <button onClick={()=>handleDelete(employee)}> X </button>
        </td>
    </tr>
  );
}

export default Employee;
