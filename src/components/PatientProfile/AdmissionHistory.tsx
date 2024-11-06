import React from 'react';
import { Calendar } from 'lucide-react';

const admissions = [
  {
    id: 1,
    date: '2024-03-15',
    department: 'General Internal Medicine',
    doctor: 'Dr. Sarah Johnson',
    status: 'Discharged'
  },
  {
    id: 2,
    date: '2024-02-01',
    department: 'Respiratory Medicine',
    doctor: 'Dr. Michael Chen',
    status: 'Discharged'
  },
  {
    id: 3,
    date: '2024-03-20',
    department: 'General Internal Medicine',
    doctor: 'Dr. Sarah Johnson',
    status: 'Active'
  }
];

const AdmissionHistory = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Admission History</h2>
      
      <div className="space-y-4">
        {admissions.map((admission) => (
          <div
            key={admission.id}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50"
          >
            <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {new Date(admission.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">{admission.department}</p>
              <p className="text-sm text-gray-600">{admission.doctor}</p>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                admission.status === 'Active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {admission.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdmissionHistory;