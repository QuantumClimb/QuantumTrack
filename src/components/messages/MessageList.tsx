
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

export type MessagePreview = {
  id: string;
  sender: string;
  senderRole: 'patient' | 'doctor';
  avatar?: string;
  preview: string;
  timestamp: Date;
  unread: boolean;
  urgent?: boolean;
};

interface MessageListProps {
  messages: MessagePreview[];
  selectedId?: string;
  onSelectMessage: (id: string) => void;
}

export const MessageList = ({ messages, selectedId, onSelectMessage }: MessageListProps) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground text-center">No messages yet</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {messages.map((message) => (
            <li
              key={message.id}
              onClick={() => onSelectMessage(message.id)}
              className={cn(
                "flex gap-4 p-4 cursor-pointer transition-colors",
                message.unread ? "bg-healthy-50" : "",
                selectedId === message.id ? "bg-healthy-100" : "hover:bg-gray-50"
              )}
            >
              <div className="relative flex-shrink-0">
                {message.avatar ? (
                  <img
                    src={message.avatar}
                    alt={message.sender}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-white",
                    message.senderRole === 'doctor' ? "bg-healthy-500" : "bg-nature-500"
                  )}>
                    {message.sender.charAt(0).toUpperCase()}
                  </div>
                )}
                {message.unread && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-healthy-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              
              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={cn("font-medium truncate", message.unread ? "font-semibold" : "")}>
                    {message.sender}
                  </h4>
                  <div className="flex items-center gap-1">
                    {message.urgent && (
                      <Badge variant="destructive" className="text-[10px] px-1 py-0">Urgent</Badge>
                    )}
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                </div>
                <p className={cn(
                  "text-sm text-gray-600 truncate mt-1",
                  message.unread ? "font-medium text-gray-800" : ""
                )}>
                  {message.preview}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
