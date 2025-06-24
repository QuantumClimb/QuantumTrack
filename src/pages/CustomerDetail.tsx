
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCustomerById, getTransactionsByCustomerId, deleteCustomer } from "@/services/apiService";
import { parseApartmentNumber, formatCurrency, formatPhoneNumber } from "@/utils/helpers";
import { Customer, Transaction } from "@/types";
import TransactionItem from "@/components/TransactionItem";
import TransactionForm from "@/components/TransactionForm";
import ReminderForm from "@/components/ReminderForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Phone,
  Pencil,
  PlusCircle,
  MinusCircle,
  Trash2,
  Building,
  MessageCircle,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogType, setDialogType] = useState<"purchase" | "payment" | null>(null);
  const [showReminderForm, setShowReminderForm] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        
        const customerData = await getCustomerById(id);
        if (!customerData) {
          navigate("/");
          toast({
            title: "Customer not found",
            description: "The requested customer could not be found.",
            variant: "destructive",
          });
          return;
        }
        
        setCustomer(customerData);
        
        const transactionsData = await getTransactionsByCustomerId(id);
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching customer details:", error);
        toast({
          title: "Error",
          description: "There was an error loading the customer details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, navigate, toast]);
  
  const handleDeleteCustomer = async () => {
    try {
      if (!customer) return;
      
      await deleteCustomer(customer.id);
      
      toast({
        title: "Customer deleted",
        description: `${customer.name} has been deleted successfully.`,
      });
      
      navigate("/");
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast({
        title: "Error",
        description: "There was an error deleting the customer.",
        variant: "destructive",
      });
    }
  };
  
  const handleTransactionSuccess = async () => {
    if (!id) return;
    
    // Refresh customer data to get updated amount due
    const customerData = await getCustomerById(id);
    if (customerData) {
      setCustomer(customerData);
    }
    
    // Refresh transactions
    const transactionsData = await getTransactionsByCustomerId(id);
    setTransactions(transactionsData);
  };
  
  if (loading) {
    return (
      <div className="container-padding flex justify-center items-center h-64">
        <p>Loading customer details...</p>
      </div>
    );
  }
  
  if (!customer) {
    return (
      <div className="container-padding text-center py-12">
        <p className="mb-4">Customer not found.</p>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }
  
  const { tower, floor, unit } = parseApartmentNumber(customer.apartment_number);
  const formattedPhone = formatPhoneNumber(customer.phone_number);
  
  // Determine color based on amount due
  let amountClass = "text-green-600";
  if (customer.amount_due > 0) {
    amountClass = customer.amount_due > 5000 ? "text-red-600" : "text-orange-600";
  }
  
  return (
    <div className="container-padding">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="card-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{customer.name}</CardTitle>
                  <CardDescription>Customer Details</CardDescription>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link to={`/customer/edit/${customer.id}`}>
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Link>
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Amount Due</div>
                <div className={`text-2xl font-bold ${amountClass}`}>
                  {formatCurrency(customer.amount_due)}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-1">Apartment</div>
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-gray-500" />
                  <div>
                    <div>{customer.apartment_number}</div>
                    <div className="text-sm text-gray-600">
                      Tower {tower}, Floor {floor}, Unit {unit}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-1">Phone Number</div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <div>{formattedPhone}</div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3 w-full">
                <Button 
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => setDialogType("purchase")}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Purchase
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => setDialogType("payment")}
                >
                  <MinusCircle className="h-4 w-4 mr-2" />
                  Add Payment
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowReminderForm(true)}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Reminder
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Customer
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Customer</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete {customer.name}? This action cannot be undone and will permanently remove the customer and all associated transactions.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeleteCustomer}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="card-shadow h-full">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                All purchases and payments for this customer
              </CardDescription>
            </CardHeader>
            
            <div className="overflow-y-auto max-h-[500px]">
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No transactions found for this customer.
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
      
      {dialogType && customer && (
        <TransactionForm
          customer={customer}
          type={dialogType}
          isOpen={true}
          onClose={() => setDialogType(null)}
          onSuccess={handleTransactionSuccess}
        />
      )}
      
      {showReminderForm && customer && (
        <ReminderForm
          customer={customer}
          isOpen={true}
          onClose={() => setShowReminderForm(false)}
        />
      )}
    </div>
  );
};

export default CustomerDetail;
