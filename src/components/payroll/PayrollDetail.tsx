import { PayrollPeriod, WageCalculation } from './types';
import { formatCurrency, formatDateTime } from '@/lib/utils';

interface PayrollDetailProps {
  payroll: PayrollPeriod;
  wageCalculation: WageCalculation;
}

export default function PayrollDetail({ payroll, wageCalculation }: PayrollDetailProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Payroll Details
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Period: {formatDateTime(payroll.startDate)} - {formatDateTime(payroll.endDate)}
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Regular Hours</dt>
            <dd className="mt-1 text-sm text-gray-900">{wageCalculation.regularHours}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Premium Hours</dt>
            <dd className="mt-1 text-sm text-gray-900">{wageCalculation.premiumHours}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Regular Earnings</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatCurrency(wageCalculation.totalRegular)}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Premium Earnings</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatCurrency(wageCalculation.totalPremium)}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Total Earnings</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatCurrency(wageCalculation.total)}
            </dd>
          </div>
          {payroll.notes && (
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Notes</dt>
              <dd className="mt-1 text-sm text-gray-900">{payroll.notes}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
