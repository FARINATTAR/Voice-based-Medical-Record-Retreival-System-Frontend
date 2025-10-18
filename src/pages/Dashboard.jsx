import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientDashboard from '../components/dashboard/PatientDashboard';
import DoctorDashboard from '../components/dashboard/DoctorDashboard';
import AdminDashboard from '../components/dashboard/HospitalDashboard';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Get logged-in user from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);

    // Fetch records based on role
    const fetchRecords = async () => {
      if (!storedUser) return;

      try {
        let res;
        if (storedUser.role === 'patient') {
          res = await axios.get(`/api/records/${storedUser._id}`);
        } else if (storedUser.role === 'doctor') {
          res = await axios.get(`/api/records/doctor/${storedUser._id}`);
        } else if (storedUser.role === 'admin') {
          res = await axios.get(`/api/admin/all-records`);
        }
        setRecords(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecords();
  }, []);

  if (!user) return <p>Loading...</p>;

  // Render based on role
  return (
    <div>
      <h1>Welcome {user.name}</h1>
      {user.role === 'patient' && <PatientDashboard records={records} />}
      {user.role === 'doctor' && <DoctorDashboard records={records} />}
      {user.role === 'admin' && <AdminDashboard records={records} />}
    </div>
  );
};

export default Dashboard;
