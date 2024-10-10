import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import AddAppointment from './components/AddAppointment';
import EditAppointment from './components/EditAppointment';

export default function App() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  // Fetch appointments on mount
  useEffect(() => {
    axios.get('https://c7736ec3-ca3d-4adb-98a1-4becec9c8772-00-2v4tulvcdkrqv.sisko.replit.dev:3000/appointments')
      .then(response => setAppointments(response.data))
      .catch(error => console.error('Error fetching appointments:', error));
  }, []);

  // Add a new appointment to the list
  const handleAdd = (newAppointment) => {
    setAppointments([...appointments, newAppointment]);
  };

  // Update appointment in the list
  const handleUpdate = (updatedAppointment) => {
    setAppointments(appointments.map(appt => 
      appt.id === updatedAppointment.id ? updatedAppointment : appt
    ));
    setSelectedAppointmentId(null); // Close the update form after updating
  };

  // Delete an appointment
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://c7736ec3-ca3d-4adb-98a1-4becec9c8772-00-2v4tulvcdkrqv.sisko.replit.dev:3000/appointments/${id}`);
      setAppointments(appointments.filter(appt => appt.id !== id));
    } catch (error) {
      console.error('Error deleting the appointment', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Scheduled Appointments</h1>
      <ul className="list-group">
        {Array.isArray(appointments) && appointments.map((appt, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <strong>{appt.name}</strong> - {appt.sessionType} on {(appt.dateTime)}
            </span>
            <div>
              <button className="btn btn-warning btn-sm mr-2" onClick={() => setSelectedAppointmentId(appt.id)}>
                Edit
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(appt.id)}>
                <i className="bi bi-trash"></i> {/* Bootstrap trash icon */}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Add Appointment */}
      <AddAppointment onAdd={handleAdd} />

      {/* Edit Appointment */}
      {selectedAppointmentId && (
        <EditAppointment 
          appointmentId={selectedAppointmentId} 
          onUpdate={handleUpdate} 
        />
      )}
    </div>
  );
}
