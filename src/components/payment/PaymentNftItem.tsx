import type { CartItem } from '@/features/cart/cart-storage'

type PaymentNftItemProps = {
  item: CartItem
}

export function PaymentNftItem({ item }: PaymentNftItemProps) {
  const { nft, quantity } = item

  const total = Number(nft.price) * quantity

  return (
    <div
      className="
        flex
        h-[70px]
        w-full
        items-center
        gap-[10px]
        bg-[#241612]
        pl-[4px]
        pr-[16px]
      "
    >
      {/* IMAGEM */}
      <img
        src={nft.image}
        alt={nft.name}
        className="
          h-[62px]
          w-[62px]
          shrink-0
          rounded-[6px]
          object-cover
        "
      />

      {/* INFORMAÇÕES */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-[8px]">
          <p
            className="
              truncate
              text-[14px]
              font-bold
              leading-[16px]
              text-[#F5F1EB]
            "
          >
            {nft.name}
          </p>

          <span
            className="
              shrink-0
              text-[12px]
              leading-[16px]
              text-[#CFB28C]
            "
          >
            (x {quantity})
          </span>
        </div>

        <p
          className="
            mt-[4px]
            text-[12px]
            leading-[16px]
            text-[#B99062]
          "
        >
          ID do token: #{nft.id}
        </p>
      </div>

      {/* SUBTOTAL DO NFT */}
      <span
        className="
          shrink-0
          text-[14px]
          font-bold
          leading-[16px]
          text-[#E89B55]
        "
      >
        {total.toFixed(2)} {nft.currency}
      </span>
    </div>
  )
}