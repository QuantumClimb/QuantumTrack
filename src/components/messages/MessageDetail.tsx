
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ChevronLeft, MoreVertical, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export type Message = {
  id: string;
  content: string;
  timestamp: Date;
  senderId: string;
  senderName: string;
  senderRole: 'patient' | 'doctor';
  senderAvatar?: string;
  status: 'sent' | 'delivered' | 'read';
};

export type Conversation = {
  id: string;
  participant: {
    id: string;
    name: string;
    role: 'patient' | 'doctor';
    avatar?: string;
  };
  messages: Message[];
  unreadCount: number;
  isUrgent?: boolean;
  subject?: string;
};

interface MessageDetailProps {
  conversation: Conversation | null;
  currentUserId: string;
  currentUserRole: 'patient' | 'doctor';
  onBack: () => void;
  onSendMessage: (content: string) => void;
}

export const MessageDetail = ({ 
  conversation, 
  currentUserId, 
  currentUserRole,
  onBack, 
  onSendMessage 
}: MessageDetailProps) => {
  const [newMessage, setNewMessage] = React.useState('');
  
  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Select a conversation to start messaging</p>
      </div>
    );
  }
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white/80">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={onBack}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            {conversation.participant.avatar ? (
              <img 
                src={conversation.participant.avatar} 
                alt={conversation.participant.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-white",
                conversation.participant.role === 'doctor' ? "bg-healthy-500" : "bg-nature-500"
              )}>
                {conversation.participant.name.charAt(0).toUpperCase()}
              </div>
            )}
            
            <div>
              <h3 className="font-medium">{conversation.participant.name}</h3>
              <p className="text-xs text-gray-500 capitalize">{conversation.participant.role}</p>
            </div>
          </div>
        </div>
        
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Message Area */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gradient-to-br from-white to-gray-50">
        {conversation.subject && (
          <div className="bg-muted/50 rounded-lg p-3 text-center mx-auto max-w-md">
            <h4 className="font-medium text-sm">Subject: {conversation.subject}</h4>
          </div>
        )}
        
        {conversation.messages.map((message) => {
          const isCurrentUser = message.senderId === currentUserId;
          
          return (
            <div 
              key={message.id} 
              className={cn(
                "flex", 
                isCurrentUser ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn(
                "max-w-[75%] rounded-2xl p-3 space-y-1",
                isCurrentUser 
                  ? "bg-gradient-to-r from-healthy-500 to-healthy-600 text-white rounded-br-none" 
                  : "bg-white border border-gray-100 rounded-bl-none"
              )}>
                <p className="text-sm">{message.content}</p>
                <div className={cn(
                  "text-xs flex justify-end",
                  isCurrentUser ? "text-healthy-50" : "text-gray-400"
                )}>
                  {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Input Area */}
      <div className="p-4 border-t bg-white/80">
        <div className="flex gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="min-h-[60px] flex-grow resize-none"
            maxLength={500}
          />
          <Button 
            className="self-end" 
            size="icon" 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
