import { useState } from 'react'

import axios from 'axios'
import { Eye, EyeOff } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { AuthUser } from '@/features/auth/auth-service'
import { saveAuthUser } from '@/features/auth/auth-storage'
import { useLogin } from '@/features/auth/mutations'

type LoginFormProps = {
  onSuccess: (user: AuthUser) => void
}

export function LoginForm({
  onSuccess,
}: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] =
    useState('')
  const [showPassword, setShowPassword] =
    useState(false)
  const [errorMessage, setErrorMessage] =
    useState('')

  const loginMutation = useLogin()

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()
    setErrorMessage('')

    if (!email || !password) {
      setErrorMessage(
        'Preencha o e-mail e a senha.',
      )
      return
    }

    loginMutation.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          saveAuthUser(data.user)

          setEmail('')
          setPassword('')

          onSuccess(data.user)
        },

        onError: (error) => {
          if (axios.isAxiosError(error)) {
            const message =
              error.response?.data?.message

            setErrorMessage(
              message ??
                'Não foi possível entrar.',
            )

            return
          }

          setErrorMessage(
            'Não foi possível entrar.',
          )
        },
      },
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex
        w-full
        flex-col
        lg:px-20
      "
    >
      <div className="flex flex-col gap-3">
        <Input
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          placeholder="contato@email.com"
          autoComplete="email"
          className="
            h-[50px]
            w-full
            rounded-[10px]
            border
            border-[#3F2319]
            bg-transparent
            px-4
            font-mono
            text-[13px]
            text-[#F5F1EB]
            shadow-none
            placeholder:text-[#B98A60]
            focus-visible:border-[#D28A4C]
            focus-visible:ring-0
          "
        />

        <div className="relative">
          <Input
            type={
              showPassword
                ? 'text'
                : 'password'
            }
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="************"
            autoComplete="current-password"
            className="
              h-[50px]
              w-full
              rounded-[10px]
              border
              border-[#3F2319]
              bg-transparent
              px-4
              pr-12
              font-mono
              text-[13px]
              text-[#F5F1EB]
              shadow-none
              placeholder:text-[#B98A60]
              focus-visible:border-[#D28A4C]
              focus-visible:ring-0
            "
          />

          <button
            type="button"
            aria-label={
              showPassword
                ? 'Ocultar senha'
                : 'Mostrar senha'
            }
            onClick={() =>
              setShowPassword(
                (current) => !current,
              )
            }
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              cursor-pointer
              text-[#6F3D25]
              transition-colors
              hover:text-[#D28A4C]
            "
          >
            {showPassword ? (
              <Eye
                size={17}
                strokeWidth={1.5}
              />
            ) : (
              <EyeOff
                size={17}
                strokeWidth={1.5}
              />
            )}
          </button>
        </div>

        <div className="flex min-h-4 items-center">
          {errorMessage ? (
            <p className="text-[10px] text-red-400">
              {errorMessage}
            </p>
          ) : (
            <span />
          )}

          <button
            type="button"
            className="
              ml-auto
              cursor-pointer
              whitespace-nowrap
              font-mono
              text-[12px]
              text-[#D28A4C]
            "
          >
            Esqueceu a senha?
          </button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={loginMutation.isPending}
        className="
          mt-8
          h-[60px]
          w-full
          cursor-pointer
          rounded-[10px]
          bg-[#D28A4C]
          font-mono
          text-[15px]
          font-bold
          text-[#140D0A]
          shadow-none
          hover:bg-[#D28A4C]
          hover:opacity-90
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {loginMutation.isPending
          ? 'Entrando...'
          : 'Entrar'}
      </Button>
    </form>
  )
}