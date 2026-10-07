import {
  lazy,
  Suspense,
  useEffect,
  useState,
} from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Hero } from '../components/home/Hero'
import { Products } from '../components/nft/Products'

import { useNfts } from '../features/nfts/queries'

const Header = lazy(() =>
  import('../components/home/Header').then(
    (module) => ({
      default: module.Header,
    }),
  ),
)

const HomePromos = lazy(() =>
  import('@/components/home/HomePromos').then(
    (module) => ({
      default: module.HomePromos,
    }),
  ),
)

const MintJournal = lazy(() =>
  import('@/components/home/MintJournal').then(
    (module) => ({
      default: module.MintJournal,
    }),
  ),
)

const HomeBenefits = lazy(() =>
  import('@/components/home/HomeBenefits').then(
    (module) => ({
      default: module.HomeBenefits,
    }),
  ),
)

const Footer = lazy(() =>
  import('@/components/home/Footer').then(
    (module) => ({
      default: module.Footer,
    }),
  ),
)

export type CatalogSearch = {
  category?: string
  network?: string
  maxPrice?: number
  tab?: 'all' | 'new' | 'trending'
  sort?: string
  page?: number
}

export const Route = createFileRoute('/')({
  validateSearch: (
    search: Record<string, unknown>,
  ): CatalogSearch => {
    const tab =
      search.tab === 'new' ||
      search.tab === 'trending'
        ? search.tab
        : undefined

    return {
      category:
        typeof search.category === 'string'
          ? search.category
          : undefined,

      network:
        typeof search.network === 'string'
          ? search.network
          : undefined,

      maxPrice:
        typeof search.maxPrice === 'number'
          ? search.maxPrice
          : typeof search.maxPrice === 'string' &&
              search.maxPrice !== ''
            ? Number(search.maxPrice)
            : undefined,

      tab,

      sort:
        typeof search.sort === 'string'
          ? search.sort
          : undefined,

      page:
        typeof search.page === 'number'
          ? search.page
          : typeof search.page === 'string' &&
              search.page !== ''
            ? Number(search.page)
            : undefined,
    }
  },

  component: HomePage,
})

function useIsDesktop() {
  const [isDesktop, setIsDesktop] =
    useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(min-width: 1024px)',
    )

    const updateViewport = () => {
      setIsDesktop(mediaQuery.matches)
    }

    updateViewport()

    mediaQuery.addEventListener(
      'change',
      updateViewport,
    )

    return () => {
      mediaQuery.removeEventListener(
        'change',
        updateViewport,
      )
    }
  }, [])

  return isDesktop
}

function HomePage() {
  const isDesktop = useIsDesktop()

  const {
    data: nfts = [],
    isLoading,
    isError,
    refetch,
  } = useNfts()

  const featuredNft = nfts.find(
    (nft) => nft.featured,
  )

  const secondaryNft = nfts.find(
    (nft) => nft.id === 'hero-secondary',
  )

  return (
    <main className="min-h-screen bg-[#140D0A] text-[#F5F1EB]">
      {isDesktop && (
        <Suspense fallback={null}>
          <Header />
        </Suspense>
      )}

      <Hero
        nft={featuredNft}
        secondaryNft={secondaryNft}
      />

      {isLoading && (
        <section className="mx-auto mt-24 w-full max-w-300 px-6 lg:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-xl border border-[#4A2B20] bg-[#241612] p-4"
              >
                <div className="aspect-square rounded-lg bg-[#513421]" />

                <div className="mt-4 h-4 w-2/3 rounded bg-[#513421]" />

                <div className="mt-3 h-3 w-1/3 rounded bg-[#513421]" />
              </div>
            ))}
          </div>
        </section>
      )}

      {isError && (
        <section className="mx-auto mt-24 w-full max-w-300 px-6 text-center lg:px-0">
          <h2 className="text-xl font-bold">
            Não foi possível carregar os NFTs.
          </h2>

          <p className="mt-2 text-sm text-[#B98A60]">
            Ocorreu um erro ao buscar o catálogo.
            Tente novamente.
          </p>

          <button
            type="button"
            onClick={() => {
              void refetch()
            }}
            className="mt-6 rounded-md bg-[#D28A4C] px-5 py-2.5 text-sm font-semibold text-[#140D0A] transition-opacity hover:opacity-90"
          >
            Tentar novamente
          </button>
        </section>
      )}

      {!isLoading &&
        !isError &&
        nfts.length === 0 && (
          <section className="mx-auto mt-24 w-full max-w-300 px-6 text-center lg:px-0">
            <h2 className="text-xl font-bold">
              Nenhum NFT encontrado.
            </h2>

            <p className="mt-2 text-sm text-[#B98A60]">
              Não há NFTs disponíveis no momento.
            </p>
          </section>
        )}

      {!isLoading &&
        !isError &&
        nfts.length > 0 && (
          <>
            <Products nfts={nfts} />

            {isDesktop && (
              <Suspense fallback={null}>
                <HomePromos nfts={nfts} />

                <MintJournal nfts={nfts} />
              </Suspense>
            )}
          </>
        )}

      {isDesktop && (
        <Suspense fallback={null}>
          <HomeBenefits />
          <Footer />
        </Suspense>
      )}
    </main>
  )
}