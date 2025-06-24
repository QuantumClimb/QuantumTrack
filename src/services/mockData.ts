
import { Customer, Transaction } from "@/types";
import { generateRandomApartmentNumber, generateRandomPhoneNumber } from "@/utils/helpers";

// Mock customer data
export const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    apartment_number: "36194",
    phone_number: "9876543210",
    amount_due: 7850,
    created_at: "2023-07-15T10:30:00Z",
    updated_at: "2024-04-01T14:45:00Z"
  },
  {
    id: "2",
    name: "Priya Singh",
    apartment_number: "42012",
    phone_number: "8765432109",
    amount_due: 3200,
    created_at: "2023-08-22T09:15:00Z",
    updated_at: "2024-04-02T11:20:00Z"
  },
  {
    id: "3",
    name: "Amit Sharma",
    apartment_number: "10056",
    phone_number: "7654321098",
    amount_due: 12500,
    created_at: "2023-05-10T16:45:00Z",
    updated_at: "2024-04-03T09:30:00Z"
  },
  {
    id: "4",
    name: "Neha Patel",
    apartment_number: "22187",
    phone_number: "9765432108",
    amount_due: 0,
    created_at: "2023-09-05T13:20:00Z",
    updated_at: "2024-04-01T17:15:00Z"
  },
  {
    id: "5",
    name: "Suresh Verma",
    apartment_number: "15043",
    phone_number: "8976543210",
    amount_due: 4750,
    created_at: "2023-10-18T11:40:00Z",
    updated_at: "2024-04-02T12:50:00Z"
  },
  {
    id: "6",
    name: "Kavita Gupta",
    apartment_number: "37082",
    phone_number: "7789654321",
    amount_due: 9200,
    created_at: "2023-11-30T08:50:00Z",
    updated_at: "2024-04-03T16:25:00Z"
  },
  {
    id: "7",
    name: "Vikram Malhotra",
    apartment_number: "28115",
    phone_number: "9988776655",
    amount_due: 1500,
    created_at: "2024-01-12T15:10:00Z",
    updated_at: "2024-04-01T10:35:00Z"
  },
  {
    id: "8",
    name: "Ananya Desai",
    apartment_number: "40029",
    phone_number: "8877665544",
    amount_due: 6300,
    created_at: "2024-02-25T12:30:00Z",
    updated_at: "2024-04-02T14:05:00Z"
  },
  {
    id: "9",
    name: "Ravi Kapoor",
    apartment_number: "18067",
    phone_number: "7766554433",
    amount_due: -2000,
    created_at: "2024-03-08T09:45:00Z",
    updated_at: "2024-04-03T11:55:00Z"
  },
  {
    id: "10",
    name: "Meena Joshi",
    apartment_number: "31124",
    phone_number: "9876123450",
    amount_due: 8400,
    created_at: "2024-03-20T14:15:00Z",
    updated_at: "2024-04-01T13:40:00Z"
  }
];

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: "t1",
    customer_id: "1",
    amount: 2500,
    type: "purchase",
    notes: "Building materials",
    created_at: "2024-03-15T10:30:00Z"
  },
  {
    id: "t2",
    customer_id: "1",
    amount: 1500,
    type: "payment",
    created_at: "2024-03-20T14:45:00Z"
  },
  {
    id: "t3",
    customer_id: "1",
    amount: 3500,
    type: "purchase",
    notes: "Bathroom fixtures",
    created_at: "2024-03-25T11:15:00Z"
  },
  {
    id: "t4",
    customer_id: "2",
    amount: 3200,
    type: "purchase",
    notes: "Paint supplies",
    created_at: "2024-03-22T09:15:00Z"
  },
  {
    id: "t5",
    customer_id: "3",
    amount: 8500,
    type: "purchase",
    notes: "Flooring materials",
    created_at: "2024-03-10T16:45:00Z"
  },
  {
    id: "t6",
    customer_id: "3",
    amount: 4000,
    type: "purchase",
    notes: "Electrical supplies",
    created_at: "2024-03-20T13:30:00Z"
  },
  {
    id: "t7",
    customer_id: "4",
    amount: 5500,
    type: "purchase",
    notes: "Plumbing supplies",
    created_at: "2024-03-05T13:20:00Z"
  },
  {
    id: "t8",
    customer_id: "4",
    amount: 5500,
    type: "payment",
    created_at: "2024-03-25T17:15:00Z"
  },
  {
    id: "t9",
    customer_id: "5",
    amount: 4750,
    type: "purchase",
    notes: "Hardware items",
    created_at: "2024-03-18T11:40:00Z"
  },
  {
    id: "t10",
    customer_id: "6",
    amount: 6200,
    type: "purchase",
    notes: "Cement and sand",
    created_at: "2024-03-10T08:50:00Z"
  },
  {
    id: "t11",
    customer_id: "6",
    amount: 3000,
    type: "purchase",
    notes: "Steel bars",
    created_at: "2024-03-25T16:25:00Z"
  },
  {
    id: "t12",
    customer_id: "7",
    amount: 1500,
    type: "purchase",
    notes: "Painting tools",
    created_at: "2024-03-12T15:10:00Z"
  },
  {
    id: "t13",
    customer_id: "8",
    amount: 6300,
    type: "purchase",
    notes: "Multiple items",
    created_at: "2024-03-15T12:30:00Z"
  },
  {
    id: "t14",
    customer_id: "9",
    amount: 3500,
    type: "purchase",
    notes: "Light fixtures",
    created_at: "2024-03-08T09:45:00Z"
  },
  {
    id: "t15",
    customer_id: "9",
    amount: 5500,
    type: "payment",
    created_at: "2024-03-20T11:55:00Z"
  },
  {
    id: "t16",
    customer_id: "10",
    amount: 8400,
    type: "purchase",
    notes: "Kitchen renovation supplies",
    created_at: "2024-03-20T14:15:00Z"
  }
];
