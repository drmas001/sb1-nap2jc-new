import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Patient = Database['public']['Tables']['patients']['Row'] & {
  doctor_name?: string;
  department?: string;
  diagnosis?: string;
  admission_date?: string;
};

interface PatientStore {
  patients: Patient[];
  selectedPatient: Patient | null;
  loading: boolean;
  error: string | null;
  fetchPatients: () => Promise<void>;
  setSelectedPatient: (patient: Patient | null) => void;
  addPatient: (patient: Omit<Patient, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updatePatient: (id: number, updates: Partial<Patient>) => Promise<void>;
  deletePatient: (id: number) => Promise<void>;
}

export const usePatientStore = create<PatientStore>((set, get) => ({
  patients: [],
  selectedPatient: null,
  loading: false,
  error: null,

  setSelectedPatient: (patient) => {
    set({ selectedPatient: patient });
  },

  fetchPatients: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('patients')
        .select(`
          *,
          admissions (
            admission_date,
            department,
            diagnosis,
            users (
              name
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const patientsWithDetails = data?.map(patient => ({
        ...patient,
        doctor_name: patient.admissions?.[0]?.users?.name,
        department: patient.admissions?.[0]?.department,
        diagnosis: patient.admissions?.[0]?.diagnosis,
        admission_date: patient.admissions?.[0]?.admission_date,
      })) || [];

      set({ patients: patientsWithDetails, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addPatient: async (patient) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('patients')
        .insert([patient])
        .select()
        .single();

      if (error) throw error;
      set(state => ({
        patients: [data, ...state.patients],
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updatePatient: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('patients')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      set(state => ({
        patients: state.patients.map(p => p.id === id ? { ...p, ...data } : p),
        selectedPatient: state.selectedPatient?.id === id ? { ...state.selectedPatient, ...data } : state.selectedPatient,
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  deletePatient: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('patients')
        .delete()
        .eq('id', id);

      if (error) throw error;
      set(state => ({
        patients: state.patients.filter(p => p.id !== id),
        selectedPatient: state.selectedPatient?.id === id ? null : state.selectedPatient,
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  }
}));