import type { NFT } from '../../types/nft'
import { Link } from '@tanstack/react-router'

type NftCardProps = {
  nft: NFT
}

export function NftCard({ nft }: NftCardProps) {
  return (
    <article
      className="
        flex w-64.5
        flex-col
        gap-3
        bg-[#241612]
        p-2
      "
    >
      <Link to={`/nft/${nft.id}`}>
        <div
          className="
            h-[284px] w-full
            overflow-hidden
            rounded-[12px]
            bg-[#241612]
          "
        >
          <img
            src={nft.image}
            alt={nft.name}
            className="h-full w-full object-cover"
          />
        </div>
      </Link>

      <p
        className="
          h-4 w-full
          text-[16px] font-normal
          leading-4 tracking-normal
          text-[#F5F1EB]
        "
      >
        {nft.name}
      </p>

      <p
        className="
          h-4 w-full
          text-[18px] font-bold
          leading-4 tracking-normal
          text-[#E89B55]
        "
      >
        {nft.price} {nft.currency}
      </p>
    </article>
  )
}