export interface Customer {
  id: string;
  name: string;
  apartment_number: string;
  phone_number: string;
  amount_due: number;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  customer_id: string;
  amount: number;
  type: 'purchase' | 'payment';
  notes?: string;
  created_at: string;
}

// Utility type for parsed apartment details
export interface ApartmentDetails {
  tower: string;
  floor: string;
  unit: string;
}

// Type for creating/updating customers
export type CustomerFormData = Omit<Customer, 'id' | 'created_at' | 'updated_at'>;

// Type for recording transactions
export interface TransactionFormData {
  customer_id: string;
  amount: number;
  type: 'purchase' | 'payment';
  notes?: string;
}

// Type for sending WhatsApp reminders
export interface ReminderData {
  customer_id: string;
  name: string;
  phone_number: string;
  amount_due: number;
  apartment_number: string;
}

// New type for apartment records
export interface ApartmentRecord {
  id: string;
  apartment: string;
  amount: number;
  created_at: string;
  status: 'pending' | 'paid';
}
