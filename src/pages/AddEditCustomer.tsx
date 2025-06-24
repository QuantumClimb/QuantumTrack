
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCustomerById, addCustomer, updateCustomer } from "@/services/apiService";
import { CustomerFormData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AddEditCustomer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState<CustomerFormData>({
    name: "",
    apartment_number: "",
    phone_number: "",
    amount_due: 0,
  });
  
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    const fetchCustomer = async () => {
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
        
        setFormData({
          name: customerData.name,
          apartment_number: customerData.apartment_number,
          phone_number: customerData.phone_number,
          amount_due: customerData.amount_due,
        });
      } catch (error) {
        console.error("Error fetching customer:", error);
        toast({
          title: "Error",
          description: "There was an error loading the customer data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (isEditMode) {
      fetchCustomer();
    }
  }, [id, isEditMode, navigate, toast]);
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.apartment_number.trim()) {
      newErrors.apartment_number = "Apartment number is required";
    } else if (!/^\d{5}$/.test(formData.apartment_number)) {
      newErrors.apartment_number = "Apartment number must be 5 digits";
    }
    
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone_number)) {
      newErrors.phone_number = "Phone number must be 10 digits";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount_due" ? Number(value) : value,
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      if (isEditMode && id) {
        await updateCustomer(id, formData);
        toast({
          title: "Customer updated",
          description: `${formData.name} has been updated successfully.`,
        });
      } else {
        await addCustomer(formData);
        toast({
          title: "Customer added",
          description: `${formData.name} has been added successfully.`,
        });
      }
      
      navigate("/");
    } catch (error) {
      console.error("Error saving customer:", error);
      toast({
        title: "Error",
        description: "There was an error saving the customer data.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container-padding flex justify-center items-center h-64">
        <p>Loading customer data...</p>
      </div>
    );
  }
  
  return (
    <div className="container-padding">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      <Card className="max-w-2xl mx-auto card-shadow">
        <CardHeader>
          <CardTitle>
            {isEditMode ? "Edit Customer" : "Add New Customer"}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Customer Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apartment_number">Apartment Number</Label>
              <Input
                id="apartment_number"
                name="apartment_number"
                value={formData.apartment_number}
                onChange={handleChange}
                placeholder="5-digit apartment number (e.g., 36194)"
                className={errors.apartment_number ? "border-red-500" : ""}
              />
              {errors.apartment_number ? (
                <p className="text-sm text-red-500">{errors.apartment_number}</p>
              ) : (
                <p className="text-sm text-gray-500">
                  Format: First 2 digits = Tower, Next 2 = Floor, Last digit = Unit
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="10-digit phone number"
                className={errors.phone_number ? "border-red-500" : ""}
              />
              {errors.phone_number && (
                <p className="text-sm text-red-500">{errors.phone_number}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount_due">Initial Amount Due (₹)</Label>
              <Input
                id="amount_due"
                name="amount_due"
                type="number"
                value={formData.amount_due}
                onChange={handleChange}
                placeholder="0"
              />
              <p className="text-sm text-gray-500">
                Enter a positive value for outstanding balance or 0 for new customers
              </p>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting
                  ? "Saving..."
                  : isEditMode
                  ? "Update Customer"
                  : "Add Customer"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddEditCustomer;
