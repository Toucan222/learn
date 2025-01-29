export type TeacherProfile = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subjects: string[];
  wageType: 'hourly' | 'fixed' | 'percentage';
  wageRate: number;
  wageTier?: string;
  wagePremium?: number;
  status: 'active' | 'inactive';
  permissions: TeacherPermissions;
  availability: WeeklyAvailability[];
  createdAt: Date;
  updatedAt: Date;
};

export type TeacherPermissions = {
  canViewStudentContact: boolean;
  canEditLessonNotes: boolean;
  canViewWages: boolean;
  canViewOtherTeachers: boolean;
  canManageSchedule: boolean;
};

export type WeeklyAvailability = {
  dayOfWeek: number; // 0-6 for Sunday-Saturday
  timeSlots: {
    startTime: string; // HH:mm format
    endTime: string;
  }[];
};
