// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { User, FileText, Stethoscope, Pill, ClipboardList, Calendar, Sparkles, Heart, Activity } from 'lucide-react';
// import RecordModal from './RecordModal';

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

//   const [selectedPatient, setSelectedPatient] = useState(''); // For filter
//   const [selectedRecord, setSelectedRecord] = useState(null); // For record detail modal
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const user = JSON.parse(localStorage.getItem('user'));
//   const token = localStorage.getItem('token');
//   const [isListening, setIsListening] = useState(false); // for recording status

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

//   // Start/Stop voice recognition
// const handleVoiceRecord = () => {
//   if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
//     alert('Your browser does not support Speech Recognition');
//     return;
//   }

//   const SpeechRecognition =
//     window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = new SpeechRecognition();

//   recognition.continuous = false; // stop after one phrase
//   recognition.interimResults = false;
//   recognition.lang = 'en-US';

//   recognition.onstart = () => {
//     setIsListening(true);
//   };

//   recognition.onresult = (event) => {
//     const transcript = event.results[0][0].transcript;
//     setFormData((prev) => ({
//       ...prev,
//       voiceTranscript: transcript,
//     }));
//   };

//   recognition.onerror = (event) => {
//     console.error('Speech recognition error:', event.error);
//     alert('Error in voice recognition: ' + event.error);
//   };

//   recognition.onend = () => {
//     setIsListening(false);
//   };

//   recognition.start();
// };


//   // Filter records based on selected patient
//   const filteredRecords = selectedPatient
//     ? records.filter(r => r.patientId === selectedPatient)
//     : records;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-6 relative overflow-hidden">
//       {/* Floating decorative elements */}
//       <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
//       <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
      
//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Header with animated gradient */}
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

//         {/* Stats Cards - Floating at top */}
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


//       </div>

//       {/* Record Detail Modal */}
//       {selectedRecord && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative">
//             <button
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold"
//               onClick={() => setSelectedRecord(null)}
//             >
//               X
//             </button>
//             <h2 className="text-2xl font-black mb-4">Record Details</h2>
//             <p><strong>Patient ID:</strong> {selectedRecord.patientId}</p>
//             <p><strong>Hospital ID:</strong> {selectedRecord.hospitalId}</p>
//             <p><strong>Notes:</strong> {selectedRecord.notes}</p>
//             <p><strong>Diagnosis:</strong> {selectedRecord.diagnosis}</p>
//             <p><strong>Prescriptions:</strong> {selectedRecord.prescriptions.join(', ') || 'N/A'}</p>
//             <p><strong>Voice Transcript:</strong> {selectedRecord.voiceTranscript || 'N/A'}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorDashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, FileText, Stethoscope, Pill, ClipboardList, Calendar, Sparkles, Heart, Activity } from 'lucide-react';
import RecordModal from '.././RecordModal';

const DoctorDashboard = () => {
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null); // record for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  // Fetch records and patients
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

  // Update record function to pass to modal
  const handleUpdateRecord = async (id, updatedData) => {
    try {
      const prescriptionsArray = updatedData.prescriptions
        ? updatedData.prescriptions.split(',').map(p => p.trim())
        : [];
      const payload = { ...updatedData, prescriptions: prescriptionsArray };

      const res = await axios.put(`http://localhost:5000/records/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setRecords(records.map(r => (r._id === id ? res.data : r)));
      alert('Record updated successfully!');
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error updating record');
    }
  };

  // Filter records
  const filteredRecords = selectedPatient
    ? records.filter(r => r.patientId === selectedPatient)
    : records;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-6 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
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

        {/* Stats Cards */}
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

        {/* Filter & Records List */}
        <div className="mb-4">
          <label className="text-sm font-bold text-gray-700 mb-2 block">Filter by Patient</label>
          <select
            className="w-full px-5 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none"
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
                    {r.prescriptions && r.prescriptions.length > 0
                      ? r.prescriptions.map((med, i) => (
                          <span key={i} className="px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-700">{med}</span>
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

      {/* Record Modal */}
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
