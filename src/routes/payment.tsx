import {
  createFileRoute,
  useNavigate,
} from '@tanstack/react-router'
import { useRef, useState } from 'react'

import { AuthModal } from '@/features/auth/AuthModal'
import { Footer } from '@/components/home/Footer'
import { Header } from '@/components/home/Header'
import { HomeBenefits } from '@/components/home/HomeBenefits'

import { CollectorProfileForm } from '@/components/payment/CollectorProfileForm'
import { MobileWalletPayment } from '@/components/payment/MobileWalletPayment'
import { PaymentSummary } from '@/components/payment/PaymentSummary'
import {
  WalletSelector,
  type WalletType,
} from '@/components/payment/WalletSelector'

import { getAuthUser } from '@/features/auth/auth-storage'

import {
  clearCart,
  getCart,
  type CartItem,
} from '@/features/cart/cart-storage'

import { useCreatePayment } from '@/features/payment/mutations'
import { saveLastPayment } from '@/features/payment/payment-storage'

export const Route = createFileRoute('/payment')({
  component: PaymentPage,
})

const NETWORK_FEE = 0.016

function PaymentPage() {
  const navigate = useNavigate()

  const [cart, setCart] = useState<CartItem[]>(
    () => getCart(),
  )

  const [authOpen, setAuthOpen] =
    useState(false)

  const [
    pendingWallet,
    setPendingWallet,
  ] = useState<string | null>(null)

  const paymentMutation =
    useCreatePayment()

  /*
   * A chave pertence a esta tentativa de checkout.
   * Ela não é recriada a cada chamada da API.
   */
  const idempotencyKeyRef =
    useRef<string>(
      crypto.randomUUID(),
    )

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.nft.price) *
        item.quantity,
    0,
  )

  const total =
    subtotal + NETWORK_FEE

  /*
   * Executa efetivamente o pagamento.
   */
  function processPayment(
    wallet: string,
  ) {
    if (cart.length === 0) {
      return
    }

    paymentMutation.mutate(
      {
        items: cart.map((item) => ({
          nftId: item.nft.id,
          quantity: item.quantity,
        })),

        wallet,
        total,
        idempotencyKey:
          idempotencyKeyRef.current,
      },
      {
        onSuccess: (payment) => {
          saveLastPayment(
            payment,
            cart,
            wallet,
            NETWORK_FEE,
          )

          clearCart()
          setCart([])

          navigate({
            to: '/confirmation',
          })
        },

        onError: (error) => {
          console.error(
            'Erro no pagamento:',
            error,
          )
        },
      },
    )
  }

  /*
   * Antes de pagar, verificamos autenticação.
   *
   * No mobile/tablet, caso a pessoa ainda
   * não esteja autenticada, abrimos o fluxo
   * de login/cadastro.
   */
  function handleConfirmPayment(
    wallet: string,
  ) {
    if (cart.length === 0) {
      return
    }

    const user = getAuthUser()

    const isMobileOrTablet =
      window.innerWidth < 1024

    if (
      isMobileOrTablet &&
      !user
    ) {
      setPendingWallet(wallet)
      setAuthOpen(true)

      return
    }

    processPayment(wallet)
  }

  /*
   * Login ou cadastro concluído.
   *
   * Se existia um pagamento aguardando
   * autenticação, continuamos o checkout.
   */
  function handleAuthenticated() {
    setAuthOpen(false)

    if (!pendingWallet) {
      return
    }

    const wallet =
      pendingWallet

    setPendingWallet(null)

    processPayment(wallet)
  }

  return (
    <div className="min-h-screen bg-[#140D0A] text-[#F5F1EB]">
      {/* ========================= */}
      {/* MOBILE + TABLET */}
      {/* ========================= */}

      <div className="min-h-screen bg-[#140D0A] lg:hidden">
        <MobileWalletPayment
          total={total}
          onConfirm={
            handleConfirmPayment
          }
        />
      </div>

      {/* ========================= */}
      {/* LAPTOP + DESKTOP */}
      {/* ========================= */}

      <div className="hidden lg:block">
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
        </div>

        <main
          className="
            mx-auto
            w-full
            max-w-[1200px]
            px-6
            pt-[32px]
            xl:px-0
          "
        >
          {/* BREADCRUMB */}

          <div className="mb-[32px] flex items-center gap-[8px] text-[12px]">
            <span className="text-[#B99062]">
              Início
            </span>

            <span className="text-[#B99062]">
              /
            </span>

            <span className="text-[#B99062]">
              Mercado
            </span>

            <span className="text-[#B99062]">
              /
            </span>

            <span className="text-[#F5F1EB]">
              Pagamento
            </span>
          </div>

          {/* CONTEÚDO PRINCIPAL */}

          <div
            className="
              flex
              w-full
              items-start
              gap-6
              xl:gap-[32px]
            "
          >
            <div className="min-w-0 flex-1">
              <CollectorProfileForm />
            </div>

            <aside
              className="
                flex
                w-[36%]
                min-w-[330px]
                max-w-[405px]
                shrink-0
                flex-col
                gap-[20px]
                xl:w-[405px]
              "
            >
              <PaymentSummary
                cart={cart}
              />

              <WalletSelector
                loading={
                  paymentMutation.isPending
                }
                onConfirm={(
                  wallet: WalletType,
                ) => {
                  handleConfirmPayment(
                    wallet,
                  )
                }}
              />
            </aside>
          </div>

          {paymentMutation.isError && (
            <p className="mt-[16px] text-right text-[13px] text-red-400">
              Não foi possível processar o
              pagamento.
            </p>
          )}
        </main>

        <div className="mt-[72px]">
          <HomeBenefits />
        </div>

        <Footer />
      </div>

      {/* ========================= */}
      {/* AUTENTICAÇÃO */}
      {/* ========================= */}

      <AuthModal
        open={authOpen}
        onClose={() => {
          setAuthOpen(false)
          setPendingWallet(null)
        }}
        onAuthenticated={() => {
          handleAuthenticated()
        }}
      />
    </div>
  )
}