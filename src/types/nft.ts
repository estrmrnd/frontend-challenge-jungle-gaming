export type NFTCategory =
  | 'Arte'
  | 'Colecionáveis'
  | 'Fotografia'
  | 'Música'
  | 'Arte 3D'
  | 'Generativa'
  | 'Jogos'
  | 'Assinaturas'
  | 'Utilidade'

export type NFTNetwork =
  | 'ethereum'
  | 'polygon'
  | 'solana'

export type NFT = {
  id: string
  name: string
  image: string
  price: string
  currency: 'ETH'
  category: NFTCategory
  network: NFTNetwork
  creator: string
  available: boolean
  featured: boolean
  createdAt: string
  trending: boolean
}