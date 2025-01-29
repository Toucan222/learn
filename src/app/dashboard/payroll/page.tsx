'use client';

import { useState } from 'react';
import PayrollList from '@/components/payroll/PayrollList';
import PayrollDetail from '@/components/payroll/PayrollDetail';
import { usePayrollStore } from '@/store/payroll';
import { PayrollPeriod } from '@/components/payroll/types';

export default function PayrollPage() {
  const [selectedPayroll, setSelectedPayroll] = useState<PayrollPeriod | null>(null);
  const payrolls = usePayrollStore((state) => state.payrolls);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Payroll</h1>
      </div>

      {selectedPayroll ? (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedPayroll(null)}
            className="text-sm text-primary-600 hover:text-primary-900"
          >
            ← Back to payroll list
          </button>
          <PayrollDetail
            payroll={selectedPayroll}
            wageCalculation={{
              regularHours: selectedPayroll.totalHours,
              premiumHours: 0,
              baseRate: selectedPayroll.baseWage,
              premiumRate: selectedPayroll.premiumWage,
              totalRegular: selectedPayroll.totalAmount,
              totalPremium: 0,
              total: selectedPayroll.totalAmount
            }}
          />
        </div>
      ) : (
        <PayrollList
          payrolls={payrolls}
          onView={setSelectedPayroll}
        />
      )}
    </div>
  );
}
