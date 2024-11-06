import React from 'react';
import DischargeForm from '../components/Discharge/DischargeForm';
import DischargeSummary from '../components/Discharge/DischargeSummary';

const PatientDischarge = () => {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Patient Discharge</h1>
        <p className="text-gray-600">Process patient discharge and create discharge summary</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DischargeForm />
        <DischargeSummary />
      </div>
    </div>
  );
};

export default PatientDischarge;