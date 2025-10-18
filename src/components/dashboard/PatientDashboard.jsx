// PatientDashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecords = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!token || !user) {
        navigate("/login");
        return;
      }

      try {
        const res = await API.get(`/records/patient/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecords(res.data.records || []);
      } catch (err) {
        console.error("Error fetching records:", err);
        alert(err.response?.data?.message || "Failed to fetch records");
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [navigate]);

  if (loading) return <p className="text-center mt-8">Loading records...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Patient Dashboard</h1>

      {records.length === 0 ? (
        <p className="text-center text-slate-600">No medical records found.</p>
      ) : (
        <div className="space-y-4 max-w-3xl mx-auto">
          {records.map((rec) => (
            <div
              key={rec._id}
              className="p-4 bg-white rounded-xl shadow-md border border-gray-200"
            >
              <p><strong>Doctor ID:</strong> {rec.doctorId}</p>
              <p><strong>Diagnosis:</strong> {rec.diagnosis}</p>
              <p><strong>Prescriptions:</strong> {rec.prescriptions.join(", ")}</p>
              <p><strong>Notes:</strong> {rec.notes}</p>
              {rec.voiceTranscript && <p><strong>Voice Transcript:</strong> {rec.voiceTranscript}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
