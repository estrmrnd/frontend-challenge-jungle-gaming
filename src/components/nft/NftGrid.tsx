import type { NFT } from '../../types/nft'
import { NftCard } from './NftCard'

type NftGridProps = {
  nfts: NFT[]
}

export function NftGrid({ nfts }: NftGridProps) {
  return (
    <div
      className="
        grid w-210.5
        grid-cols-3
        justify-between
        gap-y-8
      "
    >
      {nfts.map((nft) => (
        <NftCard
          key={nft.id}
          nft={nft}
        />
      ))}
    </div>
  )
}