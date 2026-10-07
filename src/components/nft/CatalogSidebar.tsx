import { useState } from 'react'

import { Slider } from '@/components/ui/slider'

export type NetworkFilter =
  | 'ethereum'
  | 'polygon'
  | 'solana'

export type CategoryFilter =
  | 'Arte'
  | 'Fotografia'
  | 'Música'
  | 'Arte 3D'
  | 'Colecionáveis'
  | 'Generativa'
  | 'Jogos'
  | 'Assinaturas'
  | 'Utilidade'

type CatalogSidebarProps = {
  selectedNetwork?: string
  onNetworkChange: (
    network?: NetworkFilter,
  ) => void

  selectedCategory?: string
  onCategoryChange: (
    category?: CategoryFilter,
  ) => void

  selectedMaxPrice?: number
  onMaxPriceChange: (
    maxPrice?: number,
  ) => void

  networkCounts: {
    ethereum: number
    polygon: number
    solana: number
  }

  categoryCounts: Record<
    CategoryFilter,
    number
  >
}

const networks: {
  label: string
  value: NetworkFilter
}[] = [
  {
    label: 'Ethereum',
    value: 'ethereum',
  },
  {
    label: 'Polygon',
    value: 'polygon',
  },
  {
    label: 'Solana',
    value: 'solana',
  },
]

const categories: {
  label: string
  value: CategoryFilter
}[] = [
  {
    label: 'Arte digital',
    value: 'Arte',
  },
  {
    label: 'Fotografia',
    value: 'Fotografia',
  },
  {
    label: 'Música',
    value: 'Música',
  },
  {
    label: 'Arte 3D',
    value: 'Arte 3D',
  },
  {
    label: 'Colecionáveis',
    value: 'Colecionáveis',
  },
  {
    label: 'Generativa',
    value: 'Generativa',
  },
  {
    label: 'Jogos',
    value: 'Jogos',
  },
  {
    label: 'Assinaturas',
    value: 'Assinaturas',
  },
  {
    label: 'Utilidade',
    value: 'Utilidade',
  },
]

export function CatalogSidebar({
  selectedNetwork,
  onNetworkChange,
  selectedCategory,
  onCategoryChange,
  selectedMaxPrice,
  onMaxPriceChange,
  networkCounts,
  categoryCounts,
}: CatalogSidebarProps) {
  const [price, setPrice] = useState(
    selectedMaxPrice ?? 2,
  )

  function handleNetworkClick(
    network: NetworkFilter,
  ) {
    if (selectedNetwork === network) {
      onNetworkChange(undefined)
      return
    }

    onNetworkChange(network)
  }

  function handleCategoryClick(
    category: CategoryFilter,
  ) {
    if (selectedCategory === category) {
      onCategoryChange(undefined)
      return
    }

    onCategoryChange(category)
  }

  function handleApplyPrice() {
    if (price >= 2) {
      onMaxPriceChange(undefined)
      return
    }

    onMaxPriceChange(price)
  }

  return (
    <aside className="flex w-[310px] shrink-0 flex-col gap-[24px]">
      <div className="h-[785px] w-[310px] bg-[#241612] p-[20px]">
        <div className="flex h-[745px] w-[270px] flex-col gap-[40px]">
          {/* COLEÇÕES */}

          <div className="flex h-[388px] w-[270px] flex-col gap-[12px]">
            <h2 className="text-[#F5F1EB]">
              Coleções
            </h2>

            <div>
              {categories.map(
                ({
                  label,
                  value,
                }) => {
                  const isSelected =
                    selectedCategory === value

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        handleCategoryClick(
                          value,
                        )
                      }
                      className={`
                        flex
                        h-[40px]
                        w-[246px]
                        cursor-pointer
                        items-center
                        justify-between
                        text-[15px]
                        leading-[40px]
                        transition-colors
                        ${
                          isSelected
                            ? 'font-bold text-[#E89B55]'
                            : 'font-normal text-[#E89B55]'
                        }
                      `}
                    >
                      <span>
                        {label}
                      </span>

                      <span className="font-bold">
                        (
                        {
                          categoryCounts[
                            value
                          ]
                        }
                        )
                      </span>
                    </button>
                  )
                },
              )}
            </div>
          </div>

          {/* FAIXA DE PREÇO */}

          <div className="flex h-[129px] w-[270px] flex-col gap-[12px]">
            <h2 className="text-[#F5F1EB]">
              Faixa de preço
            </h2>

            <Slider
              value={price}
              onValueChange={(value) => {
                if (
                  typeof value ===
                  'number'
                ) {
                  setPrice(value)
                }
              }}
              min={0}
              max={2}
              step={0.1}
              aria-label="Preço máximo"
              className="h-[21px] w-[258px]"
            />

            <div
              className="
                flex
                h-[20px]
                w-[258px]
                items-center
                justify-between
                text-[14px]
                text-[#F5F1EB]
              "
            >
              <span>
                0 ETH
              </span>

              <span>
                {price.toFixed(1)} ETH
              </span>
            </div>

            <button
              type="button"
              onClick={handleApplyPrice}
              className="
                h-[36px]
                w-[92px]
                cursor-pointer
                rounded-[6px]
                bg-[#D28A4C]
                px-[12px]
                py-[8px]
                font-bold
                text-[#140D0A]
              "
            >
              Aplicar
            </button>
          </div>

          {/* REDE */}

          <div className="flex h-[148px] w-[270px] flex-col gap-[12px]">
            <h2 className="text-[#F5F1EB]">
              Rede
            </h2>

            <div className="h-[120px] w-[270px] pl-[12px]">
              {networks.map(
                ({
                  label,
                  value,
                }) => {
                  const isSelected =
                    selectedNetwork ===
                    value

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        handleNetworkClick(
                          value,
                        )
                      }
                      className={`
                        flex
                        h-[40px]
                        w-[258px]
                        cursor-pointer
                        items-center
                        justify-between
                        text-[15px]
                        font-normal
                        leading-[40px]
                        transition-colors
                        ${
                          isSelected
                            ? 'font-bold text-[#E89B55]'
                            : 'text-[#CFB28C] hover:text-[#E89B55]'
                        }
                      `}
                    >
                      <span>
                        {label}
                      </span>

                      <span>
                        (
                        {
                          networkCounts[
                            value
                          ]
                        }
                        )
                      </span>
                    </button>
                  )
                },
              )}
            </div>
          </div>
        </div>
      </div>

      {/* NFT EM DESTAQUE */}

      <div
        className="
          flex
          h-[470px]
          w-[310px]
          flex-col
          gap-[10px]
          pb-[4px]
          pt-[24px]
        "
      >
        <div className="flex h-[448px] w-[310px] flex-col gap-[16px]">
          {/* TEXTOS */}

          <div className="flex h-[64px] w-[310px] flex-col gap-[16px]">
            <h2
              className="
                h-[32px]
                w-[270px]
                text-[24px]
                font-bold
                leading-[32px]
                text-[#E89B55]
              "
            >
              NFT EM DESTAQUE
            </h2>

            <p
              className="
                h-[16px]
                w-[310px]
                px-[20px]
                text-center
                text-[22px]
                font-bold
                leading-[16px]
                text-[#F5F1EB]
              "
            >
              OFERTA LIMITADA
            </p>
          </div>

          {/* NFT */}

          <div className="h-[368px] w-[310px] overflow-hidden rounded-[22px]">
            <img
              src="/images/nfts/nft2.png"
              alt="NFT em destaque"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </aside>
  )
}