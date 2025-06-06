import React,{ useState } from 'react'
import './App.css'
import EmployeeForm from './components/EmployeeForm'
import employeeData from "./data/employees";
import Header from './components/Header';
import EmployeeList from './components/EmployeeList';

function App() {
  const [employees, setEmployees] = useState(employeeData)

  //to remove an employee
  function handleDelete(employeeToDelete){
    //adjust function with callback from employee
    // console.log("deleting")
     const newArray = employees.filter(employee =>{
      if(employee.id==employeeToDelete.id){
        return false
      }
      return true
    })
    setEmployees(newArray)
  }

  //to edit an employee role
  function handleEdit(employeeToEdit){
    //adjust function with callback from employee
    // console.log("editing")
        const newArray = employees.map(employee=>{
      if(employee.id==employeeToEdit.id){
        return employeeToEdit
      }
      return employee
    })
    setEmployees(newArray)
  }
  

  return (
    <div>
      <Header/>
      <EmployeeForm 
        employees={employees} 
        setEmployees={setEmployees}/>
      <EmployeeList 
        employees={employees} 
        handleDelete={handleDelete} 
        handleEdit={handleEdit}/>
    </div>
  )
}
export default App
