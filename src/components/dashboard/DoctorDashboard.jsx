// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { User, FileText, Stethoscope, Pill, ClipboardList, Calendar, Sparkles, Heart, Activity, LogOut } from 'lucide-react';
// import RecordModal from '.././RecordModal';

// const DoctorDashboard = () => {
//   const [records, setRecords] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState('');
//   const [selectedRecord, setSelectedRecord] = useState(null); // record for modal
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const user = JSON.parse(localStorage.getItem('user'));
//   const token = localStorage.getItem('token');

//   // Logout function
//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     window.location.href = '/login'; // Adjust path to your login route
//   };

//   // Fetch records and patients
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

//   // Update record function to pass to modal
// const handleUpdateRecord = async (id, updatedData) => {
//   try {
//     // prescriptions is ALREADY an array from RecordModal, don't split again!
//     const payload = { ...updatedData };

//     const res = await axios.put(`http://localhost:5000/records/${id}`, payload, {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     setRecords(records.map(r => (r._id === id ? res.data : r)));
//     alert('Record updated successfully!');
//     setIsModalOpen(false);
//   } catch (err) {
//     console.error(err);
//     alert(err.response?.data?.message || 'Error updating record');
//     throw err; // Re-throw so modal knows it failed
//   }
// };

//   // Filter records
//   const filteredRecords = selectedPatient
//     ? records.filter(r => r.patientId === selectedPatient)
//     : records;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-6 relative overflow-hidden">
//       {/* Decorative circles */}
//       <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
//       <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
      
//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Doctor Profile Section */}
//         <div className="mb-6 flex justify-end">
//           <div className="relative group">
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-md opacity-50"></div>
//             <div className="relative bg-white rounded-2xl p-4 shadow-xl flex items-center gap-4">
//               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
//                 <User className="w-6 h-6 text-white" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-xs font-bold text-gray-500 uppercase">Doctor</p>
//                 <p className="text-gray-800 font-bold">{user?.name || 'Doctor'}</p>
//                 <p className="text-xs text-gray-600">{user?.email || ''}</p>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-bold text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
//               >
//                 <LogOut className="w-4 h-4" />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Header */}
//         <div className="mb-8 text-center">
//           <div className="inline-flex items-center gap-3 mb-4">
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-2xl blur-xl opacity-60 animate-pulse"></div>
//               <div className="relative bg-white p-4 rounded-2xl shadow-xl">
//                 <Stethoscope className="w-10 h-10 text-purple-600" />
//               </div>
//             </div>
//           </div>
//           <h1 className="text-6xl font-black mb-3">
//             <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
//               Doctor Dashboard
//             </span>
//           </h1>
//           <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
//             <Sparkles className="w-5 h-5 text-purple-500" />
//             Manage patient records with style
//             <Sparkles className="w-5 h-5 text-pink-500" />
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="relative group">
//             <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
//             <div className="relative bg-white rounded-3xl p-6 shadow-xl transform group-hover:scale-105 transition-transform">
//               <div className="flex items-center justify-between mb-3">
//                 <Heart className="w-8 h-8 text-pink-500" />
//                 <div className="px-3 py-1 bg-pink-100 rounded-full text-xs font-bold text-pink-600">TOTAL</div>
//               </div>
//               <p className="text-4xl font-black text-gray-800">{records.length}</p>
//               <p className="text-gray-600 font-medium mt-1">Medical Records</p>
//             </div>
//           </div>
//           <div className="relative group">
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-400 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
//             <div className="relative bg-white rounded-3xl p-6 shadow-xl transform group-hover:scale-105 transition-transform">
//               <div className="flex items-center justify-between mb-3">
//                 <User className="w-8 h-8 text-purple-500" />
//                 <div className="px-3 py-1 bg-purple-100 rounded-full text-xs font-bold text-purple-600">ACTIVE</div>
//               </div>
//               <p className="text-4xl font-black text-gray-800">{patients.length}</p>
//               <p className="text-gray-600 font-medium mt-1">Patients</p>
//             </div>
//           </div>
//           <div className="relative group">
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
//             <div className="relative bg-white rounded-3xl p-6 shadow-xl transform group-hover:scale-105 transition-transform">
//               <div className="flex items-center justify-between mb-3">
//                 <Activity className="w-8 h-8 text-blue-500" />
//                 <div className="px-3 py-1 bg-blue-100 rounded-full text-xs font-bold text-blue-600">TODAY</div>
//               </div>
//               <p className="text-4xl font-black text-gray-800">0</p>
//               <p className="text-gray-600 font-medium mt-1">Consultations</p>
//             </div>
//           </div>
//         </div>

