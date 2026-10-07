import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'

import cartIcon from '@/assets/Cart Icon.png'
import searchIcon from '@/assets/Search Icon.png'
import loginIcon from '@/assets/Login.png'

import { AuthModal } from '@/features/auth/AuthModal'
import type { AuthUser } from '@/features/auth/auth-service'
import {
  clearAuthUser,
  getAuthUser,
} from '@/features/auth/auth-storage'

export function Header() {
  const [isAuthOpen, setIsAuthOpen] =
    useState(false)

  const [user, setUser] =
    useState<AuthUser | null>(() =>
      getAuthUser(),
    )

  function handleAuthenticated(
    authenticatedUser: AuthUser,
  ) {
    setUser(authenticatedUser)
    setIsAuthOpen(false)
  }

  function handleLogout() {
    clearAuthUser()
    setUser(null)
  }

  return (
    <>
      <header className="mx-auto hidden h-11.25 w-full max-w-300 items-center justify-between border-b-[0.3px] border-[#D28A4C] lg:flex">
        <div className="flex h-4.5 w-12 items-center">
          <span className="text-[14px] font-bold leading-none tracking-widest text-[#F5F1EB]">
            KURIO
          </span>
        </div>

        <nav className="flex h-11.25 w-100.25 items-center gap-10">
          <Link
            to="/"
            activeOptions={{
              exact: true,
            }}
            className="relative flex h-full items-center text-[16px] leading-none"
            activeProps={{
              className:
                'font-bold text-[#D28A4C] after:absolute after:bottom-[-1px] after:left-0 after:h-[3px] after:w-full after:bg-[#D28A4C]',
            }}
            inactiveProps={{
              className:
                'font-medium text-[#F5F1EB]',
            }}
          >
            Início
          </Link>

          <a
            href="#"
            className="text-[16px] font-medium leading-none text-[#F5F1EB]"
          >
            Mercado
          </a>

          <a
            href="#"
            className="text-[16px] font-medium leading-none text-[#F5F1EB]"
          >
            Criadores
          </a>

          <a
            href="#"
            className="text-[16px] font-medium leading-none text-[#F5F1EB]"
          >
            Aprenda
          </a>
        </nav>

        <div className="flex items-center gap-6">
          <button
            type="button"
            aria-label="Buscar"
          >
            <img
              src={searchIcon}
              alt=""
            />
          </button>

          <Link
            to="/cart"
            aria-label="Carrinho"
            className="cursor-pointer"
          >
            <img
              src={cartIcon}
              alt=""
            />
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <Link
  to="/profile"
  className="
    max-w-30
    truncate
    text-[12px]
    text-[#F5F1EB]
    transition-colors
    hover:text-[#D28A4C]
  "
>
  {user.username}
</Link>

              <button
                type="button"
                aria-label="Sair"
                title="Sair"
                onClick={handleLogout}
                className="cursor-pointer text-[#D28A4C]"
              >
                <LogOut
                  size={18}
                  strokeWidth={1.5}
                />
              </button>
            </div>
          ) : (
            <button
              type="button"
              aria-label="Entrar"
              className="cursor-pointer"
              onClick={() =>
                setIsAuthOpen(true)
              }
            >
              <img
                src={loginIcon}
                alt=""
              />
            </button>
          )}
        </div>
      </header>

      <AuthModal
        open={isAuthOpen}
        onClose={() =>
          setIsAuthOpen(false)
        }
        onAuthenticated={
          handleAuthenticated
        }
      />
    </>
  )
}