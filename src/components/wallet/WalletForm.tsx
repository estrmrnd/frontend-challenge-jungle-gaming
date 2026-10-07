import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  getWallet,
  saveWallet,
  type Wallet,
} from '@/features/wallet/wallet-storage'

import { SecondaryWallet } from './SecondaryWallet'
import { WalletField } from './WalletField'

type WalletFormProps = {
  username: string
  email: string
}

const inputClass =
  'h-9 w-full min-w-0 rounded-none border-[#4A2B20] bg-transparent px-3 text-xs text-[#F5F1EB] shadow-none placeholder:text-[#8D694D] focus-visible:border-[#D28A4C] focus-visible:ring-0'

const selectTriggerClass =
  'h-9 w-full min-w-0 rounded-none border-[#4A2B20] bg-transparent px-3 text-xs text-[#D28A4C] shadow-none focus-visible:border-[#D28A4C] focus-visible:ring-0'

export function WalletForm({
  username,
  email,
}: WalletFormProps) {
  const savedWallet = getWallet()

  const [displayName, setDisplayName] =
    useState(savedWallet?.displayName ?? '')

  const [walletNickname, setWalletNickname] =
    useState(savedWallet?.name ?? '')

  const [network, setNetwork] =
    useState<Wallet['network']>(
      savedWallet?.network ?? 'ethereum',
    )

  const [profileName, setProfileName] =
    useState(
      savedWallet?.profileName ?? username,
    )

  const [walletAddress, setWalletAddress] =
    useState(savedWallet?.address ?? '')

  const [
    secondaryWallet,
    setSecondaryWallet,
  ] = useState(
    savedWallet?.secondaryWallet ?? '',
  )

  const [walletType, setWalletType] =
    useState(
      savedWallet?.walletType ??
        'metamask',
    )

  const [referralCode, setReferralCode] =
    useState(
      savedWallet?.referralCode ?? '',
    )

  const [ens, setEns] =
    useState(savedWallet?.ens ?? '')

  const [saved, setSaved] =
    useState(false)

  function handleSaveWallet() {
    const wallet: Wallet = {
      id:
        savedWallet?.id ??
        crypto.randomUUID(),
      displayName,
      name: walletNickname,
      network,
      profileName,
      address: walletAddress,
      secondaryWallet,
      walletType,
      referralCode,
      email,
      ens,
    }

    saveWallet(wallet)
    setSaved(true)
  }

  return (
    <section
      className="
        w-full
        min-w-0
        xl:w-215.5
      "
    >
      {/* CABEÇALHO */}

      <div
        className="
          flex
          w-full
          min-w-0
          items-start
          justify-between
          gap-4
        "
      >
        <div className="flex min-w-0 flex-col gap-2">
          <h1 className="text-sm font-bold leading-4">
            Carteira principal
          </h1>

          <p className="text-[10px] text-[#B98A60]">
            Estas carteiras ficam disponíveis
            no pagamento e para receber NFTs
            comprados.
          </p>
        </div>

        <button
          type="button"
          className="shrink-0 text-xs text-[#D28A4C]"
        >
          Adicionar
        </button>
      </div>

      {/* FORMULÁRIO */}

      <div className="mt-6 flex w-full min-w-0 flex-col gap-6">
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
          <WalletField
            label="Nome de exibição"
            required
          >
            <Input
              value={displayName}
              onChange={(event) => {
                setDisplayName(
                  event.target.value,
                )
                setSaved(false)
              }}
              className={inputClass}
            />
          </WalletField>

          <WalletField
            label="Apelido da carteira"
            required
          >
            <Input
              value={walletNickname}
              onChange={(event) => {
                setWalletNickname(
                  event.target.value,
                )
                setSaved(false)
              }}
              className={inputClass}
            />
          </WalletField>
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
          <WalletField
            label="Rede"
            required
          >
            <Select
              value={network}
              onValueChange={(value) => {
                if (value !== null) {
                  setNetwork(
                    value as Wallet['network'],
                  )
                  setSaved(false)
                }
              }}
            >
              <SelectTrigger
                className={
                  selectTriggerClass
                }
              >
                <SelectValue placeholder="Selecione uma rede" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ethereum">
                  Ethereum
                </SelectItem>

                <SelectItem value="polygon">
                  Polygon
                </SelectItem>

                <SelectItem value="solana">
                  Solana
                </SelectItem>
              </SelectContent>
            </Select>
          </WalletField>

          <WalletField
            label="Nome do perfil"
            required
          >
            <Input
              value={profileName}
              onChange={(event) => {
                setProfileName(
                  event.target.value,
                )
                setSaved(false)
              }}
              className={inputClass}
            />
          </WalletField>
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
          <WalletField
            label="Endereço da carteira"
            required
          >
            <Input
              value={walletAddress}
              onChange={(event) => {
                setWalletAddress(
                  event.target.value,
                )
                setSaved(false)
              }}
              placeholder="Endereço 0x da carteira"
              className={inputClass}
            />
          </WalletField>

          <WalletField>
            <Input
              value={secondaryWallet}
              onChange={(event) => {
                setSecondaryWallet(
                  event.target.value,
                )
                setSaved(false)
              }}
              placeholder="ENS ou carteira secundária (opcional)"
              className={inputClass}
            />
          </WalletField>
        </div>

        {/* LINHA 4 */}

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
          <WalletField
            label="Tipo de carteira"
            required
          >
            <Select
              value={walletType}
              onValueChange={(value) => {
                if (value !== null) {
                  setWalletType(value)
                  setSaved(false)
                }
              }}
            >
              <SelectTrigger
                className={
                  selectTriggerClass
                }
              >
                <SelectValue placeholder="Selecione uma carteira" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="metamask">
                  MetaMask
                </SelectItem>

                <SelectItem value="wallet-connect">
                  WalletConnect
                </SelectItem>
              </SelectContent>
            </Select>
          </WalletField>

          <WalletField
            label="Código de indicação"
            required
          >
            <Input
              value={referralCode}
              onChange={(event) => {
                setReferralCode(
                  event.target.value,
                )
                setSaved(false)
              }}
              className={inputClass}
            />
          </WalletField>
        </div>

        {/* LINHA 5 */}

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
          <WalletField
            label="E-mail"
            required
          >
            <Input
              value={email}
              readOnly
              className={inputClass}
            />
          </WalletField>

          <WalletField
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
                onChange={(event) => {
                  setEns(
                    event.target.value,
                  )
                  setSaved(false)
                }}
                className={`${inputClass} min-w-0 rounded-l-none`}
              />
            </div>
          </WalletField>
        </div>
      </div>

      {/* SALVAR */}

      <div className="mt-8 flex min-w-0 items-center gap-4">
        <Button
          type="button"
          onClick={handleSaveWallet}
          className="
            h-10
            w-32.75
            shrink-0
            rounded-[3px]
            bg-[#D28A4C]
            text-xs
            font-semibold
            text-[#140D0A]
            hover:bg-[#D28A4C]/90
          "
        >
          Salvar carteira
        </Button>

        {saved && (
          <span className="text-xs text-[#D28A4C]">
            Carteira salva com sucesso.
          </span>
        )}
      </div>

      <SecondaryWallet />
    </section>
  )
}