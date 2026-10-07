import { setupWorker } from 'msw/browser'

import { nftHandlers } from './handlers/nfts'
import { paymentHandlers } from './handlers/payments'
import { authHandlers } from './handlers/auth'

export const worker = setupWorker(
  ...nftHandlers,
  ...paymentHandlers,
  ...authHandlers,
)