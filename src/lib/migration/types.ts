// Migration field mappings for Teachworks data
export type TeachworksEmployee = {
  type: string;
  title?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone?: string;
  homePhone?: string;
  address?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  wageType: string;
  employeeWage: number;
  wageTier?: string;
  birthDate?: Date;
  hireDate?: Date;
  position?: string;
  subjects: string[];
  calendarColor?: string;
  additionalInfo?: string;
  bio?: string;
  status: string;
  permissions: TeachworksPermissions;
  profileId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TeachworksPermissions = {
  teachersPermission: boolean;
  staffPermission: boolean;
  studentsPermission: boolean;
  servicesPermission: boolean;
  lessonsPermission: boolean;
  lessonCostPermission: boolean;
  accountingPermission: boolean;
  reportsPermission: boolean;
  settingsPermission: boolean;
  studentContactInfoPermission: boolean;
  eventsDurationPermission: boolean;
  othersLessonsPermission: boolean;
  locationsPermission: boolean;
  sendNotesPermission: boolean;
};

export type TeachworksFamily = {
  id: string;
  title?: string;
  firstName: string;
  lastName: string;
  children: string[];
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
  status: string;
  lessonReminders: boolean;
  lessonNotes: boolean;
  smsReminders: boolean;
  stripeId?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type MigrationResult = {
  success: boolean;
  errors: MigrationError[];
  warnings: MigrationWarning[];
  stats: MigrationStats;
};

export type MigrationError = {
  type: 'employee' | 'family' | 'student' | 'lesson' | 'payment';
  id: string;
  field: string;
  message: string;
};

export type MigrationWarning = {
  type: 'employee' | 'family' | 'student' | 'lesson' | 'payment';
  id: string;
  field: string;
  message: string;
};

export type MigrationStats = {
  employeesProcessed: number;
  familiesProcessed: number;
  studentsProcessed: number;
  lessonsProcessed: number;
  paymentsProcessed: number;
  errorsCount: number;
  warningsCount: number;
};
