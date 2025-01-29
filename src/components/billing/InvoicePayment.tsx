import { useState } from 'react'
import { Invoice } from './types'
import PaymentForm from './PaymentForm'
import { formatCurrency } from '@/lib/utils'

interface InvoicePaymentProps {
  invoice: Invoice
  onPaymentComplete: (paymentId: string) => void
}

export default function InvoicePayment({ invoice, onPaymentComplete }: InvoicePaymentProps) {
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  if (!showPaymentForm) {
    return (
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Invoice #{invoice.number}</h3>
          <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900">
                {formatCurrency(invoice.total)}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Balance Due</dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900">
                {formatCurrency(invoice.balance)}
              </dd>
            </div>
          </dl>
          <button
            onClick={() => setShowPaymentForm(true)}
            className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Pay Now
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => setShowPaymentForm(false)}
        className="text-sm text-primary-600 hover:text-primary-900"
      >
        ← Back to invoice details
      </button>
      
      <PaymentForm
        amount={invoice.balance}
        onSuccess={onPaymentComplete}
        onError={(error) => console.error(error)}
      />
    </div>
  )
}
