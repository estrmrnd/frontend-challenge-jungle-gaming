import { useState } from 'react'
import {
  createFileRoute,
  useNavigate,
} from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'

import { Header } from '@/components/home/Header'
import { CartItem } from '@/components/cart/CartItem'
import { CartSummary } from '@/components/cart/CartSummary'
import { MobileCartItem } from '@/components/cart/MobileCartItem'
import { RelatedNftsCarousel } from '@/components/nft/detail/RelatedNftsCarousel'
import { Footer } from '@/components/home/Footer'
import { HomeBenefits } from '@/components/home/HomeBenefits'
import { MobileCartSummary } from '@/components/cart/MobileCartSummary'

import { useNfts } from '@/features/nfts/queries'

import {
  getCart,
  removeFromCart,
  updateCartQuantity,
  type CartItem as CartItemType,
} from '@/features/cart/cart-storage'

export const Route = createFileRoute('/cart')({
  component: CartPage,
})

function CartPage() {
  const [cart, setCart] =
    useState<CartItemType[]>(() =>
      getCart(),
    )

  const navigate = useNavigate()

  const { data: nfts = [] } =
    useNfts()

  const cartNftIds = new Set(
    cart.map(
      (item) => item.nft.id,
    ),
  )

  const suggestedNfts = nfts.filter(
    (nft) =>
      !cartNftIds.has(nft.id),
  )

  function handleIncrease(
    nftId: string,
  ) {
    const item = cart.find(
      (cartItem) =>
        cartItem.nft.id === nftId,
    )

    if (!item) return

    const updatedCart =
      updateCartQuantity(
        nftId,
        item.quantity + 1,
      )

    setCart(updatedCart)
  }

  function handleDecrease(
    nftId: string,
  ) {
    const item = cart.find(
      (cartItem) =>
        cartItem.nft.id === nftId,
    )

    if (!item) return

    const updatedCart =
      updateCartQuantity(
        nftId,
        item.quantity - 1,
      )

    setCart(updatedCart)
  }

  function handleRemove(
    nftId: string,
  ) {
    const updatedCart =
      removeFromCart(nftId)

    setCart(updatedCart)
  }

  function handleCheckout() {
    navigate({
      to: '/payment',
    })
  }

  return (
    <main className="min-h-screen bg-[#140D0A] text-[#F5F1EB]">
      {/* ========================= */}
      {/* MOBILE + TABLET */}
      {/* ========================= */}

      <div className="lg:hidden">
        <section className="mx-auto w-full max-w-[414px]">
          {cart.length === 0 ? (
            <div className="px-[28px] py-20 text-center">
              <h1 className="text-[20px] font-bold">
                Seu carrinho está vazio
              </h1>

              <p className="mt-2 text-[14px] text-[#CFB28C]">
                Adicione um NFT para
                continuar.
              </p>
            </div>
          ) : (
            <div
              className="
                p-[8px]
                flex
                w-full
                flex-col
                gap-[12px]
                px-[28px]
              "
            >
              {/* SCREEN HEADER */}
              <div
                className="
                  flex
                  h-[44px]
                  w-full
                  items-center
                "
              >
                <button
                  type="button"
                  aria-label="Voltar"
                  onClick={() =>
                    window.history.back()
                  }
                  className="
                    flex
                    h-[28px]
                    w-[28px]
                    shrink-0
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-full
                    bg-[#38241D]
                    text-[#E89B55]
                    transition-opacity
                    hover:opacity-80
                  "
                >
                  <ChevronLeft
                    size={16}
                    strokeWidth={1.5}
                  />
                </button>

                <h1
                  className="
                    flex-1
                    text-center
                    text-[18px]
                    font-bold
                    leading-[20px]
                    text-[#F5F1EB]
                  "
                >
                  Carrinho de NFTs
                </h1>

                <div className="h-[28px] w-[28px] shrink-0" />
              </div>

              {/* CART ITEMS */}
              <div
                className="
                  flex
                  w-full
                  flex-col
                  gap-[20px]
                "
              >
                {cart.map(
                  (item) => (
                    <MobileCartItem
                      key={
                        item.nft.id
                      }
                      item={item}
                      onIncrease={
                        handleIncrease
                      }
                      onDecrease={
                        handleDecrease
                      }
                      onRemove={
                        handleRemove
                      }
                    />
                  ),
                )}
              </div>

              <MobileCartSummary
                cart={cart}
                onCheckout={
                  handleCheckout
                }
              />
            </div>
          )}
        </section>
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

          <section className="pt-8">
            {/* BREADCRUMB */}
            <p
              className="
                mb-3
                text-[14px]
                leading-4
                text-[#F5F1EB]
              "
            >
              Início / Mercado /
              Carrinho
            </p>

            {cart.length === 0 ? (
              <div className="py-20 text-center">
                <h1 className="text-[20px] font-bold">
                  Seu carrinho está
                  vazio
                </h1>

                <p className="mt-2 text-[14px] text-[#CFB28C]">
                  Adicione um NFT para
                  continuar.
                </p>
              </div>
            ) : (
              <>
                {/* CORPO DO CARRINHO */}
                <div
                  className="
                    flex
                    w-full
                    items-start
                    justify-between
                    gap-6
                    xl:h-[388px]
                    xl:gap-0
                  "
                >
                  {/* COLUNA ESQUERDA */}
                  <div
                    className="
                      min-w-0
                      flex-1
                      xl:w-[782px]
                      xl:flex-none
                    "
                  >
                    {/* CABEÇALHO */}
                    <div
                      className="
                        grid
                        h-[28px]
                        w-full
                        grid-cols-[minmax(200px,2.2fr)_minmax(90px,1fr)_minmax(110px,1fr)_minmax(90px,1fr)_40px]
                        items-start
                        border-b
                        border-[#6B452A]
                        text-[13px]
                        font-bold
                        leading-4
                        text-[#F5F1EB]
                        xl:grid-cols-[310px_140px_140px_140px_52px]
                        xl:text-[14px]
                      "
                    >
                      <span>NFTs</span>
                      <span>Preço</span>
                      <span>
                        Edições
                      </span>
                      <span>Total</span>
                      <span />
                    </div>

                    {/* ITENS */}
                    <div
                      className="
                        mt-3
                        flex
                        w-full
                        flex-col
                        gap-3
                      "
                    >
                      {cart.map(
                        (item) => (
                          <CartItem
                            key={
                              item
                                .nft.id
                            }
                            item={item}
                            onIncrease={
                              handleIncrease
                            }
                            onDecrease={
                              handleDecrease
                            }
                            onRemove={
                              handleRemove
                            }
                          />
                        ),
                      )}
                    </div>
                  </div>

                  {/* COLUNA DIREITA */}
                  <CartSummary
                    cart={cart}
                    onCheckout={
                      handleCheckout
                    }
                  />
                </div>

                {/* COLECIONADORES TAMBÉM VIRAM */}
                <RelatedNftsCarousel
                  nfts={
                    suggestedNfts
                  }
                  title="Colecionadores também viram"
                />
              </>
            )}
          </section>
        </div>

        <HomeBenefits />
        <Footer />
      </div>
    </main>
  )
}