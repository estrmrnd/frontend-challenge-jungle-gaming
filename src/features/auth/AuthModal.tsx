import { useState } from 'react'

import { X } from 'lucide-react'

import type { AuthUser } from '@/features/auth/auth-service'

import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import { SocialAuth } from './SocialAuth'

type AuthModalProps = {
  open: boolean
  onClose: () => void
  onAuthenticated: (user: AuthUser) => void
}

type AuthMode = 'login' | 'register'

export function AuthModal({
  open,
  onClose,
  onAuthenticated,
}: AuthModalProps) {
  const [mode, setMode] =
    useState<AuthMode>('login')

  const isRegister = mode === 'register'

  function handleSuccess(user: AuthUser) {
    onAuthenticated(user)
    onClose()
  }

  function handleModeChange(
    newMode: AuthMode,
  ) {
    setMode(newMode)
  }

  if (!open) {
    return null
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-start
        justify-center
        overflow-y-auto
        bg-[#140D0A]
        lg:items-center
        lg:bg-black/50
      "
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={
          isRegister
            ? 'Criar conta na Kurio'
            : 'Entrar na Kurio'
        }
        onClick={(event) =>
          event.stopPropagation()
        }
        className={`
          relative
          flex
          min-h-screen
          w-full
          max-w-[390px]
          flex-col
          rounded-t-[32px]
          bg-[#140D0A]
          px-4
          font-mono
          text-[#F5F1EB]

          lg:min-h-0
          lg:w-[500px]
          lg:max-w-none
          lg:rounded-none
          lg:bg-[#241612]
          lg:px-0

          ${
            isRegister
              ? 'lg:h-[656px]'
              : 'lg:h-[600px]'
          }
        `}
      >
        {/* FECHAR - SOMENTE DESKTOP */}

        <button
          type="button"
          aria-label="Fechar"
          onClick={onClose}
          className="
            absolute
            right-4
            top-4
            z-10
            hidden
            cursor-pointer
            text-[#D28A4C]
            lg:block
          "
        >
          <X
            size={18}
            strokeWidth={1.5}
          />
        </button>

        {/* MOBILE */}

        <div className="flex flex-col lg:hidden">
          {/* LOGO */}

          <div
            className="
              flex
              h-[136px]
              w-full
              items-center
              justify-center
            "
          >
            <span
              className="
                text-[32px]
                font-bold
                leading-none
                tracking-[0.1em]
                text-[#F5F1EB]
              "
            >
              KURIO
            </span>
          </div>

          {/* TÍTULO */}

          <h1
            className="
              mt-8
              text-center
              text-[20px]
              font-bold
              leading-4
              text-[#F5F1EB]
            "
          >
            {isRegister
              ? 'Criar conta'
              : 'Entrar'}
          </h1>

          {/* FORM */}

          <div className="mt-8 w-full">
            {isRegister ? (
              <RegisterForm
                onSuccess={handleSuccess}
              />
            ) : (
              <LoginForm
                onSuccess={handleSuccess}
              />
            )}
          </div>

          {/* SOCIAL */}

          <SocialAuth />

          {/* TROCA DE TELA */}

          <div
            className="
              mt-9
              pb-10
              text-center
              text-[15px]
              leading-5
              text-[#CFB28C]
            "
          >
            {isRegister ? (
              <>
                Já tem uma conta?{' '}

                <button
                  type="button"
                  onClick={() =>
                    handleModeChange('login')
                  }
                  className="
                    cursor-pointer
                    text-[#CFB28C]
                  "
                >
                  Entrar
                </button>
              </>
            ) : (
              <>
                Novo na Kurio?{' '}

                <button
                  type="button"
                  onClick={() =>
                    handleModeChange(
                      'register',
                    )
                  }
                  className="
                    cursor-pointer
                    text-[#CFB28C]
                  "
                >
                  Crie uma conta
                </button>
              </>
            )}
          </div>
        </div>

        {/* DESKTOP */}

        <div
          className="
            hidden
            h-full
            flex-col
            lg:flex
          "
        >
          {/* HEADER */}

          <div
            className="
              flex
              h-[140px]
              shrink-0
              flex-col
              items-center
              pt-12
            "
          >
            <div
              className="
                flex
                items-center
                text-[18px]
                font-medium
                leading-none
              "
            >
              <button
                type="button"
                onClick={() =>
                  handleModeChange('login')
                }
                className={`
                  cursor-pointer
                  ${
                    !isRegister
                      ? 'font-bold text-[#D28A4C]'
                      : 'text-[#F5F1EB]'
                  }
                `}
              >
                Entrar
              </button>

              <span className="mx-1">
                |
              </span>

              <button
                type="button"
                onClick={() =>
                  handleModeChange(
                    'register',
                  )
                }
                className={`
                  cursor-pointer
                  ${
                    isRegister
                      ? 'font-bold text-[#D28A4C]'
                      : 'text-[#F5F1EB]'
                  }
                `}
              >
                Criar conta
              </button>
            </div>

            <p
              className="
                mt-10
                max-w-[390px]
                text-center
                text-[12px]
                font-normal
                leading-[16px]
              "
            >
              {isRegister ? (
                <>
                  Crie seu perfil de
                  colecionador e conecte uma
                  <br />
                  carteira quando quiser.
                </>
              ) : (
                <>
                  Entre para gerenciar sua
                  carteira, coleção e perfil
                  <br />
                  de criador.
                </>
              )}
            </p>
          </div>

          {/* FORM */}

          {isRegister ? (
            <RegisterForm
              onSuccess={handleSuccess}
            />
          ) : (
            <LoginForm
              onSuccess={handleSuccess}
            />
          )}

          {/* SOCIAL */}

          <SocialAuth />

          <div className="flex-1" />

          {/* FAIXA INFERIOR */}

          <div
            className="
              h-[10px]
              w-full
              shrink-0
              bg-[#D28A4C]
            "
          />
        </div>
      </div>
    </div>
  )
}