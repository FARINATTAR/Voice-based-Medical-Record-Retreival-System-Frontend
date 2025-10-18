import React from 'react';

const DoctorDashboard = ({ records = []}) => {
  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <h3>Your Patients' Records:</h3>
      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <ul>
          {records.map((rec) => (
            <li key={rec._id}>
              <strong>{rec.title}</strong> for patient ID {rec.patientId}: {rec.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorDashboard;
