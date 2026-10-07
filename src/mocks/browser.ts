import { setupWorker } from 'msw/browser'

import { authHandlers } from './handlers/auth'
import { couponHandlers } from './handlers/coupons'
import { nftHandlers } from './handlers/nfts'
import { paymentHandlers } from './handlers/payments'

export const worker = setupWorker(
  ...nftHandlers,
  ...paymentHandlers,
  ...authHandlers,
  ...couponHandlers,
)
