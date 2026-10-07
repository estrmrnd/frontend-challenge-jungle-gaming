import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { CartItem } from '@/features/cart/cart-storage'

type MobileCartSummaryProps = {
  cart: CartItem[]
  onCheckout: () => void
}

const NETWORK_FEE = 0.016

export function MobileCartSummary({
  cart,
  onCheckout,
}: MobileCartSummaryProps) {
  const [promoCode, setPromoCode] = useState('')

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.nft.price) * item.quantity,
    0,
  )

  const discount = 0
  const total = subtotal - discount + NETWORK_FEE

  function handleApplyPromoCode() {
    if (!promoCode.trim()) return

    console.log('Código promocional:', promoCode)
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
      {/* CONTEÚDO */}
      <div
        className="
          flex
          w-full
          flex-col
          gap-[12px]
        "
      >
        {/* CÓDIGO PROMOCIONAL */}
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
            onChange={(event) =>
              setPromoCode(event.target.value)
            }
            placeholder="Digite o código promocional..."
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

          <Button
            type="button"
            onClick={handleApplyPromoCode}
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
            Aplicar
          </Button>
        </div>

        {/* SUBTOTAL */}
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

        {/* DESCONTO */}
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
          <span>Desconto do lançamento</span>

          <span>
            (-) {discount.toFixed(2)}
          </span>
        </div>

        {/* TAXA DE REDE */}
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
              {NETWORK_FEE.toFixed(3)} ETH
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

        {/* TOTAL */}
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

      {/* CHECKOUT */}
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