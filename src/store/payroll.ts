import { create } from 'zustand';
import { PayrollPeriod } from '@/components/payroll/types';

interface PayrollState {
  payrolls: PayrollPeriod[];
  setPayrolls: (payrolls: PayrollPeriod[]) => void;
  addPayroll: (payroll: PayrollPeriod) => void;
  updatePayroll: (payroll: PayrollPeriod) => void;
}

export const usePayrollStore = create<PayrollState>((set) => ({
  payrolls: [],
  setPayrolls: (payrolls) => set({ payrolls }),
  addPayroll: (payroll) => set((state) => ({
    payrolls: [...state.payrolls, payroll]
  })),
  updatePayroll: (payroll) => set((state) => ({
    payrolls: state.payrolls.map((p) => 
      p.id === payroll.id ? payroll : p
    )
  }))
}));
