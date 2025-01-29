// Placeholder Stripe configuration
const STRIPE_DEMO_KEY = 'pk_test_demo_key'

export const stripe = {
  async createPaymentIntent({ amount, currency = 'usd' }: { amount: number; currency?: string }) {
    if (!process.env.NEXT_PUBLIC_STRIPE_KEY) {
      // Demo mode - simulate payment intent creation
      return {
        clientSecret: `demo_pi_${Math.random().toString(36).substr(2, 9)}`,
        amount,
        currency
      }
    }
    // Real Stripe integration would go here
  },

  async createCustomer({ email, name }: { email: string; name: string }) {
    if (!process.env.NEXT_PUBLIC_STRIPE_KEY) {
      // Demo mode - simulate customer creation
      return {
        id: `demo_cus_${Math.random().toString(36).substr(2, 9)}`,
        email,
        name
      }
    }
    // Real Stripe customer creation would go here
  }
}
