export type User = {
  id: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Family = {
  id: string;
  title?: string;
  firstName: string;
  lastName: string;
  email: string;
  additionalEmail?: string;
  mobilePhone?: string;
  homePhone?: string;
  workPhone?: string;
  address?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  additionalInfo?: string;
  status: 'active' | 'inactive';
  stripeId?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Student = {
  id: string;
  familyId?: string;
  firstName: string;
  lastName: string;
  email?: string;
  birthDate?: Date;
  startDate: Date;
  subjects?: string[];
  grade?: string;
  status: 'active' | 'inactive';
  defaultServiceId?: string;
  defaultLocationId?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Teacher = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subjects: string[];
  wageType: 'hourly' | 'fixed' | 'percentage';
  wageRate: number;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
};

export type Lesson = {
  id: string;
  name: string;
  description?: string;
  teacherId: string;
  studentIds: string[];
  locationId: string;
  startTime: Date;
  endTime: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'private' | 'group' | 'trial';
  capacity: number;
  price: number;
  wagePremium?: number;
  createdAt: Date;
  updatedAt: Date;
};
