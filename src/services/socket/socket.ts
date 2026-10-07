import { io, type Socket } from 'socket.io-client'

export type NFTPriceUpdatedEvent = {
  nftId: string
  price: string
}

export type NFTStatusUpdatedEvent = {
  nftId: string
  available: boolean
}

type ServerToClientEvents = {
  'nft:price-updated': (
    data: NFTPriceUpdatedEvent,
  ) => void

  'nft:status-updated': (
    data: NFTStatusUpdatedEvent,
  ) => void
}

type ClientToServerEvents = {
  'nft:subscribe': (nftId: string) => void
  'nft:unsubscribe': (nftId: string) => void
}

export type KurioSocket = Socket<
  ServerToClientEvents,
  ClientToServerEvents
>

const socketUrl =
  import.meta.env.VITE_SOCKET_URL

export const socket: KurioSocket | null =
  socketUrl
    ? io(socketUrl, {
        autoConnect: false,
        transports: ['websocket'],
      })
    : null