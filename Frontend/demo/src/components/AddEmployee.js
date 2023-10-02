import React, { useEffect, useState } from 'react'
import EmployeeService from '../services/EmployeeService'
import { Link, useNavigate , useParams} from 'react-router-dom';

const AddEmployee = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailId, setemailId] = useState('')
    const navigate = useNavigate();
    const {id} = useParams();

    const saveEmployee = (e)=>{
        e.preventDefault();  // to avoid refreshing while submitting form

        const employee = {firstName, lastName, emailId}
        if(id){
            EmployeeService.updateEmployee(id , employee).then((response) => {
                navigate('/employees')
            }).catch((error) => {console.log(error);});
        }else{
            EmployeeService.createEmployee(employee).then((response)=>{
                console.log(response.data);  
                navigate('/employees');
            }).catch(error =>{
                console.log(error);
            })
        }

       
    }

    useEffect( () => {
        EmployeeService.getEmployeeById(id).then((response)=>{
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setemailId(response.data.emailId)
        }).catch((error)=>{
            console.log(error);
        })
    } , []);

    const title = ()=>{
        if(id){
            return <h2 className='text-center' style={{fontStyle:'italic'}}>Update Employee</h2>
        }else{
            return <h2 className='text-center' style={{fontStyle:'italic'}}>Add Employee</h2>
        }
    }

  return (
    <div>
        <br/><br/>
      <div className='container'>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
               {title()}
                <div className='card-body'>
                    <form>

                        <div className='form-group mb-2'   >
                            <label className='form-label'>First Name: </label>
                            <input
                                    type='text'
                                    placeholder='Enter First Name'
                                    name='firstName'
                                    value={firstName}
                                    className='form-control'
                                    onChange={(e)=>{
                                        setFirstName(e.target.value)}}
                            ></input>
                        </div>  

                        <div className='form-group mb-2'   >
                            <label className='form-label'>Last Name: </label>
                            <input
                                    type='text'
                                    placeholder='Enter Last Name'
                                    name='lastName'
                                    value={lastName}
                                    className='form-control'
                                    onChange={(e)=>{
                                        setLastName(e.target.value)}}
                            ></input>
                        </div>

                        <div className='form-group mb-2'   >
                            <label className='form-label'>Email Id : </label>
                            <input
                                    type='text'
                                    placeholder='Enter Email-id: '
                                    name='email'
                                    value={emailId}
                                    className='form-control'
                                    onChange={(e)=>{
                                        setemailId(e.target.value)}}
                            ></input>
                        </div>

                        <button className='btn btn-success' onClick={(e)=>saveEmployee(e)}>Submit</button>&nbsp;&nbsp;
                        <Link to="/employees" className='btn btn-danger'>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>

      </div>
    </div>
  )
}

export default AddEmployee
