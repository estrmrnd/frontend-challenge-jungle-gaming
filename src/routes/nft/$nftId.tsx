import {
  lazy,
  Suspense,
  useEffect,
  useState,
} from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Header } from '@/components/home/Header'
import { NftMobileDetail } from '@/components/nft/detail/NftMobileDetail'

import {
  useNft,
  useNfts,
} from '@/features/nfts/queries'

import { useNFTRealtimeQuery } from '@/features/nfts/use-nft-realtime-query'

import type { NFT } from '@/types/nft'

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

const RelatedNftsCarousel = lazy(() =>
  import(
    '@/components/nft/detail/RelatedNftsCarousel'
  ).then((module) => ({
    default: module.RelatedNftsCarousel,
  })),
)

const NftInfoTabs = lazy(() =>
  import(
    '@/components/nft/detail/NftInfoTabs'
  ).then((module) => ({
    default: module.NftInfoTabs,
  })),
)

const NftDesktopDetail = lazy(() =>
  import(
    '@/components/nft/detail/NftDesktopDetail'
  ).then((module) => ({
    default: module.NftDesktopDetail,
  })),
)

export const Route = createFileRoute(
  '/nft/$nftId',
)({
  component: NftDetailPage,
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

function NftDetailPage() {
  const { nftId } = Route.useParams()

  const isDesktop = useIsDesktop()

  useNFTRealtimeQuery({
    nftId,
  })

  const {
    data: nft,
    isLoading,
    isError,
  } = useNft(nftId)

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#140D0A] text-[#F5F1EB]">
        <div
          className="
            mx-auto
            w-full
            max-w-[1200px]
            px-6
            xl:px-0
          "
        >
          {isDesktop && <Header />}

          <div className="py-20">
            Carregando NFT...
          </div>
        </div>
      </main>
    )
  }

  if (isError || !nft) {
    return (
      <main className="min-h-screen bg-[#140D0A] text-[#F5F1EB]">
        <div
          className="
            mx-auto
            w-full
            max-w-[1200px]
            px-6
            xl:px-0
          "
        >
          {isDesktop && <Header />}

          <div className="py-20">
            NFT não encontrado.
          </div>
        </div>
      </main>
    )
  }

  if (!isDesktop) {
    return (
      <main className="min-h-screen bg-[#241612]">
        <NftMobileDetail nft={nft} />
      </main>
    )
  }

  return (
    <DesktopNftDetail
      nft={nft}
      nftId={nftId}
    />
  )
}

function DesktopNftDetail({
  nft,
  nftId,
}: {
  nft: NFT
  nftId: string
}) {
  const {
    data: collectionNfts = [],
  } = useNfts()

  const relatedNfts =
    collectionNfts.filter(
      (item) => item.id !== nftId,
    )

  return (
    <main className="min-h-screen bg-[#140D0A]">
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
      </div>

      <section
        className="
          mx-auto
          w-full
          max-w-[1200px]
          px-6
          pt-8
          xl:px-0
        "
      >
        <p
          className="
            mb-3
            text-[14px]
            leading-4
            text-[#F5F1EB]
          "
        >
          Início / Mercado
        </p>

        <Suspense fallback={null}>
          <NftDesktopDetail
            nft={nft}
          />

          <NftInfoTabs nft={nft} />

          <RelatedNftsCarousel
            nfts={relatedNfts}
          />
        </Suspense>
      </section>

      <Suspense fallback={null}>
        <div className="mt-24">
          <HomeBenefits />
          <Footer />
        </div>
      </Suspense>
    </main>
  )
}