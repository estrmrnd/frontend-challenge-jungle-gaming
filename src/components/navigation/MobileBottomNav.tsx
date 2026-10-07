import { useState } from 'react'

import { useNavigate } from '@tanstack/react-router'
import { ScanLine } from 'lucide-react'
import {
  FaCartShopping,
  FaHeart,
  FaHouse,
  FaUser,
} from 'react-icons/fa6'

import navBackground from '../../assets/Vector.svg'

import { AuthModal } from '@/features/auth/AuthModal'
import { getAuthUser } from '@/features/auth/auth-storage'

export function MobileBottomNav() {
  const navigate = useNavigate()

  const [authOpen, setAuthOpen] =
    useState(false)

  function handleProfile() {
    const user = getAuthUser()

    if (user) {
      navigate({
        to: '/profile',
      })

      return
    }

    setAuthOpen(true)
  }

  function handleAuthenticated() {
    setAuthOpen(false)

    navigate({
      to: '/profile',
    })
  }

  return (
    <>
      <div
        className="
          fixed
          bottom-0
          left-1/2
          z-[100]
          h-[135px]
          w-full
          max-w-[414px]
          -translate-x-1/2
          lg:hidden
        "
      >
        {/* Vetor original do Figma */}
          <img
            src={navBackground}
            alt=""
            aria-hidden="true"
            fetchPriority="low"
            className="
              pointer-events-none
              absolute
              bottom-0
              left-0
              h-[135px]
              w-full
            "
          />

        {/* Navegação */}
        <nav
          aria-label="Navegação principal"
          className="
            absolute
            bottom-0
            left-0
            grid
            h-[95px]
            w-full
            grid-cols-[1fr_1fr_80px_1fr_1fr]
            items-center
            text-[#D9B58B]
          "
        >
          {/* Início */}
          <button
            type="button"
            aria-label="Início"
            onClick={() =>
              navigate({
                to: '/',
              })
            }
            className="
              flex
              h-10
              w-full
              cursor-pointer
              items-center
              justify-center
              text-[#E69A50]
            "
          >
            <FaHouse className="h-[19px] w-[19px]" />
          </button>

          {/* Favoritos */}
          <button
            type="button"
            aria-label="Favoritos"
            className="
              flex
              h-10
              w-full
              cursor-pointer
              items-center
              justify-center
            "
          >
            <FaHeart className="h-5 w-5" />
          </button>

          {/* Espaço central */}
          <div aria-hidden="true" />

          {/* Carrinho */}
          <button
            type="button"
            aria-label="Carrinho"
            onClick={() =>
              navigate({
                to: '/cart',
              })
            }
            className="
              flex
              h-10
              w-full
              cursor-pointer
              items-center
              justify-center
            "
          >
            <FaCartShopping className="h-[19px] w-[19px]" />
          </button>

          {/* Perfil */}
          <button
            type="button"
            aria-label="Perfil"
            onClick={handleProfile}
            className="
              flex
              h-10
              w-full
              cursor-pointer
              items-center
              justify-center
            "
          >
            <FaUser className="h-[18px] w-[18px]" />
          </button>
        </nav>

        {/* Scanner central */}
        <button
          type="button"
          aria-label="Escanear"
          className="
            absolute
            left-1/2
            top-2.5
            z-10
            flex
            h-[65px]
            w-[65px]
            -translate-x-1/2
            cursor-pointer
            items-center
            justify-center
            rounded-full
            bg-[linear-gradient(180deg,rgba(210,138,76,0.4)_0%,#D28A4C_100%)]
            text-[#F7F3EC]
          "
        >
          <ScanLine className="h-[25px] w-[25px]" />
        </button>
      </div>

      <AuthModal
        open={authOpen}
        onClose={() =>
          setAuthOpen(false)
        }
        onAuthenticated={
          handleAuthenticated
        }
      />
    </>
  )
}