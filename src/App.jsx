import React,{ useState } from 'react'
import './App.css'
import EmployeeForm from './components/EmployeeForm'
import employeeData from "./data/employees";
import Header from './components/Header';
import EmployeeList from './components/EmployeeList';

function App() {
  const [employees, setEmployees] = useState(employeeData)

  return (
    <div>
      <Header/>
      <EmployeeForm employees={employees} setEmployees={setEmployees}/>
      <EmployeeList employees={employees}/>
    </div>
  )
}
export default App
