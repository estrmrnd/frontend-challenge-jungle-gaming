import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'

import './index.css'

import { queryClient } from './app/query-client'
import { router } from './router'

async function enableMocking() {
  const shouldEnableMocking =
    import.meta.env.DEV ||
    import.meta.env.VITE_ENABLE_MOCKS === 'true'

  if (!shouldEnableMocking) {
    return
  }

  const { worker } = await import('./mocks/browser')

  return worker.start({
    onUnhandledFrame: 'bypass',
  })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  )
})