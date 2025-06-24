
import { useState } from "react";
import { Customer, TransactionFormData } from "@/types";
import { addTransaction } from "@/services/apiService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface TransactionFormProps {
  customer: Customer;
  type: "purchase" | "payment";
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const TransactionForm = ({
  customer,
  type,
  isOpen,
  onClose,
  onSuccess,
}: TransactionFormProps) => {
  const [amount, setAmount] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than zero.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const transactionData: TransactionFormData = {
        customer_id: customer.id,
        amount: Number(amount),
        type,
        notes: notes.trim() || undefined,
      };
      
      await addTransaction(transactionData);
      
      toast({
        title: `${type === "purchase" ? "Purchase" : "Payment"} recorded`,
        description: `Successfully recorded ${type} of ${amount} for ${customer.name}.`,
      });
      
      setAmount("");
      setNotes("");
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        title: "Error recording transaction",
        description: "There was an error recording the transaction. Please try again.",
        variant: "destructive",
      });
      console.error("Transaction error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {type === "purchase" ? "Record Purchase" : "Record Payment"}
          </DialogTitle>
          <DialogDescription>
            {type === "purchase"
              ? "Record a new purchase for this customer."
              : "Record a payment from this customer."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Amount (₹)
              </label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                min="1"
                step="1"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Notes (Optional)
              </label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={type === "purchase" ? "What was purchased?" : "Payment details"}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={type === "purchase" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
            >
              {isSubmitting ? "Processing..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionForm;
