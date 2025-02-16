export interface Contact {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
  lastMessage: string;
  lastMessageTime: string;
}

export interface Message {
  id: number;
  content: string;
  timestamp: string;
  senderId: number;
  receiverId: number;
} 