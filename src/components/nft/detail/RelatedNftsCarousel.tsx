import { useEffect, useState } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'

import type { NFT } from '@/types/nft'

type RelatedNftsCarouselProps = {
  nfts: NFT[]
  title?: string
}

export function RelatedNftsCarousel({
  nfts,
  title = 'Mais desta coleção',
}: RelatedNftsCarouselProps) {
  const [carouselApi, setCarouselApi] =
    useState<CarouselApi>()

  const [currentSlide, setCurrentSlide] =
    useState(0)

  useEffect(() => {
    if (!carouselApi) return

    const updateCarousel = () => {
      setCurrentSlide(
        carouselApi.selectedScrollSnap(),
      )
    }

    updateCarousel()

    carouselApi.on(
      'select',
      updateCarousel,
    )

    carouselApi.on(
      'reInit',
      updateCarousel,
    )

    return () => {
      carouselApi.off(
        'select',
        updateCarousel,
      )

      carouselApi.off(
        'reInit',
        updateCarousel,
      )
    }
  }, [carouselApi])

  return (
    <section
      className="
        mt-16
        flex
        w-full
        max-w-[1200px]
        min-w-0
        flex-col
        gap-8
        overflow-hidden
      "
    >
      {/* TÍTULO */}
      <div className="w-full">
        <h2
          className="
            text-[15px]
            font-bold
            leading-4
            text-[#E89B55]
          "
        >
          {title}
        </h2>

        <div
          className="
            mt-3
            h-px
            w-full
            bg-[#6B452A]
          "
        />
      </div>

      <Carousel
        setApi={setCarouselApi}
        opts={{
          align: 'start',
          loop: true,
        }}
        className="
          w-full
          min-w-0
          overflow-hidden
        "
      >
        <CarouselContent className="-ml-6.25">
          {nfts.map((item) => (
            <CarouselItem
              key={item.id}
              className="
                basis-61.25
                pl-6.25
              "
            >
              <div
                className="
                  flex
                  h-75.75
                  w-55
                  flex-col
                  gap-3
                "
              >
                {/* IMAGEM */}
                <div
                  className="
                    flex
                    h-63.75
                    w-55
                    items-start
                    justify-center
                    bg-[#241612]
                    pt-1
                  "
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      h-53
                      w-53
                      rounded-[13px]
                      object-cover
                    "
                  />
                </div>

                {/* NOME + PREÇO */}
                <div
                  className="
                    flex
                    h-9
                    w-38.5
                    flex-col
                  "
                >
                  <p
                    className="
                      h-5
                      whitespace-nowrap
                      text-[15px]
                      font-normal
                      leading-4
                      text-[#F5F1EB]
                    "
                  >
                    {item.name}
                  </p>

                  <p
                    className="
                      h-4
                      text-[16px]
                      font-bold
                      leading-4
                      text-[#E89B55]
                    "
                  >
                    {item.price}{' '}
                    {item.currency}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* INDICADORES */}
        <div
          className="
            mt-8
            flex
            h-3
            items-center
            justify-center
            gap-1.5
          "
        >
          {[0, 1, 2].map((index) => {
            const maxIndex = Math.max(
              0,
              (carouselApi
                ?.scrollSnapList()
                .length ?? 1) - 1,
            )

            const targetIndex =
              index === 0
                ? 0
                : index === 1
                  ? Math.round(
                      maxIndex / 2,
                    )
                  : maxIndex

            const active =
              index === 0
                ? currentSlide === 0
                : index === 1
                  ? currentSlide > 0 &&
                    currentSlide <
                      maxIndex
                  : currentSlide ===
                    maxIndex

            return (
              <button
                key={index}
                type="button"
                aria-label={`Ir para página ${index + 1}`}
                onClick={() =>
                  carouselApi?.scrollTo(
                    targetIndex,
                  )
                }
                className={`
                  h-2.5
                  w-2.5
                  rounded-full
                  border
                  border-[#E89B55]
                  transition-colors
                  ${
                    active
                      ? 'bg-[#E89B55]'
                      : 'bg-transparent'
                  }
                `}
              />
            )
          })}
        </div>
      </Carousel>
    </section>
  )
}