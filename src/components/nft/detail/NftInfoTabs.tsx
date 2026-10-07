import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

import type { NFT } from '@/types/nft'

type NftInfoTabsProps = {
  nft: NFT
}

export function NftInfoTabs({
  nft,
}: NftInfoTabsProps) {
  return (
    <Tabs
      defaultValue="details"
      className="
        mt-16
        w-full
        max-w-[1200px]
      "
    >
      <TabsList
        variant="line"
        className="
          grid
          h-8
          w-full
          grid-cols-2
          rounded-none
          bg-transparent
          p-0
        "
      >
        <TabsTrigger
          value="details"
          className="
            h-8
            w-full
            rounded-none
            border-0
            bg-transparent
            p-0
            text-[15px]
            font-medium
            text-[#F5F1EB]
            shadow-none
            hover:bg-transparent
            hover:text-[#E89B55]
            data-active:bg-transparent
            data-active:text-[#E89B55]
            data-active:shadow-none
            after:bottom-0!
            after:w-full!
            after:bg-[#E89B55]!
          "
        >
          Detalhes do NFT
        </TabsTrigger>

        <TabsTrigger
          value="reviews"
          className="
            h-8
            w-full
            rounded-none
            border-0
            bg-transparent
            p-0
            text-[15px]
            font-medium
            text-[#F5F1EB]
            shadow-none
            hover:bg-transparent
            hover:text-[#E89B55]
            data-active:bg-transparent
            data-active:text-[#E89B55]
            data-active:shadow-none
            after:bottom-0!
            after:w-full!
            after:bg-[#E89B55]!
          "
        >
          Avaliações de colecionadores
          (19)
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="details"
        className="
          mt-3
          min-h-74
          w-full
          text-[14px]
          leading-6
          text-[#CFB28C]
        "
      >
        <p>
          {nft.name} é uma obra digital
          1/50 finalizada à mão da coleção
          Kurio Editions. Cada atributo
          fica armazenado nos metadados do
          token e verificado na Ethereum.
          A obra explora identidade,
          movimento e luz em um mundo
          digital sem fronteiras.
        </p>

        <p className="mt-6">
          A propriedade inclui a arte em
          alta resolução, lançamentos
          exclusivos para colecionadores e
          um registro permanente de
          procedência registrada na rede.
          Nova Sato recebe 5% de direitos
          autorais nas vendas secundárias,
          apoiando novos trabalhos e
          lançamentos da comunidade.
        </p>

        <div className="mt-3">
          <p className="font-bold text-[#F5F1EB]">
            Rede:
          </p>

          <p>
            Cunhado na Ethereum com
            procedência imutável e
            metadados armazenados no IPFS.
          </p>
        </div>

        <div className="mt-3">
          <p className="font-bold text-[#F5F1EB]">
            Contrato:
          </p>

          <p>
            Direitos autorais do criador:
            5% nas vendas secundárias,
            pagos automaticamente pelos
            mercados compatíveis.
          </p>
        </div>

        <div className="mt-3">
          <p className="font-bold text-[#F5F1EB]">
            Direitos autorais:
          </p>

          <p>
            0x7A42...19E8 · Contrato
            inteligente ERC-721 verificado.
          </p>
        </div>
      </TabsContent>

      <TabsContent
        value="reviews"
        className="
          mt-3
          min-h-74
          w-full
          text-[14px]
          leading-6
          text-[#CFB28C]
        "
      >
        <p>
          Avaliações de colecionadores.
        </p>
      </TabsContent>
    </Tabs>
  )
}