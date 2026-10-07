import { api } from '@/services/api/client'

export type AuthUser = {
  id: string
  username: string
  email: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type RegisterRequest = {
  username: string
  email: string
  password: string
}

export type AuthResponse = {
  user: AuthUser
}

export async function login(
  credentials: LoginRequest,
): Promise<AuthResponse> {
  const response =
    await api.post<AuthResponse>(
      '/auth/login',
      credentials,
    )

  return response.data
}

export async function register(
  data: RegisterRequest,
): Promise<AuthResponse> {
  const response =
    await api.post<AuthResponse>(
      '/auth/register',
      data,
    )

  return response.data
}