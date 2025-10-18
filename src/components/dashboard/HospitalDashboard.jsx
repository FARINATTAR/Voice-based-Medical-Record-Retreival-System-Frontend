import React from 'react';

const AdminDashboard = ({ records =[]}) => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>All Records:</h3>
      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <ul>
          {records.map((rec) => (
            <li key={rec._id}>
              <strong>{rec.title}</strong> (Patient: {rec.patientId}, Doctor: {rec.doctorId})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
