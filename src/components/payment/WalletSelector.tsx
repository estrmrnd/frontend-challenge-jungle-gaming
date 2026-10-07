import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group'

export type WalletType =
  | 'walletconnect'
  | 'metamask'
  | 'coinbase'

type WalletSelectorProps = {
  onConfirm?: (wallet: WalletType) => void
  loading?: boolean
}

export function WalletSelector({
  onConfirm,
  loading = false,
}: WalletSelectorProps) {
  const [selectedWallet, setSelectedWallet] =
    useState<WalletType>('coinbase')

  function handleConfirm() {
    onConfirm?.(selectedWallet)
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-[24px]">
      <h2 className="text-center text-[16px] font-bold text-[#F5F1EB]">
        Carteira e rede
      </h2>

      <RadioGroup
        value={selectedWallet}
        onValueChange={(value) => {
          if (value) {
            setSelectedWallet(
              value as WalletType,
            )
          }
        }}
        className="flex w-full min-w-0 flex-col gap-[16px]"
      >
        {/* OPÇÃO 1 */}

        <label
          htmlFor="walletconnect"
          className="
            flex
            h-[45px]
            w-full
            min-w-0
            cursor-pointer
            items-center
            gap-[10px]
            rounded-[3px]
            border
            border-[#3F2319]
            px-[12px]
          "
        >
          <RadioGroupItem
            value="walletconnect"
            id="walletconnect"
            className="shrink-0"
          />

          <span
            className="
              min-w-0
              text-[12px]
              font-medium
              leading-[15px]
              text-[#F5F1EB]
            "
          >
            MetaMask · WalletConnect · Coinbase
          </span>
        </label>

        {/* OPÇÃO 2 */}

        <label
          htmlFor="metamask"
          className="
            flex
            h-[45px]
            w-full
            min-w-0
            cursor-pointer
            items-center
            gap-[10px]
            rounded-[3px]
            border
            border-[#3F2319]
            px-[12px]
          "
        >
          <RadioGroupItem
            value="metamask"
            id="metamask"
            className="shrink-0"
          />

          <span className="min-w-0 text-[14px] text-[#F5F1EB]">
            MetaMask
          </span>
        </label>

        {/* OPÇÃO 3 */}

        <label
          htmlFor="coinbase"
          className="
            flex
            h-[45px]
            w-full
            min-w-0
            cursor-pointer
            items-center
            gap-[10px]
            rounded-[3px]
            border
            border-[#3F2319]
            px-[12px]
          "
        >
          <RadioGroupItem
            value="coinbase"
            id="coinbase"
            className="shrink-0"
          />

          <span className="min-w-0 text-[14px] text-[#F5F1EB]">
            Coinbase Wallet
          </span>
        </label>
      </RadioGroup>

      <Button
        type="button"
        disabled={loading}
        onClick={handleConfirm}
        className="
          h-[45px]
          w-full
          min-w-0
          rounded-[3px]
          bg-[#D28A4C]
          text-[14px]
          font-bold
          text-[#140D0A]
          hover:bg-[#E89B55]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {loading
          ? 'Processando...'
          : 'Confirmar compra'}
      </Button>
    </div>
  )
}