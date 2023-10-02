import React, { useEffect, useState } from 'react'
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom';

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([]);

    useEffect(()=>{
       getEmployees();
    },[])

     const getEmployees = () =>{
        EmployeeService.getAllEmployees().then((response)=>{
            setEmployees(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error)});
     }

    const deleteEmployee = (employeeId) => {
        EmployeeService.deletEmployee(employeeId).then((response)=>{
            getEmployees();
        }).catch(error =>{
            console.log(error);
        })
    }
  
  return (
    <div className='container'>
        <br/>
        <h2 className='text-center ' style={{fontStyle:'italic'}} >List of Employees</h2><br/> 
        <Link to='/add-employee' className='btn btn-primary' >Add Employee</Link>
        <br/> <br/>
        <table className="table table-bordered table-striped table-hover">
            <thead>
                <th> Id</th>
                <th> First Name</th>
                <th> Last Name</th>
                <th> Email id</th>
                <th>Actions</th>
            </thead>
            <tbody>
                {
                    employees.map(
                        employee =>
                        <tr key = {employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.emailId}</td>
                            <td><Link className='btn btn-info' to={`/edit-employee/${employee.id}`}>Update</Link>&nbsp;&nbsp;
                            <button className='btn btn-danger' onClick={() => deleteEmployee(employee.id)} >Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent
