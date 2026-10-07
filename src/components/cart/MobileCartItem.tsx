import { Minus, Plus } from 'lucide-react'

import type { CartItem as CartItemType } from '@/features/cart/cart-storage'

type MobileCartItemProps = {
  item: CartItemType
  onIncrease: (nftId: string) => void
  onDecrease: (nftId: string) => void
  onRemove: (nftId: string) => void
}

export function MobileCartItem({
  item,
  onIncrease,
  onDecrease,
}: MobileCartItemProps) {
  const { nft, quantity } = item

  const total =
    Number(nft.price) * quantity

  return (
    <div
      className="
        relative
        flex
        h-[100px]
        min-h-[100px]
        max-h-[100px]
        w-full
        max-w-[358px]
        shrink-0
        overflow-hidden
        rounded-[14px]
        bg-[#241612]
        shadow-[0_6px_20px_0_rgba(10,6,4,0.45)]
      "
    >
      {/* IMAGEM */}
      <img
        src={nft.image}
        alt={nft.name}
        className="
          h-[100px]
          w-[100px]
          shrink-0
          rounded-[14px]
          object-cover
        "
      />

      {/* INFORMAÇÕES */}
      <div
        className="
          relative
          h-[100px]
          min-w-0
          flex-1
        "
      >
        {/* NOME */}
        <p
          className="
            absolute
            left-[9px]
            top-[13px]
            max-w-[145px]
            truncate
            text-[15px]
            font-bold
            leading-[16px]
            text-[#F5F1EB]
          "
        >
          {nft.name}
        </p>

        {/* EDIÇÃO */}
        <p
          className="
            absolute
            left-[9px]
            top-[35px]
            text-[14px]
            font-normal
            leading-[16px]
            text-[#CFB28C]
          "
        >
          Edição: 1/50
        </p>

        {/* PREÇO TOTAL DO ITEM */}
        <p
          className="
            absolute
            left-[9px]
            top-[69px]
            text-[18px]
            font-bold
            leading-[16px]
            text-[#E89B55]
          "
        >
          {total.toFixed(2)}{' '}
          {nft.currency}
        </p>

        {/* QUANTIDADE */}
        <div
          className="
            absolute
            right-[10px]
            top-[29px]
            flex
            h-[29px]
            w-[81px]
            items-center
            justify-between
          "
        >
          {/* DIMINUIR */}
          <button
            type="button"
            aria-label="Diminuir quantidade"
            onClick={() =>
              onDecrease(nft.id)
            }
            className="
              flex
              h-[24px]
              w-[24px]
              cursor-pointer
              items-center
              justify-center
              rounded-full
              bg-[#38241D]
              text-[#CFB28C]
              transition-opacity
              hover:opacity-80
            "
          >
            <Minus
              size={13}
              strokeWidth={1.5}
            />
          </button>

          {/* QUANTIDADE */}
          <span
            className="
              min-w-[14px]
              text-center
              text-[14px]
              leading-[16px]
              text-[#F5F1EB]
            "
          >
            {quantity}
          </span>

          {/* AUMENTAR */}
          <button
            type="button"
            aria-label="Aumentar quantidade"
            onClick={() =>
              onIncrease(nft.id)
            }
            className="
              flex
              h-[24px]
              w-[24px]
              cursor-pointer
              items-center
              justify-center
              rounded-full
              bg-[#38241D]
              text-[#F5F1EB]
              transition-opacity
              hover:opacity-80
            "
          >
            <Plus
              size={14}
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>
    </div>
  )
}