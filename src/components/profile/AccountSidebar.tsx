import { Link } from '@tanstack/react-router'
import {
  Archive,
  FileDown,
  Heart,
  LogOut,
  MessageCircleQuestion,
  ShieldCheck,
  Tag,
  WalletCards,
} from 'lucide-react'

type AccountSidebarProps = {
  activeItem?: 'profile' | 'wallets'
}

export function AccountSidebar({
  activeItem = 'profile',
}: AccountSidebarProps) {
  const itemClass =
    'flex h-11.25 w-full min-w-0 items-center gap-3 border-l-6 px-3 text-sm text-[#D28A4C] transition-colors xl:px-4'

  const inactiveClass =
    `${itemClass} border-transparent hover:bg-[#2D1C17]`

  const activeClass =
    `${itemClass} border-[#D28A4C]`

  return (
    <aside
      className="
        w-[250px]
        shrink-0
        bg-[#241612]
        py-2
        xl:w-77.5
      "
    >
      <h2 className="px-3 pb-2 text-base font-bold text-[#F5F1EB]">
        Meu perfil
      </h2>

      <nav className="flex w-full min-w-0 flex-col">
        <Link
          to="/profile"
          className={
            activeItem === 'profile'
              ? activeClass
              : inactiveClass
          }
        >
          <Archive
            size={16}
            className="shrink-0"
          />

          <span className="min-w-0">
            Dados do perfil
          </span>
        </Link>

        <Link
          to="/wallets"
          className={
            activeItem === 'wallets'
              ? activeClass
              : inactiveClass
          }
        >
          <WalletCards
            size={16}
            className="shrink-0"
          />

          <span className="min-w-0">
            Carteiras
          </span>
        </Link>

        <button
          type="button"
          className={inactiveClass}
        >
          <ShieldCheck
            size={16}
            className="shrink-0"
          />

          <span className="min-w-0">
            Atividade
          </span>
        </button>

        <button
          type="button"
          className={inactiveClass}
        >
          <Heart
            size={16}
            className="shrink-0"
          />

          <span className="min-w-0">
            Lista de Interesse
          </span>
        </button>

        <button
          type="button"
          className={inactiveClass}
        >
          <Tag
            size={16}
            className="shrink-0"
          />

          <span className="min-w-0">
            Ofertas
          </span>
        </button>

        <button
          type="button"
          className={inactiveClass}
        >
          <FileDown
            size={16}
            className="shrink-0"
          />

          <span className="min-w-0">
            Arquivos baixados
          </span>
        </button>

        <button
          type="button"
          className={inactiveClass}
        >
          <MessageCircleQuestion
            size={16}
            className="shrink-0"
          />

          <span className="min-w-0">
            Suporte
          </span>
        </button>

        <div className="border-t border-[#513421]">
          <button
            type="button"
            className={inactiveClass}
          >
            <LogOut
              size={16}
              className="shrink-0"
            />

            <span className="min-w-0">
              Sair
            </span>
          </button>
        </div>
      </nav>
    </aside>
  )
}