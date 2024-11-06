import React, { useState } from 'react';
import ReportFilters from '../components/Reports/ReportFilters';
import ReportTable from '../components/Reports/ReportTable';

const DailyReports = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // Here you would typically fetch filtered data
    console.log('Applying filters:', newFilters);
  };

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Daily Reports</h1>
        <p className="text-gray-600">View and export daily patient reports</p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <ReportFilters onFilterChange={handleFilterChange} />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <ReportTable />
        </div>
      </div>
    </div>
  );
};

export default DailyReports;