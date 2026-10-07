import { PaymentNftItem } from '@/components/payment/PaymentNftItem'
import type { CartItem } from '@/features/cart/cart-storage'

type PaymentSummaryProps = {
  cart: CartItem[]
}

const NETWORK_FEE = 0.016

export function PaymentSummary({
  cart,
}: PaymentSummaryProps) {
  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.nft.price) * item.quantity,
    0,
  )

  const discount = 0

  const total =
    subtotal - discount + NETWORK_FEE

  return (
    <div
      className="
        flex
        w-full
        min-w-0
        flex-col
        gap-[12px]
        xl:w-[405px]
      "
    >
      {/* SEUS NFTs */}

      <div className="flex w-full min-w-0 flex-col">
        <div
          className="
            flex
            h-[28px]
            w-full
            min-w-0
            items-start
            justify-between
            gap-4
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
            Seus NFTs
          </span>

          <span
            className="
              shrink-0
              text-[14px]
              leading-[16px]
              text-[#F5F1EB]
            "
          >
            Subtotal
          </span>
        </div>

        <div className="flex w-full min-w-0 flex-col gap-[12px]">
          {cart.map((item) => (
            <PaymentNftItem
              key={item.nft.id}
              item={item}
            />
          ))}
        </div>
      </div>

      {/* RESUMO */}

      <div
        className="
          flex
          w-full
          min-w-0
          flex-col
          gap-[12px]
        "
      >
        <p
          className="
            text-center
            text-[12px]
            leading-[16px]
            text-[#F5F1EB]
          "
        >
          Tem um código promocional?{' '}
          <button
            type="button"
            className="
              cursor-pointer
              text-[#F5F1EB]
              underline
              underline-offset-2
            "
          >
            Aplique aqui
          </button>
        </p>

        {/* SUBTOTAL */}

        <div
          className="
            flex
            min-h-[20px]
            w-full
            min-w-0
            items-center
            justify-between
            gap-4
            text-[14px]
            text-[#F5F1EB]
          "
        >
          <span>Subtotal</span>

          <span className="shrink-0">
            {subtotal.toFixed(2)} ETH
          </span>
        </div>

        {/* DESCONTO */}

        <div
          className="
            flex
            min-h-[20px]
            w-full
            min-w-0
            items-center
            justify-between
            gap-4
            text-[14px]
            text-[#F5F1EB]
          "
        >
          <span>
            Desconto do lançamento
          </span>

          <span className="shrink-0">
            (-) {discount.toFixed(2)}
          </span>
        </div>

        {/* TAXA */}

        <div
          className="
            flex
            min-h-[36px]
            w-full
            min-w-0
            items-start
            justify-between
            gap-4
            text-[14px]
            text-[#F5F1EB]
          "
        >
          <span>Taxa de rede</span>

          <div className="flex shrink-0 flex-col items-end">
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

        <div className="h-px w-full bg-[#6B452A]" />

        {/* TOTAL */}

        <div
          className="
            flex
            min-h-[20px]
            w-full
            min-w-0
            items-center
            justify-between
            gap-4
          "
        >
          <span
            className="
              text-[14px]
              font-bold
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
              text-[#E89B55]
            "
          >
            {total.toFixed(3)} ETH
          </span>
        </div>
      </div>
    </div>
  )
}