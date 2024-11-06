import React, { useState } from 'react';
import { User, FileText, Hash } from 'lucide-react';
import { useAppointmentStore } from '../../stores/useAppointmentStore';

interface FormData {
  patientName: string;
  medicalNumber: string;
  specialty: string;
  appointmentType: 'urgent' | 'regular';
  notes: string;
}

const ClinicAppointmentForm = () => {
  const { addAppointment } = useAppointmentStore();
  const [formData, setFormData] = useState<FormData>({
    patientName: '',
    medicalNumber: '',
    specialty: '',
    appointmentType: 'regular',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addAppointment(formData);
      setFormData({
        patientName: '',
        medicalNumber: '',
        specialty: '',
        appointmentType: 'regular',
        notes: ''
      });
      alert('Appointment booked successfully!');
    } catch (error) {
      alert('Error booking appointment. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      {/* Medical Number */}
      <div>
        <label htmlFor="medicalNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Medical Number
        </label>
        <div className="relative">
          <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            id="medicalNumber"
            name="medicalNumber"
            value={formData.medicalNumber}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            required
          />
        </div>
      </div>

      {/* Clinic Specialty */}
      <div>
        <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
          Clinic Specialty
        </label>
        <select
          id="specialty"
          name="specialty"
          value={formData.specialty}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          required
        >
          <option value="">Select Specialty</option>
          <option value="Internal Medicine">Internal Medicine</option>
          <option value="Pulmonology">Pulmonology</option>
          <option value="Neurology">Neurology</option>
          <option value="Gastroenterology">Gastroenterology</option>
          <option value="Nephrology">Nephrology</option>
          <option value="Endocrinology">Endocrinology</option>
          <option value="Hematology">Hematology</option>
          <option value="Infectious Disease">Infectious Disease</option>
          <option value="Thrombosis Medicine">Thrombosis Medicine</option>
          <option value="Immunology & Allergy">Immunology & Allergy</option>
        </select>
      </div>

      {/* Appointment Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Appointment Type
        </label>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="appointmentType"
              value="urgent"
              checked={formData.appointmentType === 'urgent'}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <span className="ml-2 text-gray-700">Urgent</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="appointmentType"
              value="regular"
              checked={formData.appointmentType === 'regular'}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <span className="ml-2 text-gray-700">Regular</span>
          </label>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          />
        </div>
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
          Book Appointment
        </button>
      </div>
    </form>
  );
};

export default ClinicAppointmentForm;