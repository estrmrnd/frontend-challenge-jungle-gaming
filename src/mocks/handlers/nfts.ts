import { delay, http, HttpResponse } from 'msw'
import { nfts } from '../fixtures/nfts'

export const nftHandlers = [
  http.get('/api/nfts', async ({ request }) => {
    const url = new URL(request.url)
    const scenario = url.searchParams.get('scenario')

    if (scenario === 'empty') {
      return HttpResponse.json([])
    }

    if (scenario === 'error') {
      return HttpResponse.json(
        {
          message: 'Erro ao carregar NFTs',
        },
        {
          status: 500,
        },
      )
    }

    if (scenario === 'slow') {
      await delay(3000)

      return HttpResponse.json(nfts)
    }

    return HttpResponse.json(nfts)
  }),

  http.get('/api/nfts/:id', ({ params }) => {
    const nft = nfts.find(
      (item) => item.id === params.id,
    )

    if (!nft) {
      return HttpResponse.json(
        {
          message: 'NFT não encontrado',
        },
        {
          status: 404,
        },
      )
    }

    return HttpResponse.json(nft)
  }),
]