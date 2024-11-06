export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: number
          medical_code: string
          name: string
          role: 'doctor' | 'nurse' | 'administrator'
          department: string
          status: 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          medical_code: string
          name: string
          role: 'doctor' | 'nurse' | 'administrator'
          department: string
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          medical_code?: string
          name?: string
          role?: 'doctor' | 'nurse' | 'administrator'
          department?: string
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
      }
      // ... other existing tables
    }
  }
}