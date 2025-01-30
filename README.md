# Technical Lesson: Inverse Data Flow

## In this lesson you will be practicing how to implement inverse data flow and handle complex states

## The Scenario
You are working on the same HR resource page as previously ([link](#)) and they would like to add a feature to remove an employee as well as edit an employee's role. Using your knowledge of inverse data flow as well as more complex state management techniques, implement these two key features.

## Tasks
### Task 1: Define the Problem
- Add a removal and editing feature for a displayed list.

### Task 2: Determine the Design
- Determine Component Tree

#### Component Tree:
```
└── App
    ├── Header
    ├── EmployeeForm
    └── EmployeeList
        └── Employee
```
This tree will be the same as when you previously worked on this project, with the same states. The key differences include:
- Adding IDs to our form and `Employee` component to help with state management.
- Adding a delete button to each displayed employee.
- Implementing a feature where clicking on the role opens a controlled form for editing.

### Task 3: Develop the Code
#### Step 1: Setup
To get started, fork and clone the repository.

Once the code is open in VSCode, run the following commands in the terminal:
```sh
npm install
npm run dev
```
This will install all required dependencies and open up the webpage in your browser. Any saved changes will be reflected immediately on the webpage!

#### Step 2: Create state-changing function
When implementing inverse data flow, the function should be added at the level where the state is created. This allows the function to take data from a child component and lift it up to apply state changes.

Modify `App.jsx`:
```jsx
import React,{ useState } from 'react';
import './App.css';
import EmployeeForm from './components/EmployeeForm';
import employeeData from "./data/employees";
import Header from './components/Header';
import EmployeeList from './components/EmployeeList';

function App() {
  const [employees, setEmployees] = useState(employeeData);

  function handleDelete(data){
    console.log("deleting");
  }
  function handleEdit(data){
    console.log("editing");
  }

  return (
    <div>
      <Header/>
      <EmployeeForm employees={employees} setEmployees={setEmployees}/>
      <EmployeeList employees={employees} handleDelete={handleDelete} handleEdit={handleEdit}/>
    </div>
  );
}
export default App;
```

#### Step 3: Pass function as prop
Modify `EmployeeList.jsx`:
```jsx
import React from "react";
import Employee from "./Employee";

function EmployeeList({ employees, handleEdit, handleDelete }) {
  return (
    <div>
      <h3>All Employees</h3>
      <table>
        <tbody>
          <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Role</th>
              <th>Remove</th>
          </tr>
          {employees.map((employee) => (
              <Employee key={employee.id} employee={employee} handleEdit={handleEdit} handleDelete={handleDelete}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
```
Modify `Employee.jsx`:
```jsx
import React, { useState } from "react";

function Employee({employee, handleEdit, handleDelete}) {
  const [edit, setEdit] = useState(false);
  const [roleEdit, setRoleEdit] = useState(employee.role);

  function handleSubmit(e) {
    e.preventDefault();
    const editedEmployee = { ...employee, role: roleEdit };
    handleEdit(editedEmployee);
    setEdit(false);
  }

  return (
    <tr>
        <td>{employee.firstName}</td>
        <td>{employee.lastName}</td>
        <td onClick={() => setEdit(true)}>{
              edit ?
              <form onSubmit={(e) => handleSubmit(e)}>
                <input onChange={(e) => setRoleEdit(e.target.value)} value={roleEdit}/>
              </form>
              : employee.role}</td>
        <td>
          <button onClick={() => handleDelete(employee)}> X </button>
        </td>
    </tr>
  );
}

export default Employee;
```

#### Step 4: Call function
- The delete function is triggered on a button click.
- The edit function is triggered by submitting the form.

#### Step 5: Complete delete function
Modify `App.jsx`:
```jsx
function handleDelete(employeeToDelete) {
  const newArray = employees.filter(employee => employee.id !== employeeToDelete.id);
  setEmployees(newArray);
}
```
This function filters out the deleted employee and updates the state with the new array.

#### Step 6: Complete edit function
Modify `App.jsx`:
```jsx
function handleEdit(employeeToEdit) {
  const newArray = employees.map(employee =>
    employee.id === employeeToEdit.id ? employeeToEdit : employee
  );
  setEmployees(newArray);
}
```
This function finds the employee by ID and updates only the `role` field while maintaining the list order.

### Task 4: Test and Refine
- Debugging and testing during coding.

### Task 5: Document and Maintain
- Add descriptions to event functions.

### Considerations
#### Inverse Data Flow vs Passing Down Variables:
- This example demonstrates both inverse data flow (for edit and delete) and passing down state (as seen with the add employee form).
- The key benefit of inverse data flow is keeping all state changes at the same level.

#### Rendering:
- Anytime a state changes, all child components re-render, ensuring the UI stays updated.

With these changes, you should now be able to edit and remove employees from the list! 🎉

