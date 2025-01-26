import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const PatientList = () => {
  const { user } = useContext(AuthContext);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const res = await axios.get('/api/patients', {
        headers: { 'x-auth-token': user.token },
      });
      setPatients(res.data);
    };
    fetchPatients();
  }, [user]);

  return (
    <div>
      <h1>Patient List</h1>
      <ul>
        {patients.map((patient) => (
          <li key={patient._id}>{patient.name} - {patient.contact}</li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
