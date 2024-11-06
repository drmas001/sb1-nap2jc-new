import React from 'react';
import { FileText, AlertCircle } from 'lucide-react';
import ClinicAppointmentForm from '../components/Appointments/ClinicAppointmentForm';

const AppointmentBooking = () => {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Book Clinic Appointment</h1>
        <p className="text-gray-600">Schedule a consultation with our specialists</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <ClinicAppointmentForm />
          </div>
        </div>

        <div className="bg-indigo-50 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-indigo-600" />
            <div>
              <h3 className="text-sm font-medium text-indigo-900">Need Help?</h3>
              <p className="text-sm text-indigo-700 mt-1">
                Contact our support team if you need assistance with booking your appointment.
              </p>
              <button className="mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};