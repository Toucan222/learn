import { z } from 'zod';

// Employee validation schema
export const employeeSchema = z.object({
  profileId: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  wageType: z.enum(['hourly', 'fixed', 'percentage']),
  employeeWage: z.number().min(0),
  status: z.enum(['active', 'inactive']),
  subjects: z.array(z.string()),
  permissions: z.object({
    teachersPermission: z.boolean(),
    staffPermission: z.boolean(),
    studentsPermission: z.boolean(),
    servicesPermission: z.boolean(),
    lessonsPermission: z.boolean(),
    lessonCostPermission: z.boolean(),
    accountingPermission: z.boolean(),
    reportsPermission: z.boolean(),
    settingsPermission: z.boolean(),
    studentContactInfoPermission: z.boolean(),
    eventsDurationPermission: z.boolean(),
    othersLessonsPermission: z.boolean(),
    locationsPermission: z.boolean(),
    sendNotesPermission: z.boolean()
  })
});

// Family validation schema
export const familySchema = z.object({
  id: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  status: z.enum(['active', 'inactive']),
  children: z.array(z.string()),
  mobilePhone: z.string().optional(),
  homePhone: z.string().optional(),
  workPhone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
  stripeId: z.string().optional()
});

// Payment validation schema
export const paymentSchema = z.object({
  id: z.string().min(1),
  type: z.enum(['payment', 'credit', 'refund']),
  date: z.date(),
  amount: z.number().min(0),
  customerId: z.string().min(1),
  method: z.enum(['stripe', 'cash', 'bank_transfer']),
  description: z.string(),
  stripeTransactionId: z.string().optional(),
  unallocated: z.number().min(0)
});

// Package validation schema
export const packageSchema = z.object({
  id: z.string().min(1),
  customerId: z.string().min(1),
  studentId: z.string().min(1),
  serviceId: z.string().min(1),
  totalCost: z.number().min(0),
  purchased: z.number().min(0),
  scheduled: z.number().min(0),
  unscheduled: z.number().min(0),
  overscheduled: z.number().min(0),
  used: z.number().min(0),
  unused: z.number().min(0),
  overused: z.number().min(0),
  expiryDate: z.date().optional()
});

export function validateEmployee(data: unknown) {
  return employeeSchema.safeParse(data);
}

export function validateFamily(data: unknown) {
  return familySchema.safeParse(data);
}

export function validatePayment(data: unknown) {
  return paymentSchema.safeParse(data);
}

export function validatePackage(data: unknown) {
  return packageSchema.safeParse(data);
}
