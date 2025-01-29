export type PayrollPeriod = {
  id: string;
  startDate: Date;
  endDate: Date;
  status: 'draft' | 'processing' | 'paid';
  teacherId: string;
  totalHours: number;
  baseWage: number;
  premiumWage: number;
  totalAmount: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type WageCalculation = {
  regularHours: number;
  premiumHours: number;
  baseRate: number;
  premiumRate: number;
  totalRegular: number;
  totalPremium: number;
  total: number;
};

export type PayrollSettings = {
  paymentSchedule: 'weekly' | 'biweekly' | 'monthly';
  defaultBaseRate: number;
  defaultPremiumRate: number;
  cancellationPayPercentage: number;
  minimumHoursForPremium: number;
};
