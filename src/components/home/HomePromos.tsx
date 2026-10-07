import { ArrowRight } from 'lucide-react'

import type { NFT } from '@/types/nft'

type HomePromosProps = {
  nfts: NFT[]
}

export function HomePromos({
  nfts,
}: HomePromosProps) {
  const emeraldApe = nfts.find(
    (nft) => nft.id === 'emerald-ape-42',
  )

  const neonVessel = nfts.find(
    (nft) => nft.id === 'neon-vessel-552',
  )

  if (!emeraldApe || !neonVessel) {
    return null
  }

  return (
    <>
      {/* LAPTOP PEQUENO — 1024px até 1279px */}
      <section
        className="
          mx-auto
          mt-20
          hidden
          w-full
          max-w-[900px]
          flex-col
          gap-5
          lg:flex
          xl:hidden
        "
      >
        {/* Promo 1 */}
        <article
          className="
            flex
            h-[220px]
            w-full
            overflow-hidden
            rounded-lg
            bg-[#241612]
          "
        >
          <img
            src={emeraldApe.image}
            alt={emeraldApe.name}
            className="
              h-full
              w-[45%]
              shrink-0
              object-cover
            "
          />

          <div
            className="
              flex
              min-w-0
              flex-1
              flex-col
              items-end
              justify-center
              px-8
              text-right
            "
          >
            <h2
              className="
                text-[16px]
                font-bold
                leading-[22px]
                text-[#F5F1EB]
              "
            >
              Lançamentos gênesis
              <br />
              de edição limitada
            </h2>

            <p
              className="
                mt-4
                max-w-[360px]
                text-[12px]
                leading-[18px]
                text-[#C9A17D]
              "
            >
              Colecione edições escassas
              diretamente dos criadores antes
              da revelação pública.
            </p>

            <button
              type="button"
              className="
                mt-4
                flex
                h-[34px]
                items-center
                gap-2
                rounded-md
                bg-[#D28A4C]
                px-[18px]
                text-[12px]
                font-bold
                text-[#140D0A]
              "
            >
              Explorar

              <ArrowRight
                className="h-[13px] w-[13px]"
                strokeWidth={2}
              />
            </button>
          </div>
        </article>

        {/* Promo 2 */}
        <article
          className="
            flex
            h-[220px]
            w-full
            overflow-hidden
            rounded-lg
            bg-[#241612]
          "
        >
          <img
            src={neonVessel.image}
            alt={neonVessel.name}
            className="
              h-full
              w-[45%]
              shrink-0
              object-cover
            "
          />

          <div
            className="
              flex
              min-w-0
              flex-1
              flex-col
              items-end
              justify-center
              px-8
              text-right
            "
          >
            <h2
              className="
                text-[16px]
                font-bold
                leading-[22px]
                text-[#F5F1EB]
              "
            >
              Arte digital selecionada
              <br />
              e muito mais
            </h2>

            <p
              className="
                mt-4
                max-w-[360px]
                text-[12px]
                leading-[18px]
                text-[#C9A17D]
              "
            >
              Explore novos artistas,
              coleções verificadas e obras
              digitais que definem a cultura.
            </p>

            <button
              type="button"
              className="
                mt-4
                flex
                h-[34px]
                items-center
                gap-2
                rounded-md
                bg-[#D28A4C]
                px-[18px]
                text-[12px]
                font-bold
                text-[#140D0A]
              "
            >
              Explorar

              <ArrowRight
                className="h-[13px] w-[13px]"
                strokeWidth={2}
              />
            </button>
          </div>
        </article>
      </section>

      {/* DESKTOP — 1280px+ */}
      <section
        className="
          mx-auto
          mt-20
          hidden
          h-[250px]
          w-[1200px]
          justify-between
          xl:flex
        "
      >
        {/* Promo 1 */}
        <article
          className="
            flex
            h-[250px]
            w-[586px]
            overflow-hidden
            rounded-lg
            bg-[#241612]
          "
        >
          <img
            src={emeraldApe.image}
            alt={emeraldApe.name}
            className="
              h-[250px]
              w-[293px]
              shrink-0
              object-cover
            "
          />

          <div
            className="
              flex
              h-full
              flex-1
              flex-col
              items-end
              justify-center
              px-8
              text-right
            "
          >
            <h2
              className="
                text-[16px]
                font-bold
                leading-[22px]
                text-[#F5F1EB]
              "
            >
              Lançamentos gênesis
              <br />
              de edição limitada
            </h2>

            <p
              className="
                mt-4
                text-[12px]
                leading-[18px]
                text-[#C9A17D]
              "
            >
              Colecione edições escassas
              <br />
              diretamente dos criadores antes
              <br />
              da revelação pública.
            </p>

            <button
              type="button"
              className="
                mt-4
                flex
                h-[34px]
                items-center
                gap-2
                rounded-md
                bg-[#D28A4C]
                px-[18px]
                text-[12px]
                font-bold
                text-[#140D0A]
              "
            >
              Explorar

              <ArrowRight
                className="h-[13px] w-[13px]"
                strokeWidth={2}
              />
            </button>
          </div>
        </article>

        {/* Promo 2 */}
        <article
          className="
            flex
            h-[250px]
            w-[586px]
            overflow-hidden
            rounded-lg
            bg-[#241612]
          "
        >
          <img
            src={neonVessel.image}
            alt={neonVessel.name}
            className="
              h-[250px]
              w-[293px]
              shrink-0
              object-cover
            "
          />

          <div
            className="
              flex
              h-full
              flex-1
              flex-col
              items-end
              justify-center
              px-8
              text-right
            "
          >
            <h2
              className="
                text-[16px]
                font-bold
                leading-[22px]
                text-[#F5F1EB]
              "
            >
              Arte digital selecionada
              <br />
              e muito mais
            </h2>

            <p
              className="
                mt-4
                text-[12px]
                leading-[18px]
                text-[#C9A17D]
              "
            >
              Explore novos artistas,
              <br />
              coleções verificadas e obras
              <br />
              digitais que definem a
              <br />
              cultura.
            </p>

            <button
              type="button"
              className="
                mt-4
                flex
                h-[34px]
                items-center
                gap-2
                rounded-md
                bg-[#D28A4C]
                px-[18px]
                text-[12px]
                font-bold
                text-[#140D0A]
              "
            >
              Explorar

              <ArrowRight
                className="h-[13px] w-[13px]"
                strokeWidth={2}
              />
            </button>
          </div>
        </article>
      </section>
    </>
  )
}