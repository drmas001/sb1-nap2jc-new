import React from 'react';
import { 
  Home, 
  UserPlus, 
  Users, 
  Stethoscope, 
  ClipboardList, 
  LogOut,
  Settings,
  UserMinus,
  Layout,
  UserCog,
  Calendar
} from 'lucide-react';

type Page = 'dashboard' | 'admission' | 'patient' | 'consultation' | 'reports' | 'settings' | 'discharge' | 'specialties' | 'employees' | 'appointments';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  userRole?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, onLogout, userRole }) => {
  const isAdmin = userRole === 'administrator';

  const menuItems = [
    { icon: Home, label: 'Dashboard', id: 'dashboard' },
    { icon: Layout, label: 'Specialties', id: 'specialties' },
    { icon: Calendar, label: 'Appointments', id: 'appointments' },
    { icon: UserPlus, label: 'New Admission', id: 'admission' },
    { icon: Users, label: 'Patient Profile', id: 'patient' },
    { icon: Stethoscope, label: 'Consultations', id: 'consultation' },
    { icon: ClipboardList, label: 'Reports', id: 'reports' },
    { icon: UserMinus, label: 'Discharge', id: 'discharge' },
    ...(isAdmin ? [{ icon: UserCog, label: 'Employee Management', id: 'employees' }] : [])
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <Stethoscope className="h-8 w-8 text-indigo-600" />
          <span className="text-xl font-bold text-gray-900">IMD-Care</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as Page)}
            className={`flex items-center space-x-3 w-full px-4 py-3 text-sm rounded-lg transition-colors ${
              currentPage === item.id
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className={`h-5 w-5 ${
              currentPage === item.id ? 'text-indigo-600' : 'text-gray-400'
            }`} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={onLogout}
          className="flex items-center space-x-3 text-sm text-gray-600 hover:text-gray-900 transition-colors w-full px-4 py-3 rounded-lg hover:bg-gray-50"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;