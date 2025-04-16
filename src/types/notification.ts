// types/notification.ts
export type Notification = {
    id: string;
    title: string;
    message: string;
    date: Date;
    isRead: boolean;
    type: 'info' | 'warning' | 'error' | 'success';
  };