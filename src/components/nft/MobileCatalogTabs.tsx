import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

import type { CatalogTab } from './CatalogToolbar'

type MobileCatalogTabsProps = {
  selectedTab: CatalogTab
  onTabChange: (tab: CatalogTab) => void
}

const triggerClass = `
  h-5
  flex-none
  rounded-none
  border-0
  bg-transparent
  p-0
  text-[15px]
  font-medium
  leading-[16px]
  text-[#F5F1EB]
  shadow-none

  hover:bg-transparent
  hover:text-[#D28A4C]

  data-active:bg-transparent
  data-active:text-[#D28A4C]
  data-active:shadow-none

  after:!bottom-[-4px]
  after:!bg-[#D28A4C]
`

export function MobileCatalogTabs({
  selectedTab,
  onTabChange,
}: MobileCatalogTabsProps) {
  return (
    <div
      className="
        w-full
        overflow-x-auto
        overflow-y-hidden
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
      "
    >
      <Tabs
        value={selectedTab}
        onValueChange={(value) => {
          onTabChange(value as CatalogTab)
        }}
        className="h-7 w-max"
      >
        <TabsList
          variant="line"
          className="
            h-5
            w-max
            justify-start
            gap-5
            rounded-none
            bg-transparent
            p-0
            pr-6
          "
        >
          <TabsTrigger
            value="all"
            className={triggerClass}
          >
            Todos os NFTs
          </TabsTrigger>

          <TabsTrigger
            value="new"
            className={triggerClass}
          >
            Novos lançamentos
          </TabsTrigger>

          <TabsTrigger
            value="trending"
            className={triggerClass}
          >
            Em alta
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}