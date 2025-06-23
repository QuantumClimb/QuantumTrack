
import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type ReportFilterProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const ReportFilter = ({ searchQuery, setSearchQuery }: ReportFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search reports by name, category, or doctor..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button variant="outline" className="flex gap-2">
        <SlidersHorizontal className="h-4 w-4" /> Filter
      </Button>
    </div>
  );
};

export default ReportFilter;
