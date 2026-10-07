import { ArrowLeft, EllipsisVertical, WalletCards } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group'

type MobileWalletPaymentProps = {
  total: number
  onConfirm?: (wallet: string) => void
}

export function MobileWalletPayment({
  total,
  onConfirm,
}: MobileWalletPaymentProps) {
  const [selectedWallet, setSelectedWallet] = useState('coinbase')

  return (
    <section
      className="
        mx-auto
        flex
        min-h-[832px]
        w-full
        max-w-[372px]
        flex-col
        rounded-[34px]
        bg-[#140D0A]
        px-[7px]
        pb-[24px]
        pt-[27px]
      "
    >
      <div className="mx-auto flex w-full max-w-[322px] flex-1 flex-col">
        {/* HEADER */}
        <div className="flex h-[44px] w-full items-start">
          <button
            type="button"
            aria-label="Voltar"
            onClick={() => window.history.back()}
            className="
              flex
              h-[32px]
              w-[32px]
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-[#3F2319]
              bg-[#2F1D15]
              text-[#D28A4C]
            "
          >
            <ArrowLeft size={16} />
          </button>

          <h1
            className="
              ml-[22px]
              pt-[5px]
              text-[18px]
              font-bold
              leading-[22px]
              text-[#F5F1EB]
            "
          >
            Pagamento com carteira
          </h1>
        </div>

        {/* CARTEIRAS CONECTADAS */}
        <div className="mt-[13px]">
          <div className="flex h-[16px] items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#F5F1EB]">
              Carteira conectada
            </h2>

            <button
              type="button"
              className="text-[13px] font-bold text-[#D28A4C]"
            >
              Trocar carteira
            </button>
          </div>

          <div className="mt-[11px] flex flex-col gap-[20px]">
            <ConnectedWallet
              selected
              title="Reserva"
              address="nova.kurio.eth"
              network="Rede Polygon"
            />

            <ConnectedWallet
              title="Principal"
              address="0xA91F...E82C"
              network="Rede principal Ethereum"
            />
          </div>
        </div>

        {/* CARTEIRA E REDE */}
        <div className="mt-[14px]">
          <h2 className="mb-[10px] text-[14px] font-bold text-[#F5F1EB]">
            Carteira e rede
          </h2>

          <RadioGroup
            value={selectedWallet}
            onValueChange={setSelectedWallet}
            className="flex flex-col gap-[16px]"
          >
            <WalletOption
              value="walletconnect"
              letter="W"
              label="WalletConnect"
            />

            <WalletOption
              value="metamask"
              letter="M"
              label="MetaMask"
            />

            <WalletOption
              value="coinbase"
              icon={<WalletCards size={18} />}
              label="Coinbase Wallet"
            />
          </RadioGroup>
        </div>

        {/* TOTAL */}
        <div className="mt-[12px] flex items-center justify-end gap-[26px]">
          <span className="text-[16px] font-bold text-[#F5F1EB]">
            Total:
          </span>

          <span className="text-[16px] font-bold text-[#E89B55]">
            {total.toFixed(3)} ETH
          </span>
        </div>

        {/* espaço flexível do Figma */}
        <div className="flex-1" />

        {/* CONFIRMAR */}
        <Button
          type="button"
          onClick={() => onConfirm?.(selectedWallet)}
          className="
            h-[60px]
            w-full
            shrink-0
            rounded-[40px]
            bg-[#D28A4C]
            text-[14px]
            font-bold
            text-[#140D0A]
            hover:bg-[#D28A4C]/90
          "
        >
          Confirmar compra
        </Button>
      </div>
    </section>
  )
}

type ConnectedWalletProps = {
  title: string
  address: string
  network: string
  selected?: boolean
}

function ConnectedWallet({
  title,
  address,
  network,
  selected = false,
}: ConnectedWalletProps) {
  return (
    <div
      className="
        flex
        h-[85px]
        w-full
        items-center
        rounded-[12px]
        bg-[#2A1915]
        px-[14px]
      "
    >
      <div
        className={`
          flex
          h-[16px]
          w-[16px]
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          ${
            selected
              ? 'border-[#D28A4C]'
              : 'border-[#55321F]'
          }
        `}
      >
        {selected && (
          <div className="h-[8px] w-[8px] rounded-full bg-[#D28A4C]" />
        )}
      </div>

      <div className="ml-[18px] flex flex-1 flex-col gap-[4px]">
        <span className="text-[14px] font-bold text-[#F5F1EB]">
          {title}
        </span>

        <span className="text-[13px] text-[#CFB28C]">
          {address}
        </span>

        <span className="text-[13px] text-[#CFB28C]">
          {network}
        </span>
      </div>

      <button
        type="button"
        aria-label={`Opções da carteira ${title}`}
        className="text-[#D28A4C]"
      >
        <EllipsisVertical size={18} />
      </button>
    </div>
  )
}

type WalletOptionProps = {
  value: string
  label: string
  letter?: string
  icon?: React.ReactNode
}

function WalletOption({
  value,
  label,
  letter,
  icon,
}: WalletOptionProps) {
  return (
    <label
      htmlFor={`mobile-${value}`}
      className="
        flex
        h-[65px]
        w-full
        cursor-pointer
        items-center
        rounded-[12px]
        bg-[#2A1915]
        px-[14px]
      "
    >
      <div
        className="
          flex
          h-[40px]
          w-[40px]
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          border-[#3F2319]
          bg-[#2F1D15]
          text-[12px]
          font-bold
          text-[#D28A4C]
        "
      >
        {icon ?? letter}
      </div>

      <span className="ml-[10px] flex-1 text-[13px] text-[#F5F1EB]">
        {label}
      </span>

      <RadioGroupItem
        id={`mobile-${value}`}
        value={value}
        className="
          h-[16px]
          w-[16px]
          border-[#55321F]
          text-[#D28A4C]
          data-[state=checked]:border-[#D28A4C]
        "
      />
    </label>
  )
}