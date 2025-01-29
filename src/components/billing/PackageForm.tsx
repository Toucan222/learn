'use client';

import { useState } from 'react'
import { Package } from './types'
import PaymentForm from './PaymentForm'

interface PackageFormProps {
  onPurchase: (pkg: Partial<Package>) => void;
}

export default function PackageForm({ onPurchase }: PackageFormProps) {
  const [step, setStep] = useState<'details' | 'payment'>('details')
  const [packageDetails, setPackageDetails] = useState<Partial<Package>>({
    purchased: 10,
    totalCost: 50000, // $500.00
  })

  const handlePaymentSuccess = (paymentId: string) => {
    onPurchase({
      ...packageDetails,
      status: 'active',
      used: 0,
      unused: packageDetails.purchased,
      scheduled: 0,
      unscheduled: packageDetails.purchased,
      overscheduled: 0,
      overused: 0
    })
  }

  if (step === 'payment') {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setStep('details')}
          className="text-sm text-primary-600 hover:text-primary-900"
        >
          ← Back to package details
        </button>
        
        <PaymentForm
          amount={packageDetails.totalCost!}
          onSuccess={handlePaymentSuccess}
          onError={(error) => console.error(error)}
        />
      </div>
    )
  }

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault()
        setStep('payment')
      }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Number of Lessons
        </label>
        <select
          value={packageDetails.purchased}
          onChange={(e) => {
            const lessons = Number(e.target.value)
            setPackageDetails({
              ...packageDetails,
              purchased: lessons,
              totalCost: lessons * 5000, // $50 per lesson
            })
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="5">5 Lessons</option>
          <option value="10">10 Lessons</option>
          <option value="20">20 Lessons</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Total Cost
        </label>
        <p className="mt-1 text-lg font-semibold">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(packageDetails.totalCost! / 100)}
        </p>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Proceed to Payment
      </button>
    </form>
  )
}
