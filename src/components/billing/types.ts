export type Invoice = {
  id: string;
  number: string;
  type: 'student' | 'teacher';
  date: Date;
  dueDate: Date;
  customerId: string;
  customerEmail: string;
  reference?: string;
  status: 'draft' | 'sent' | 'paid' | 'void';
  subtotal: number;
  taxTreatment?: string;
  salesTaxRate?: number;
  salesTaxTotal?: number;
  total: number;
  balance: number;
  terms?: string;
  flags?: string[];
  createdAt: Date;
  updatedAt: Date;
  lastSentAt?: Date;
  reminderSentAt?: Date;
};

export type Payment = {
  id: string;
  type: 'payment' | 'credit' | 'refund';
  date: Date;
  customerId: string;
  description: string;
  method: 'stripe' | 'cash' | 'bank_transfer';
  stripeTransactionId?: string;
  amount: number;
  unallocated: number;
  createdAt: Date;
  updatedAt: Date;
};

export type PaymentAllocation = {
  id: string;
  paymentId: string;
  invoiceId: string;
  amount: number;
  date: Date;
};

export type Package = {
  id: string;
  customerId: string;
  studentId: string;
  serviceId: string;
  totalCost: number;
  purchased: number;
  scheduled: number;
  unscheduled: number;
  overscheduled: number;
  used: number;
  unused: number;
  overused: number;
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
};
