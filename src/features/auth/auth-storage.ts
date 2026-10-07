import type { AuthUser } from './auth-service'

const AUTH_STORAGE_KEY = 'kurio-auth'

export function saveAuthUser(
  user: AuthUser,
) {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify(user),
  )
}

export function getAuthUser(): AuthUser | null {
  const storedUser =
    localStorage.getItem(AUTH_STORAGE_KEY)

  if (!storedUser) {
    return null
  }

  try {
    return JSON.parse(storedUser) as AuthUser
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY)

    return null
  }
}

export function clearAuthUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}