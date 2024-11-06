import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface ActivePatient {
  id: number;
  patient_id: number;
  mrn: string;
  name: string;
  admission_date: string;
  department: string;
  doctor_name: string;
  diagnosis: string;
  status: 'active' | 'discharged' | 'transferred';
}

interface DischargeStore {
  activePatients: ActivePatient[];
  loading: boolean;
  error: string | null;
  selectedPatient: ActivePatient | null;
  fetchActivePatients: () => Promise<void>;
  setSelectedPatient: (patient: ActivePatient | null) => void;
  processDischarge: (data: any) => Promise<void>;
}

export const useDischargeStore = create<DischargeStore>((set, get) => ({
  activePatients: [],
  loading: false,
  error: null,
  selectedPatient: null,

  fetchActivePatients: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('active_admissions')
        .select('*')
        .eq('status', 'active');

      if (error) throw error;
      set({ activePatients: data || [], loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  setSelectedPatient: (patient) => {
    set({ selectedPatient: patient });
  },

  processDischarge: async (data) => {
    set({ loading: true, error: null });
    try {
      const { error: updateError } = await supabase
        .from('admissions')
        .update({
          discharge_date: new Date().toISOString(),
          status: 'discharged',
          ...data
        })
        .eq('id', get().selectedPatient?.id);

      if (updateError) throw updateError;

      // Refresh the active patients list
      await get().fetchActivePatients();
      set({ selectedPatient: null, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  }
}));