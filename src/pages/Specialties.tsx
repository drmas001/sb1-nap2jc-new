import React, { useEffect } from 'react';
import { usePatientStore } from '../stores/usePatientStore';
import { User, Calendar, Stethoscope } from 'lucide-react';
import SpecialtyFilter from '../components/Specialties/SpecialtyFilter';

const specialties = [
  'Internal Medicine',
  'Pulmonology',
  'Neurology',
  'Gastroenterology',
  'Nephrology',
  'Endocrinology',
  'Hematology',
  'Infectious Disease',
  'Thrombosis Medicine',
  'Immunology & Allergy',
  'Safety Admission'
];

const Specialties = () => {
  const { patients, loading, error, fetchPatients } = usePatientStore();

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const getPatientsBySpecialty = (specialty: string) => {
    return patients.filter(patient => patient.department === specialty);
  };

  if (loading) {
    return (
      <div className="flex-1 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          Error loading patients: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Specialties</h1>
        <p className="text-gray-600">View patients by specialty</p>
      </div>

      <SpecialtyFilter />
      
      <div className="mt-6 space-y-6">
        {specialties.map(specialty => {
          const specialtyPatients = getPatientsBySpecialty(specialty);
          
          if (specialtyPatients.length === 0) return null;

          return (
            <div key={specialty} className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">{specialty}</h2>
                <p className="text-sm text-gray-600">{specialtyPatients.length} patients</p>
              </div>

              <div className="divide-y divide-gray-200">
                {specialtyPatients.map((patient) => (
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
                              {new Date(patient.admission_date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Stethoscope className="h-4 w-4 mr-1" />
                              {patient.doctor_name}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
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
                      <button 
                        onClick={() => {/* Handle view details */}}
                        className="text-sm text-indigo-600 hover:text-indigo-700"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Specialties;