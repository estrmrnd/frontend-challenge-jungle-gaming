import { http, HttpResponse } from 'msw'

type CouponStatus =
  | 'valid'
  | 'invalid'
  | 'expired'

type CouponResponse = {
  code: string
  status: CouponStatus
  discountPercentage: number
  message: string
}

const coupons: Record<
  string,
  CouponResponse
> = {
  KURIO10: {
    code: 'KURIO10',
    status: 'valid',
    discountPercentage: 10,
    message: 'Cupom aplicado com sucesso.',
  },

  EXPIRED10: {
    code: 'EXPIRED10',
    status: 'expired',
    discountPercentage: 0,
    message: 'Este cupom está expirado.',
  },
}

export const couponHandlers = [
  http.post(
    '/api/coupons/validate',
    async ({ request }) => {
      const body = (await request.json()) as {
        code?: string
      }

      const code =
        body.code?.trim().toUpperCase() ?? ''

      if (!code) {
        return HttpResponse.json(
          {
            code,
            status: 'invalid',
            discountPercentage: 0,
            message:
              'Informe um código promocional.',
          } satisfies CouponResponse,
          {
            status: 400,
          },
        )
      }

      const coupon = coupons[code]

      if (!coupon) {
        return HttpResponse.json(
          {
            code,
            status: 'invalid',
            discountPercentage: 0,
            message:
              'Código promocional inválido.',
          } satisfies CouponResponse,
          {
            status: 404,
          },
        )
      }

      if (coupon.status === 'expired') {
        return HttpResponse.json(coupon, {
          status: 410,
        })
      }

      return HttpResponse.json(coupon)
    },
  ),
]
