
import { Link } from "react-router-dom";
import { Customer } from "@/types";
import { formatCurrency, getAmountDueColor } from "@/utils/helpers";
import { Card } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface CustomerCardProps {
  customer: Customer;
}

const CustomerCard = ({ customer }: CustomerCardProps) => {
  const getStatusInfo = (amount: number) => {
    if (amount === 0) {
      return {
        icon: <CheckCircle className="h-4 w-4 text-green-400" />,
        label: "Paid",
        color: "text-green-400"
      };
    } else if (amount > 5000) {
      return {
        icon: <AlertTriangle className="h-4 w-4 text-red-400" />,
        label: "Overdue",
        color: "text-red-400"
      };
    } else {
      return {
        icon: <Clock className="h-4 w-4 text-yellow-400" />,
        label: "Due",
        color: "text-yellow-400"
      };
    }
  };
  
  const status = getStatusInfo(customer.amount_due);
  
  return (
    <Link to={`/customer/${customer.id}`}>
      <Card className="h-full glassmorphism hover:border-primary/30 transition-colors">
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-lg">{customer.name}</h3>
            <div className={`font-bold ${status.color} flex items-center`}>
              {formatCurrency(customer.amount_due)}
            </div>
          </div>
          
          <div className="absolute top-3 right-3 flex items-center gap-1">
            {status.icon}
            <span className={`text-xs ${status.color}`}>{status.label}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CustomerCard;
