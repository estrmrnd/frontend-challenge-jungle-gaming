import { useState } from 'react'

import axios from 'axios'
import { Eye, EyeOff } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { AuthUser } from '@/features/auth/auth-service'
import { saveAuthUser } from '@/features/auth/auth-storage'
import { useRegister } from '@/features/auth/mutations'

type RegisterFormProps = {
  onSuccess: (user: AuthUser) => void
}

export function RegisterForm({
  onSuccess,
}: RegisterFormProps) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] =
    useState('')

  const [showPassword, setShowPassword] =
    useState(false)

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false)

  const [errorMessage, setErrorMessage] =
    useState('')

  const registerMutation = useRegister()

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()
    setErrorMessage('')

    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setErrorMessage(
        'Preencha todos os campos.',
      )
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage(
        'As senhas não coincidem.',
      )
      return
    }

    registerMutation.mutate(
      {
        username,
        email,
        password,
      },
      {
        onSuccess: (data) => {
          saveAuthUser(data.user)

          setUsername('')
          setEmail('')
          setPassword('')
          setConfirmPassword('')

          onSuccess(data.user)
        },

        onError: (error) => {
          if (axios.isAxiosError(error)) {
            const message =
              error.response?.data?.message

            setErrorMessage(
              message ??
                'Não foi possível criar a conta.',
            )

            return
          }

          setErrorMessage(
            'Não foi possível criar a conta.',
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
        flex-col
        px-20
        pt-6
      "
    >
      <div className="flex flex-col gap-3">
        <Input
          type="text"
          value={username}
          onChange={(event) =>
            setUsername(event.target.value)
          }
          placeholder="Nome de usuário"
          autoComplete="username"
          className="
            h-10
            rounded-[4px]
            border-[#4A2B20]
            bg-transparent
            px-4
            font-mono
            text-[12px]
            text-[#F5F1EB]
            placeholder:text-[#B98A60]
            focus-visible:border-[#D28A4C]
            focus-visible:ring-0
          "
        />

        <Input
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          placeholder="Digite seu e-mail"
          autoComplete="email"
          className="
            h-10
            rounded-[4px]
            border-[#4A2B20]
            bg-transparent
            px-4
            font-mono
            text-[12px]
            text-[#F5F1EB]
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
            placeholder="Senha"
            autoComplete="new-password"
            className="
              h-10
              rounded-[4px]
              border-[#4A2B20]
              bg-transparent
              px-4
              pr-11
              font-mono
              text-[12px]
              text-[#F5F1EB]
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
              right-3
              top-1/2
              -translate-y-1/2
              cursor-pointer
              text-[#D28A4C]
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

        <div className="relative">
          <Input
            type={
              showConfirmPassword
                ? 'text'
                : 'password'
            }
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(
                event.target.value,
              )
            }
            placeholder="Confirmar senha"
            autoComplete="new-password"
            className="
              h-10
              rounded-[4px]
              border-[#4A2B20]
              bg-transparent
              px-4
              pr-11
              font-mono
              text-[12px]
              text-[#F5F1EB]
              placeholder:text-[#B98A60]
              focus-visible:border-[#D28A4C]
              focus-visible:ring-0
            "
          />

          <button
            type="button"
            aria-label={
              showConfirmPassword
                ? 'Ocultar confirmação de senha'
                : 'Mostrar confirmação de senha'
            }
            onClick={() =>
              setShowConfirmPassword(
                (current) => !current,
              )
            }
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              cursor-pointer
              text-[#D28A4C]
            "
          >
            {showConfirmPassword ? (
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

        <div className="min-h-[20px]">
          <p className="text-[10px] text-red-400">
            {errorMessage}
          </p>
        </div>
      </div>

      <Button
        type="submit"
        disabled={registerMutation.isPending}
        className="
          mt-6
          h-[41px]
          w-full
          cursor-pointer
          rounded-[4px]
          bg-[#D28A4C]
          font-mono
          text-[14px]
          font-bold
          text-[#140D0A]
          hover:bg-[#D28A4C]
          hover:opacity-90
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {registerMutation.isPending
          ? 'Criando conta...'
          : 'Criar conta'}
      </Button>
    </form>
  )
}