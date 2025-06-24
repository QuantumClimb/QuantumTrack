
import { useState } from "react";
import { Customer, ReminderData } from "@/types";
import { sendReminder } from "@/services/apiService";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, FilePlus, Image, Send, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface WhatsAppSenderProps {
  customer: Customer;
  isOpen: boolean;
  onClose: () => void;
}

const WhatsAppSender = ({ customer, isOpen, onClose }: WhatsAppSenderProps) => {
  const [activeTab, setActiveTab] = useState("text");
  const [additionalMessage, setAdditionalMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [attachments, setAttachments] = useState<{type: string, name: string}[]>([]);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSending(true);
    
    try {
      // This would normally call a Supabase Edge Function
      const reminderData: ReminderData = {
        customer_id: customer.id,
        name: customer.name,
        phone_number: customer.phone_number,
        amount_due: customer.amount_due,
        apartment_number: customer.apartment_number,
      };
      
      await sendReminder(reminderData);
      
      toast({
        title: "Message sent",
        description: `Successfully sent a WhatsApp message to ${customer.name}.`,
      });
      
      setAdditionalMessage("");
      setAttachments([]);
      onClose();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "There was an error sending the message. Please try again.",
        variant: "destructive",
      });
      console.error("WhatsApp error:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleAddAttachment = (type: string) => {
    setAttachments([...attachments, {
      type,
      name: type === 'pdf' ? 'Invoice.pdf' : type === 'image' ? 'Receipt.jpg' : 'Screenshot.png'
    }]);
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  // Preview the message that will be sent
  const previewMessage = `Dear ${customer.name}, this is a reminder that you have an outstanding balance of ₹${customer.amount_due.toLocaleString('en-IN')} at our building store. Please arrange payment at your earliest convenience. ${additionalMessage}`;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] glassmorphism">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-green-400" />
            Send WhatsApp Message
          </DialogTitle>
          <DialogDescription>
            Send a payment reminder or custom message to this customer via WhatsApp.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="text" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="text">Text Message</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="document">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="text" className="space-y-4">
              <div className="grid gap-2">
                <label htmlFor="preview" className="text-sm font-medium">
                  Message Preview
                </label>
                <div
                  id="preview"
                  className="p-3 bg-background/30 text-sm rounded-md border border-border/50"
                >
                  {previewMessage}
                </div>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="additional" className="text-sm font-medium">
                  Additional Message (Optional)
                </label>
                <Textarea
                  id="additional"
                  value={additionalMessage}
                  onChange={(e) => setAdditionalMessage(e.target.value)}
                  placeholder="Add any additional information..."
                  className="resize-none bg-background/30 border-border/50"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="media" className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Attach Media
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    type="button" 
                    variant="outline"
                    className="flex flex-col items-center p-4 h-auto"
                    onClick={() => handleAddAttachment('image')}
                  >
                    <Image className="h-8 w-8 mb-2 text-primary" />
                    <span className="text-xs">Gallery</span>
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    className="flex flex-col items-center p-4 h-auto"
                    onClick={() => handleAddAttachment('camera')}
                  >
                    <Camera className="h-8 w-8 mb-2 text-primary" />
                    <span className="text-xs">Camera</span>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="document" className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Attach Document
                </label>
                <Button 
                  type="button" 
                  variant="outline"
                  className="flex items-center gap-2 justify-center"
                  onClick={() => handleAddAttachment('pdf')}
                >
                  <FilePlus className="h-5 w-5" />
                  <span>Generate and Attach Invoice PDF</span>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          {attachments.length > 0 && (
            <div className="mt-4">
              <label className="text-sm font-medium mb-2 block">
                Attachments
              </label>
              <div className="space-y-2">
                {attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-primary/10 rounded-md">
                    <div className="flex items-center gap-2">
                      {attachment.type === 'pdf' ? (
                        <FilePlus className="h-4 w-4 text-red-400" />
                      ) : (
                        <Image className="h-4 w-4 text-blue-400" />
                      )}
                      <span className="text-sm">{attachment.name}</span>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0"
                      onClick={() => handleRemoveAttachment(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSending} className="gap-2">
              <Send className="h-4 w-4" />
              {isSending ? "Sending..." : "Send Message"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppSender;
