// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const DoctorDashboard = () => {
// //   const [records, setRecords] = useState([]);
// //   const [patients, setPatients] = useState([]);
// //   const [formData, setFormData] = useState({
// //     patientId: '',
// //     hospitalId: '',
// //     voiceTranscript: '',
// //     notes: '',
// //     diagnosis: '',
// //     prescriptions: ''
// //   });

// //   const user = JSON.parse(localStorage.getItem('user'));
// //   const token = localStorage.getItem('token');

// //   // Fetch doctor's records
// //   const fetchRecords = async () => {
// //     try {
// //       const res = await axios.get(`http://localhost:5000/records/doctor/${user.id}`, {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
// //       setRecords(res.data);
// //     } catch (err) {
// //       console.error(err);
// //       alert(err.response?.data?.message || 'Error fetching records');
// //     }
// //   };

// //   // Fetch patients for doctor
// //   const fetchPatients = async () => {
// //     try {
// //       const res = await axios.get('http://localhost:5000/patient', {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
// //       const myPatients = res.data.filter(p => String(p.doctorId) === String(user.id));
// //       setPatients(myPatients);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchRecords();
// //     fetchPatients();
// //   }, []);

// //   // Handle form input change
// //   const handleChange = e => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   // Submit new record
// //   const handleSubmit = async e => {
// //     e.preventDefault();
// //     try {
// //       const prescriptionsArray = formData.prescriptions
// //         ? formData.prescriptions.split(',').map(p => p.trim())
// //         : [];

// //       const payload = {
// //         patientId: formData.patientId,
// //         hospitalId: formData.hospitalId,
// //         voiceTranscript: formData.voiceTranscript,
// //         notes: formData.notes,
// //         diagnosis: formData.diagnosis,
// //         prescriptions: prescriptionsArray
// //       };

// //       const res = await axios.post('http://localhost:5000/records', payload, {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
// //       alert('Record created!');
// //       setRecords([res.data, ...records]); // prepend new record
// //       setFormData({
// //         patientId: '',
// //         hospitalId: '',
// //         voiceTranscript: '',
// //         notes: '',
// //         diagnosis: '',
// //         prescriptions: ''
// //       });
// //     } catch (err) {
// //       console.error(err);
// //       alert(err.response?.data?.message || 'Error creating record');
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Doctor Dashboard</h2>

// //       <h3>Create Medical Record</h3>
// //       <form onSubmit={handleSubmit}>
// //         <label>
// //           Select Patient
// //           <select name="patientId" value={formData.patientId} onChange={handleChange} required>
// //             <option value="">Select Patient</option>
// //             {patients.map(p => (
// //               <option key={p._id} value={p._id}>
// //                 {p.name}
// //               </option>
// //             ))}
// //           </select>
// //         </label>
// //         <label>
// //           Hospital ID
// //           <input type="text" name="hospitalId" value={formData.hospitalId} onChange={handleChange} required />
// //         </label>
// //         <label>
// //           Voice Transcript
// //           <input type="text" name="voiceTranscript" value={formData.voiceTranscript} onChange={handleChange} />
// //         </label>
// //         <label>
// //           Notes
// //           <input type="text" name="notes" value={formData.notes} onChange={handleChange} />
// //         </label>
// //         <label>
// //           Diagnosis
// //           <input type="text" name="diagnosis" value={formData.diagnosis} onChange={handleChange} />
// //         </label>
// //         <label>
// //           Prescriptions (comma separated)
// //           <input type="text" name="prescriptions" value={formData.prescriptions} onChange={handleChange} />
// //         </label>
// //         <button type="submit">Create Record</button>
// //       </form>

// //       <h3>My Records</h3>
// //       {records.length === 0 ? (
// //         <p>No records found</p>
// //       ) : (
// //         <ul>
// //           {records.map(r => (
// //             <li key={r._id}>
// //               <strong>Patient ID:</strong> {r.patientId}, <strong>Diagnosis:</strong> {r.diagnosis}, <strong>Prescriptions:</strong>{' '}
// //               {r.prescriptions.join(', ')}
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // };

// // export default DoctorDashboard;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { User, FileText, Stethoscope, Pill, ClipboardList, Calendar } from 'lucide-react';

// const DoctorDashboard = () => {
//   const [records, setRecords] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [formData, setFormData] = useState({
//     patientId: '',
//     hospitalId: '',
//     voiceTranscript: '',
//     notes: '',
//     diagnosis: '',
//     prescriptions: ''
//   });

