import React from 'react';
import { Users } from 'lucide-react';
import { usePatientStore } from '../stores/usePatientStore';

interface SpecialtiesGridProps {
  onSpecialtyClick: (specialty: string) => void;
}

const specialties = [
  { name: 'Internal Medicine', color: 'blue' },
  { name: 'Pulmonology', color: 'green' },
  { name: 'Neurology', color: 'purple' },
  { name: 'Gastroenterology', color: 'yellow' },
  { name: 'Nephrology', color: 'pink' },
  { name: 'Endocrinology', color: 'indigo' },
  { name: 'Hematology', color: 'red' },
  { name: 'Infectious Disease', color: 'orange' },
  { name: 'Thrombosis Medicine', color: 'cyan' },
  { name: 'Immunology & Allergy', color: 'emerald' },
  { name: 'Safety Admission', color: 'violet' }
];

const SpecialtiesGrid: React.FC<SpecialtiesGridProps> = ({ onSpecialtyClick }) => {
  const { patients } = usePatientStore();

  const getPatientCountBySpecialty = (specialty: string) => {
    return patients.filter(patient => 
      patient.department === specialty && 
      patient.status === 'active'
    ).length;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {specialties.map((specialty) => {
        const patientCount = getPatientCountBySpecialty(specialty.name);
        
        return (
          <button
            key={specialty.name}
            onClick={() => onSpecialtyClick(specialty.name)}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow text-left w-full"
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-${specialty.color}-100 text-${specialty.color}-600 mb-4`}>
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {specialty.name}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Current Patients</span>
              <span className="text-2xl font-bold text-gray-900">
                {patientCount}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default SpecialtiesGrid;