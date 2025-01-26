import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const AddPatient = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', age: '', contact: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/patients', formData, {
        headers: { 'x-auth-token': user.token },
      });
      alert('Patient added successfully');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Age"
        value={formData.age}
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
      />
      <input
        type="text"
        placeholder="Contact"
        value={formData.contact}
        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
      />
      <button type="submit">Add Patient</button>
    </form>
  );
};

export default AddPatient;
