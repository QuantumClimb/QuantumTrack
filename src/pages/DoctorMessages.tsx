
import React, { useState } from 'react';
import { MessageList } from '@/components/messages/MessageList';
import { MessageDetail, Message } from '@/components/messages/MessageDetail';
import Layout from '@/components/Layout';
import { doctorMessages, doctorConversations } from '@/mock/messageData';
import { useToast } from '@/hooks/use-toast';

const DoctorMessages = () => {
  const [selectedMessageId, setSelectedMessageId] = useState<string | undefined>();
  const { toast } = useToast();
  
  const selectedConversation = selectedMessageId ? doctorConversations[selectedMessageId] : null;
  
  const handleSelectMessage = (id: string) => {
    setSelectedMessageId(id);
  };
  
  const handleSendMessage = (content: string) => {
    if (!selectedConversation) return;
    
    // In a real app, this would send the message to the backend
    console.log('Sending message:', content);
    
    toast({
      title: "Message sent",
      description: "Your message has been sent to " + selectedConversation.participant.name,
    });
    
    // For demo purposes, we're not actually updating the messages array
  };
  
  return (
    <Layout userRole="doctor">
      <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)]">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Patient Messages</h1>
          <p className="text-gray-500">Manage your patient communications</p>
        </header>
        
        <div className="glass-card h-[calc(100%-5rem)] overflow-hidden flex rounded-xl shadow-sm">
          <div className={`w-full md:w-1/3 border-r ${selectedMessageId ? 'hidden md:block' : ''}`}>
            <div className="p-4 bg-white/80 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Conversations</h2>
            </div>
            <MessageList
              messages={doctorMessages}
              selectedId={selectedMessageId}
              onSelectMessage={handleSelectMessage}
            />
          </div>
          
          <div className={`w-full md:w-2/3 ${selectedMessageId ? 'block' : 'hidden md:block'}`}>
            <MessageDetail
              conversation={selectedConversation}
              currentUserId="dr_wilson"
              currentUserRole="doctor"
              onBack={() => setSelectedMessageId(undefined)}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorMessages;
