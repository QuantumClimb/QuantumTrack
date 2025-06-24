import React from "react";
import { ApartmentRecord } from "@/types";
import { format } from "date-fns";

interface RecordsTableProps {
  records: ApartmentRecord[];
}

const RecordsTable: React.FC<RecordsTableProps> = ({ records }) => {
  // Sort records by date, most recent first
  const sortedRecords = [...records].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Apartment
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedRecords.map((record) => (
            <tr key={record.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(record.created_at), "MMM dd, yyyy HH:mm")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {record.apartment}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${record.amount.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordsTable; 