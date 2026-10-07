import { useNavigate } from '@tanstack/react-router'

import type { NFT } from '../../types/nft'

import {
  CatalogSidebar,
  type CategoryFilter,
  type NetworkFilter,
} from './CatalogSidebar'

import { NftGrid } from './NftGrid'

import {
  CatalogToolbar,
  type CatalogSort,
  type CatalogTab,
} from './CatalogToolbar'

import { CatalogPagination } from './CatalogPagination'
import { MobileNftGrid } from './MobileNftGrid'
import { MobileCatalogTabs } from './MobileCatalogTabs'
import { MobileBottomNav } from '../navigation/MobileBottomNav'

import { Route } from '@/routes/index'

type ProductsProps = {
  nfts: NFT[]
}

const ITEMS_PER_PAGE = 9

export function Products({
  nfts,
}: ProductsProps) {
  const navigate = useNavigate({
    from: '/',
  })

  const search = Route.useSearch()

  const selectedTab: CatalogTab =
    search.tab ?? 'all'

  const selectedSort: CatalogSort =
    search.sort === 'price-asc' ||
    search.sort === 'price-desc'
      ? search.sort
      : 'recent'

  // FILTROS COMBINADOS

  const filteredNfts = nfts
    .filter((nft) => {
      const matchesNetwork =
        !search.network ||
        nft.network === search.network

      const matchesCategory =
        !search.category ||
        nft.category === search.category

      const matchesPrice =
        search.maxPrice === undefined ||
        Number(nft.price) <=
          search.maxPrice

      const matchesTab =
        selectedTab !== 'trending' ||
        nft.trending

      return (
        matchesNetwork &&
        matchesCategory &&
        matchesPrice &&
        matchesTab
      )
    })

    // ORDENAÇÃO

    .sort((a, b) => {
      if (selectedSort === 'price-asc') {
        return (
          Number(a.price) -
          Number(b.price)
        )
      }

      if (selectedSort === 'price-desc') {
        return (
          Number(b.price) -
          Number(a.price)
        )
      }

      return (
        new Date(
          b.createdAt,
        ).getTime() -
        new Date(
          a.createdAt,
        ).getTime()
      )
    })

  // PAGINAÇÃO

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredNfts.length /
        ITEMS_PER_PAGE,
    ),
  )

  const currentPage = Math.min(
    Math.max(
      search.page ?? 1,
      1,
    ),
    totalPages,
  )

  const startIndex =
    (currentPage - 1) *
    ITEMS_PER_PAGE

  const paginatedNfts =
    filteredNfts.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE,
    )

  // TABS

  function handleTabChange(
    tab: CatalogTab,
  ) {
    navigate({
      search: {
        ...search,
        tab:
          tab === 'all'
            ? undefined
            : tab,
        page: 1,
      },
    })
  }

  // ORDENAÇÃO

  function handleSortChange(
    sort: CatalogSort,
  ) {
    navigate({
      search: {
        ...search,
        sort:
          sort === 'recent'
            ? undefined
            : sort,
        page: 1,
      },
    })
  }

  // FILTRO DE REDE

  function handleNetworkChange(
    network?: NetworkFilter,
  ) {
    navigate({
      search: {
        ...search,
        network,
        page: 1,
      },
    })
  }

  // FILTRO DE CATEGORIA

  function handleCategoryChange(
    category?: CategoryFilter,
  ) {
    navigate({
      search: {
        ...search,
        category,
        page: 1,
      },
    })
  }

  // FILTRO DE PREÇO

  function handleMaxPriceChange(
    maxPrice?: number,
  ) {
    navigate({
      search: {
        ...search,
        maxPrice,
        page: 1,
      },
    })
  }

  // TROCA DE PÁGINA

  function handlePageChange(
    page: number,
  ) {
    navigate({
      search: {
        ...search,
        page,
      },
    })
  }

  // CONTAGEM REAL DAS REDES

  const networkCounts = {
    ethereum: nfts.filter(
      (nft) =>
        nft.network === 'ethereum',
    ).length,

    polygon: nfts.filter(
      (nft) =>
        nft.network === 'polygon',
    ).length,

    solana: nfts.filter(
      (nft) =>
        nft.network === 'solana',
    ).length,
  }

  // CONTAGEM REAL DAS CATEGORIAS

  const categoryCounts: Record<
    CategoryFilter,
    number
  > = {
    Arte: nfts.filter(
      (nft) =>
        nft.category === 'Arte',
    ).length,

    Fotografia: nfts.filter(
      (nft) =>
        nft.category === 'Fotografia',
    ).length,

    Música: nfts.filter(
      (nft) =>
        nft.category === 'Música',
    ).length,

    'Arte 3D': nfts.filter(
      (nft) =>
        nft.category === 'Arte 3D',
    ).length,

    Colecionáveis: nfts.filter(
      (nft) =>
        nft.category ===
        'Colecionáveis',
    ).length,

    Generativa: nfts.filter(
      (nft) =>
        nft.category === 'Generativa',
    ).length,

    Jogos: nfts.filter(
      (nft) =>
        nft.category === 'Jogos',
    ).length,

    Assinaturas: nfts.filter(
      (nft) =>
        nft.category ===
        'Assinaturas',
    ).length,

    Utilidade: nfts.filter(
      (nft) =>
        nft.category === 'Utilidade',
    ).length,
  }

  return (
    <>
      {/* MOBILE + TABLET + LAPTOP PEQUENO */}

      <section
        className="
          mx-auto
          mt-6
          w-full
          max-w-[648px]
          px-6
          pb-37.5
          xl:hidden
        "
      >
        <div
          className="
            mx-auto
            flex
            w-full
            flex-col
            gap-3
          "
        >
          <MobileCatalogTabs
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />

          <MobileNftGrid
            nfts={paginatedNfts}
          />

          <CatalogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={
              handlePageChange
            }
          />
        </div>
      </section>

      <div className="xl:hidden">
        <MobileBottomNav />
      </div>

      {/* DESKTOP */}

      <section
        className="
          mx-auto
          mt-24
          hidden
          w-300
          gap-12
          xl:flex
        "
      >
        <CatalogSidebar
          selectedNetwork={
            search.network
          }
          onNetworkChange={
            handleNetworkChange
          }
          selectedCategory={
            search.category
          }
          onCategoryChange={
            handleCategoryChange
          }
          selectedMaxPrice={
            search.maxPrice
          }
          onMaxPriceChange={
            handleMaxPriceChange
          }
          networkCounts={
            networkCounts
          }
          categoryCounts={
            categoryCounts
          }
        />

        <div className="flex w-210.5 flex-col gap-8">
          <CatalogToolbar
            selectedTab={selectedTab}
            onTabChange={
              handleTabChange
            }
            selectedSort={
              selectedSort
            }
            onSortChange={
              handleSortChange
            }
          />

          <NftGrid
            nfts={paginatedNfts}
          />

          <CatalogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={
              handlePageChange
            }
          />
        </div>
      </section>
    </>
  )
}