import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getApartmentRecords, updateApartmentRecord } from '@/services/apiService';
import { format } from 'date-fns';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentInput: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);

  const { data: records, isLoading } = useQuery({
    queryKey: ['apartmentRecords'],
    queryFn: getApartmentRecords,
  });

  const updateRecordMutation = useMutation({
    mutationFn: updateApartmentRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apartmentRecords'] });
      toast.success('Payment marked as completed');
      setSelectedRecord(null);
    },
    onError: (error) => {
      toast.error('Failed to update payment status');
      console.error('Error updating record:', error);
    },
  });

  const handleMarkAsPaid = (recordId: string) => {
    updateRecordMutation.mutate({
      id: recordId,
      data: { status: 'paid' },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <motion.div 
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    );
  }

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-3xl font-bold mb-8">Payment Input</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Apartment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence>
                {records?.map((record) => (
                  <motion.tr 
                    key={record.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {record.apartment}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">
                        ${record.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">
                        {format(new Date(record.created_at), 'MMM d, yyyy')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        record.status === 'paid' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {record.status === 'paid' ? 'Paid' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {record.status !== 'paid' && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={() => handleMarkAsPaid(record.id)}
                            disabled={updateRecordMutation.isPending}
                          >
                            <Check className="h-4 w-4" />
                            Mark as Paid
                          </Button>
                        </motion.div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentInput; 