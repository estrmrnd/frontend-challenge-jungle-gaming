import { ArrowRight } from 'lucide-react'

import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

import type { NFT } from '@/types/nft'

type MintJournalProps = {
  nfts: NFT[]
}

const articles = [
  {
    nftId: 'neon-vessel-552',
    date: '12 de setembro',
    readingTime: 'Leitura de 6 min',
    title:
      'Como funciona a propriedade de NFTs',
    description:
      'Aprenda a colecionar, negociar e verificar ativos digitais.',
  },
  {
    nftId: 'emerald-ape-42',
    date: '13 de setembro',
    readingTime: 'Leitura de 2 min',
    title:
      '10 artistas digitais para acompanhar',
    description:
      'Conheça criadores que moldam a cultura digital.',
  },
  {
    nftId: 'sage-nomad-009',
    date: '15 de setembro',
    readingTime: 'Leitura de 3 min',
    title:
      'Raridade, atributos e procedência',
    description:
      'Entenda raridade, procedência, direitos autorais e utilidade.',
  },
  {
    nftId: 'golden-beat-207',
    date: '15 de setembro',
    readingTime: 'Leitura de 2 min',
    title: 'Como proteger sua carteira',
    description:
      'Proteja sua carteira, seus ativos e sua identidade.',
  },
]

export function MintJournal({
  nfts,
}: MintJournalProps) {
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
          gap-10
          lg:flex
          xl:hidden
        "
      >
        {/* Cabeçalho */}
        <div
          className="
            flex
            w-full
            flex-col
            items-center
            gap-3
            text-center
          "
        >
          <h2
            className="
              font-mono
              text-[26px]
              font-bold
              leading-7
              text-[#F5F1EB]
            "
          >
            Diário da Cunhagem
          </h2>

          <p
            className="
              font-mono
              text-[13px]
              leading-[18px]
              text-[#CFB28C]
            "
          >
            Histórias, guias e insights para
            colecionadores sobre o universo da
            propriedade digital.
          </p>
        </div>

        {/* Cards */}
        <div
          className="
            grid
            w-full
            grid-cols-2
            gap-6
          "
        >
          {articles.map((article) => {
            const nft = nfts.find(
              (item) =>
                item.id === article.nftId,
            )

            if (!nft) {
              return null
            }

            return (
              <Card
                key={article.title}
                className="
                  h-[250px]
                  w-full
                  gap-0
                  overflow-hidden
                  rounded-lg
                  border-0
                  bg-[#241612]
                  py-0
                  shadow-none
                  [&_[data-slot=card-content]]:bg-[#241612]
                  [&_[data-slot=card-footer]]:bg-[#241612]
                "
              >
                <div className="flex h-full">
                  <img
                    src={nft.image}
                    alt={nft.name}
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
                    "
                  >
                    <CardContent
                      className="
                        flex
                        flex-1
                        flex-col
                        px-5
                        pb-0
                        pt-5
                      "
                    >
                      <p
                        className="
                          font-mono
                          text-[10px]
                          font-medium
                          leading-[15px]
                          text-[#CFB28C]
                        "
                      >
                        {article.date}
                        <span className="mx-2">
                          |
                        </span>
                        {article.readingTime}
                      </p>

                      <h3
                        className="
                          mt-2
                          font-mono
                          text-[14px]
                          font-bold
                          leading-[17px]
                          text-[#F5F1EB]
                        "
                      >
                        {article.title}
                      </h3>

                      <p
                        className="
                          mt-3
                          font-mono
                          text-[11px]
                          font-medium
                          leading-[16px]
                          text-[#CFB28C]
                        "
                      >
                        {article.description}
                      </p>
                    </CardContent>

                    <CardFooter
                      className="
                        border-0
                        bg-[#241612]
                        px-5
                        pb-5
                        pt-0
                      "
                    >
                      <button
                        type="button"
                        className="
                          flex
                          h-4
                          w-fit
                          items-center
                          gap-1
                          bg-transparent
                          font-mono
                          text-[11px]
                          font-medium
                          text-[#D28A4C]
                        "
                      >
                        Ler mais

                        <ArrowRight
                          className="h-3 w-3"
                          strokeWidth={1.5}
                        />
                      </button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* DESKTOP — 1280px+ */}
      <section
        className="
          mx-auto
          mt-20
          hidden
          h-[476px]
          w-[1200px]
          flex-col
          gap-10
          xl:flex
        "
      >
        {/* Cabeçalho */}
        <div
          className="
            flex
            h-[67px]
            w-full
            flex-col
            items-center
            gap-3
            text-center
          "
        >
          <h2
            className="
              h-[37px]
              w-full
              font-mono
              text-[28px]
              font-bold
              leading-7
              text-[#F5F1EB]
            "
          >
            Diário da Cunhagem
          </h2>

          <p
            className="
              h-[18px]
              w-full
              font-mono
              text-[14px]
              leading-[14px]
              text-[#CFB28C]
            "
          >
            Histórias, guias e insights para
            colecionadores sobre o universo da
            propriedade digital.
          </p>
        </div>

        {/* Cards */}
        <div className="flex h-[369px] w-full gap-6">
          {articles.map((article) => {
            const nft = nfts.find(
              (item) =>
                item.id === article.nftId,
            )

            if (!nft) {
              return null
            }

            return (
              <Card
                key={article.title}
                className="
                  h-[369px]
                  w-[268px]
                  shrink-0
                  gap-0
                  overflow-hidden
                  rounded-lg
                  border-0
                  bg-[#241612]
                  py-0
                  shadow-none
                  [&_[data-slot=card-content]]:bg-[#241612]
                  [&_[data-slot=card-footer]]:bg-[#241612]
                "
              >
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="
                    h-[194px]
                    w-[268px]
                    shrink-0
                    object-cover
                  "
                />

                <CardContent
                  className="
                    flex
                    flex-1
                    flex-col
                    px-4
                    pb-0
                    pt-3
                  "
                >
                  <p
                    className="
                      min-h-8
                      w-[236px]
                      font-mono
                      text-[12px]
                      font-medium
                      leading-4
                      text-[#CFB28C]
                    "
                  >
                    {article.date}

                    <span className="mx-2.5">
                      |
                    </span>

                    {article.readingTime}
                  </p>

                  <h3
                    className="
                      mt-1
                      w-[236px]
                      font-mono
                      text-[16px]
                      font-bold
                      leading-4
                      text-[#F5F1EB]
                    "
                  >
                    {article.title}
                  </h3>

                  <p
                    className="
                      mt-2.5
                      w-[236px]
                      font-mono
                      text-[12px]
                      font-medium
                      leading-4
                      text-[#CFB28C]
                    "
                  >
                    {article.description}
                  </p>
                </CardContent>

                <CardFooter
                  className="
                    border-0
                    bg-[#241612]
                    px-4
                    pb-3
                    pt-0
                  "
                >
                  <button
                    type="button"
                    className="
                      flex
                      h-4
                      w-fit
                      items-center
                      gap-1
                      bg-transparent
                      font-mono
                      text-[12px]
                      font-medium
                      leading-4
                      text-[#D28A4C]
                    "
                  >
                    Ler mais

                    <ArrowRight
                      className="h-3 w-3"
                      strokeWidth={1.5}
                    />
                  </button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </section>
    </>
  )
}