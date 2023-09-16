export type Message = {
  id: number;
  authorId: number;
  content: string;
  author: string;
  date: Date;
  isDM: boolean;
  isRead?: boolean;
  isEdited?: boolean;
  isDeleted?: boolean;
  isPinned?: boolean;
  isFlagged?: boolean;
};

export type User = {
  id: number;
  name: string;
  isOnline: boolean;
  lastSeen: Date;
  isTyping: boolean;
  isMuted?: boolean;
  avatar?: string;
};
