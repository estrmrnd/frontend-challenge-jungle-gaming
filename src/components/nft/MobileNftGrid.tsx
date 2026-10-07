import type { NFT } from '../../types/nft'
import { MobileNftCard } from './MobileNftCard'

type MobileNftGridProps = {
  nfts: NFT[]
}

export function MobileNftGrid({
  nfts,
}: MobileNftGridProps) {
  const leftColumn = nfts.filter(
    (_, index) => index % 2 === 0,
  )

  const rightColumn = nfts.filter(
    (_, index) => index % 2 !== 0,
  )

  return (
    <div
      className="
        flex
        w-full
        justify-between
        gap-4
        sm:gap-6
      "
    >
      {/* COLUNA ESQUERDA */}
      <div
        className="
          flex
          w-37.5
          flex-col
          gap-6
          sm:w-[calc(50%-12px)]
        "
      >
        {leftColumn.map((nft) => (
          <MobileNftCard
            key={nft.id}
            nft={nft}
          />
        ))}
      </div>

      {/* COLUNA DIREITA */}
      <div
        className="
          flex
          w-37.5
          flex-col
          gap-6
          pt-7
          sm:w-[calc(50%-12px)]
        "
      >
        {rightColumn.map((nft) => (
          <MobileNftCard
            key={nft.id}
            nft={nft}
          />
        ))}
      </div>
    </div>
  )
}