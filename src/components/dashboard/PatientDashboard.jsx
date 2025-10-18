import React from 'react';

const PatientDashboard = ({ records = []}) => {
  return (
    <div>
      <h2>Patient Dashboard</h2>
      <h3>Your Medical Records:</h3>
      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <ul>
          {records.map((rec) => (
            <li key={rec._id}>
              <strong>{rec.title}</strong>: {rec.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientDashboard;
