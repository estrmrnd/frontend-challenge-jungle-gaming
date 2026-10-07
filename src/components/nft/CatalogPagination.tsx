import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'

type CatalogPaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function CatalogPagination({
  currentPage,
  totalPages,
  onPageChange,
}: CatalogPaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  )

  function handlePageChange(
    event: React.MouseEvent<HTMLAnchorElement>,
    page: number,
  ) {
    event.preventDefault()

    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage
    ) {
      return
    }

    onPageChange(page)
  }

  return (
    <Pagination className="ml-auto mr-0 w-auto justify-end">
      <PaginationContent className="h-[35px] gap-[8px]">
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={
                page === currentPage
              }
              onClick={(event) =>
                handlePageChange(
                  event,
                  page,
                )
              }
              className={`
                h-[35px]
                w-[35px]
                cursor-pointer
                rounded-none
                border
                p-0
                text-[14px]
                font-medium
                ${
                  page === currentPage
                    ? 'border-[#D28A4C] bg-[#D28A4C] text-[#140D0A] hover:bg-[#D28A4C] hover:text-[#140D0A]'
                    : 'border-[#5A4032] bg-transparent text-[#F5F1EB] hover:border-[#D28A4C] hover:bg-[#D28A4C] hover:text-[#140D0A]'
                }
              `}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink
              href="#"
              aria-label="Próxima página"
              onClick={(event) =>
                handlePageChange(
                  event,
                  currentPage + 1,
                )
              }
              className="
                h-[35px]
                w-[35px]
                cursor-pointer
                rounded-none
                border
                border-[#5A4032]
                bg-transparent
                p-0
                text-[14px]
                text-[#F5F1EB]
                hover:border-[#D28A4C]
                hover:bg-[#D28A4C]
                hover:text-[#140D0A]
              "
            >
              ›
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}