//   const user = JSON.parse(localStorage.getItem('user'));
//   const token = localStorage.getItem('token');

//   // Fetch doctor's records
//   const fetchRecords = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/records/doctor/${user.id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setRecords(res.data);
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || 'Error fetching records');
//     }
//   };

//   // Fetch patients for doctor
//   const fetchPatients = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/patient', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       const myPatients = res.data.filter(p => String(p.doctorId) === String(user.id));
//       setPatients(myPatients);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchRecords();
//     fetchPatients();
//   }, []);

//   // Handle form input change
//   const handleChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Submit new record
//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const prescriptionsArray = formData.prescriptions
//         ? formData.prescriptions.split(',').map(p => p.trim())
//         : [];

//       const payload = {
//         patientId: formData.patientId,
//         hospitalId: formData.hospitalId,
//         voiceTranscript: formData.voiceTranscript,
//         notes: formData.notes,
//         diagnosis: formData.diagnosis,
//         prescriptions: prescriptionsArray
//       };

//       const res = await axios.post('http://localhost:5000/records', payload, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       alert('Record created!');
//       setRecords([res.data, ...records]);
//       setFormData({
//         patientId: '',
//         hospitalId: '',
//         voiceTranscript: '',
//         notes: '',
//         diagnosis: '',
//         prescriptions: ''
//       });
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || 'Error creating record');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
//             Doctor Dashboard
//           </h1>
//           <p className="text-gray-600">Manage patient records and consultations</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Create Record Form - Takes 2 columns on large screens */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
//                   <FileText className="w-6 h-6 text-white" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800">Create Medical Record</h2>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-5">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                   {/* Patient Selection */}
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       <User className="w-4 h-4 inline mr-2" />
//                       Select Patient
//                     </label>
//                     <select
//                       name="patientId"
//                       value={formData.patientId}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
//                     >
//                       <option value="">Choose a patient</option>
//                       {patients.map(p => (
//                         <option key={p._id} value={p._id}>
//                           {p.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* Hospital ID */}
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       <ClipboardList className="w-4 h-4 inline mr-2" />
//                       Hospital ID
//                     </label>
//                     <input
//                       type="text"
//                       name="hospitalId"
//                       value={formData.hospitalId}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
//                       placeholder="Enter hospital ID"
//                     />
//                   </div>
//                 </div>

//                 {/* Voice Transcript */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Voice Transcript
//                   </label>
//                   <input
//                     type="text"
//                     name="voiceTranscript"
//                     value={formData.voiceTranscript}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
//                     placeholder="Voice transcript (optional)"
//                   />
//                 </div>

//                 {/* Notes */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Notes
//                   </label>
//                   <textarea
//                     name="notes"
//                     value={formData.notes}
//                     onChange={handleChange}
//                     rows="3"
//                     className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none"
//                     placeholder="Additional notes"
//                   />
//                 </div>

//                 {/* Diagnosis */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     <Stethoscope className="w-4 h-4 inline mr-2" />
//                     Diagnosis
//                   </label>
//                   <input
//                     type="text"
//                     name="diagnosis"
//                     value={formData.diagnosis}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
//                     placeholder="Enter diagnosis"
//                   />
//                 </div>

//                 {/* Prescriptions */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     <Pill className="w-4 h-4 inline mr-2" />
//                     Prescriptions
//                   </label>
//                   <input
//                     type="text"
//                     name="prescriptions"
//                     value={formData.prescriptions}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
//                     placeholder="Comma separated (e.g., Aspirin, Ibuprofen)"
//                   />
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
//                 >
//                   Create Record
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* Stats Card - Takes 1 column */}
//           <div className="space-y-6">
//             <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
//               <h3 className="text-lg font-semibold mb-2 opacity-90">Total Records</h3>
//               <p className="text-5xl font-bold">{records.length}</p>
//               <p className="text-sm mt-2 opacity-80">Medical records created</p>
//             </div>

//             <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg p-6 text-white">
//               <h3 className="text-lg font-semibold mb-2 opacity-90">Active Patients</h3>
//               <p className="text-5xl font-bold">{patients.length}</p>
//               <p className="text-sm mt-2 opacity-80">Under your care</p>
//             </div>
//           </div>
//         </div>

