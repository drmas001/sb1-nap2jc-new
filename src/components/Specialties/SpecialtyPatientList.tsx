import React from 'react';
import { User, Calendar, Stethoscope } from 'lucide-react';

// Mock data - replace with actual data from your store
const patients = [
  {
    id: 1,
    name: 'John Doe',
    mrn: '12345',
    type: 'inpatient',
    specialty: 'Internal Medicine',
    admissionDate: '2024-03-15',
    doctor: 'Dr. Sarah Johnson',
    status: 'active'
  },
  {
    id: 2,
    name: 'Jane Smith',
    mrn: 'c54321',
    type: 'consultation',
    specialty: 'Pulmonology',
    admissionDate: '2024-03-20',
    doctor: 'Dr. Michael Chen',
    status: 'pending'
  }
];

const SpecialtyPatientList = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Patient List</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <User className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{patient.name}</h3>
                  <p className="text-sm text-gray-600">MRN: {patient.mrn}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(patient.admissionDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Stethoscope className="h-4 w-4 mr-1" />
                      {patient.doctor}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  patient.type === 'inpatient'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {patient.type === 'inpatient' ? 'Inpatient' : 'Consultation'}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  patient.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {patient.status}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <button className="text-sm text-indigo-600 hover:text-indigo-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialtyPatientList;