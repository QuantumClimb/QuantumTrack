
import { Transaction } from "@/types";
import { formatCurrency, formatDate, formatTime } from "@/utils/helpers";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const isPayment = transaction.type === 'payment';
  
  return (
    <div className="flex items-center p-3 border-b last:border-b-0">
      <div className={`mr-3 ${isPayment ? 'text-green-600' : 'text-red-600'}`}>
        {isPayment ? (
          <ArrowUpCircle className="h-8 w-8" />
        ) : (
          <ArrowDownCircle className="h-8 w-8" />
        )}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-medium">
              {isPayment ? 'Payment' : 'Purchase'}
            </div>
            {transaction.notes && (
              <p className="text-sm text-gray-600">{transaction.notes}</p>
            )}
          </div>
          
          <div className={`font-bold ${isPayment ? 'text-green-600' : 'text-red-600'}`}>
            {isPayment ? '−' : '+'}{formatCurrency(transaction.amount)}
          </div>
        </div>
        
        <div className="text-xs text-gray-500 mt-1">
          {formatDate(transaction.created_at)} at {formatTime(transaction.created_at)}
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
