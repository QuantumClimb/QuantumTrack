
import { Conversation } from "@/components/messages/MessageDetail";
import { MessagePreview } from "@/components/messages/MessageList";

// Mock data for patient messages
export const patientMessages: MessagePreview[] = [
  {
    id: "msg1",
    sender: "Dr. James Wilson",
    senderRole: "doctor",
    preview: "Your test results look good. I've scheduled a follow-up appointment for next week.",
    timestamp: new Date(2025, 3, 9, 14, 30),
    unread: true,
  },
  {
    id: "msg2",
    sender: "Dr. Emily Chen",
    senderRole: "doctor",
    preview: "Please remember to take your medication three times daily with food.",
    timestamp: new Date(2025, 3, 8, 10, 15),
    unread: false,
  },
  {
    id: "msg3",
    sender: "Dr. Robert Brown",
    senderRole: "doctor",
    preview: "I've updated your prescription. You can pick it up at your pharmacy later today.",
    timestamp: new Date(2025, 3, 7, 16, 45),
    unread: false,
    urgent: true,
  },
  {
    id: "msg4",
    sender: "Dr. Sarah Johnson",
    senderRole: "doctor",
    preview: "How are you feeling after the procedure? Any unusual symptoms?",
    timestamp: new Date(2025, 3, 5, 9, 0),
    unread: false,
  },
  {
    id: "msg5",
    sender: "HEALTHY Support",
    senderRole: "doctor",
    preview: "Your appointment with Dr. Wilson has been confirmed for April 15th at 2:30 PM.",
    timestamp: new Date(2025, 3, 4, 11, 20),
    unread: false,
  }
];

// Mock data for doctor messages
export const doctorMessages: MessagePreview[] = [
  {
    id: "doc_msg1",
    sender: "John Doe",
    senderRole: "patient",
    preview: "I'm experiencing severe headaches since yesterday. Should I be concerned?",
    timestamp: new Date(2025, 3, 9, 16, 10),
    unread: true,
    urgent: true,
  },
  {
    id: "doc_msg2",
    sender: "Emma Thompson",
    senderRole: "patient",
    preview: "Thank you for the prescription. The new medication seems to be working better.",
    timestamp: new Date(2025, 3, 9, 11, 45),
    unread: true,
  },
  {
    id: "doc_msg3",
    sender: "Michael Rodriguez",
    senderRole: "patient",
    preview: "I've uploaded my blood pressure readings for the past week as requested.",
    timestamp: new Date(2025, 3, 8, 14, 20),
    unread: false,
  },
  {
    id: "doc_msg4",
    sender: "Lisa Wang",
    senderRole: "patient",
    preview: "When should I schedule my next check-up appointment?",
    timestamp: new Date(2025, 3, 7, 9, 30),
    unread: false,
  },
  {
    id: "doc_msg5",
    sender: "David Smith",
    senderRole: "patient",
    preview: "The rash has mostly cleared up but there's still some redness around the edges.",
    timestamp: new Date(2025, 3, 6, 13, 15),
    unread: false,
  }
];

// Mock conversation data for patient
export const patientConversations: Record<string, Conversation> = {
  "msg1": {
    id: "msg1",
    participant: {
      id: "dr_wilson",
      name: "Dr. James Wilson",
      role: "doctor",
    },
    messages: [
      {
        id: "m1_1",
        content: "Hello John, I've reviewed your recent blood work and everything looks normal.",
        timestamp: new Date(2025, 3, 9, 14, 15),
        senderId: "dr_wilson",
        senderName: "Dr. James Wilson",
        senderRole: "doctor",
        status: "read",
      },
      {
        id: "m1_2",
        content: "Your cholesterol levels have improved since your last test. Keep up with the dietary changes we discussed.",
        timestamp: new Date(2025, 3, 9, 14, 17),
        senderId: "dr_wilson",
        senderName: "Dr. James Wilson",
        senderRole: "doctor",
        status: "read",
      },
      {
        id: "m1_3",
        content: "That's great news! I've been working hard on my diet and exercise routine.",
        timestamp: new Date(2025, 3, 9, 14, 25),
        senderId: "patient1",
        senderName: "John Doe",
        senderRole: "patient",
        status: "read",
      },
      {
        id: "m1_4",
        content: "Your test results look good. I've scheduled a follow-up appointment for next week.",
        timestamp: new Date(2025, 3, 9, 14, 30),
        senderId: "dr_wilson",
        senderName: "Dr. James Wilson",
        senderRole: "doctor",
        status: "delivered",
      },
    ],
    unreadCount: 1,
    subject: "Blood Test Results",
  },
  "msg2": {
    id: "msg2",
    participant: {
      id: "dr_chen",
      name: "Dr. Emily Chen",
      role: "doctor",
    },
    messages: [
      {
        id: "m2_1",
        content: "John, I'm prescribing you a new medication for your blood pressure.",
        timestamp: new Date(2025, 3, 8, 10, 0),
        senderId: "dr_chen",
        senderName: "Dr. Emily Chen",
        senderRole: "doctor",
        status: "read",
      },
      {
        id: "m2_2",
        content: "Please remember to take your medication three times daily with food.",
        timestamp: new Date(2025, 3, 8, 10, 15),
        senderId: "dr_chen",
        senderName: "Dr. Emily Chen",
        senderRole: "doctor",
        status: "read",
      },
    ],
    unreadCount: 0,
    subject: "New Medication Instructions",
  },
  // Additional conversations...
};

// Mock conversation data for doctor
export const doctorConversations: Record<string, Conversation> = {
  "doc_msg1": {
    id: "doc_msg1",
    participant: {
      id: "patient1",
      name: "John Doe",
      role: "patient",
    },
    messages: [
      {
        id: "dm1_1",
        content: "Dr. Wilson, I'm experiencing severe headaches since yesterday. Should I be concerned?",
        timestamp: new Date(2025, 3, 9, 16, 10),
        senderId: "patient1",
        senderName: "John Doe",
        senderRole: "patient",
        status: "delivered",
      }
    ],
    unreadCount: 1,
    isUrgent: true,
  },
  "doc_msg2": {
    id: "doc_msg2",
    participant: {
      id: "patient2",
      name: "Emma Thompson",
      role: "patient",
    },
    messages: [
      {
        id: "dm2_1",
        content: "Dr. Wilson, I started taking the new medication you prescribed.",
        timestamp: new Date(2025, 3, 9, 11, 30),
        senderId: "patient2",
        senderName: "Emma Thompson",
        senderRole: "patient",
        status: "read",
      },
      {
        id: "dm2_2",
        content: "Thank you for the prescription. The new medication seems to be working better.",
        timestamp: new Date(2025, 3, 9, 11, 45),
        senderId: "patient2",
        senderName: "Emma Thompson",
        senderRole: "patient",
        status: "delivered",
      }
    ],
    unreadCount: 1,
  },
  // Additional conversations...
};
