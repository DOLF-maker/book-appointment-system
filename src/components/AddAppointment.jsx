import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form } from 'react-bootstrap';


const AddAppointment = ({ onAdd }) => {
  const [appointment, setAppointment] = useState({
    name: '',
    email: '',
    phone: '',
    sessionType: '',
    dateTime: ''
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({
      ...appointment,
      [name]: value
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://c7736ec3-ca3d-4adb-98a1-4becec9c8772-00-2v4tulvcdkrqv.sisko.replit.dev:3000/appointments', appointment);
      onAdd(response.data); // Pass new appointment back to the parent
      setAppointment({
        name: '',
        email: '',
        phone: '',
        sessionType: '',
        dateTime: ''
      });
    } catch (error) {
      console.error('Error submitting the appointment', error);
    }
  };

  return (
    <Container className='my-5'>    
            <h2>Book a New Appointment</h2>
            <Form onSubmit={handleSubmit}>
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
            id="session_Type"
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
            id="date_Time"
            name="dateTime"
            value={appointment.dateTime}
            placeholder='Enter your prefer Date & Time as 10/10/2024 1.30pm'
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </Form>
    </Container>
  );
};

export default AddAppointment;
