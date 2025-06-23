// Define Report type with proper status literals
export type Report = {
  id: string;
  name: string;
  category: string;
  doctor: string;
  date: string;
  format: string;
  size: string;
  status: 'reviewed' | 'pending';
  thumbnail: string;
  description: string;
};

// Mock data for reports with properly typed statuses
export const mockReports: Report[] = [
  {
    id: 'rep-001',
    name: 'Dental X-Ray Results',
    category: 'Dentistry',
    doctor: 'Dr. Maria Rodriguez',
    date: 'March 28, 2025',
    format: 'PDF',
    size: '2.4 MB',
    status: 'reviewed' as const,
    thumbnail: '/assets/cb1258b0-cbdd-42f0-aa60-f8b0d52a3c5d.png',
    description: 'Comprehensive dental X-ray showing all teeth and surrounding structures. No significant issues detected.'
  },
  {
    id: 'rep-002',
    name: 'Blood Test Results',
    category: 'Lab Work',
    doctor: 'Dr. James Wilson',
    date: 'March 15, 2025',
    format: 'PDF',
    size: '1.1 MB',
    status: 'pending' as const,
    thumbnail: '/assets/0004c791-5028-4d5a-ac24-f6de320fc70b.png',
    description: 'Complete blood count and metabolic panel. Results show normal values for all parameters.'
  },
  {
    id: 'rep-003',
    name: 'Annual Physical Report',
    category: 'General Medicine',
    doctor: 'Dr. Sarah Johnson',
    date: 'February 10, 2025',
    format: 'PDF',
    size: '3.2 MB',
    status: 'reviewed' as const,
    thumbnail: '/assets/0004c791-5028-4d5a-ac24-f6de320fc70b.png',
    description: 'Annual physical examination report including vitals, general health assessment, and recommendations.'
  },
  {
    id: 'rep-004',
    name: 'MRI Scan Results',
    category: 'Radiology',
    doctor: 'Dr. Michael Chen',
    date: 'January 25, 2025',
    format: 'PDF',
    size: '8.7 MB',
    status: 'reviewed' as const,
    thumbnail: '/assets/cb1258b0-cbdd-42f0-aa60-f8b0d52a3c5d.png',
    description: 'MRI scan of the right knee showing minor meniscus damage. Follow-up with orthopedic specialist recommended.'
  },
  {
    id: 'rep-005',
    name: 'Allergy Test Results',
    category: 'Immunology',
    doctor: 'Dr. Lisa Patel',
    date: 'January 12, 2025',
    format: 'PDF',
    size: '1.5 MB',
    status: 'pending' as const,
    thumbnail: '/assets/0004c791-5028-4d5a-ac24-f6de320fc70b.png',
    description: 'Comprehensive allergy panel testing for common environmental and food allergens.'
  }
];