//         {/* Records List */}
//         <div className="mt-6">
//           <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
//                 <Calendar className="w-6 h-6 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold text-gray-800">My Records</h2>
//             </div>

//             {records.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FileText className="w-10 h-10 text-gray-400" />
//                 </div>
//                 <p className="text-gray-500 text-lg">No records found</p>
//                 <p className="text-gray-400 text-sm mt-2">Create your first medical record above</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {records.map(r => (
//                   <div
//                     key={r._id}
//                     className="border-2 border-gray-100 rounded-xl p-5 hover:border-indigo-200 hover:shadow-md transition-all duration-200"
//                   >
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div>
//                         <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Patient ID</p>
//                         <p className="text-gray-800 font-medium">{r.patientId}</p>
//                       </div>
//                       <div>
//                         <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Diagnosis</p>
//                         <p className="text-gray-800 font-medium">{r.diagnosis || 'N/A'}</p>
//                       </div>
//                       <div>
//                         <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Prescriptions</p>
//                         <div className="flex flex-wrap gap-2">
//                           {r.prescriptions && r.prescriptions.length > 0 ? (
//                             r.prescriptions.map((med, idx) => (
//                               <span
//                                 key={idx}
//                                 className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
//                               >
//                                 {med}
//                               </span>
//                             ))
//                           ) : (
//                             <span className="text-gray-400 text-sm">No prescriptions</span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, FileText, Stethoscope, Pill, ClipboardList, Calendar, Sparkles, Heart, Activity } from 'lucide-react';

