import { useQuery } from '@tanstack/react-query'

import { api } from '@/services/api/client'
import type { NFT } from '@/types/nft'

export type NFTMockScenario =
  | 'empty'
  | 'error'
  | 'slow'

async function getNfts(
  scenario?: NFTMockScenario,
  signal?: AbortSignal,
): Promise<NFT[]> {
  const response = await api.get<NFT[]>(
    '/nfts',
    {
      params: scenario
        ? {
            scenario,
          }
        : undefined,

      signal,
    },
  )

  return response.data
}

export function useNfts(
  scenario?: NFTMockScenario,
) {
  return useQuery({
    queryKey: [
      'nfts',
      scenario ?? 'normal',
    ],

    queryFn: ({ signal }) =>
      getNfts(scenario, signal),
  })
}

export function useNft(nftId: string) {
  return useQuery({
    queryKey: ['nfts', nftId],

    queryFn: async ({ signal }) => {
      const response = await api.get<NFT>(
        `/nfts/${nftId}`,
        {
          signal,
        },
      )

      return response.data
    },

    enabled: Boolean(nftId),
  })
}