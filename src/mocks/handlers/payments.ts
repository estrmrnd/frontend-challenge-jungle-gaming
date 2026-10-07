import { http, HttpResponse } from 'msw'

import type {
  CreatePaymentRequest,
  PaymentResponse,
} from '@/features/payment/payment-service'

const processedPayments = new Map<string, PaymentResponse>()

export const paymentHandlers = [
  http.post('/api/payments', async ({ request }) => {
    const idempotencyKey = request.headers.get('Idempotency-Key')

    if (!idempotencyKey) {
      return HttpResponse.json(
        {
          message: 'Idempotency-Key é obrigatória.',
        },
        {
          status: 400,
        },
      )
    }

    // Se essa compra já foi processada, devolvemos
    // exatamente a mesma transação.
    const existingPayment = processedPayments.get(idempotencyKey)

    if (existingPayment) {
      return HttpResponse.json(existingPayment)
    }

    const body =
      (await request.json()) as Omit<
        CreatePaymentRequest,
        'idempotencyKey'
      >

    if (!body.items?.length) {
      return HttpResponse.json(
        {
          message: 'O carrinho está vazio.',
        },
        {
          status: 400,
        },
      )
    }

    if (!body.wallet) {
      return HttpResponse.json(
        {
          message: 'Selecione uma carteira.',
        },
        {
          status: 400,
        },
      )
    }

    const payment: PaymentResponse = {
      transactionId: crypto.randomUUID(),
      status: 'approved',
      total: body.total,
      createdAt: new Date().toISOString(),
    }

    processedPayments.set(idempotencyKey, payment)

    return HttpResponse.json(payment, {
      status: 201,
    })
  }),
]