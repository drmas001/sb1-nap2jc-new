-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types
CREATE TYPE user_role AS ENUM ('doctor', 'nurse', 'administrator');
CREATE TYPE user_status AS ENUM ('active', 'inactive');
CREATE TYPE patient_gender AS ENUM ('male', 'female', 'other');
CREATE TYPE admission_status AS ENUM ('active', 'discharged', 'transferred');
CREATE TYPE appointment_type AS ENUM ('urgent', 'regular');
CREATE TYPE appointment_status AS ENUM ('pending', 'completed', 'cancelled');

-- Create updated_at function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    medical_code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    role user_role NOT NULL,
    department VARCHAR(100) NOT NULL,
    status user_status DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Patients table
CREATE TABLE patients (
    id BIGSERIAL PRIMARY KEY,
    mrn VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender patient_gender NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(100),
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Admissions table
CREATE TABLE admissions (
    id BIGSERIAL PRIMARY KEY,
    patient_id BIGINT REFERENCES patients(id),
    admitting_doctor_id BIGINT REFERENCES users(id),
    admission_date TIMESTAMP WITH TIME ZONE NOT NULL,
    discharge_date TIMESTAMP WITH TIME ZONE,
    department VARCHAR(100) NOT NULL,
    diagnosis TEXT NOT NULL,
    status admission_status DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Appointments table
CREATE TABLE appointments (
    id BIGSERIAL PRIMARY KEY,
    patient_name VARCHAR(100) NOT NULL,
    medical_number VARCHAR(20) NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    appointment_type appointment_type NOT NULL,
    notes TEXT,
    status appointment_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create updated_at triggers
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patients_updated_at
    BEFORE UPDATE ON patients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admissions_updated_at
    BEFORE UPDATE ON admissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
    BEFORE UPDATE ON appointments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create views
CREATE OR REPLACE VIEW active_admissions AS
    SELECT 
        a.id,
        a.patient_id,
        p.mrn,
        p.name,
        a.admission_date,
        a.department,
        u.name as doctor_name,
        a.diagnosis,
        a.status
    FROM admissions a
    JOIN patients p ON a.patient_id = p.id
    JOIN users u ON a.admitting_doctor_id = u.id
    WHERE a.status = 'active';

-- Create indexes
CREATE INDEX idx_users_medical_code ON users(medical_code);
CREATE INDEX idx_patients_mrn ON patients(mrn);
CREATE INDEX idx_admissions_patient_id ON admissions(patient_id);
CREATE INDEX idx_admissions_status ON admissions(status);
CREATE INDEX idx_appointments_created_at ON appointments(created_at);
CREATE INDEX idx_appointments_status ON appointments(status);