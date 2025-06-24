import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getApartmentRecords } from '@/services/apiService';
import ResponsiveTable from '@/components/ui/responsive-table';
import { Input } from '@/components/ui/input';
import { Search, ArrowLeft } from 'lucide-react';
import { ApartmentRecord } from '@/types';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Records: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { data: records = [], isLoading } = useQuery<ApartmentRecord[]>({
    queryKey: ['apartmentRecords'],
    queryFn: getApartmentRecords,
  });

  const filteredRecords = records.filter(record => 
    record.apartment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Records</h1>
          <div className="w-24" /> {/* Spacer for alignment */}
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <div className="space-y-6">
            {/* Search Section */}
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Search Records</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search by apartment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700"
                />
              </div>
            </div>

            {/* Records Table Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">All Records</h2>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
                </div>
              ) : (
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <ResponsiveTable records={filteredRecords} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Records; 