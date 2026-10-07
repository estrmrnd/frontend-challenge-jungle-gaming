import { Minus, Plus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { CartItem as CartItemType } from '@/features/cart/cart-storage'

type CartItemProps = {
  item: CartItemType
  onIncrease: (nftId: string) => void
  onDecrease: (nftId: string) => void
  onRemove: (nftId: string) => void
}

export function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  const { nft, quantity } = item

  const total =
    Number(nft.price) * quantity

  return (
    <div
      className="
        grid
        h-[70px]
        w-full
        min-w-0
        grid-cols-[minmax(180px,2.2fr)_minmax(80px,1fr)_minmax(100px,1fr)_minmax(80px,1fr)_40px]
        items-center
        bg-[#241612]
        xl:w-[782px]
        xl:grid-cols-[310px_140px_140px_140px_52px]
      "
    >
      {/* NFT */}

      <div className="flex h-[70px] min-w-0 items-center gap-[12px] xl:gap-[16px]">
        <img
          src={nft.image}
          alt={nft.name}
          className="
            h-[70px]
            w-[70px]
            shrink-0
            rounded-[6px]
            object-cover
          "
        />

        <div className="min-w-0">
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

          <p
            className="
              mt-[4px]
              truncate
              text-[12px]
              leading-[16px]
              text-[#B99062]
            "
          >
            ID do token: #0042
          </p>
        </div>
      </div>

      {/* PREÇO */}

      <div className="flex min-w-0 items-center">
        <span
          className="
            whitespace-nowrap
            text-[13px]
            leading-[16px]
            text-[#CFB28C]
            xl:text-[14px]
          "
        >
          {nft.price} {nft.currency}
        </span>
      </div>

      {/* EDIÇÕES */}

      <div className="flex min-w-0 items-center gap-[6px] xl:gap-[8px]">
        <Button
          type="button"
          size="icon"
          aria-label="Diminuir quantidade"
          onClick={() =>
            onDecrease(nft.id)
          }
          className="
            h-[26px]
            w-[22px]
            min-w-[22px]
            rounded-full
            bg-[#D88948]
            p-0
            text-[#241612]
            hover:bg-[#D88948]
            hover:text-[#241612]
          "
        >
          <Minus
            size={13}
            strokeWidth={2}
          />
        </Button>

        <span
          className="
            min-w-[10px]
            text-center
            text-[14px]
            text-[#F5F1EB]
          "
        >
          {quantity}
        </span>

        <Button
          type="button"
          size="icon"
          aria-label="Aumentar quantidade"
          onClick={() =>
            onIncrease(nft.id)
          }
          className="
            h-[26px]
            w-[22px]
            min-w-[22px]
            rounded-full
            bg-[#D88948]
            p-0
            text-[#241612]
            hover:bg-[#D88948]
            hover:text-[#241612]
          "
        >
          <Plus
            size={13}
            strokeWidth={2}
          />
        </Button>
      </div>

      {/* TOTAL */}

      <span
        className="
          whitespace-nowrap
          text-[13px]
          font-bold
          leading-[16px]
          text-[#E89B55]
          xl:text-[14px]
        "
      >
        {total.toFixed(2)}{' '}
        {nft.currency}
      </span>

      {/* REMOVER */}

      <div className="flex min-w-0 justify-end pr-[4px] xl:pr-[8px]">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`Remover ${nft.name} do carrinho`}
          onClick={() =>
            onRemove(nft.id)
          }
          className="
            h-[32px]
            w-[32px]
            text-[#B99062]
            hover:bg-[#342018]
            hover:text-[#E89B55]
          "
        >
          <Trash2
            size={15}
            strokeWidth={1.5}
          />
        </Button>
      </div>
    </div>
  )
}