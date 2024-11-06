import React, { useRef } from 'react';
import { ArrowLeft, Share2, Printer, AlertCircle } from 'lucide-react';
import { usePatientStore } from '../../stores/usePatientStore';
import { useNavigate } from '../../hooks/useNavigate';

const PatientHeader = () => {
  const { selectedPatient, updatePatient } = usePatientStore();
  const { goBack } = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);

  if (!selectedPatient) {
    return (
      <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
        <div className="flex items-center space-x-2 text-red-700">
          <AlertCircle className="h-5 w-5" />
          <span>No patient selected</span>
        </div>
        <button
          onClick={goBack}
          className="text-red-700 hover:text-red-800"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `Patient: ${selectedPatient.name}`,
        text: `MRN: ${selectedPatient.mrn}\nDepartment: ${selectedPatient.department}`,
        url: window.location.href
      });
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
    }
  };

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Patient Profile - ${selectedPatient.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { margin-bottom: 20px; }
            .info-item { margin-bottom: 10px; }
            .label { font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${selectedPatient.name}</h1>
            <p>MRN: ${selectedPatient.mrn}</p>
          </div>
          <div class="info-item">
            <span class="label">Department:</span> ${selectedPatient.department}
          </div>
          <div class="info-item">
            <span class="label">Doctor:</span> ${selectedPatient.doctor_name}
          </div>
          <div class="info-item">
            <span class="label">Admission Date:</span> ${new Date(selectedPatient.admission_date).toLocaleDateString()}
          </div>
          <div class="info-item">
            <span class="label">Diagnosis:</span> ${selectedPatient.diagnosis}
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const handleUpdateStatus = async () => {
    try {
      const newStatus = selectedPatient.status === 'active' ? 'discharged' : 'active';
      await updatePatient(selectedPatient.id, { status: newStatus });
      alert(`Patient status updated to ${newStatus}`);
    } catch (error) {
      alert('Error updating patient status');
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-between" ref={printRef}>
      <div className="flex items-center space-x-4">
        <button 
          onClick={goBack}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h1>
          <p className="text-gray-600">MRN: {selectedPatient.mrn}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        {navigator.share && (
          <button
            onClick={handleShare}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Share patient information"
          >
            <Share2 className="h-5 w-5 text-gray-600" />
          </button>
        )}
        <button
          onClick={handlePrint}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Print patient information"
        >
          <Printer className="h-5 w-5 text-gray-600" />
        </button>
        <button
          onClick={handleUpdateStatus}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        >
          {selectedPatient.status === 'active' ? 'Discharge Patient' : 'Reactivate Patient'}
        </button>
      </div>
    </div>
  );
};

export default PatientHeader;