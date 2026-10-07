import type { CartItem } from '@/features/cart/cart-storage'
import type { PaymentResponse } from './payment-service'

const PAYMENT_STORAGE_KEY = 'kurio-last-payment'

export type StoredPayment = {
  payment: PaymentResponse
  cart: CartItem[]
  wallet: string
  networkFee: number
}

export function saveLastPayment(
  payment: PaymentResponse,
  cart: CartItem[],
  wallet: string,
  networkFee: number,
) {
  const data: StoredPayment = {
    payment,
    cart,
    wallet,
    networkFee,
  }

  sessionStorage.setItem(
    PAYMENT_STORAGE_KEY,
    JSON.stringify(data),
  )
}

export function getLastPayment(): StoredPayment | null {
  const storedPayment = sessionStorage.getItem(
    PAYMENT_STORAGE_KEY,
  )

  if (!storedPayment) {
    return null
  }

  try {
    return JSON.parse(storedPayment) as StoredPayment
  } catch {
    return null
  }
}

export function clearLastPayment() {
  sessionStorage.removeItem(PAYMENT_STORAGE_KEY)
}