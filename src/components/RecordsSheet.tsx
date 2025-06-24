import React, { useEffect, useState } from 'react';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/utils/helpers';
import { ApartmentRecord } from '@/types';
import { getApartmentRecords, getApartmentRecordsTotal, deleteApartmentRecord } from '@/services/apiService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Search, Calendar, ArrowUpDown, Download } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface RecordsSheetProps {
  onRefresh?: () => void;
}

const RecordsSheet: React.FC<RecordsSheetProps> = ({ onRefresh }) => {
  const [records, setRecords] = useState<ApartmentRecord[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{
    key: 'apartment' | 'amount' | 'created_at';
    direction: 'asc' | 'desc';
  }>({ key: 'created_at', direction: 'desc' });
  const { toast } = useToast();

  const loadRecords = async () => {
    setLoading(true);
    try {
      const data = await getApartmentRecords();
      const total = await getApartmentRecordsTotal();
      
      setRecords(data);
      setTotalAmount(total);
    } catch (error) {
      console.error("Error loading records:", error);
      toast({
        title: "Error loading records",
        description: "There was a problem loading the records. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadRecords();
  }, []);
  
  useEffect(() => {
    if (onRefresh) {
      loadRecords();
    }
  }, [onRefresh]);

  const handleSort = (key: 'apartment' | 'amount' | 'created_at') => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteApartmentRecord(id);
      toast({
        title: "Record deleted",
        description: "The record has been successfully deleted.",
      });
      loadRecords();
    } catch (error) {
      console.error("Error deleting record:", error);
      toast({
        title: "Error",
        description: "Failed to delete the record. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['Apartment', 'Amount', 'Date'],
      ...filteredAndSortedRecords.map(record => [
        record.apartment,
        record.amount.toString(),
        format(new Date(record.created_at), 'yyyy-MM-dd HH:mm:ss')
      ])
    ].map(row => row.join(',')).join('\\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `apartment-records-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const filteredAndSortedRecords = records
    .filter(record => 
      record.apartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.amount.toString().includes(searchTerm)
    )
    .sort((a, b) => {
      const aValue = sortConfig.key === 'created_at' 
        ? new Date(a[sortConfig.key]).getTime()
        : a[sortConfig.key];
      const bValue = sortConfig.key === 'created_at'
        ? new Date(b[sortConfig.key]).getTime()
        : b[sortConfig.key];
        
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={handleExport}
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-pulse text-blue-500">Loading records...</div>
        </div>
      ) : records.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-center">
          <p className="text-muted-foreground text-lg font-light">No records yet</p>
          <p className="text-sm text-muted-foreground">Add apartment numbers and amounts to see them here</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="font-medium cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('apartment')}
                  >
                    <div className="flex items-center gap-2">
                      Apartment
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="text-right font-medium cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('amount')}
                  >
                    <div className="flex items-center justify-end gap-2">
                      Amount
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-medium cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('created_at')}
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Date
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedRecords.map((record) => (
                  <TableRow key={record.id} className="group">
                    <TableCell className="font-medium">{record.apartment}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(record.amount)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(record.created_at), 'MMM d, yyyy HH:mm')}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDelete(record.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      
      {records.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-blue-700 font-light">Total Records: </span>
              <span className="text-blue-700 font-medium">{filteredAndSortedRecords.length}</span>
            </div>
            <div>
              <span className="text-blue-700 font-light">Total Amount: </span>
              <span className="text-blue-700 font-medium">
                {formatCurrency(totalAmount)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordsSheet;
