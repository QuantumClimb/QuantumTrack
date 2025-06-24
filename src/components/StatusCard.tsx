import React from "react";
import { Building2, Receipt, Clock, CreditCard } from "lucide-react";

interface StatusCardProps {
  type: "total" | "pending" | "overdue" | "available";
  amount: number;
  subtitle?: string;
}

const getIconByType = (type: StatusCardProps["type"]) => {
  switch (type) {
    case "total":
      return Building2;
    case "pending":
      return Clock;
    case "overdue":
      return Receipt;
    case "available":
      return CreditCard;
  }
};

const getColorByType = (type: StatusCardProps["type"]) => {
  switch (type) {
    case "total":
      return "bg-blue-100 dark:bg-blue-900/20";
    case "pending":
      return "bg-yellow-100 dark:bg-yellow-900/20";
    case "overdue":
      return "bg-red-100 dark:bg-red-900/20";
    case "available":
      return "bg-green-100 dark:bg-green-900/20";
  }
};

const getTextColorByType = (type: StatusCardProps["type"]) => {
  switch (type) {
    case "total":
      return "text-blue-700 dark:text-blue-300";
    case "pending":
      return "text-yellow-700 dark:text-yellow-300";
    case "overdue":
      return "text-red-700 dark:text-red-300";
    case "available":
      return "text-green-700 dark:text-green-300";
  }
};

const getLabelByType = (type: StatusCardProps["type"]) => {
  switch (type) {
    case "total":
      return "Total Credit";
    case "pending":
      return "Pending";
    case "overdue":
      return "Overdue";
    case "available":
      return "Available";
  }
};

const StatusCard: React.FC<StatusCardProps> = ({ type, amount, subtitle }) => {
  const Icon = getIconByType(type);
  const bgColor = getColorByType(type);
  const textColor = getTextColorByType(type);
  const label = getLabelByType(type);

  return (
    <div className={`relative p-4 rounded-3xl ${bgColor} transition-all duration-300 hover:scale-105`}>
      <div className="flex flex-col gap-2">
        <Icon className={`w-8 h-8 ${textColor}`} />
        
        <h3 className={`text-xl font-semibold ${textColor}`}>
          ₱{amount.toLocaleString()}
        </h3>
        
        <div>
          <p className={`text-sm font-medium ${textColor}`}>
            {label}
          </p>
          {subtitle && (
            <p className={`text-xs ${textColor}/70`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusCard; 