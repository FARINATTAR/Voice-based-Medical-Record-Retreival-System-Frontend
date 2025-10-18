import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorDashboard from '../components/dashboard/DoctorDashboard';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);

    const fetchRecords = async () => {
      if (!storedUser) return;
      try {
        const res = await axios.get(`http://localhost:3000/records/doctor/${storedUser._id}`);
        setRecords(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecords();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      {user.role === 'doctor' && <DoctorDashboard records={records} setRecords={setRecords} doctorId={user._id} />}
    </div>
  );
};

export default Dashboard;
