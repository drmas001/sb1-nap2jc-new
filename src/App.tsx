import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import SpecialtiesGrid from './components/SpecialtiesGrid';
import NewAdmission from './pages/NewAdmission';
import PatientProfile from './pages/PatientProfile';
import ConsultationRegistration from './pages/ConsultationRegistration';
import DailyReports from './pages/DailyReports';
import Administration from './pages/Administration';
import PatientDischarge from './pages/PatientDischarge';
import Specialties from './pages/Specialties';
import AppointmentBooking from './pages/AppointmentBooking';
import LandingPage from './pages/LandingPage';
import EmployeeManagement from './components/Administration/EmployeeManagement';
import { useSupabase } from './hooks/useSupabase';
import { useUserStore } from './stores/useUserStore';

type Page = 'dashboard' | 'admission' | 'patient' | 'consultation' | 'reports' | 'settings' | 'discharge' | 'specialties' | 'employees' | 'appointments';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [notifications, setNotifications] = useState(2);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isLoading, error } = useSupabase();
  const { selectedUser } = useUserStore();

  useEffect(() => {
    if (selectedUser?.role === 'administrator') {
      setCurrentPage('employees');
    }
  }, [selectedUser]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleNotificationClick = () => {
    setNotifications(0);
  };

  const handleUserMenuClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error loading application</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LandingPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <main className="flex-1 p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Overview of all departments and patients</p>
            </div>
            <SpecialtiesGrid onSpecialtyClick={(specialty) => {
              setCurrentPage('specialties');
            }} />
          </main>
        );
      case 'admission':
        return <NewAdmission onCancel={() => setCurrentPage('dashboard')} />;
      case 'patient':
        return <PatientProfile onBack={() => setCurrentPage('dashboard')} />;
      case 'consultation':
        return <ConsultationRegistration onCancel={() => setCurrentPage('dashboard')} />;
      case 'reports':
        return <DailyReports />;
      case 'settings':
        return <Administration />;
      case 'discharge':
        return <PatientDischarge onCancel={() => setCurrentPage('dashboard')} />;
      case 'specialties':
        return <Specialties />;
      case 'appointments':
        return <AppointmentBooking />;
      case 'employees':
        return selectedUser?.role === 'administrator' ? <EmployeeManagement /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={handlePageChange}
        onLogout={handleLogout}
        userRole={selectedUser?.role}
      />
      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          notifications={notifications}
          onNotificationClick={handleNotificationClick}
          isUserMenuOpen={isUserMenuOpen}
          onUserMenuClick={handleUserMenuClick}
          onLogout={handleLogout}
        />
        {renderPage()}
      </div>
    </div>
  );
}

export default App;