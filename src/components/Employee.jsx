import React, { useState } from "react";

function Employee({employee}) {
  const [edit,setEdit] = useState(false)
  const [roleEdit,setroleEdit] = useState(employee.role)

  return (
    <tr>
        <td>{employee.firstName}</td>
        <td>{employee.lastName}</td>
        <td onClick={()=>setEdit(true)}>{
              edit ? 
              <form>
                <input onChange={(e) => setroleEdit(e.target.value)} value={roleEdit}/>
              </form>
              : employee.role}</td>
        <td>
          <button> X </button>
        </td>
    </tr>
  );
}

export default Employee;
