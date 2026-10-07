import { Link } from '@tanstack/react-router'
import { Heart } from 'lucide-react'

import type { NFT } from '../../types/nft'

type MobileNftCardProps = {
  nft: NFT
}

export function MobileNftCard({
  nft,
}: MobileNftCardProps) {
  return (
    <article
      className="
        flex
        w-37.5
        flex-col
        gap-2
        sm:w-full
      "
    >
      <Link
        to="/nft/$nftId"
        params={{
          nftId: nft.id,
        }}
        className="
          relative
          flex
          h-45
          w-37.5
          items-start
          justify-center
          overflow-hidden
          rounded-[18px]
          bg-[#241612]
          px-1
          pb-4
          pt-2.5

          sm:h-auto
          sm:w-full
          sm:aspect-[5/6]
          sm:p-2.5
        "
      >
        <img
          src={nft.image}
          alt={nft.name}
          className="
            h-40
            w-35.5
            rounded-[14px]
            object-cover

            sm:h-full
            sm:w-full
          "
        />

        {nft.id ===
          'emerald-ape-42' && (
          <button
            type="button"
            aria-label="Adicionar Emerald Ape aos favoritos"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
            }}
            className="
              absolute
              right-2
              top-2.5
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              bg-[#241612]
            "
          >
            <Heart
              className="h-3.75 w-3.75"
              strokeWidth={1.8}
              color="#D28A4C"
            />
          </button>
        )}

        {nft.id ===
          'neon-vessel-552' && (
          <span
            className="
              absolute
              left-0
              top-3.5
              flex
              h-6.25
              items-center
              bg-[#D28A4C]
              px-2.25
              text-[10px]
              font-bold
              text-[#140D0A]
            "
          >
            RARO
          </span>
        )}
      </Link>

      <div
        className="
          flex
          w-37.5
          flex-col
          pl-1.5
          sm:w-full
        "
      >
        <p
          className="
            truncate
            text-[13px]
            font-normal
            leading-4
            text-[#F5F1EB]
          "
        >
          {nft.name}
        </p>

        <p
          className="
            text-[14px]
            font-bold
            leading-4
            text-[#E89B55]
          "
        >
          {nft.price} {nft.currency}
        </p>
      </div>
    </article>
  )
}