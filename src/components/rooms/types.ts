export type Room = {
  id: string;
  name: string;
  branch: string;
  capacity: number;
  features?: string[];
  status: 'active' | 'inactive' | 'maintenance';
  calendar?: string; // Google Calendar ID
  createdAt: Date;
  updatedAt: Date;
};

export type Branch = {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  timezone: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
};

export type RoomBooking = {
  id: string;
  roomId: string;
  lessonId: string;
  startTime: Date;
  endTime: Date;
  status: 'scheduled' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
};
