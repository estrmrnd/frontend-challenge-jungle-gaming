import { useState } from 'react'
import {
  ChevronLeft,
  Heart,
  ShoppingCart,
  Star,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { NFT } from '@/types/nft'
import { useNavigate } from '@tanstack/react-router'
import { addToCart } from '@/features/cart/cart-storage'

type NftMobileDetailProps = {
  nft: NFT
}

export function NftMobileDetail({
  nft,
}: NftMobileDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const navigate = useNavigate()

  function handleAddToCart() {
    addToCart(nft, quantity)

    navigate({
      to: '/cart',
    })
  }

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1))
  }

  function increaseQuantity() {
    setQuantity((current) => current + 1)
  }

  return (
    <div className="min-h-screen bg-[#241612]">
      {/* CARD */}
      <section
        className="
          mx-auto
          w-103.5
          max-w-full
          overflow-hidden
          rounded-t-[31px]
          bg-[#241612]
        "
      >
        {/* ========================================
            HERO
        ======================================== */}
        <div className="mx-auto flex w-90.25 max-w-[calc(100%-48px)] flex-col gap-2 pt-5.75">

          {/* VOLTAR + FAVORITO */}
          <div className="flex h-8.75 w-full items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Voltar"
              onClick={() => window.history.back()}
              className="
                h-8
                w-8
                rounded-full
                bg-[#342018]
                text-[#E89B55]
                hover:bg-[#342018]
                hover:text-[#E89B55]
              "
            >
              <ChevronLeft
                size={18}
                strokeWidth={1.5}
              />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Favoritar NFT"
              onClick={() =>
                setIsFavorite((current) => !current)
              }
              className="
                h-8
                w-8
                rounded-full
                bg-[#342018]
                text-[#E89B55]
                hover:bg-[#342018]
                hover:text-[#E89B55]
              "
            >
              <Heart
                size={17}
                strokeWidth={1.5}
                fill={
                  isFavorite
                    ? 'currentColor'
                    : 'none'
                }
              />
            </Button>
          </div>

          {/* IMAGEM */}
          <img
            src={nft.image}
            alt={nft.name}
            fetchPriority="high"
            className="
              h-63.75
              w-90.25
              rounded-t-[24px]
              object-cover
            "
          />
        </div>

        {/* ========================================
            DETAILS SHEET
        ======================================== */}
        <div
          className="
            flex
            min-h-60
            w-full
            flex-col
            gap-3
            rounded-t-[31px]
            bg-[#241612]
            px-6
            pb-6
            pt-8
          "
        >
          {/* TITLE ROW */}
          <div className="flex min-h-6.75 w-full items-center justify-between gap-3">
            <h1
              className="
                min-w-0
                truncate
                font-mono
                text-[16px]
                font-bold
                leading-5
                text-[#F5F1EB]
              "
            >
              {nft.name}
            </h1>

            {/* RATING */}
            <div
              className="
                flex
                h-6.75
                shrink-0
                items-center
                rounded-full
                border
                border-[#E89B55]
                px-2
                text-[12px]
                text-[#CFB28C]
              "
            >
              <Star
                className="mr-1 text-[#E89B55]"
                size={12}
                fill="currentColor"
                strokeWidth={1.5}
              />

              <span>4.8 (19)</span>
            </div>
          </div>

          {/* DESCRIÇÃO */}
          <p
            className="
              w-full
              text-[14px]
              font-normal
              leading-6
              text-[#CFB28C]
            "
          >
            Um colecionável digital 1/50 finalizado à mão da coleção
            Kurio Editions, verificado na Ethereum.
          </p>

          {/* EDIÇÃO */}
          <div className="flex w-58 max-w-full flex-col gap-2">
            <p
              className="
                text-[14px]
                font-bold
                leading-4
                text-[#F5F1EB]
              "
            >
              Edição:
            </p>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="
                  h-6
                  rounded-full
                  border-[#6B452A]
                  bg-transparent
                  px-2
                  text-[11px]
                  font-normal
                  text-[#CFB28C]
                  hover:border-[#6B452A]
                  hover:bg-transparent
                  hover:text-[#CFB28C]
                "
              >
                1/10
              </Button>

              <Button
                type="button"
                variant="outline"
                className="
                  h-6
                  rounded-full
                  border-[#6B452A]
                  bg-transparent
                  px-2
                  text-[11px]
                  font-normal
                  text-[#CFB28C]
                  hover:border-[#6B452A]
                  hover:bg-transparent
                  hover:text-[#CFB28C]
                "
              >
                1/10
              </Button>

              <Button
                type="button"
                variant="outline"
                className="
                  h-6
                  rounded-full
                  border-[#E89B55]
                  bg-transparent
                  px-2
                  text-[11px]
                  font-normal
                  text-[#E89B55]
                  hover:border-[#E89B55]
                  hover:bg-transparent
                  hover:text-[#E89B55]
                "
              >
                1/50
              </Button>

              <Button
                type="button"
                variant="outline"
                className="
                  h-6
                  rounded-full
                  border-[#6B452A]
                  bg-transparent
                  px-2
                  text-[11px]
                  font-normal
                  text-[#CFB28C]
                  hover:border-[#6B452A]
                  hover:bg-transparent
                  hover:text-[#CFB28C]
                "
              >
                ABERTA
              </Button>
            </div>
          </div>

          {/* TOKEN INFO */}
          <div
            className="
              flex
              w-76.75
              max-w-full
              flex-col
              gap-3
              text-[13px]
              leading-4
              text-[#B99062]
            "
          >
            <p>ID do token: #0042</p>

            <p>Coleção: Kurio Apes</p>

            <p>
              Atributos: Óculos, Esmeralda, Raro
            </p>
          </div>
        </div>

        {/* ========================================
            BUY BAR
        ======================================== */}
        <div
          className="
            flex
            h-41
            w-full
            flex-col
            gap-2.5
            rounded-t-[40px]
            bg-[#241612]
            px-6
            pb-9
            pt-5
            shadow-[0_0_20px_rgba(10,6,4,0.45)]
          "
        >
          <div className="flex w-full flex-col gap-5">

            {/* QTD + PREÇO */}
            <div className="flex h-7.5 w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#CFB28C]">
                  Qtd.
                </span>

                <Button
                  type="button"
                  size="icon"
                  aria-label="Diminuir quantidade"
                  onClick={decreaseQuantity}
                  className="
                    h-6
                    w-5
                    min-w-5
                    rounded-full
                    bg-[#D88948]
                    p-0
                    text-[16px]
                    font-normal
                    text-[#241612]
                    hover:bg-[#D88948]
                    hover:text-[#241612]
                  "
                >
                  −
                </Button>

                <span
                  className="
                    min-w-3
                    text-center
                    text-[16px]
                    text-[#F5F1EB]
                  "
                >
                  {quantity}
                </span>

                <Button
                  type="button"
                  size="icon"
                  aria-label="Aumentar quantidade"
                  onClick={increaseQuantity}
                  className="
                    h-6
                    w-5
                    min-w-5
                    rounded-full
                    bg-[#D88948]
                    p-0
                    text-[16px]
                    font-normal
                    text-[#241612]
                    hover:bg-[#D88948]
                    hover:text-[#241612]
                  "
                >
                  +
                </Button>
              </div>

              {/* PREÇO */}
              <p
                className="
                  whitespace-nowrap
                  text-[18px]
                  font-bold
                  text-[#E89B55]
                "
              >
                {nft.price} {nft.currency}
              </p>
            </div>

            {/* COMPRAR + CARRINHO */}
            <div className="flex h-15 items-center gap-3">
              <Button
                type="button"
                className="
                  h-13
                  w-48.5
                  rounded-full
                  bg-[#D88948]
                  text-[14px]
                  font-bold
                  text-[#140D0A]
                  hover:bg-[#D88948]
                  hover:text-[#140D0A]
                "
              >
                Comprar NFT
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Adicionar ao carrinho"
                onClick={handleAddToCart}
                className="
                  h-13
                  w-13
                  rounded-full
                  bg-[#342018]
                  text-[#CFB28C]
                  hover:bg-[#342018]
                  hover:text-[#E89B55]
                "
              >
                <ShoppingCart
                  size={18}
                  strokeWidth={1.5}
                />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}