import React, {useEffect, useState} from "react";
import PatientComponent from './PatientComponent'
import './getDetails.css'

const GetAllPatientsComponent = () =>{
    const [patients, setPatient] = useState([])

    const fetchAllData = async() =>{
        await fetch('http://localhost:3600/api/v1/patients')
        .then((res)=>{res.json()})
        .then((data)=>{setPatient(data)})
        .catch((err)=>{console.log(err.message)})
    }

    useEffect(()=>{
        fetchAllData()
    },[])

    return(
        <div className='patients'>
            {patients.map(patient=>(
                <PatientComponent patient={patient}/>
            ))}
        </div>
    )
}

export default GetAllPatientsComponent