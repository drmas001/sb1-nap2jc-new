import React, { useEffect, useState } from 'react';
import { Calendar, FileText, Search } from 'lucide-react';
import { useDischargeStore } from '../../stores/useDischargeStore';

interface DischargeFormData {
  dischargeDate: string;
  dischargeType: 'regular' | 'against-medical-advice' | 'transfer';
  followUpRequired: boolean;
  followUpDate?: string;
  medications: string;
  instructions: string;
}

const DischargeForm = () => {
  const {
    activePatients,
    loading,
    error,
    selectedPatient,
    fetchActivePatients,
    setSelectedPatient,
    processDischarge
  } = useDischargeStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState<DischargeFormData>({
    dischargeDate: new Date().toISOString().split('T')[0],
    dischargeType: 'regular',
    followUpRequired: false,
    medications: '',
    instructions: ''
  });

  useEffect(() => {
    fetchActivePatients();
  }, [fetchActivePatients]);

  const filteredPatients = activePatients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.mrn.includes(searchQuery)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;
    
    await processDischarge(formData);
    setFormData({
      dischargeDate: new Date().toISOString().split('T')[0],
      dischargeType: 'regular',
      followUpRequired: false,
      medications: '',
      instructions: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Patient Selection</h2>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by patient name or MRN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          />
        </div>

        <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
          {filteredPatients.map((patient) => (
            <button
              key={patient.id}
              onClick={() => setSelectedPatient(patient)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedPatient?.id === patient.id
                  ? 'bg-indigo-50 border-indigo-200'
                  : 'hover:bg-gray-50 border-gray-200'
              } border`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{patient.name}</p>
                  <p className="text-sm text-gray-600">MRN: {patient.mrn}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(patient.admission_date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{patient.department}</p>
            </button>
          ))}
        </div>
      </div>

      {selectedPatient && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Discharge Date */}
            <div>
              <label htmlFor="dischargeDate" className="block text-sm font-medium text-gray-700 mb-1">
                Discharge Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  id="dischargeDate"
                  name="dischargeDate"
                  value={formData.dischargeDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Discharge Type */}
            <div>
              <label htmlFor="dischargeType" className="block text-sm font-medium text-gray-700 mb-1">
                Discharge Type
              </label>
              <select
                id="dischargeType"
                name="dischargeType"
                value={formData.dischargeType}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                required
              >
                <option value="regular">Regular Discharge</option>
                <option value="against-medical-advice">Against Medical Advice</option>
                <option value="transfer">Transfer to Another Facility</option>
              </select>
            </div>

            {/* Follow Up */}
            <div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="followUpRequired"
                  name="followUpRequired"
                  checked={formData.followUpRequired}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="followUpRequired" className="ml-2 block text-sm text-gray-700">
                  Follow-up Required
                </label>
              </div>
              {formData.followUpRequired && (
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    id="followUpDate"
                    name="followUpDate"
                    value={formData.followUpDate}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Medications */}
          <div>
            <label htmlFor="medications" className="block text-sm font-medium text-gray-700 mb-1">
              Discharge Medications
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                id="medications"
                name="medications"
                value={formData.medications}
                onChange={handleChange}
                rows={4}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="List discharge medications and instructions..."
                required
              />
            </div>
          </div>

          {/* Instructions */}
          <div>
            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
              Discharge Instructions
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                rows={4}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Enter detailed discharge instructions..."
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setSelectedPatient(null)}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Process Discharge
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DischargeForm;