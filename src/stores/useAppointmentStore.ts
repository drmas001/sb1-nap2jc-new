import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Appointment {
  id: number;
  patientName: string;
  medicalNumber: string;
  specialty: string;
  appointmentType: 'urgent' | 'regular';
  notes: string;
  createdAt: string;
  status: 'pending' | 'completed' | 'cancelled';
}

interface AppointmentStore {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  fetchAppointments: () => Promise<void>;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateAppointment: (id: number, updates: Partial<Appointment>) => Promise<void>;
  removeExpiredAppointments: () => Promise<void>;
}

export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
  appointments: [],
  loading: false,
  error: null,

  fetchAppointments: async () => {
    set({ loading: true, error: null });
    try {
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .gt('created_at', twentyFourHoursAgo.toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ appointments: data || [], loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addAppointment: async (appointment) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([{
          ...appointment,
          status: 'pending',
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      set(state => ({
        appointments: [data, ...state.appointments],
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateAppointment: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      set(state => ({
        appointments: state.appointments.map(a => a.id === id ? data : a),
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  removeExpiredAppointments: async () => {
    try {
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

      const { error } = await supabase
        .from('appointments')
        .delete()
        .lt('created_at', twentyFourHoursAgo.toISOString());

      if (error) throw error;
      await get().fetchAppointments();
    } catch (error) {
      console.error('Error removing expired appointments:', error);
    }
  }
}));