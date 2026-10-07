import {
  Heart,
  Mail,
  Search,
} from 'lucide-react'

import {
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa'

import { FaXTwitter } from 'react-icons/fa6'

import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import type { NFT } from '@/types/nft'
import { addToCart } from '@/features/cart/cart-storage'

type NftDesktopDetailProps = {
  nft: NFT
}

export function NftDesktopDetail({
  nft,
}: NftDesktopDetailProps) {
  const [quantity, setQuantity] =
    useState(1)

  const navigate = useNavigate()

  function handleDecrease() {
    setQuantity((currentQuantity) =>
      Math.max(
        1,
        currentQuantity - 1,
      ),
    )
  }

  function handleIncrease() {
    setQuantity(
      (currentQuantity) =>
        currentQuantity + 1,
    )
  }

  function handleBuyNft() {
    addToCart(nft, quantity)

    navigate({
      to: '/cart',
    })
  }

  return (
    <>
      {/* PRODUCT */}
      <div
        className="
          flex
          w-full
          max-w-[1200px]
          gap-5
          xl:h-112
          xl:gap-8
        "
      >
        {/* PRODUCT IMAGES */}
        <div
          className="
            flex
            min-w-0
            flex-[0_1_48%]
            gap-4
            xl:h-112
            xl:w-143.25
            xl:flex-none
            xl:gap-7
          "
        >
          {/* THUMBNAILS */}
          <div
            className="
              flex
              w-[72px]
              shrink-0
              flex-col
              gap-3
              xl:h-112
              xl:w-25
              xl:gap-4
            "
          >
            {[1, 2, 3, 4].map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  className="
                    aspect-square
                    w-full
                    shrink-0
                    overflow-hidden
                    rounded-[8px]
                    border-0
                    bg-transparent
                    p-0
                  "
                >
                  <img
                    src={nft.image}
                    alt={`${nft.name} - visualização ${item}`}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                </button>
              ),
            )}
          </div>

          {/* MAIN IMAGE */}
          <div
            className="
              relative
              flex
              aspect-square
              min-w-0
              flex-1
              items-center
              justify-center
              rounded-[6px]
              bg-[#241612]
              p-3
              xl:h-111
              xl:w-111
              xl:flex-none
              xl:p-4
            "
          >
            <img
              src={nft.image}
              alt={nft.name}
              className="
                h-full
                w-full
                rounded-[24px]
                object-cover
              "
            />

            {/* LUPA */}
            <button
              type="button"
              aria-label="Ampliar imagem"
              className="
                absolute
                right-2
                top-2
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-[#38220F]
              "
            >
              <Search
                className="
                  h-4.5
                  w-4.5
                  text-[#F5F1EB]
                "
                strokeWidth={2}
              />
            </button>
          </div>
        </div>

        {/* DETAILS */}
        <div
          className="
            flex
            min-w-0
            flex-1
            flex-col
            gap-5
            xl:h-112
            xl:w-148.75
            xl:flex-none
            xl:justify-between
            xl:gap-0
          "
        >
          {/* CABEÇALHO */}
          <div
            className="
              flex
              min-w-0
              flex-col
              gap-3
              xl:w-148.75
            "
          >
            <h1
              className="
                w-full
                text-[24px]
                font-bold
                leading-tight
                text-[#F5F1EB]
                xl:h-9.25
                xl:w-148.75
                xl:text-[28px]
                xl:leading-7
              "
            >
              {nft.name}
            </h1>

            {/* PREÇO + AVALIAÇÕES */}
            <div
              className="
                flex
                w-full
                min-w-0
                items-center
                justify-between
                gap-3
                xl:h-5
                xl:w-148.75
              "
            >
              <p
                className="
                  shrink-0
                  text-[20px]
                  font-bold
                  leading-4
                  text-[#E89B55]
                  xl:text-[22px]
                "
              >
                {nft.price}{' '}
                {nft.currency}
              </p>

              <div
                className="
                  flex
                  min-w-0
                  items-center
                  justify-end
                  gap-1
                  xl:h-5
                  xl:w-93.75
                "
              >
                <span
                  className="
                    shrink-0
                    text-[13px]
                    text-[#E89B55]
                    xl:text-[15px]
                  "
                >
                  ★★★★★
                </span>

                <span
                  className="
                    truncate
                    text-[11px]
                    text-[#F5F1EB]
                    xl:whitespace-nowrap
                    xl:text-[12px]
                  "
                >
                  19 avaliações de
                  colecionadores
                </span>
              </div>
            </div>
          </div>

          {/* SOBRE */}
          <div
            className="
              flex
              w-full
              flex-col
              gap-3
              xl:h-23.5
              xl:w-143.5
            "
          >
            <h2
              className="
                text-[15px]
                font-bold
                leading-4
                text-[#F5F1EB]
                xl:h-4
              "
            >
              Sobre este NFT:
            </h2>

            <p
              className="
                w-full
                text-[14px]
                leading-6
                text-[#CFB28C]
                xl:w-143.5
              "
            >
              Um colecionável digital
              finalizado à mão da coleção
              Kurio Editions, verificado na{' '}
              {nft.network}, com arte
              desbloqueável e acesso para
              colecionadores.
            </p>
          </div>

          {/* EDIÇÃO */}
          <div
            className="
              flex
              flex-col
              gap-3
              xl:h-14
              xl:w-52.25
            "
          >
            <p
              className="
                text-[15px]
                font-bold
                leading-4
                text-[#F5F1EB]
                xl:h-4
              "
            >
              Edição:
            </p>

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-1.5
                text-[12px]
                text-[#CFB28C]
                xl:h-7
                xl:w-52.25
                xl:flex-nowrap
              "
            >
              <span className="rounded-full border border-[#6B452A] px-1.5 py-0.75">
                1/1
              </span>

              <span className="rounded-full border border-[#6B452A] px-1.5 py-0.75">
                1/10
              </span>

              <span className="rounded-full border border-[#D28A4C] px-1.5 py-0.75 text-[#D28A4C]">
                1/50
              </span>

              <span className="rounded-full border border-[#6B452A] px-1.5 py-0.75">
                ABERTA
              </span>
            </div>
          </div>

          {/* QUANTIDADE + AÇÕES */}
          <div
            className="
              flex
              w-full
              items-center
              justify-between
              gap-4
              xl:h-[49.5px]
              xl:w-148.75
              xl:items-start
            "
          >
            {/* QUANTIDADE */}
            <div
              className="
                flex
                h-[49.5px]
                w-25.75
                shrink-0
                items-start
                justify-between
              "
            >
              <button
                type="button"
                aria-label="Diminuir quantidade"
                onClick={
                  handleDecrease
                }
                className="
                  flex
                  h-12
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-[#E89B55]
                  text-[24px]
                  text-[#140D0A]
                "
              >
                −
              </button>

              <span
                className="
                  flex
                  h-12
                  items-center
                  justify-center
                  text-[15px]
                  text-[#F5F1EB]
                "
              >
                {quantity}
              </span>

              <button
                type="button"
                aria-label="Aumentar quantidade"
                onClick={
                  handleIncrease
                }
                className="
                  flex
                  h-12
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-[#E89B55]
                  text-[24px]
                  text-[#140D0A]
                "
              >
                +
              </button>
            </div>

            {/* COMPRAR + FAVORITAR */}
            <div
              className="
                flex
                min-w-0
                flex-1
                items-center
                gap-2
                xl:h-10
                xl:w-67
                xl:flex-none
              "
            >
              <button
                type="button"
                onClick={
                  handleBuyNft
                }
                className="
                  h-10
                  min-w-0
                  flex-1
                  cursor-pointer
                  rounded-[6px]
                  bg-[#E89B55]
                  px-3
                  text-[11px]
                  font-bold
                  text-[#140D0A]
                  xl:w-32.5
                  xl:flex-none
                  xl:px-0
                  xl:text-[12px]
                "
              >
                COMPRAR
              </button>

              <button
                type="button"
                className="
                  flex
                  h-10
                  min-w-0
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-[6px]
                  border
                  border-[#D28A4C]
                  px-2
                  text-[11px]
                  text-[#D28A4C]
                  xl:w-32.5
                  xl:flex-none
                  xl:px-0
                  xl:text-[12px]
                "
              >
                <Heart className="h-4.25 w-4.25 shrink-0" />

                <span>
                  Favoritar
                </span>
              </button>
            </div>
          </div>

          {/* METADADOS */}
          <div
            className="
              flex
              w-full
              flex-col
              gap-3
              text-[14px]
              leading-4
              text-[#CFB28C]
              xl:h-28.5
              xl:w-77
            "
          >
            <p>
              ID do token: #0042
            </p>

            <p>
              Coleção: Kurio Apes
            </p>

            <p>
              Atributos: Óculos,
              Esmeralda, Raro
            </p>

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-1.25
              "
            >
              <span className="font-bold text-[#F5F1EB]">
                Compartilhar este NFT:
              </span>

              <FaLinkedinIn className="h-3.5 w-3.5 text-[#F5F1EB]" />

              <FaInstagram className="h-3.5 w-3.5 text-[#F5F1EB]" />

              <Mail
                className="h-3.5 w-3.5 text-[#F5F1EB]"
                strokeWidth={2}
              />

              <FaXTwitter className="h-3.5 w-3.5 text-[#F5F1EB]" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}