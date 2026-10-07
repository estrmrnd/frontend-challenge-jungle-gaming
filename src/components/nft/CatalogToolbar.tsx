import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type CatalogTab =
  | 'all'
  | 'new'
  | 'trending'

export type CatalogSort =
  | 'recent'
  | 'price-asc'
  | 'price-desc'

type CatalogToolbarProps = {
  selectedTab: CatalogTab
  onTabChange: (
    tab: CatalogTab,
  ) => void

  selectedSort: CatalogSort
  onSortChange: (
    sort: CatalogSort,
  ) => void
}

const triggerClass = `
  h-[18px]
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

  after:!bottom-[-6px]
  after:!bg-[#D28A4C]
`

export function CatalogToolbar({
  selectedTab,
  onTabChange,
  selectedSort,
  onSortChange,
}: CatalogToolbarProps) {
  return (
    <div className="flex h-4.5 w-210.5 items-start justify-between">
      <Tabs
        value={selectedTab}
        onValueChange={(value) => {
          onTabChange(
            value as CatalogTab,
          )
        }}
        className="h-4.5 w-94"
      >
        <TabsList
          variant="line"
          className="
            h-4.5
            w-94
            justify-start
            gap-5
            rounded-none
            bg-transparent
            p-0
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

      <Select
        value={selectedSort}
        onValueChange={(value) => {
          onSortChange(
            value as CatalogSort,
          )
        }}
      >
        <SelectTrigger
          className="
            h-[28px]
            w-[230px]
            border-0
            bg-transparent
            p-0
            text-[15px]
            font-medium
            text-[#F5F1EB]
            shadow-none
          "
        >
          <span className="mr-1">
            Ordenar por:
          </span>

          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="recent">
            Listados recentemente
          </SelectItem>

          <SelectItem value="price-asc">
            Menor preço
          </SelectItem>

          <SelectItem value="price-desc">
            Maior preço
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}