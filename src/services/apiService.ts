import { Customer, CustomerFormData, Transaction, TransactionFormData, ReminderData, ApartmentRecord } from "@/types";
import { mockCustomers, mockTransactions } from "./mockData";
import axios from 'axios';

// This service will eventually be replaced with Supabase calls
// For now, we'll use localStorage to persist some changes

const STORAGE_KEY_CUSTOMERS = "credit_line_customers";
const STORAGE_KEY_TRANSACTIONS = "credit_line_transactions";
const STORAGE_KEY_APARTMENT_RECORDS = "credit_line_apartment_records";

// Initialize localStorage with mock data if empty
const initializeStorage = () => {
  // Only initialize if empty
  if (!localStorage.getItem(STORAGE_KEY_CUSTOMERS)) {
    localStorage.setItem(STORAGE_KEY_CUSTOMERS, JSON.stringify(mockCustomers));
  }
  
  if (!localStorage.getItem(STORAGE_KEY_TRANSACTIONS)) {
    localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(mockTransactions));
  }
  
  if (!localStorage.getItem(STORAGE_KEY_APARTMENT_RECORDS)) {
    localStorage.setItem(STORAGE_KEY_APARTMENT_RECORDS, JSON.stringify([]));
  }
};

// Call initialization
initializeStorage();

// Get all customers
export const getCustomers = async (): Promise<Customer[]> => {
  const customersData = localStorage.getItem(STORAGE_KEY_CUSTOMERS);
  return customersData ? JSON.parse(customersData) : [];
};

// Get a customer by ID
export const getCustomerById = async (id: string): Promise<Customer | null> => {
  const customers = await getCustomers();
  return customers.find(customer => customer.id === id) || null;
};

// Add a new customer
export const addCustomer = async (customerData: CustomerFormData): Promise<Customer> => {
  const customers = await getCustomers();
  
  const newCustomer: Customer = {
    ...customerData,
    id: Date.now().toString(), // Simple ID generation
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  const updatedCustomers = [...customers, newCustomer];
  localStorage.setItem(STORAGE_KEY_CUSTOMERS, JSON.stringify(updatedCustomers));
  
  return newCustomer;
};

// Update an existing customer
export const updateCustomer = async (id: string, customerData: CustomerFormData): Promise<Customer | null> => {
  const customers = await getCustomers();
  const customerIndex = customers.findIndex(customer => customer.id === id);
  
  if (customerIndex === -1) return null;
  
  const updatedCustomer: Customer = {
    ...customers[customerIndex],
    ...customerData,
    updated_at: new Date().toISOString(),
  };
  
  customers[customerIndex] = updatedCustomer;
  localStorage.setItem(STORAGE_KEY_CUSTOMERS, JSON.stringify(customers));
  
  return updatedCustomer;
};

// Delete a customer
export const deleteCustomer = async (id: string): Promise<boolean> => {
  const customers = await getCustomers();
  const filteredCustomers = customers.filter(customer => customer.id !== id);
  
  if (filteredCustomers.length === customers.length) return false;
  
  localStorage.setItem(STORAGE_KEY_CUSTOMERS, JSON.stringify(filteredCustomers));
  
  // Also remove all associated transactions
  const transactions = await getTransactionsByCustomerId(id);
  if (transactions.length > 0) {
    const allTransactions = await getAllTransactions();
    const filteredTransactions = allTransactions.filter(
      transaction => transaction.customer_id !== id
    );
    localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(filteredTransactions));
  }
  
  return true;
};

// Get all transactions
export const getAllTransactions = async (): Promise<Transaction[]> => {
  const transactionsData = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
  return transactionsData ? JSON.parse(transactionsData) : [];
};

// Get transactions for a specific customer
export const getTransactionsByCustomerId = async (customerId: string): Promise<Transaction[]> => {
  const transactions = await getAllTransactions();
  return transactions
    .filter(transaction => transaction.customer_id === customerId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
};

// Add a new transaction
export const addTransaction = async (transactionData: TransactionFormData): Promise<Transaction> => {
  const transactions = await getAllTransactions();
  const customer = await getCustomerById(transactionData.customer_id);
  
  if (!customer) {
    throw new Error("Customer not found");
  }
  
  const newTransaction: Transaction = {
    ...transactionData,
    id: `t${Date.now()}`, // Simple ID generation
    created_at: new Date().toISOString(),
  };
  
  const updatedTransactions = [...transactions, newTransaction];
  localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(updatedTransactions));
  
  // Update customer's amount due
  const amountChange = transactionData.type === 'purchase' 
    ? transactionData.amount 
    : -transactionData.amount;
    
  const updatedAmount = customer.amount_due + amountChange;
  
  await updateCustomer(customer.id, {
    ...customer,
    amount_due: updatedAmount
  });
  
  return newTransaction;
};

// Send a WhatsApp reminder (mock implementation for now)
export const sendReminder = async (reminderData: ReminderData): Promise<boolean> => {
  // This would be a call to a Supabase Edge Function in the real app
  console.log('Sending reminder to:', reminderData);
  
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real implementation, this would return the response from the Edge Function
  return true;
};

// Get all apartment records
export const getApartmentRecords = async (): Promise<ApartmentRecord[]> => {
  const recordsData = localStorage.getItem(STORAGE_KEY_APARTMENT_RECORDS);
  return recordsData ? JSON.parse(recordsData) : [];
};

// Add a new apartment record
export const addApartmentRecord = async (apartment: string, amount: string): Promise<ApartmentRecord> => {
  const records = await getApartmentRecords();
  
  const newRecord: ApartmentRecord = {
    id: `apt_${Date.now()}`, // Simple ID generation
    apartment,
    amount: parseFloat(amount) || 0,
    created_at: new Date().toISOString(),
    status: 'pending'
  };
  
  const updatedRecords = [...records, newRecord];
  localStorage.setItem(STORAGE_KEY_APARTMENT_RECORDS, JSON.stringify(updatedRecords));
  
  return newRecord;
};

// Update an apartment record
export const updateApartmentRecord = async ({ id, data }: { id: string; data: Partial<ApartmentRecord> }): Promise<ApartmentRecord> => {
  const records = await getApartmentRecords();
  const recordIndex = records.findIndex(record => record.id === id);
  
  if (recordIndex === -1) {
    throw new Error('Record not found');
  }
  
  const updatedRecord = {
    ...records[recordIndex],
    ...data,
  };
  
  records[recordIndex] = updatedRecord;
  localStorage.setItem(STORAGE_KEY_APARTMENT_RECORDS, JSON.stringify(records));
  
  return updatedRecord;
};

// Delete an apartment record
export const deleteApartmentRecord = async (id: string): Promise<boolean> => {
  const records = await getApartmentRecords();
  const filteredRecords = records.filter(record => record.id !== id);
  
  if (filteredRecords.length === records.length) return false;
  
  localStorage.setItem(STORAGE_KEY_APARTMENT_RECORDS, JSON.stringify(filteredRecords));
  
  return true;
};

// Get total amount from all apartment records
export const getApartmentRecordsTotal = async (): Promise<number> => {
  const records = await getApartmentRecords();
  return records.reduce((sum, record) => sum + record.amount, 0);
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface Record {
  id: string;
  tower: string;
  floor: string;
  unit: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
}

export const getRecords = async (): Promise<Record[]> => {
  const response = await axios.get(`${API_URL}/records`);
  return response.data;
};

export const updateRecord = async ({ id, data }: { id: string; data: Partial<Record> }): Promise<Record> => {
  const response = await axios.patch(`${API_URL}/records/${id}`, data);
  return response.data;
};