const DoctorDashboard = () => {
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patientId: '',
    hospitalId: '',
    voiceTranscript: '',
    notes: '',
    diagnosis: '',
    prescriptions: ''
  });

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  // Fetch doctor's records
  const fetchRecords = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/records/doctor/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecords(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error fetching records');
    }
  };

  // Fetch patients for doctor
  const fetchPatients = async () => {
    try {
      const res = await axios.get('http://localhost:5000/patient', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const myPatients = res.data.filter(p => String(p.doctorId) === String(user.id));
      setPatients(myPatients);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecords();
    fetchPatients();
  }, []);

  // Handle form input change
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit new record
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const prescriptionsArray = formData.prescriptions
        ? formData.prescriptions.split(',').map(p => p.trim())
        : [];

      const payload = {
        patientId: formData.patientId,
        hospitalId: formData.hospitalId,
        voiceTranscript: formData.voiceTranscript,
        notes: formData.notes,
        diagnosis: formData.diagnosis,
        prescriptions: prescriptionsArray
      };

      const res = await axios.post('http://localhost:5000/records', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Record created!');
      setRecords([res.data, ...records]);
      setFormData({
        patientId: '',
        hospitalId: '',
        voiceTranscript: '',
        notes: '',
        diagnosis: '',
        prescriptions: ''
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error creating record');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-6 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with animated gradient */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-2xl blur-xl opacity-60 animate-pulse"></div>
              <div className="relative bg-white p-4 rounded-2xl shadow-xl">
                <Stethoscope className="w-10 h-10 text-purple-600" />
              </div>
            </div>
          </div>
          <h1 className="text-6xl font-black mb-3">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Doctor Dashboard
            </span>
          </h1>
          <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Manage patient records with style
            <Sparkles className="w-5 h-5 text-pink-500" />
          </p>
        </div>

        {/* Stats Cards - Floating at top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative bg-white rounded-3xl p-6 shadow-xl transform group-hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3">
                <Heart className="w-8 h-8 text-pink-500" />
                <div className="px-3 py-1 bg-pink-100 rounded-full text-xs font-bold text-pink-600">TOTAL</div>
              </div>
              <p className="text-4xl font-black text-gray-800">{records.length}</p>
              <p className="text-gray-600 font-medium mt-1">Medical Records</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-400 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative bg-white rounded-3xl p-6 shadow-xl transform group-hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3">
                <User className="w-8 h-8 text-purple-500" />
                <div className="px-3 py-1 bg-purple-100 rounded-full text-xs font-bold text-purple-600">ACTIVE</div>
              </div>
              <p className="text-4xl font-black text-gray-800">{patients.length}</p>
              <p className="text-gray-600 font-medium mt-1">Patients</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative bg-white rounded-3xl p-6 shadow-xl transform group-hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3">
                <Activity className="w-8 h-8 text-blue-500" />
                <div className="px-3 py-1 bg-blue-100 rounded-full text-xs font-bold text-blue-600">TODAY</div>
              </div>
              <p className="text-4xl font-black text-gray-800">0</p>
              <p className="text-gray-600 font-medium mt-1">Consultations</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Record Form */}
          <div className="lg:col-span-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-white">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-4 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-2xl shadow-lg">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-gray-800">Create Medical Record</h2>
                    <p className="text-gray-500 text-sm mt-1">Fill in patient details below</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Patient Selection */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        Select Patient
                      </label>
                      <select
                        name="patientId"
                        value={formData.patientId}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 rounded-2xl border-3 border-pink-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all outline-none bg-white shadow-sm font-medium"
                      >
                        <option value="">Choose a patient</option>
                        {patients.map(p => (
                          <option key={p._id} value={p._id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Hospital ID */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-400 to-violet-400 flex items-center justify-center">
                          <ClipboardList className="w-4 h-4 text-white" />
                        </div>
                        Hospital ID
                      </label>
                      <input
                        type="text"
                        name="hospitalId"
                        value={formData.hospitalId}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 rounded-2xl border-3 border-purple-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all outline-none bg-white shadow-sm font-medium"
                        placeholder="Enter hospital ID"
                      />
                    </div>
                  </div>

                  {/* Voice Transcript */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      Voice Transcript
                    </label>
                    <input
                      type="text"
                      name="voiceTranscript"
                      value={formData.voiceTranscript}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-2xl border-3 border-blue-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white shadow-sm font-medium"
                      placeholder="Voice transcript (optional)"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-5 py-4 rounded-2xl border-3 border-pink-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all outline-none resize-none bg-white shadow-sm font-medium"
                      placeholder="Additional notes"
                    />
                  </div>

                  {/* Diagnosis */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center">
                        <Stethoscope className="w-4 h-4 text-white" />
                      </div>
                      Diagnosis
                    </label>
                    <input
                      type="text"
                      name="diagnosis"
                      value={formData.diagnosis}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-2xl border-3 border-purple-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all outline-none bg-white shadow-sm font-medium"
                      placeholder="Enter diagnosis"
                    />
                  </div>

                  {/* Prescriptions */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                        <Pill className="w-4 h-4 text-white" />
                      </div>
                      Prescriptions
                    </label>
                    <input
                      type="text"
                      name="prescriptions"
                      value={formData.prescriptions}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-2xl border-3 border-blue-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white shadow-sm font-medium"
                      placeholder="Comma separated (e.g., Aspirin, Ibuprofen)"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="relative w-full group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-black py-5 px-6 rounded-2xl transform group-hover:scale-105 transition-all duration-200 shadow-xl text-lg">
                      ✨ Create Record
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Records List */}
          <div className="lg:col-span-1">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-white max-h-[800px] overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-800">My Records</h2>
                    <p className="text-gray-500 text-sm">Recent activity</p>
                  </div>
                </div>

                {records.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="relative inline-block mb-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-xl opacity-50"></div>
                      <div className="relative w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                        <FileText className="w-12 h-12 text-blue-400" />
                      </div>
                    </div>
                    <p className="text-gray-600 text-lg font-bold">No records found</p>
                    <p className="text-gray-400 text-sm mt-2">Create your first medical record</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {records.map((r, idx) => (
                      <div
                        key={r._id}
                        className="relative group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative bg-white border-2 border-gray-100 group-hover:border-purple-300 rounded-2xl p-5 transition-all duration-200 shadow-sm group-hover:shadow-lg">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center shrink-0">
                              <span className="text-white font-black text-sm">{idx + 1}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Patient ID</p>
                              <p className="text-gray-800 font-bold">{r.patientId}</p>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <p className="text-xs font-bold text-gray-500 uppercase mb-1">Diagnosis</p>
                            <p className="text-gray-700 font-semibold">{r.diagnosis || 'N/A'}</p>
                          </div>
                          
                          <div>
                            <p className="text-xs font-bold text-gray-500 uppercase mb-2">Prescriptions</p>
                            <div className="flex flex-wrap gap-2">
                              {r.prescriptions && r.prescriptions.length > 0 ? (
                                r.prescriptions.map((med, i) => (
                                  <span
                                    key={i}
                                    className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 text-blue-700 rounded-xl text-xs font-bold"
                                  >
                                    {med}
                                  </span>
                                ))
                              ) : (
                                <span className="text-gray-400 text-sm font-medium">No prescriptions</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;