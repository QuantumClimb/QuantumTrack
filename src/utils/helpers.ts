
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const parseApartmentNumber = (apartment_number: string) => {
  const tower = apartment_number.substring(0, 2);
  const floor = apartment_number.substring(2, 4);
  const unit = apartment_number.substring(4, 6);

  return { tower, floor, unit };
};

export const getAmountDueColor = (amount: number): string => {
  if (amount === 0) return "status-paid";
  if (amount > 5000) return "status-overdue";
  return "status-due";
};

export const generatePDF = async (customer: any) => {
  // Mock function for PDF generation
  // In a real implementation, this would generate a PDF using a library
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        filename: `Invoice_${customer.id}.pdf`,
        url: "#",
      });
    }, 1000);
  });
};

export const getStatusLabel = (amount: number): string => {
  if (amount === 0) return "Paid";
  if (amount > 5000) return "Overdue";
  return "Due";
};

// Date and time formatting functions
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Phone number formatting function
export const formatPhoneNumber = (phoneNumber: string): string => {
  // Format Indian phone numbers as +91 XXXXX XXXXX
  if (phoneNumber.length === 10) {
    return `+91 ${phoneNumber.substring(0, 5)} ${phoneNumber.substring(5)}`;
  }
  return phoneNumber;
};

// Random data generation functions for mock data
export const generateRandomApartmentNumber = (): string => {
  // Tower: 01-99, Floor: 01-99, Unit: 0-9
  const tower = Math.floor(Math.random() * 99) + 1;
  const floor = Math.floor(Math.random() * 99) + 1;
  const unit = Math.floor(Math.random() * 10);
  
  return `${tower.toString().padStart(2, '0')}${floor.toString().padStart(2, '0')}${unit}`;
};

export const generateRandomPhoneNumber = (): string => {
  // Generate a random 10-digit Indian mobile number
  let phoneNumber = '9'; // Most Indian mobile numbers start with 9
  for (let i = 0; i < 9; i++) {
    phoneNumber += Math.floor(Math.random() * 10).toString();
  }
  return phoneNumber;
};
