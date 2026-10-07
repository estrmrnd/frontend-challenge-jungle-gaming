import { useMutation } from '@tanstack/react-query'

import {
  createPayment,
  type CreatePaymentRequest,
  type PaymentResponse,
} from './payment-service'

export function useCreatePayment() {
  return useMutation<
    PaymentResponse,
    Error,
    CreatePaymentRequest
  >({
    mutationFn: createPayment,
  })
}