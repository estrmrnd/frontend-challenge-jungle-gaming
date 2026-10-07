import { useMutation } from '@tanstack/react-query'

import {
  login,
  register,
  type LoginRequest,
  type RegisterRequest,
  type AuthResponse,
} from './auth-service'

export function useLogin() {
  return useMutation<
    AuthResponse,
    Error,
    LoginRequest
  >({
    mutationFn: login,
  })
}

export function useRegister() {
  return useMutation<
    AuthResponse,
    Error,
    RegisterRequest
  >({
    mutationFn: register,
  })
}