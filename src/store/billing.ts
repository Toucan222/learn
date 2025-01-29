import { create } from 'zustand'
import { Invoice, Payment, Package } from '@/components/billing/types'

interface BillingState {
  invoices: Invoice[]
  payments: Payment[]
  packages: Package[]
  setInvoices: (invoices: Invoice[]) => void
  setPayments: (payments: Payment[]) => void
  setPackages: (packages: Package[]) => void
  addPayment: (payment: Payment) => void
  addPackage: (pkg: Package) => void
  updateInvoice: (invoice: Invoice) => void
}

export const useBillingStore = create<BillingState>((set) => ({
  invoices: [],
  payments: [],
  packages: [],
  setInvoices: (invoices) => set({ invoices }),
  setPayments: (payments) => set({ payments }),
  setPackages: (packages) => set({ packages }),
  addPayment: (payment) => set((state) => ({
    payments: [...state.payments, payment]
  })),
  addPackage: (pkg) => set((state) => ({
    packages: [...state.packages, pkg]
  })),
  updateInvoice: (invoice) => set((state) => ({
    invoices: state.invoices.map((inv) => 
      inv.id === invoice.id ? invoice : inv
    )
  }))
}))