//         {/* Filter & Records List */}
//         <div className="mb-4">
//           <label className="text-sm font-bold text-gray-700 mb-2 block">Filter by Patient</label>
//           <select
//             className="w-full px-5 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none"
//             value={selectedPatient}
//             onChange={e => setSelectedPatient(e.target.value)}
//           >
//             <option value="">All Patients</option>
//             {patients.map(p => (
//               <option key={p._id} value={p._id}>{p.name}</option>
//             ))}
//           </select>
//         </div>

//         <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
//           {filteredRecords.map((r, idx) => (
//             <div
//               key={r._id}
//               className="relative group cursor-pointer"
//               onClick={() => { setSelectedRecord(r); setIsModalOpen(true); }}
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
//               <div className="relative bg-white border-2 border-gray-100 group-hover:border-purple-300 rounded-2xl p-5 transition-all duration-200 shadow-sm group-hover:shadow-lg">
//                 <div className="flex items-start gap-3 mb-3">
//                   <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center shrink-0">
//                     <span className="text-white font-black text-sm">{idx + 1}</span>
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-xs font-bold text-gray-500 uppercase mb-1">Patient ID</p>
//                     <p className="text-gray-800 font-bold">{r.patientId}</p>
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <p className="text-xs font-bold text-gray-500 uppercase mb-1">Diagnosis</p>
//                   <p className="text-gray-700 font-semibold">{r.diagnosis || 'N/A'}</p>
//                 </div>

//                 <div>
//                   <p className="text-xs font-bold text-gray-500 uppercase mb-2">Prescriptions</p>
//                   <div className="flex flex-wrap gap-2">
//                     {r.prescriptions && r.prescriptions.length > 0
//                       ? r.prescriptions.map((med, i) => (
//                           <span key={i} className="px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-700">{med}</span>
//                         ))
//                       : <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-400">N/A</span>
//                     }
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>

//       {/* Record Modal */}
//       {isModalOpen && selectedRecord && (
//         <RecordModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           record={selectedRecord}
//           patients={patients}
//           updateRecord={handleUpdateRecord}
//         />
//       )}
//     </div>
//   );
// };

// export default DoctorDashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, FileText, Stethoscope, Pill, ClipboardList, Calendar, Sparkles, Heart, Activity, LogOut, Mic } from 'lucide-react';
import RecordModal from '.././RecordModal';

