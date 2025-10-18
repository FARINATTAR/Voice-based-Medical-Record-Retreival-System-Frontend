// import React, { useState } from 'react';
// import axios from 'axios';

// const DoctorDashboard = ({ records, setRecords, doctorId }) => {
//   const [formData, setFormData] = useState({
//     patientId: '',
//     voiceTranscript: '',
//     notes: '',
//     diagnosis: '',
//     prescriptions: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const dataToSend = {
//         ...formData,
//         doctorId: doctorId,
//         hospitalId: '68f3339eed578e4908e3696f', // your hospital ID
//         prescriptions: formData.prescriptions.split(',').map(p => p.trim())
//       };

//       const res = await axios.post('http://localhost:3000/records', dataToSend);
//       alert('Record added successfully ✅');
//       setRecords(prev => [...prev, res.data]);
//       setFormData({
//         patientId: '',
//         voiceTranscript: '',
//         notes: '',
//         diagnosis: '',
//         prescriptions: ''
//       });
//     } catch (err) {
//       console.error(err);
//       alert('Error adding record ❌');
//     }
//   };

//   return (
//     <div>
//       <h2>Doctor Dashboard</h2>

//       <h3>Add New Medical Record</h3>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="patientId"
//           placeholder="Patient ID"
//           value={formData.patientId}
//           onChange={handleChange}
//           required
//         /><br/>
//         <textarea
//           name="voiceTranscript"
//           placeholder="Voice Transcript"
//           value={formData.voiceTranscript}
//           onChange={handleChange}
//         /><br/>
//         <textarea
//           name="notes"
//           placeholder="Notes"
//           value={formData.notes}
//           onChange={handleChange}
//         /><br/>
//         <input
//           type="text"
//           name="diagnosis"
//           placeholder="Diagnosis"
//           value={formData.diagnosis}
//           onChange={handleChange}
//         /><br/>
//         <input
//           type="text"
//           name="prescriptions"
//           placeholder="Prescriptions (comma separated)"
//           value={formData.prescriptions}
//           onChange={handleChange}
//         /><br/>
//         <button type="submit">Add Record</button>
//       </form>

//       <h3>Patients' Records:</h3>
//       {(!records || records.length === 0) ? (
//         <p>No records found.</p>
//       ) : (
//         <ul>
//           {records.map(rec => (
//             <li key={rec._id}>
//               <strong>{rec.diagnosis}</strong> for patient ID {rec.patientId}: {rec.notes}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default DoctorDashboard;
import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';

export default function DoctorDashboard() {
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    patientId: '',
    hospitalId: '',
    voiceTranscript: '',
    notes: '',
    diagnosis: '',
    prescriptions: ''
  });
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!user || !user.id) return;
    fetchRecords();
    fetchPatients();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await axios.get(`/records/doctor/${user.id}`);
      setRecords(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch records');
    }
  };

  const fetchPatients = async () => {
    try {
      // fetch patients (doctor or admin allowed)
      const res = await axios.get('/patient');
      // optionally filter patients assigned to this doctor (if doctorId stored)
      const assigned = res.data.filter(p => String(p.doctorId) === String(user.id) || (p.hospitalIds && p.hospitalIds.includes(user.hospitalIds?.[0])));
      setPatients(assigned);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // ensure doctorId is taken from logged-in user
      const payload = {
        ...form,
        prescriptions: form.prescriptions ? form.prescriptions.split(',').map(s => s.trim()) : [],
        // doctorId will be taken from token on backend; still we may include it if backend allows
      };

      // make sure we send hospitalId and patientId
      if (!payload.patientId || !payload.hospitalId) {
        return alert('Select patient and hospital');
      }

      const res = await axios.post('/records', payload);
      alert('Record created');
      setForm({ patientId:'', hospitalId:'', voiceTranscript:'', notes:'', diagnosis:'', prescriptions:'' });
      fetchRecords();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to create record');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Doctor Dashboard - {user?.name}</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <section style={{ marginTop: 20 }}>
        <h3>Create New Medical Record</h3>
        <form onSubmit={handleCreate}>
          <div>
            <label>Patient</label>
            <select value={form.patientId} onChange={e => setForm({...form, patientId: e.target.value})} required>
              <option value="">--Select patient--</option>
              {patients.map(p => <option key={p._id} value={p._id}>{p.name} ({p.email})</option>)}
            </select>
          </div>

          <div>
            <label>Hospital</label>
            {/* Use doctor's first hospital by default */}
            <input placeholder="hospitalId" value={form.hospitalId} onChange={e => setForm({...form, hospitalId: e.target.value})} required />
            <div style={{ fontSize: 12, opacity: .8 }}>Tip: paste hospitalId (see seed output) or enter hospital id you got from backend /hospital GET</div>
          </div>

          <div>
            <label>Voice Transcript</label>
            <textarea value={form.voiceTranscript} onChange={e => setForm({...form, voiceTranscript: e.target.value})} />
          </div>

          <div>
            <label>Notes</label>
            <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
          </div>

          <div>
            <label>Diagnosis</label>
            <input value={form.diagnosis} onChange={e => setForm({...form, diagnosis: e.target.value})} />
          </div>

          <div>
            <label>Prescriptions (comma-separated)</label>
            <input value={form.prescriptions} onChange={e => setForm({...form, prescriptions: e.target.value})} />
          </div>

          <button type="submit">Create Record</button>
        </form>
      </section>

      <section style={{ marginTop: 30 }}>
        <h3>Records</h3>
        {records.length === 0 && <p>No records yet</p>}
        <ul>
          {records.map(r => (
            <li key={r._id} style={{ border: '1px solid #ddd', padding: 10, marginBottom: 8 }}>
              <div><strong>Patient:</strong> {r.patientId}</div>
              <div><strong>Diagnosis:</strong> {r.diagnosis}</div>
              <div><strong>Prescriptions:</strong> {Array.isArray(r.prescriptions) ? r.prescriptions.join(', ') : r.prescriptions}</div>
              <div><strong>Notes:</strong> {r.notes}</div>
              <div style={{ fontSize: 12, opacity: .7 }}>Created: {new Date(r.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
