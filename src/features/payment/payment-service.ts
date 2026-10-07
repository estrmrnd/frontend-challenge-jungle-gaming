import { api } from '@/services/api/client'

export type PaymentItem = {
  nftId: string
  quantity: number
}

export type CreatePaymentRequest = {
  items: PaymentItem[]
  wallet: string
  total: number
  idempotencyKey: string
}

export type PaymentStatus =
  | 'approved'
  | 'pending'
  | 'rejected'

export type PaymentResponse = {
  transactionId: string
  status: PaymentStatus
  total: number
  createdAt: string
}

export async function createPayment(
  payment: CreatePaymentRequest,
): Promise<PaymentResponse> {
  const response = await api.post<PaymentResponse>(
    '/payments',
    {
      items: payment.items,
      wallet: payment.wallet,
      total: payment.total,
    },
    {
      headers: {
        'Idempotency-Key': payment.idempotencyKey,
      },
    },
  )

  return response.data
}