import { useState } from 'react';
import { PayrollPeriod } from './types';
import { formatCurrency, formatDateTime } from '@/lib/utils';

interface PayrollListProps {
  payrolls: PayrollPeriod[];
  onView: (payroll: PayrollPeriod) => void;
}

export default function PayrollList({ payrolls, onView }: PayrollListProps) {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Period
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Teacher
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hours
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payrolls.map((payroll) => (
            <tr
              key={payroll.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onView(payroll)}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDateTime(payroll.startDate)} - {formatDateTime(payroll.endDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {payroll.teacherId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {payroll.totalHours}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(payroll.totalAmount)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    payroll.status === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : payroll.status === 'processing'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {payroll.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
