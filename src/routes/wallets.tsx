import { createFileRoute } from '@tanstack/react-router'

import { Header } from '@/components/home/Header'
import { AccountSidebar } from '@/components/profile/AccountSidebar'
import { WalletForm } from '@/components/wallet/WalletForm'
import { getAuthUser } from '@/features/auth/auth-storage'

export const Route = createFileRoute('/wallets')({
  component: WalletsPage,
})

function WalletsPage() {
  const user = getAuthUser()

  if (!user) {
    return (
      <main className="min-h-screen bg-[#140D0A] text-[#F5F1EB]">
        <div
          className="
            mx-auto
            w-full
            max-w-[1200px]
            px-6
            xl:px-0
          "
        >
          <Header />

          <div className="py-20">
            <h1 className="text-sm font-bold">
              Carteiras
            </h1>

            <p className="mt-4 text-xs text-[#B98A60]">
              Você precisa entrar para gerenciar suas carteiras.
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#140D0A] text-[#F5F1EB]">
      {/* ========================= */}
      {/* MOBILE + TABLET */}
      {/* ========================= */}

      <div className="lg:hidden">
        {/*
          Depois colocamos aqui a versão
          mobile/tablet de Carteiras.
        */}
      </div>

      {/* ========================= */}
      {/* LAPTOP + DESKTOP */}
      {/* ========================= */}

      <div
        className="
          mx-auto
          hidden
          w-full
          max-w-[1200px]
          px-6
          lg:block
          xl:px-0
        "
      >
        <Header />

        <div
          className="
            mt-8
            flex
            w-full
            min-w-0
            items-start
            gap-6
            xl:gap-7
          "
        >
          <AccountSidebar activeItem="wallets" />

          <div className="min-w-0 flex-1">
            <WalletForm
              username={user.username}
              email={user.email}
            />
          </div>
        </div>
      </div>
    </main>
  )
}