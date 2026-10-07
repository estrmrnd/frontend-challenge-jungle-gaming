import { QueryClient } from '@tanstack/react-query'

// isso gerencia o cache, loading, erros e atualizaçao de dados da api

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
})