import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { CartItem } from '@/features/cart/cart-storage'

type CartSummaryProps = {
  cart: CartItem[]
  onCheckout: () => void
}

const NETWORK_FEE = 0.016

export function CartSummary({
  cart,
  onCheckout,
}: CartSummaryProps) {
  const [promoCode, setPromoCode] = useState('')

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.nft.price) * item.quantity,
    0,
  )

  const discount = 0
  const total =
    subtotal - discount + NETWORK_FEE

  function handleApplyPromoCode() {
    if (!promoCode.trim()) return

    console.log(
      'Código promocional:',
      promoCode,
    )
  }

  return (
    <aside
      className="
        flex
        h-[388px]
        w-[30%]
        min-w-[260px]
        max-w-[332px]
        shrink-0
        flex-col
        gap-[24px]
        xl:w-[332px]
        xl:min-w-[332px]
      "
    >
      {/* TÍTULO */}

      <div
        className="
          flex
          h-[28px]
          w-full
          min-w-0
          items-start
          border-b
          border-[#6B452A]
        "
      >
        <h2
          className="
            text-[18px]
            font-bold
            leading-[16px]
            text-[#F5F1EB]
          "
        >
          Resumo da carteira
        </h2>
      </div>

      {/* CÓDIGO PROMOCIONAL */}

      <div className="flex w-full min-w-0 flex-col gap-[8px]">
        <label
          htmlFor="promo-code"
          className="
            h-[16px]
            text-[14px]
            font-bold
            leading-[16px]
            text-[#F5F1EB]
          "
        >
          Código promocional
        </label>

        <div className="flex h-[40px] w-full min-w-0">
          <Input
            id="promo-code"
            value={promoCode}
            onChange={(event) =>
              setPromoCode(
                event.target.value,
              )
            }
            placeholder="Digite o código promocional..."
            className="
              h-[40px]
              min-w-0
              flex-1
              rounded-r-none
              rounded-l-[3px]
              border
              border-r-0
              border-[#D28A4C]
              bg-transparent
              px-[8px]
              text-[12px]
              text-[#F5F1EB]
              placeholder:text-[#8D6B4A]
              focus-visible:border-[#D28A4C]
              focus-visible:ring-0
            "
          />

          <Button
            type="button"
            onClick={
              handleApplyPromoCode
            }
            className="
              h-[40px]
              w-[86px]
              shrink-0
              rounded-l-none
              rounded-r-[3px]
              bg-[#D28A4C]
              px-2
              text-[12px]
              font-bold
              text-[#140D0A]
              hover:bg-[#D28A4C]
              hover:text-[#140D0A]
              xl:w-[102px]
              xl:text-[13px]
            "
          >
            Aplicar
          </Button>
        </div>
      </div>

      {/* FEES */}

      <div
        className="
          flex
          min-h-[112px]
          w-full
          min-w-0
          flex-col
          gap-[12px]
          text-[14px]
        "
      >
        <div className="flex w-full min-w-0 justify-between gap-3">
          <span className="text-[#F5F1EB]">
            Subtotal
          </span>

          <span className="shrink-0 text-[#F5F1EB]">
            {subtotal.toFixed(2)} ETH
          </span>
        </div>

        <div className="flex w-full min-w-0 justify-between gap-3">
          <span className="text-[#F5F1EB]">
            Desconto do lançamento
          </span>

          <span className="shrink-0 text-[#F5F1EB]">
            (-) {discount.toFixed(2)}
          </span>
        </div>

        <div className="flex w-full min-w-0 justify-between gap-3">
          <span className="text-[#F5F1EB]">
            Taxa de rede
          </span>

          <div className="flex shrink-0 flex-col items-end gap-1">
            <span className="text-[#F5F1EB]">
              {NETWORK_FEE.toFixed(3)}{' '}
              ETH
            </span>

            <span className="text-[11px] text-[#E89B55]">
              Taxa estimada
            </span>
          </div>
        </div>
      </div>

      {/* TOTAL */}

      <div
        className="
          flex
          min-h-[16px]
          w-full
          min-w-0
          items-center
          justify-between
          gap-3
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
            shrink-0
            text-[16px]
            font-bold
            leading-[16px]
            text-[#E89B55]
          "
        >
          {total.toFixed(3)} ETH
        </span>
      </div>

      {/* CHECKOUT CTA */}

      <div
        className="
          flex
          min-h-[72px]
          w-full
          min-w-0
          flex-col
          items-center
          gap-[12px]
        "
      >
        <Button
          type="button"
          onClick={onCheckout}
          className="
            h-[40px]
            w-full
            min-w-0
            rounded-[3px]
            bg-[#D28A4C]
            px-3
            text-[13px]
            font-bold
            text-[#140D0A]
            hover:bg-[#D28A4C]
            hover:text-[#140D0A]
            xl:text-[14px]
          "
        >
          Conectar e finalizar
        </Button>

        <Button
          type="button"
          variant="link"
          className="
            h-[20px]
            w-auto
            max-w-full
            p-0
            text-[14px]
            font-normal
            leading-[16px]
            text-[#E89B55]
            hover:text-[#E89B55]
            xl:text-[15px]
          "
        >
          Continuar explorando
        </Button>
      </div>
    </aside>
  )
}