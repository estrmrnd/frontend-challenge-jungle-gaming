import { useState } from 'react'
import { ImagePlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { AuthUser } from '@/features/auth/auth-service'

import { PasswordField } from './PasswordField'
import { ProfileField } from './ProfileField'

type ProfileFormProps = {
  user: AuthUser
}

const inputClass =
  'h-9 w-full min-w-0 rounded-none border-[#4A2B20] bg-transparent px-3 text-xs text-[#F5F1EB] shadow-none focus-visible:border-[#D28A4C] focus-visible:ring-0'

export function ProfileForm({
  user,
}: ProfileFormProps) {
  const [displayName, setDisplayName] =
    useState('')

  const [saveMessage, setSaveMessage] =
    useState('')

  const [username, setUsername] =
    useState(user.username)

  const [email, setEmail] =
    useState(user.email)

  const [ens, setEns] =
    useState('')

  const [
    walletNickname,
    setWalletNickname,
  ] = useState('')

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState('')

  const [
    newPassword,
    setNewPassword,
  ] = useState('')

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState('')

  const [
    showCurrentPassword,
    setShowCurrentPassword,
  ] = useState(false)

  const [
    showNewPassword,
    setShowNewPassword,
  ] = useState(false)

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false)

  return (
    <section
      className="
        w-full
        min-w-0
        xl:w-215.5
      "
    >
      <h1 className="text-sm font-bold leading-4">
        Perfil do colecionador
      </h1>

      <div className="mt-7 flex w-full min-w-0 flex-col gap-5">
        {/* LINHA 1 */}

        <div
          className="
            grid
            w-full
            min-w-0
            grid-cols-2
            gap-5
            xl:gap-7
          "
        >
          <ProfileField
            label="Nome de exibição"
            required
          >
            <Input
              value={displayName}
              onChange={(event) =>
                setDisplayName(
                  event.target.value,
                )
              }
              className={inputClass}
            />
          </ProfileField>

          <ProfileField
            label="Nome de usuário"
            required
          >
            <Input
              value={username}
              onChange={(event) =>
                setUsername(
                  event.target.value,
                )
              }
              className={inputClass}
            />
          </ProfileField>
        </div>

        {/* LINHA 2 */}

        <div
          className="
            grid
            w-full
            min-w-0
            grid-cols-2
            gap-5
            xl:gap-7
          "
        >
          <ProfileField
            label="E-mail"
            required
          >
            <Input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value,
                )
              }
              className={inputClass}
            />
          </ProfileField>

          <ProfileField
            label="Nome ENS"
            required
          >
            <div className="flex h-9 w-full min-w-0">
              <div
                className="
                  flex
                  w-16
                  shrink-0
                  items-center
                  border
                  border-r-0
                  border-[#4A2B20]
                  bg-[#1A100D]
                  px-3
                  text-xs
                  text-[#F5F1EB]
                "
              >
                .eth
              </div>

              <Input
                value={ens}
                onChange={(event) =>
                  setEns(
                    event.target.value,
                  )
                }
                className={`${inputClass} min-w-0 rounded-l-none`}
              />
            </div>
          </ProfileField>
        </div>

        {/* LINHA 3 */}

        <div
          className="
            grid
            w-full
            min-w-0
            grid-cols-2
            gap-5
            xl:gap-7
          "
        >
          <ProfileField
            label="Apelido da carteira"
            required
          >
            <Input
              value={walletNickname}
              onChange={(event) =>
                setWalletNickname(
                  event.target.value,
                )
              }
              className={inputClass}
            />
          </ProfileField>

          <ProfileField label="Avatar">
            <div
              className="
                flex
                h-9
                min-w-0
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  size-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#513421]
                  text-[#D28A4C]
                "
              >
                <ImagePlus size={16} />
              </div>

              <Button
                type="button"
                className="
                  h-9
                  shrink-0
                  rounded-[3px]
                  bg-[#D28A4C]
                  px-4
                  text-xs
                  font-semibold
                  text-[#140D0A]
                  hover:bg-[#D28A4C]/90
                  xl:px-6
                "
              >
                Alterar
              </Button>

              <button
                type="button"
                className="
                  min-w-0
                  text-[10px]
                  text-[#F5F1EB]
                "
              >
                Remover
              </button>
            </div>
          </ProfileField>
        </div>
      </div>

      {/* ALTERAR SENHA */}

      <section className="mt-7">
        <h2 className="text-sm font-medium leading-4">
          Alterar senha
        </h2>

        <div
          className="
            mt-4
            flex
            w-full
            max-w-[417px]
            min-w-0
            flex-col
            gap-5
            xl:w-104.25
          "
        >
          <PasswordField
            label="Senha atual"
            value={currentPassword}
            onChange={setCurrentPassword}
            visible={
              showCurrentPassword
            }
            onToggle={() =>
              setShowCurrentPassword(
                (current) =>
                  !current,
              )
            }
          />

          <PasswordField
            label="Nova senha"
            value={newPassword}
            onChange={setNewPassword}
            visible={showNewPassword}
            onToggle={() =>
              setShowNewPassword(
                (current) =>
                  !current,
              )
            }
          />

          <PasswordField
            label="Confirmar nova senha"
            value={confirmPassword}
            onChange={setConfirmPassword}
            visible={
              showConfirmPassword
            }
            onToggle={() =>
              setShowConfirmPassword(
                (current) =>
                  !current,
              )
            }
          />
        </div>

        <Button
          type="button"
          onClick={() =>
            setSaveMessage(
              'Dados salvos com sucesso.',
            )
          }
          className="
            mt-7
            h-9
            w-29
            rounded-[3px]
            bg-[#D28A4C]
            text-xs
            font-semibold
            text-[#140D0A]
            hover:bg-[#D28A4C]/90
          "
        >
          Salvar
        </Button>

        {saveMessage && (
          <p
            role="status"
            className="mt-3 text-xs text-[#D28A4C]"
          >
            {saveMessage}
          </p>
        )}
      </section>
    </section>
  )
}