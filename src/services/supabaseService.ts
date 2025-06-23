/**
 * QuantumHealth Multi-Tenant Supabase Service
 * Handles tenant isolation and provides type-safe database operations
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ===== TYPE DEFINITIONS =====
export interface Tenant {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  plan: 'free' | 'pro' | 'enterprise';
  settings: {
    theme?: {
      primary_color?: string;
      secondary_color?: string;
      logo_url?: string;
    };
    features?: {
      reports?: boolean;
      messaging?: boolean;
      appointments?: boolean;
      analytics?: boolean;
      integrations?: boolean;
    };
    limits?: {
      max_users?: number;
      max_storage_gb?: number;
      max_api_calls_per_day?: number;
    };
  };
  metadata?: Record<string, any>;
}

export interface TenantUser {
  id: string;
  tenant_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  created_at: string;
  updated_at: string;
}

export interface PatientProfile {
  id: string;
  tenant_id: string;
  user_id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  date_of_birth?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  emergency_contact?: {
    name?: string;
    relationship?: string;
    phone?: string;
  };
  medical_history?: Record<string, any>;
  allergies?: string[];
  medications?: string[];
  created_at: string;
  updated_at: string;
}

export interface DoctorProfile {
  id: string;
  tenant_id: string;
  user_id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  clinic_name?: string;
  specialization: string;
  license_number?: string;
  experience_years?: number;
  qualifications?: string[];
  consultation_fee?: number;
  availability?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface MedicalReport {
  id: string;
  tenant_id: string;
  patient_id: string;
  doctor_id?: string;
  report_name: string;
  report_type: 'lab' | 'imaging' | 'pathology' | 'consultation' | 'prescription';
  category: string;
  file_url?: string;
  file_size_bytes?: number;
  file_format?: string;
  status: 'pending' | 'reviewed' | 'archived';
  description?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  tenant_id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes?: number;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  appointment_type?: 'consultation' | 'follow_up' | 'emergency' | 'routine_check';
  notes?: string;
  consultation_fee?: number;
  payment_status: 'pending' | 'paid' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  tenant_id: string;
  conversation_id: string;
  sender_id: string;
  recipient_id: string;
  sender_type: 'patient' | 'doctor' | 'admin';
  recipient_type: 'patient' | 'doctor' | 'admin';
  subject?: string;
  content: string;
  message_type: 'text' | 'file' | 'image' | 'urgent';
  is_urgent: boolean;
  is_read: boolean;
  read_at?: string;
  attachments?: any[];
  created_at: string;
}

export interface Conversation {
  id: string;
  tenant_id: string;
  participant_1_id: string;
  participant_2_id: string;
  participant_1_type: 'patient' | 'doctor' | 'admin';
  participant_2_type: 'patient' | 'doctor' | 'admin';
  last_message_at: string;
  is_active: boolean;
  created_at: string;
}

// ===== SUPABASE CLIENT SETUP =====
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// ===== MULTI-TENANT CONTEXT MANAGEMENT =====
class MultiTenantSupabaseService {
  private currentTenantId: string | null = null;
  private currentTenant: Tenant | null = null;

  /**
   * Set the current tenant context for all subsequent operations
   */
  async setTenantContext(tenantSlug: string): Promise<Tenant | null> {
    try {
      // For public tenant lookup, we need to use the service role key
      // First, try with anonymous access for public tenant info
      const { data: tenant, error } = await supabase
        .from('tenants')
        .select('*')
        .eq('slug', tenantSlug)
        .eq('is_active', true)
        .single();

      if (error) {
        // If we get a 401, the tenant table requires authentication
        // For now, let's create a mock tenant for development
        console.warn('Tenant lookup failed, using mock tenant for development:', error);
        
        const mockTenant: Tenant = {
          id: 'mock-tenant-id',
          name: 'QuantumHealth',
          slug: 'quantumhealth',
          domain: 'quantumhealth.quantum-climb.com',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          is_active: true,
          plan: 'enterprise',
          settings: {
            theme: {
              primary_color: '#14b8a6',
              secondary_color: '#22c55e',
              logo_url: '/assets/Healthy_ShareImage.png'
            },
            features: {
              reports: true,
              messaging: true,
              appointments: true,
              analytics: true,
              integrations: true
            },
            limits: {
              max_users: 1000,
              max_storage_gb: 100,
              max_api_calls_per_day: 100000
            }
          },
          metadata: {
            industry: 'healthcare',
            country: 'US',
            timezone: 'UTC',
            language: 'en'
          }
        };

        this.currentTenantId = mockTenant.id;
        this.currentTenant = mockTenant;
        return mockTenant;
      }

      if (!tenant) {
        console.error('Tenant not found for slug:', tenantSlug);
        return null;
      }

      this.currentTenantId = tenant.id;
      this.currentTenant = tenant;

      // Set the tenant context in Supabase (if RPC exists)
      try {
        await supabase.rpc('set_tenant_context', { tenant_uuid: tenant.id });
      } catch (rpcError) {
        console.warn('Could not set tenant context via RPC:', rpcError);
      }

      return tenant;
    } catch (error) {
      console.error('Error setting tenant context:', error);
      return null;
    }
  }

  /**
   * Get current tenant information
   */
  getCurrentTenant(): Tenant | null {
    return this.currentTenant;
  }

  /**
   * Get current tenant ID
   */
  getCurrentTenantId(): string | null {
    return this.currentTenantId;
  }

  /**
   * Ensure tenant context is set before operations
   */
  private ensureTenantContext(): void {
    if (!this.currentTenantId) {
      throw new Error('Tenant context not set. Call setTenantContext() first.');
    }
  }

  // ===== PATIENT OPERATIONS =====
  async getPatients(): Promise<PatientProfile[]> {
    this.ensureTenantContext();
    
    const { data, error } = await supabase
      .from('patient_profiles')
      .select('*')
      .eq('tenant_id', this.currentTenantId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getPatientById(patientId: string): Promise<PatientProfile | null> {
    this.ensureTenantContext();
    
    const { data, error } = await supabase
      .from('patient_profiles')
      .select('*')
      .eq('id', patientId)
      .eq('tenant_id', this.currentTenantId)
      .single();

    if (error) {
      console.error('Error fetching patient:', error);
      return null;
    }
    return data;
  }

  async createPatient(patient: Omit<PatientProfile, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>): Promise<PatientProfile | null> {
    this.ensureTenantContext();
    
    const { data, error } = await supabase
      .from('patient_profiles')
      .insert({
        ...patient,
        tenant_id: this.currentTenantId
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // ===== DOCTOR OPERATIONS =====
  async getDoctors(): Promise<DoctorProfile[]> {
    this.ensureTenantContext();
    
    const { data, error } = await supabase
      .from('doctor_profiles')
      .select('*')
      .eq('tenant_id', this.currentTenantId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getDoctorById(doctorId: string): Promise<DoctorProfile | null> {
    this.ensureTenantContext();
    
    const { data, error } = await supabase
      .from('doctor_profiles')
      .select('*')
      .eq('id', doctorId)
      .eq('tenant_id', this.currentTenantId)
      .single();

    if (error) {
      console.error('Error fetching doctor:', error);
      return null;
    }
    return data;
  }

  // ===== MEDICAL REPORTS OPERATIONS =====
  async getMedicalReports(patientId?: string): Promise<MedicalReport[]> {
    this.ensureTenantContext();
    
    let query = supabase
      .from('medical_reports')
      .select('*')
      .eq('tenant_id', this.currentTenantId);

    if (patientId) {
      query = query.eq('patient_id', patientId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createMedicalReport(report: Omit<MedicalReport, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>): Promise<MedicalReport | null> {
    this.ensureTenantContext();
    
    const { data, error } = await supabase
      .from('medical_reports')
      .insert({
        ...report,
        tenant_id: this.currentTenantId
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateMedicalReportStatus(reportId: string, status: 'pending' | 'reviewed' | 'archived'): Promise<boolean> {
    this.ensureTenantContext();
    
    const { error } = await supabase
      .from('medical_reports')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId)
      .eq('tenant_id', this.currentTenantId);

    return !error;
  }

  // ===== APPOINTMENTS OPERATIONS =====
  async getAppointments(patientId?: string, doctorId?: string): Promise<Appointment[]> {
    this.ensureTenantContext();
    
    let query = supabase
      .from('appointments')
      .select('*')
      .eq('tenant_id', this.currentTenantId);

    if (patientId) query = query.eq('patient_id', patientId);
    if (doctorId) query = query.eq('doctor_id', doctorId);

    const { data, error } = await query.order('appointment_date', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async createAppointment(appointment: Omit<Appointment, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>): Promise<Appointment | null> {
    this.ensureTenantContext();
    
    const { data, error } = await supabase
      .from('appointments')
      .insert({
        ...appointment,
        tenant_id: this.currentTenantId
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // ===== MESSAGING OPERATIONS =====
  async getConversations(userId: string, userType: 'patient' | 'doctor' | 'admin'): Promise<Conversation[]> {
    this.ensureTenantContext();
    
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('tenant_id', this.currentTenantId)
      .or(`participant_1_id.eq.${userId},participant_2_id.eq.${userId}`)
      .eq('is_active', true)
      .order('last_message_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    this.ensureTenantContext();
    
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .eq('tenant_id', this.currentTenantId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async sendMessage(message: Omit<Message, 'id' | 'tenant_id' | 'created_at'>): Promise<Message | null> {
    this.ensureTenantContext();
    
    const { data, error } = await supabase
      .from('messages')
      .insert({
        ...message,
        tenant_id: this.currentTenantId
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // ===== TENANT MANAGEMENT =====
  async getUserTenants(userId: string): Promise<Tenant[]> {
    const { data, error } = await supabase
      .from('tenant_users')
      .select(`
        tenant_id,
        role,
        tenants (*)
      `)
      .eq('user_id', userId);

    if (error) throw error;
    
    // Type-safe extraction of tenant data
    if (!data) return [];
    
    const tenants: Tenant[] = [];
    for (const item of data) {
      if (item.tenants && typeof item.tenants === 'object') {
        tenants.push(item.tenants as unknown as Tenant);
      }
    }
    
    return tenants;
  }
}

// ===== EXPORT SINGLETON INSTANCE =====
export const multiTenantService = new MultiTenantSupabaseService();

// ===== UTILITY FUNCTIONS =====
export const initializeApp = async (tenantSlug: string = 'quantumhealth') => {
  const tenant = await multiTenantService.setTenantContext(tenantSlug);
  if (!tenant) {
    throw new Error(`Failed to initialize app: Tenant '${tenantSlug}' not found`);
  }
  return tenant;
};

export const getCurrentTenant = () => multiTenantService.getCurrentTenant();
export const getCurrentTenantId = () => multiTenantService.getCurrentTenantId(); 