
import { Customer } from "@/types";
import WhatsAppSender from "./WhatsAppSender";

interface ReminderFormProps {
  customer: Customer;
  isOpen: boolean;
  onClose: () => void;
}

const ReminderForm = ({ customer, isOpen, onClose }: ReminderFormProps) => {
  return (
    <WhatsAppSender 
      customer={customer} 
      isOpen={isOpen} 
      onClose={onClose} 
    />
  );
};

export default ReminderForm;
