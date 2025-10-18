// import React, { useState, useEffect, useRef } from 'react';
// import { User, FileText, Stethoscope, Pill, ClipboardList, Sparkles } from 'lucide-react';

// const RecordModal = ({
//   isOpen,
//   onClose,
//   record,
//   patients,
//   updateRecord
// }) => {
//   const [formData, setFormData] = useState({
//     patientId: '',
//     hospitalId: '',
//     voiceTranscript: '',
//     notes: '',
//     diagnosis: '',
//     prescriptions: ''
//   });

//   const [isListening, setIsListening] = useState(false);
//   const recognitionRef = useRef(null);

//   // Pre-fill form with existing record details
//   useEffect(() => {
//     if (record) {
//       setFormData({
//         patientId: record.patientId,
//         hospitalId: record.hospitalId,
//         voiceTranscript: record.voiceTranscript || '',
//         notes: record.notes || '',
//         diagnosis: record.diagnosis || '',
//         prescriptions: record.prescriptions?.join(', ') || ''
//       });
//     }
//   }, [record]);

//   const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = e => {
//     e.preventDefault();
//     const prescriptionsArray = formData.prescriptions
//       ? formData.prescriptions.split(',').map(p => p.trim())
//       : [];
//     updateRecord(record._id, { ...formData, prescriptions: prescriptionsArray });
//     onClose();
//   };

//   // Voice Recognition
//   const handleVoiceRecord = () => {
//     if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
//       alert('Your browser does not support Speech Recognition');
//       return;
//     }

//     if (!recognitionRef.current) {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = false;
//       recognitionRef.current.interimResults = false;
//       recognitionRef.current.lang = 'en-US';

//       recognitionRef.current.onstart = () => setIsListening(true);

//       recognitionRef.current.onresult = event => {
//         const transcript = event.results[0][0].transcript;
//         setFormData(prev => ({ ...prev, voiceTranscript: transcript }));
//       };

//       recognitionRef.current.onerror = event => {
//         console.error('Speech recognition error:', event.error);
//         alert('Error in voice recognition: ' + event.error);
//       };

//       recognitionRef.current.onend = () => setIsListening(false);
//     }

//     recognitionRef.current.start();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[90vh] relative">
//         <button
//           className="absolute top-4 right-4 text-gray-500 font-bold text-xl"
//           onClick={onClose}
//         >
//           ×
//         </button>

//         <h2 className="text-2xl font-bold mb-4">Patient Record Details</h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Patient Selection */}
//           <div>
//             <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
//               <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center">
//                 <User className="w-4 h-4 text-white" />
//               </div>
//               Select Patient
//             </label>
//             <select
//               name="patientId"
//               value={formData.patientId}
//               onChange={handleChange}
//               disabled
//               className="w-full px-5 py-4 rounded-2xl border-3 border-pink-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none bg-white shadow-sm font-medium appearance-none"
//             >
//               {patients.map(p => (
//                 <option key={p._id} value={p._id}>
//                   {p.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Hospital ID */}
//           <div>
//             <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
//               <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-400 to-violet-400 flex items-center justify-center">
//                 <ClipboardList className="w-4 h-4 text-white" />
//               </div>
//               Hospital ID
//             </label>
//             <input
//               type="text"
//               name="hospitalId"
//               value={formData.hospitalId}
//               onChange={handleChange}
//               required
//               className="w-full px-5 py-4 rounded-2xl border-3 border-purple-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none bg-white shadow-sm font-medium"
//             />
//           </div>

//           {/* Voice Transcript */}
//           <div>
//             <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
//               <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
//                 <Sparkles className="w-4 h-4 text-white" />
//               </div>
//               Voice Transcript
//             </label>
//             <input
//               type="text"
//               name="voiceTranscript"
//               value={formData.voiceTranscript}
//               onChange={handleChange}
//               className="w-full px-5 py-4 rounded-2xl border-3 border-blue-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none bg-white shadow-sm font-medium"
//               placeholder="Voice transcript (optional)"
//             />
//             <button
//               type="button"
//               onClick={handleVoiceRecord}
//               className={`mt-2 px-4 py-2 rounded-xl font-bold text-white ${
//                 isListening ? 'bg-red-500 animate-pulse' : 'bg-blue-500 hover:bg-blue-600'
//               }`}
//             >
//               {isListening ? 'Listening...' : '🎤 Record Voice'}
//             </button>
//           </div>

//           {/* Notes */}
//           <div>
//             <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
//               <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
//                 <FileText className="w-4 h-4 text-white" />
//               </div>
//               Notes
//             </label>
//             <textarea
//               name="notes"
//               value={formData.notes}
//               onChange={handleChange}
//               rows="3"
//               className="w-full px-5 py-4 rounded-2xl border-3 border-pink-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none resize-none bg-white shadow-sm font-medium"
//             />
//           </div>

