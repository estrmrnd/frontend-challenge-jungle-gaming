import { useState } from 'react'

import arrowRight from '@/assets/arrowRight.png'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import type { NFT } from '@/types/nft'

type HeroProps = {
  nft?: NFT
  secondaryNft?: NFT
}

type HeroSlide = {
  eyebrow: string
  title: string
  titleSecondLine: string
  description: string
  nft?: NFT
}

export function Hero({
  nft,
  secondaryNft,
}: HeroProps) {
  const [api, setApi] =
    useState<CarouselApi>()

  const [currentSlide, setCurrentSlide] =
    useState(0)

  const slides: HeroSlide[] = [
    {
      eyebrow: 'Bem-vindo à Kurio',
      title: 'SEJA DONO DO FUTURO',
      titleSecondLine: 'DA ARTE DIGITAL',
      description:
        'Descubra NFTs selecionados de criadores emergentes e consagrados. Colecione arte digital rara, apoie artistas e tenha uma parte da cultura da internet.',
      nft,
    },
    {
      eyebrow: 'Descubra novos artistas',
      title: 'COLECIONE ARTE',
      titleSecondLine: 'QUE CONTA HISTÓRIAS',
      description:
        'Explore obras digitais de criadores do mundo todo e encontre peças únicas para a sua coleção.',
      nft: secondaryNft ?? nft,
    },
    {
      eyebrow: 'Cultura digital',
      title: 'FAÇA PARTE DE UMA',
      titleSecondLine: 'NOVA GERAÇÃO',
      description:
        'Conheça novas coleções, acompanhe tendências e descubra o futuro da arte digital na Kurio.',
      nft,
    },
  ]

  function handleApi(
  carouselApi: CarouselApi,
) {
  if (!carouselApi) {
    return
  }

  setApi(carouselApi)

  setCurrentSlide(
    carouselApi.selectedScrollSnap(),
  )

  carouselApi.on('select', () => {
    setCurrentSlide(
      carouselApi.selectedScrollSnap(),
    )
  })
}

  function scrollToCatalog() {
    document
      .getElementById('catalogo')
      ?.scrollIntoView({
        behavior: 'smooth',
      })
  }

  return (
    <>
      {/* ================= MOBILE + TABLET ================= */}

      <section
        className="
          mx-auto
          w-full
          max-w-[648px]
          overflow-x-clip
          px-4
          pt-6
          sm:px-6
          sm:pt-10
          lg:hidden
        "
      >
        {/* BUSCA */}

        <div
          className="
            flex
            w-full
            items-center
            gap-[10px]
          "
        >
          <button
            type="button"
            onClick={scrollToCatalog}
            className="
              flex
              h-[45px]
              min-w-0
              flex-1
              items-center
              gap-[10px]
              rounded-[10px]
              bg-[#241612]
              px-3
              text-left
              text-[#C99A68]
            "
          >
            <span className="shrink-0 text-[24px] font-normal">
              ⌕
            </span>

            <span
              className="
                truncate
                text-[13px]
                font-bold
                min-[360px]:text-[14px]
                sm:text-[16px]
              "
            >
              Explorar coleções
            </span>
          </button>

          <button
            type="button"
            aria-label="Abrir filtros"
            className="
              flex
              h-[45px]
              w-[45px]
              shrink-0
              items-center
              justify-center
              rounded-[10px]
              bg-[#D28A4C]
              text-[#140D0A]
            "
          >
            ☷
          </button>
        </div>

        {/* CARROSSEL */}

        <Carousel
          setApi={handleApi}
          opts={{
            loop: true,
          }}
          className="mt-4 min-w-0 w-full overflow-hidden"
        >
          <CarouselContent>
            {slides.map(
              (slide, index) => (
            
                 <CarouselItem
                    key={`${slide.title}-${index}`}
                  >
                  <div
                    className="
                      relative
                      h-[190px]
                      w-full
                      overflow-hidden
                      rounded-[12px]
                      bg-[#513421]
                      p-4
                    "
                  >
                    {/* ELIPSE 1 */}

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        -left-[80px]
                        -top-[31px]
                        z-0
                        h-[248px]
                        w-[248px]
                        rounded-full
                        bg-[linear-gradient(160.25deg,rgba(221,154,95,0.43)_22.1%,rgba(210,138,76,0.04)_87.42%)]
                      "
                    />

                    {/* ELIPSE 2 */}

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        -top-[10px]
                        left-[73px]
                        z-0
                        h-[248px]
                        w-[248px]
                        rounded-full
                        bg-[linear-gradient(160.25deg,rgba(221,154,95,0.37)_22.1%,rgba(210,138,76,0)_87.42%)]
                      "
                    />

                    {/* TEXTO */}

                    <div
                      className="
                        relative
                        z-10
                        flex
                        h-full
                        w-[46%]
                        min-w-[130px]
                        max-w-[220px]
                        flex-col
                      "
                    >
                      <p
                        className="
                          text-[10px]
                          font-medium
                          leading-[14px]
                          text-[#F7F3EC]
                          min-[360px]:text-[11px]
                          sm:text-[12px]
                          sm:leading-[16px]
                        "
                      >
                        {slide.eyebrow}
                      </p>

                      <h1
                        className="
                          mt-2
                          text-[15px]
                          font-bold
                          leading-[20px]
                          text-[#F7F3EC]
                          min-[360px]:text-[17px]
                          min-[360px]:leading-[23px]
                          sm:mt-3
                          sm:text-[20px]
                          sm:leading-[27px]
                        "
                      >
                        {slide.title}
                        <br />
                        {slide.titleSecondLine}
                      </h1>

                      <p
                        className="
                          mt-1
                          line-clamp-2
                          text-[9px]
                          font-normal
                          leading-[13px]
                          text-[#D7B38D]
                          min-[360px]:text-[10px]
                          min-[360px]:leading-[14px]
                          sm:text-[11px]
                          sm:leading-[16px]
                        "
                      >
                        {slide.description}
                      </p>

                      <button
                        type="button"
                        onClick={scrollToCatalog}
                        className="
                          mt-1
                          flex
                          h-4
                          w-fit
                          items-center
                          gap-2
                          text-[10px]
                          font-bold
                          text-[#D98D4C]
                          sm:mt-2
                          sm:text-[11px]
                        "
                      >
                        EXPLORAR

                        <img
                          src={arrowRight}
                          alt=""
                          aria-hidden="true"
                          className="h-auto w-[14px]"
                        />
                      </button>
                    </div>

                    {/* NFT */}

                    <div
                      className="
                        absolute
                        right-3
                        top-3
                        z-10
                        h-[146px]
                        w-[42%]
                        max-w-[158px]
                        overflow-hidden
                        sm:right-4
                        sm:h-[158px]
                      "
                    >
                      {slide.nft && (
                        <img
                          src={
                            slide.nft.image
                          }
                          alt={
                            slide.nft.name
                          }
                          className="
                            absolute
                            right-0
                            top-0
                            aspect-square
                            w-full
                            rounded-[16px]
                            object-cover
                          "
                        />
                      )}

                      {secondaryNft && (
                        <img
                          src={
                            secondaryNft.image
                          }
                          alt={
                            secondaryNft.name
                          }
                          className="
                            absolute
                            bottom-0
                            left-0
                            h-10
                            w-10
                            rounded-[10px]
                            object-cover
                            min-[360px]:h-12
                            min-[360px]:w-12
                          "
                        />
                      )}
                    </div>

                    {/* INDICADORES */}

                    <div
                      className="
                        absolute
                        bottom-2
                        left-1/2
                        z-20
                        flex
                        -translate-x-1/2
                        gap-2
                      "
                    >
                      {slides.map(
                        (_, dotIndex) => (
                          <button
                            key={
                              dotIndex
                            }
                            type="button"
                            aria-label={`Ir para slide ${
                              dotIndex + 1
                            }`}
                            onClick={() =>
                              api?.scrollTo(
                                dotIndex,
                              )
                            }
                            className={`
                              h-[8px]
                              rounded-full
                              transition-all
                              ${
                                currentSlide ===
                                dotIndex
                                  ? 'w-[18px] bg-[#D28A4C]'
                                  : 'w-[8px] bg-[#D28A4C]/50'
                              }
                            `}
                          />
                        ),
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ),
            )}
          </CarouselContent>
        </Carousel>
      </section>

      {/* ================= DESKTOP ================= */}

      <section
        className="
          relative
          mx-auto
          mt-8
          hidden
          h-[450px]
          w-full
          max-w-[1200px]
          px-6
          lg:block
          xl:px-0
        "
      >
        <Carousel
          setApi={handleApi}
          opts={{
            loop: true,
          }}
          className="h-full w-full"
        >
          <CarouselContent className="ml-0 h-[450px]">
            {slides.map(
              (slide, index) => (
                <CarouselItem
                  key={`${slide.title}-desktop-${index}`}
                  className="h-[450px] pl-0"
                >
                  <div
                    className="
                      flex
                      h-[450px]
                      w-full
                      items-center
                      justify-between
                      gap-8
                    "
                  >
                    {/* TEXTOS */}

                    <div
                      className="
                        relative
                        flex
                        min-w-0
                        flex-1
                        flex-col
                        justify-center
                      "
                    >
                      <p
                        className="
                          text-[13px]
                          font-medium
                          leading-4
                          tracking-[0.1em]
                          text-[#F7F3EC]
                          xl:text-[14px]
                        "
                      >
                        {slide.eyebrow}
                      </p>

                      <h1
                        className="
                          mt-8
                          text-[32px]
                          font-bold
                          leading-[48px]
                          text-[#F7F3EC]
                          xl:text-[43px]
                          xl:leading-[70px]
                        "
                      >
                        {slide.title}
                        <br />
                        {
                          slide.titleSecondLine
                        }
                      </h1>

                      <p
                        className="
                          mt-6
                          max-w-[557px]
                          text-[13px]
                          font-normal
                          leading-6
                          text-[#D1A77F]
                          xl:text-[14px]
                        "
                      >
                        {slide.description}
                      </p>

                      <button
                        type="button"
                        onClick={scrollToCatalog}
                        className="
                          mt-8
                          flex
                          h-10
                          w-[140px]
                          items-center
                          justify-center
                          rounded-[6px]
                          bg-[#D28A4C]
                          px-7
                          py-[10px]
                          font-bold
                          text-[#140D0A]
                        "
                      >
                        EXPLORAR
                      </button>
                    </div>

                    {/* NFT */}

                    {slide.nft && (
                      <img
                        src={slide.nft.image}
                        alt={slide.nft.name}
                        fetchPriority="high"
                        className="
                          aspect-square
                          w-[36%]
                          max-w-[407px]
                          shrink-0
                          rounded-[24px]
                          object-cover
                        "
                      />
                    )}
                  </div>
                </CarouselItem>
              ),
            )}
          </CarouselContent>

          {/* INDICADORES DESKTOP */}

          <div
            className="
              absolute
              bottom-[28px]
              left-1/2
              z-20
              flex
              -translate-x-1/2
              gap-2
            "
          >
            {slides.map(
              (_, dotIndex) => (
                <button
                  key={dotIndex}
                  type="button"
                  aria-label={`Ir para slide ${
                    dotIndex + 1
                  }`}
                  onClick={() =>
                    api?.scrollTo(dotIndex)
                  }
                  className={`
                    h-2
                    rounded-full
                    transition-all
                    ${
                      currentSlide ===
                      dotIndex
                        ? 'w-5 bg-[#D28A4C]'
                        : 'w-2 bg-[#D28A4C]/50'
                    }
                  `}
                />
              ),
            )}
          </div>
        </Carousel>
      </section>
    </>
  )
}