import React, {useState} from "react";
import './EditComponent.css'

const EditPatientsComponent = () =>{
    const [Name,setName] = useState('')
    const [ID,setID] = useState('')
    const [Age,setAge] = useState('')
    const [Gender,setGender] = useState('')
    const [City,setCity] = useState('')
    const [Mobile,setMobile] = useState('')
    const [Email,setEmail] = useState('')

    const patientIDValidator = () => {
        if (ID.length !== 0)
        {
            fetch('http://localhost:3600/api/v1/patients/validate',{
                method:'POST',
                crossDomain: true,
                headers: {
                    'Content-type':'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    patientID : ID,
                })
            })
            .then((response) => response.json())
            .then((data) => 
            {
                setName(data.patientName),
                setAge(data.patientAge),
                setGender(data.patientGender),
                setCity(data.patientCity),
                setMobile(data.patientMobile),
                setEmail(data.patientEmail)
            }
        )
        }
    }

    const formSubmitHandler = (e) =>{
        e.preventDefault()

        fetch('http://localhost:3500/api/v1/patients',{
        method:'PATCH',
        crossDomain: true,
        headers: {
            'Content-type':'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            patientName : Name,
            patientID : ID ,
            patientAge: Age ,
            patientGender: Gender,
            patientCity: City ,
            patientMobile: Mobile ,
            patientEmail : Email
        })
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message)
            {
                alert(data.message)
            }
            else{
                alert(`Data is updated successfully`)
                window.location.href = '/'
            }
        })
    }

    return(
        <form className='form-container' onSubmit={formSubmitHandler}>
            <h2>Update Details</h2>
            <div className='form-group'>
                <label>Patient ID</label>
                <input
                type='text'
                placeholder='Enter the patient ID'
                value={ID}
                onChange={(e)=>setID(e.target.value)}
                required
                />
            </div>
            <div>
                <button onClick={patientIDValidator}>Check</button>
            </div>
            <div className='form-group'>
                <label>Patient Name</label>
                <input
                type='text'
                placeholder='Enter the patient name'
                value={Name}
                onChange={(e)=>setName(e.target.value)}
                required
                />
            </div>
            <div className='form-group'>
                <label>Patient Age</label>
                <input
                type='text'
                placeholder='Enter the patient age'
                value={Age}
                onChange={(e)=>setAge(e.target.value)}
                required
                />
            </div>
            <div className='form-group'>
                <label>Patient Gender</label>
                <select
                value={Gender}
                onChange={(e)=>setGender(e.target.value)}
                required
                >
                <option value="">-- Please select --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                </select>
            </div>
            <div className='form-group'>
                <label>Patient City</label>
                <input
                type='text'
                placeholder='Enter the patient city'
                value={City}
                onChange={(e)=>setCity(e.target.value)}
                required
                />
            </div>
            <div className='form-group'>
                <label>Patient Mobile </label>
                <input
                type='text'
                placeholder='Enter the patient mobile'
                value={Mobile}
                onChange={(e)=>setMobile(e.target.value)}
                required
                />
            </div>
            <div className='form-group'>
                <label>Patient Email</label>
                <input
                type='text'
                placeholder='Enter the patient Email'
                value={Email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                />
            </div>
            <div>
                <button type='submit'>Add</button>
            </div>
        </form>
    )
}

export default EditPatientsComponent