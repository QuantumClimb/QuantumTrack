import React from 'react';
import { motion } from 'framer-motion';
import { Check, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useMediaQuery } from '@/hooks/use-media-query';
import { ApartmentRecord } from '@/types';
import { toast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

interface ResponsiveTableProps {
  records: ApartmentRecord[];
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({ records }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const queryClient = useQueryClient();

  // Sort records by date, most recent first
  const sortedRecords = [...records].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const handlePayment = async (recordId: string) => {
    try {
      // Here you would typically make an API call to update the payment status
      // For now, we'll just update the cache and show a success message
      const updatedRecords = records.filter(record => record.id !== recordId);
      queryClient.setQueryData(['apartmentRecords'], updatedRecords);
      
      toast({
        title: "Payment Successful",
        description: "The record has been removed from the list.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing the payment.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  if (isMobile) {
    return (
      <div className="space-y-4">
        {sortedRecords.map((record) => (
          <div 
            key={record.id} 
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{record.apartment}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {format(new Date(record.created_at), 'MMM dd, yyyy HH:mm')}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900 dark:text-white">
                  ₱{record.amount.toLocaleString()}
                </p>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  record.status === 'paid' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {record.status}
                </span>
              </div>
            </div>
            {record.status !== 'paid' && (
              <div className="mt-4 flex justify-end">
                <Button
                  size="sm"
                  onClick={() => handlePayment(record.id)}
                  className="flex items-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  Make Payment
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Apartment
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {sortedRecords.map((record) => (
            <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {record.apartment}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                ₱{record.amount.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {format(new Date(record.created_at), 'MMM d, yyyy')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  record.status === 'paid' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {record.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {record.status !== 'paid' && (
                  <Button
                    size="sm"
                    onClick={() => handlePayment(record.id)}
                    className="flex items-center gap-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    Make Payment
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResponsiveTable; 