const DoctorDashboard = () => {
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [showTranscription, setShowTranscription] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

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

  const handleUpdateRecord = async (id, updatedData) => {
    try {
      const payload = { ...updatedData };
      const res = await axios.put(`http://localhost:5000/records/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecords(records.map(r => (r._id === id ? res.data : r)));
      alert('Record updated successfully!');
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error updating record');
      throw err;
    }
  };

  const handleMicClick = async () => {
    if (isRecording) {
      setIsRecording(false);
      const mockTranscription = "Patient shows symptoms of mild fever and cough. Prescribed antibiotics and rest.";
      setTranscription(mockTranscription);
      setShowTranscription(true);
      setTimeout(() => setShowTranscription(false), 5000);
    } else {
      setIsRecording(true);
      setTranscription('');
    }
  };

  const filteredRecords = selectedPatient
    ? records.filter(r => r.patientId === selectedPatient)
    : records;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-slate-200 to-blue-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{user?.name || 'Doctor'}</p>
              <p className="text-xs text-gray-500">{user?.email || ''}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-slate-400 rounded-2xl blur-xl opacity-40 animate-pulse"></div>
              <div className="relative bg-white p-4 rounded-2xl shadow-xl">
                <Stethoscope className="w-10 h-10 text-blue-600" />
              </div>
            </div>
          </div>
          <h1 className="text-6xl font-black mb-3">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-700 bg-clip-text text-transparent">
              Doctor Dashboard
            </span>
          </h1>
          <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            Manage patient records with ease
            <Sparkles className="w-5 h-5 text-indigo-600" />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-white rounded-3xl p-6 shadow-xl transform group-hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3">
                <Heart className="w-8 h-8 text-blue-600" />
                <div className="px-3 py-1 bg-blue-50 rounded-full text-xs font-bold text-blue-700">TOTAL</div>
              </div>
              <p className="text-4xl font-black text-gray-800">{records.length}</p>
              <p className="text-gray-600 font-medium mt-1">Medical Records</p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-slate-400 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-white rounded-3xl p-6 shadow-xl transform group-hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3">
                <User className="w-8 h-8 text-indigo-600" />
                <div className="px-3 py-1 bg-indigo-50 rounded-full text-xs font-bold text-indigo-700">ACTIVE</div>
              </div>
              <p className="text-4xl font-black text-gray-800">{patients.length}</p>
              <p className="text-gray-600 font-medium mt-1">Patients</p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-gray-400 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-white rounded-3xl p-6 shadow-xl transform group-hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3">
                <Activity className="w-8 h-8 text-slate-600" />
                <div className="px-3 py-1 bg-slate-50 rounded-full text-xs font-bold text-slate-700">TODAY</div>
              </div>
              <p className="text-4xl font-black text-gray-800">0</p>
              <p className="text-gray-600 font-medium mt-1">Consultations</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-bold text-gray-700 mb-2 block">Filter by Patient</label>
          <select
            className="w-full px-5 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
            value={selectedPatient}
            onChange={e => setSelectedPatient(e.target.value)}
          >
            <option value="">All Patients</option>
            {patients.map(p => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {filteredRecords.map((r, idx) => (
            <div
              key={r._id}
              className="relative group cursor-pointer"
              onClick={() => { setSelectedRecord(r); setIsModalOpen(true); }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-indigo-200 to-slate-200 rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-white border-2 border-gray-100 group-hover:border-blue-300 rounded-2xl p-5 transition-all duration-200 shadow-sm group-hover:shadow-lg">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
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
                    {r.prescriptions && r.prescriptions.length > 0
                      ? r.prescriptions.map((med, i) => (
                          <span key={i} className="px-3 py-1 rounded-full text-xs bg-blue-50 text-blue-700 font-medium">{med}</span>
                        ))
                      : <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-400">N/A</span>
                    }
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Mic Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative group">
          {isRecording && (
            <>
              <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
              <div className="absolute inset-0 bg-red-400 rounded-full animate-pulse"></div>
            </>
          )}
          <button
            onClick={handleMicClick}
            className={`relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
              isRecording 
                ? 'bg-gradient-to-br from-red-500 to-red-600' 
                : 'bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
            }`}
            title={isRecording ? 'Stop Recording' : 'Click to Record'}
          >
            <Mic className={`w-7 h-7 text-white ${isRecording ? 'animate-pulse' : ''}`} />
          </button>
          
          <div className={`absolute bottom-full right-0 mb-3 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}>
            {isRecording ? 'Recording...' : 'Voice Input'}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        </div>
      </div>

      {/* Transcription Toast */}
      {showTranscription && (
        <div className="fixed bottom-28 right-8 z-40 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-sm border-2 border-blue-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
                <Mic className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Transcription</p>
                <p className="text-sm text-gray-700">{transcription}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && selectedRecord && (
        <RecordModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          record={selectedRecord}
          patients={patients}
          updateRecord={handleUpdateRecord}
        />
      )}
    </div>
  );
};

export default DoctorDashboard;