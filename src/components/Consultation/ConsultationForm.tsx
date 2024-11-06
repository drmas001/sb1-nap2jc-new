import React, { useState } from 'react';
import { User, MapPin, Stethoscope, Clock } from 'lucide-react';

interface ConsultationFormData {
  mrn: string;
  patientName: string;
  age: string;
  gender: 'male' | 'female' | 'other';
  requestingDepartment: string;
  patientLocation: string;
  consultationSpecialty: string;
  shiftType: 'morning' | 'evening' | 'night';
  urgency: 'routine' | 'urgent' | 'emergency';
  reason: string;
}

const ConsultationForm = () => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    mrn: '',
    patientName: '',
    age: '',
    gender: 'male',
    requestingDepartment: '',
    patientLocation: '',
    consultationSpecialty: '',
    shiftType: 'morning',
    urgency: 'routine',
    reason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Consultation form submitted:', formData);
    // Here we would typically make an API call to save the data
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* MRN */}
        <div>
          <label htmlFor="mrn" className="block text-sm font-medium text-gray-700 mb-1">
            MRN
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              c
            </span>
            <input
              type="text"
              id="mrn"
              name="mrn"
              value={formData.mrn}
              onChange={handleChange}
              className="w-full pl-7 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              placeholder="12345"
              required
            />
          </div>
        </div>

        {/* Patient Name */}
        <div>
          <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">
            Patient Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Age */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Requesting Department */}
        <div>
          <label htmlFor="requestingDepartment" className="block text-sm font-medium text-gray-700 mb-1">
            Requesting Department
          </label>
          <input
            type="text"
            id="requestingDepartment"
            name="requestingDepartment"
            value={formData.requestingDepartment}
            onChange={handleChange}
            placeholder="Enter department name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            required
          />
        </div>

        {/* Patient Location */}
        <div>
          <label htmlFor="patientLocation" className="block text-sm font-medium text-gray-700 mb-1">
            Patient Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="patientLocation"
              name="patientLocation"
              value={formData.patientLocation}
              onChange={handleChange}
              placeholder="Room 123, Bed 1"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Consultation Specialty */}
        <div>
          <label htmlFor="consultationSpecialty" className="block text-sm font-medium text-gray-700 mb-1">
            Consultation Specialty
          </label>
          <div className="relative">
            <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="consultationSpecialty"
              name="consultationSpecialty"
              value={formData.consultationSpecialty}
              onChange={handleChange}
              placeholder="Enter specialty name"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Shift Type */}
        <div>
          <label htmlFor="shiftType" className="block text-sm font-medium text-gray-700 mb-1">
            Shift Type
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              id="shiftType"
              name="shiftType"
              value={formData.shiftType}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              required
            >
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
              <option value="night">Night</option>
            </select>
          </div>
        </div>

        {/* Urgency */}
        <div>
          <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">
            Urgency Level
          </label>
          <select
            id="urgency"
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            required
          >
            <option value="routine">Routine</option>
            <option value="urgent">Urgent</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>
      </div>

      {/* Reason for Consultation */}
      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
          Reason for Consultation
        </label>
        <textarea
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          required
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        >
          Request Consultation
        </button>
      </div>
    </form>
  );
};

export default ConsultationForm;