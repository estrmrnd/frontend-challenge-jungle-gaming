import { createFileRoute } from '@tanstack/react-router'

import { Header } from '@/components/home/Header'
import { AccountSidebar } from '@/components/profile/AccountSidebar'
import { ProfileForm } from '@/components/profile/ProfileForm'
import { getAuthUser } from '@/features/auth/auth-storage'

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
})

function ProfilePage() {
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
            <h1 className="text-base font-bold">
              Perfil do colecionador
            </h1>

            <p className="mt-4 text-sm text-[#B98A60]">
              Você precisa entrar para visualizar seu perfil.
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
          Vamos colocar aqui a estrutura
          mobile/tablet do perfil.
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
          <AccountSidebar
            activeItem="profile"
          />

          <div className="min-w-0 flex-1">
            <ProfileForm user={user} />
          </div>
        </div>
      </div>
    </main>
  )
}