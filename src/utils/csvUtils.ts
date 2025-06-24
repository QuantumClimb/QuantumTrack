import { ApartmentRecord } from "@/types";

export const convertToCSV = (records: ApartmentRecord[]): string => {
  // CSV header
  const headers = ["Apartment Number", "Amount"];
  
  // Convert records to CSV rows
  const rows = records.map(record => [
    record.apartment,
    record.amount.toString()
  ]);
  
  // Combine headers and rows
  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.join(","))
  ].join("\n");
  
  return csvContent;
};

export const downloadCSV = (csvContent: string, filename: string = "apartment_records.csv") => {
  // Create a Blob with the CSV content
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  
  // Create a download link
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  
  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}; 