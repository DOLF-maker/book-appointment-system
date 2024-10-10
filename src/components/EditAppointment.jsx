import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditAppointment = ({ appointmentId, onUpdate }) => {
  const [appointment, setAppointment] = useState({
    name: '',
    email: '',
    phone: '',
    sessionType: '',
    dateTime: ''
  });

  // Fetch the existing appointment details
  useEffect(() => {
    if (appointmentId) {
      axios.get(`https://c7736ec3-ca3d-4adb-98a1-4becec9c8772-00-2v4tulvcdkrqv.sisko.replit.dev:3000/appointments/${appointmentId}`)
        .then(response => {
          setAppointment(response.data);
        })
        .catch(error => console.error('Error fetching appointment:', error));
    }
  }, [appointmentId]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({
      ...appointment,
      [name]: value
    });
  };

  // Submit the updated form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/appointments/${appointmentId}`, appointment);
      onUpdate(response.data); // Pass updated appointment back to the parent
    } catch (error) {
      console.error('Error updating the appointment', error);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Edit Appointment</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={appointment.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={appointment.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone No:</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={appointment.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="sessionType">Type of Session:</label>
          <select
            className="form-control"
            id="sessionType"
            name="sessionType"
            value={appointment.sessionType}
            onChange={handleChange}
            required
          >
            <option value="">Select session</option>
            <option value="PT Session">PT Session</option>
            <option value="Nutrition Session">Nutrition Session</option>
            <option value="HIIT">HIIT</option>
            <option value="Physiotherapy">Physiotherapy</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dateTime">Date and Time:</label>
          <input
            type="text"
            className="form-control"
            id="dateTime"
            name="dateTime"
            value={appointment.dateTime}
            placeholder='Enter your prefer Date & Time as 10/10/2024 1.30pm'
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Update</button>
      </form>
    </div>
  );
};

export default EditAppointment;
