export type Invoice = {
  id: string;
  number: string;
  type: 'invoice' | 'credit' | 'refund';
  date: Date;
  dueDate: Date;
  customerEmail: string;
  status: 'draft' | 'sent' | 'paid' | 'void';
  subtotal: number;
  total: number;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Payment = {
  id: string;
  type: 'payment' | 'credit' | 'refund';
  date: Date;
  amount: number;
  method: 'stripe' | 'cash' | 'bank_transfer';
  description: string;
  stripeTransactionId?: string;
  createdAt: Date;
  updatedAt: Date;
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
  status: 'active' | 'inactive' | 'expired';
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
};
