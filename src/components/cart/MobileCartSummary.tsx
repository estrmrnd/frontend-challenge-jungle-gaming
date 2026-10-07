import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { CartItem } from '@/features/cart/cart-storage'
import { api } from '@/services/api/client'

type MobileCartSummaryProps = {
  cart: CartItem[]
  onCheckout: () => void
}

type CouponResponse = {
  code: string
  status: 'valid' | 'invalid' | 'expired'
  discountPercentage: number
  message: string
}

const NETWORK_FEE = 0.016

export function MobileCartSummary({
  cart,
  onCheckout,
}: MobileCartSummaryProps) {
  const [promoCode, setPromoCode] =
    useState('')

  const [appliedCoupon, setAppliedCoupon] =
    useState<CouponResponse | null>(null)

  const [couponMessage, setCouponMessage] =
    useState('')

  const [
    isApplyingCoupon,
    setIsApplyingCoupon,
  ] = useState(false)

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.nft.price) *
        item.quantity,
    0,
  )

  const discountPercentage =
    appliedCoupon?.discountPercentage ?? 0

  const discount =
    subtotal *
    (discountPercentage / 100)

  const total =
    subtotal -
    discount +
    NETWORK_FEE

  async function handleApplyPromoCode() {
    const code = promoCode.trim()

    if (!code) {
      setAppliedCoupon(null)

      setCouponMessage(
        'Informe um código promocional.',
      )

      return
    }

    setIsApplyingCoupon(true)
    setCouponMessage('')

    try {
      const response =
        await api.post<CouponResponse>(
          '/coupons/validate',
          {
            code,
          },
        )

      setAppliedCoupon(response.data)

      setPromoCode(
        response.data.code,
      )

      setCouponMessage(
        response.data.message,
      )
    } catch (error) {
      setAppliedCoupon(null)

      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error
      ) {
        const axiosError = error as {
          response?: {
            data?: {
              message?: string
            }
          }
        }

        setCouponMessage(
          axiosError.response?.data
            ?.message ??
            'Não foi possível validar o cupom.',
        )
      } else {
        setCouponMessage(
          'Não foi possível validar o cupom.',
        )
      }
    } finally {
      setIsApplyingCoupon(false)
    }
  }

  function handleRemovePromoCode() {
    setAppliedCoupon(null)
    setPromoCode('')
    setCouponMessage(
      'Cupom removido.',
    )
  }

  return (
    <div
      className="
        flex
        h-[342px]
        w-full
        flex-col
        justify-between
        rounded-t-[40px]
        bg-[#241612]
        px-[24px]
        pb-[36px]
        pt-[24px]
      "
    >
      <div
        className="
          flex
          w-full
          flex-col
          gap-[12px]
        "
      >
        <div
          className="
            flex
            h-[50px]
            w-full
            overflow-hidden
            rounded-[40px]
            border
            border-[#3F2319]
            bg-[#241612]
            shadow-[0_6px_20px_0_rgba(10,6,4,0.45)]
          "
        >
          <Input
            value={promoCode}
            disabled={Boolean(
              appliedCoupon,
            )}
            onChange={(event) =>
              setPromoCode(
                event.target.value,
              )
            }
            placeholder="Digite o código promocional..."
            aria-label="Código promocional"
            className="
              h-[50px]
              min-w-0
              flex-1
              rounded-none
              border-0
              bg-transparent
              pl-[16px]
              pr-[8px]
              text-[12px]
              text-[#F5F1EB]
              shadow-none
              outline-none
              placeholder:text-[#B99062]
              focus-visible:ring-0
            "
          />

          {appliedCoupon ? (
            <Button
              type="button"
              onClick={
                handleRemovePromoCode
              }
              className="
                h-[50px]
                w-[97px]
                shrink-0
                cursor-pointer
                rounded-[40px]
                bg-[#D28A4C]
                p-0
                text-[14px]
                font-bold
                text-[#F5F1EB]
                shadow-none
                hover:bg-[#D28A4C]
                hover:opacity-90
              "
            >
              Remover
            </Button>
          ) : (
            <Button
              type="button"
              disabled={
                isApplyingCoupon
              }
              onClick={
                handleApplyPromoCode
              }
              className="
                h-[50px]
                w-[97px]
                shrink-0
                cursor-pointer
                rounded-[40px]
                bg-[#D28A4C]
                p-0
                text-[14px]
                font-bold
                text-[#F5F1EB]
                shadow-none
                hover:bg-[#D28A4C]
                hover:opacity-90
              "
            >
              {isApplyingCoupon
                ? 'Validando...'
                : 'Aplicar'}
            </Button>
          )}
        </div>

        {couponMessage && (
          <p
            role="status"
            className="
              px-[8px]
              text-[11px]
              text-[#E89B55]
            "
          >
            {couponMessage}
          </p>
        )}

        <div
          className="
            flex
            h-[20px]
            w-full
            items-center
            justify-between
            text-[14px]
            text-[#F5F1EB]
          "
        >
          <span>Subtotal</span>

          <span>
            {subtotal.toFixed(2)} ETH
          </span>
        </div>

        <div
          className="
            flex
            h-[20px]
            w-full
            items-center
            justify-between
            text-[14px]
            text-[#F5F1EB]
          "
        >
          <span>
            Desconto do lançamento
          </span>

          <span>
            (-) {discount.toFixed(2)}
          </span>
        </div>

        <div
          className="
            flex
            h-[36px]
            w-full
            items-start
            justify-between
            text-[14px]
            text-[#F5F1EB]
          "
        >
          <span>Taxa de rede</span>

          <div className="flex flex-col items-end">
            <span>
              {NETWORK_FEE.toFixed(3)}{' '}
              ETH
            </span>

            <span
              className="
                text-[11px]
                leading-[14px]
                text-[#E89B55]
              "
            >
              Taxa estimada
            </span>
          </div>
        </div>

        <div
          className="
            flex
            h-[16px]
            w-full
            items-center
            justify-between
          "
        >
          <span
            className="
              text-[14px]
              font-bold
              leading-[16px]
              text-[#F5F1EB]
            "
          >
            Total
          </span>

          <span
            className="
              text-[16px]
              font-bold
              leading-[16px]
              text-[#E89B55]
            "
          >
            {total.toFixed(3)} ETH
          </span>
        </div>
      </div>

      <Button
        type="button"
        onClick={onCheckout}
        className="
          h-[60px]
          w-full
          shrink-0
          cursor-pointer
          rounded-[40px]
          bg-[#D28A4C]
          text-[14px]
          font-bold
          text-[#140D0A]
          shadow-none
          hover:bg-[#D28A4C]
          hover:opacity-90
        "
      >
        Conectar e finalizar
      </Button>
    </div>
  )
}