import { useEffect } from 'react'

import {
  socket,
  type NFTPriceUpdatedEvent,
  type NFTStatusUpdatedEvent,
} from '@/services/socket/socket'

type UseNFTRealtimeProps = {
  nftId: string
  onPriceUpdated?: (
    data: NFTPriceUpdatedEvent,
  ) => void
  onStatusUpdated?: (
    data: NFTStatusUpdatedEvent,
  ) => void
}

export function useNFTRealtime({
  nftId,
  onPriceUpdated,
  onStatusUpdated,
}: UseNFTRealtimeProps) {
  useEffect(() => {
    if (!socket) {
      return
    }

    const activeSocket = socket

    function handlePriceUpdated(
      data: NFTPriceUpdatedEvent,
    ) {
      if (data.nftId !== nftId) {
        return
      }

      onPriceUpdated?.(data)
    }

    function handleStatusUpdated(
      data: NFTStatusUpdatedEvent,
    ) {
      if (data.nftId !== nftId) {
        return
      }

      onStatusUpdated?.(data)
    }

    const connectionTimer = window.setTimeout(
      () => {
        activeSocket.on(
          'nft:price-updated',
          handlePriceUpdated,
        )

        activeSocket.on(
          'nft:status-updated',
          handleStatusUpdated,
        )

        activeSocket.connect()

        activeSocket.emit(
          'nft:subscribe',
          nftId,
        )
      },
      1000,
    )

    return () => {
      window.clearTimeout(connectionTimer)

      activeSocket.emit(
        'nft:unsubscribe',
        nftId,
      )

      activeSocket.off(
        'nft:price-updated',
        handlePriceUpdated,
      )

      activeSocket.off(
        'nft:status-updated',
        handleStatusUpdated,
      )

      activeSocket.disconnect()
    }
  }, [
    nftId,
    onPriceUpdated,
    onStatusUpdated,
  ])
}