//           {/* Diagnosis */}
//           <div>
//             <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
//               <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center">
//                 <Stethoscope className="w-4 h-4 text-white" />
//               </div>
//               Diagnosis
//             </label>
//             <input
//               type="text"
//               name="diagnosis"
//               value={formData.diagnosis}
//               onChange={handleChange}
//               className="w-full px-5 py-4 rounded-2xl border-3 border-purple-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none bg-white shadow-sm font-medium"
//             />
//           </div>

//           {/* Prescriptions */}
//           <div>
//             <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
//               <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
//                 <Pill className="w-4 h-4 text-white" />
//               </div>
//               Prescriptions
//             </label>
//             <input
//               type="text"
//               name="prescriptions"
//               value={formData.prescriptions}
//               onChange={handleChange}
//               className="w-full px-5 py-4 rounded-2xl border-3 border-blue-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none bg-white shadow-sm font-medium"
//               placeholder="Comma separated (e.g., Aspirin, Ibuprofen)"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold rounded-2xl hover:scale-105 transition-transform"
//           >
//             ✨ Update Record
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RecordModal;
import React, { useState, useEffect, useRef } from 'react';
import { User, FileText, Stethoscope, Pill, ClipboardList, Sparkles } from 'lucide-react';

const RecordModal = ({
  isOpen,
  onClose,
  record,
  patients,
  updateRecord
}) => {
  const [formData, setFormData] = useState({
    patientId: '',
    hospitalId: '',
    voiceTranscript: '',
    notes: '',
    diagnosis: '',
    prescriptions: ''
  });

  const [isListening, setIsListening] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recognitionRef = useRef(null);

  // Pre-fill form with existing record details
  useEffect(() => {
    if (record) {
      setFormData({
        patientId: record.patientId,
        hospitalId: record.hospitalId,
        voiceTranscript: record.voiceTranscript || '',
        notes: record.notes || '',
        diagnosis: record.diagnosis || '',
        prescriptions: record.prescriptions?.join(', ') || ''
      });
    }
  }, [record]);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const prescriptionsArray = formData.prescriptions
        ? formData.prescriptions.split(',').map(p => p.trim())
        : [];
      
      await updateRecord(record._id, { ...formData, prescriptions: prescriptionsArray });
      // Only close if update succeeds (updateRecord should handle success/error)
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      // Don't close modal on error
    } finally {
      setIsSubmitting(false);
    }
  };

  // Voice Recognition
  const handleVoiceRecord = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Your browser does not support Speech Recognition');
      return;
    }

    if (!recognitionRef.current) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => setIsListening(true);

      recognitionRef.current.onresult = event => {
        const transcript = event.results[0][0].transcript;
        setFormData(prev => ({ ...prev, voiceTranscript: transcript }));
      };

      recognitionRef.current.onerror = event => {
        console.error('Speech recognition error:', event.error);
        alert('Error in voice recognition: ' + event.error);
      };

      recognitionRef.current.onend = () => setIsListening(false);
    }

    recognitionRef.current.start();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[90vh] relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-3xl leading-none"
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        <h2 className="text-3xl font-black mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Patient Record Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              disabled
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 bg-gray-50 outline-none font-medium text-gray-600 cursor-not-allowed"
            >
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
              className="w-full px-5 py-4 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none bg-white shadow-sm font-medium transition-all"
            />
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
              className="w-full px-5 py-4 rounded-2xl border-2 border-blue-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none bg-white shadow-sm font-medium transition-all"
              placeholder="Voice transcript (optional)"
            />
            <button
              type="button"
              onClick={handleVoiceRecord}
              className={`mt-3 px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-all transform hover:scale-105 ${
                isListening ? 'bg-red-500 animate-pulse' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isListening ? '🎤 Listening...' : '🎤 Record Voice'}
            </button>
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
              className="w-full px-5 py-4 rounded-2xl border-2 border-pink-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none resize-none bg-white shadow-sm font-medium transition-all"
              placeholder="Additional notes about the patient..."
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
              className="w-full px-5 py-4 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none bg-white shadow-sm font-medium transition-all"
              placeholder="Enter diagnosis..."
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
              className="w-full px-5 py-4 rounded-2xl border-2 border-blue-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none bg-white shadow-sm font-medium transition-all"
              placeholder="Comma separated (e.g., Aspirin, Ibuprofen)"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold rounded-2xl shadow-xl transition-all ${
              isSubmitting 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:scale-105 hover:shadow-2xl'
            }`}
          >
            {isSubmitting ? '⏳ Updating...' : '✨ Update Record'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecordModal;