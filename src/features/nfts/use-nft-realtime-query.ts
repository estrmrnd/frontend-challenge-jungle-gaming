import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import type { NFT } from '@/types/nft'

import { useNFTRealtime } from './use-nft-realtime'

type UseNFTRealtimeQueryProps = {
  nftId: string
}

export function useNFTRealtimeQuery({
  nftId,
}: UseNFTRealtimeQueryProps) {
  const queryClient = useQueryClient()

  const handlePriceUpdated = useCallback(
    (data: {
      nftId: string
      price: string
    }) => {
      queryClient.setQueryData<NFT>(
        ['nfts', data.nftId],
        (currentNft) => {
          if (!currentNft) {
            return currentNft
          }

          return {
            ...currentNft,
            price: data.price,
          }
        },
      )

      queryClient.setQueryData<NFT[]>(
        ['nfts', 'normal'],
        (currentNfts) => {
          if (!currentNfts) {
            return currentNfts
          }

          return currentNfts.map((nft) =>
            nft.id === data.nftId
              ? {
                  ...nft,
                  price: data.price,
                }
              : nft,
          )
        },
      )
    },
    [queryClient],
  )

  const handleStatusUpdated = useCallback(
    (data: {
      nftId: string
      available: boolean
    }) => {
      queryClient.setQueryData<NFT>(
        ['nfts', data.nftId],
        (currentNft) => {
          if (!currentNft) {
            return currentNft
          }

          return {
            ...currentNft,
            available: data.available,
          }
        },
      )

      queryClient.setQueryData<NFT[]>(
        ['nfts', 'normal'],
        (currentNfts) => {
          if (!currentNfts) {
            return currentNfts
          }

          return currentNfts.map((nft) =>
            nft.id === data.nftId
              ? {
                  ...nft,
                  available: data.available,
                }
              : nft,
          )
        },
      )
    },
    [queryClient],
  )

  useNFTRealtime({
    nftId,
    onPriceUpdated: handlePriceUpdated,
    onStatusUpdated: handleStatusUpdated,
  })
}