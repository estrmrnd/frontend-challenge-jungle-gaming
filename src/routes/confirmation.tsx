import {
  createFileRoute,
  useNavigate,
} from '@tanstack/react-router'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { getLastPayment } from '@/features/payment/payment-storage'

export const Route = createFileRoute('/confirmation')({
  component: ConfirmationPage,
})

function ConfirmationPage() {
  const navigate = useNavigate()
  const storedPayment = getLastPayment()

  if (!storedPayment) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#140D0A] px-[24px] text-[#F5F1EB]">
        <div className="text-center">
          <h1 className="text-[20px] font-bold">
            Nenhum pagamento encontrado
          </h1>

          <Button
            type="button"
            onClick={() => navigate({ to: '/' })}
            className="mt-[24px] bg-[#D98B47] text-[#140D0A] hover:bg-[#E89B55]"
          >
            Voltar ao mercado
          </Button>
        </div>
      </main>
    )
  }

  const {
    payment,
    cart,
    wallet,
    networkFee,
  } = storedPayment

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.nft.price) * item.quantity,
    0,
  )

  const formattedDate = new Intl.DateTimeFormat(
    'pt-BR',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    },
  ).format(new Date(payment.createdAt))

  const shortTransactionId =
    payment.transactionId.length > 12
      ? `${payment.transactionId.slice(
          0,
          6,
        )}...${payment.transactionId.slice(-4)}`
      : payment.transactionId

  function getWalletName(value: string) {
    if (value === 'metamask') {
      return 'MetaMask'
    }

    if (value === 'coinbase') {
      return 'Coinbase'
    }

    if (value === 'walletconnect') {
      return 'WalletConnect'
    }

    return value
  }

  return (
    <main
      className="
        flex
        min-h-screen
        items-start
        justify-center
        bg-[#140D0A]
        px-[16px]
        py-[48px]
        text-[#F5F1EB]
        md:px-[120px]
        md:py-[96px]
      "
    >
      <section
        className="
          relative
          flex
          w-full
          max-w-[578px]
          flex-col
          overflow-hidden
          bg-[#241612]
          border-b-[8px]
          border-[#D98B47]
        "
      >
        {/* ================= HEADER ================= */}

        <header
          className="
            relative
            flex
            min-h-[156px]
            w-full
            flex-col
            items-center
            justify-center
            gap-[16px]
            border-b
            border-[#754321]
            px-[24px]
            py-[20px]
          "
        >
          <button
            type="button"
            aria-label="Fechar confirmação"
            onClick={() => navigate({ to: '/' })}
            className="
              absolute
              right-[14px]
              top-[14px]
              text-[#D98B47]
              transition-opacity
              hover:opacity-70
            "
          >
            <X size={16} strokeWidth={1.5} />
          </button>

          {/* ÍCONE THANK YOU */}

          <div
            className="
              flex
              h-[80px]
              w-[80px]
              items-center
              justify-center
              text-[#D98B47]
            "
          >
            <svg
              width="58"
              height="72"
              viewBox="0 0 58 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M10 16L18 7H40L48 16V54L29 66L10 54V16Z"
                stroke="currentColor"
                strokeWidth="2"
              />

              <path
                d="M10 29L29 42L48 29"
                stroke="currentColor"
                strokeWidth="2"
              />

              <path
                d="M29 42V66"
                stroke="currentColor"
                strokeWidth="2"
              />

              <text
                x="29"
                y="20"
                textAnchor="middle"
                fill="currentColor"
                fontSize="8"
                fontWeight="700"
              >
                THANK
              </text>

              <text
                x="29"
                y="29"
                textAnchor="middle"
                fill="currentColor"
                fontSize="8"
                fontWeight="700"
              >
                YOU
              </text>
            </svg>
          </div>

          <p
            className="
              text-center
              text-[14px]
              font-bold
              leading-[16px]
              text-[#CFB28C]
              md:text-[16px]
            "
          >
            Seus NFTs agora estão na sua carteira
          </p>
        </header>

        {/* ================= TRANSACTION META ================= */}

        <div
          className="
            grid
            w-full
            grid-cols-2
            gap-y-[14px]
            border-b
            border-[#D98B47]
            px-[20px]
            py-[12px]
            sm:grid-cols-4
            sm:gap-[12px]
            sm:px-[36px]
            sm:py-[4px]
          "
        >
          <TransactionMeta
            label="ID da transação"
            value={shortTransactionId}
          />

          <TransactionMeta
            label="Data"
            value={formattedDate}
          />

          <TransactionMeta
            label="Total"
            value={`${payment.total.toFixed(3)} ETH`}
          />

          <TransactionMeta
            label="Carteira"
            value={getWalletName(wallet)}
            last
          />
        </div>

        {/* ================= DETALHES ================= */}

        <div
          className="
            flex
            w-full
            flex-col
            gap-[12px]
            px-[20px]
            pb-[48px]
            pt-[20px]
            sm:px-[44px]
          "
        >
          <div className="w-full">
            <h2 className="text-[14px] font-bold leading-[16px] text-[#F5F1EB]">
              Detalhes da transação
            </h2>

            {/* CABEÇALHO */}

            <div
              className="
                mt-[8px]
                grid
                grid-cols-[1fr_58px_82px]
                items-center
                border-b
                border-[#754321]
                pb-[8px]
                text-[12px]
                font-bold
                sm:grid-cols-[1fr_70px_100px]
                sm:text-[14px]
              "
            >
              <span>NFTs</span>

              <span className="text-center">
                Edições
              </span>

              <span className="text-right">
                Subtotal
              </span>
            </div>

            {/* NFTs */}

            <div className="flex w-full flex-col">
              {cart.map((item) => {
                const itemSubtotal =
                  Number(item.nft.price) *
                  item.quantity

                return (
                  <div
                    key={item.nft.id}
                    className="
                      grid
                      min-h-[70px]
                      w-full
                      grid-cols-[1fr_58px_82px]
                      items-center
                      sm:grid-cols-[1fr_70px_100px]
                    "
                  >
                    <div
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-[12px]
                      "
                    >
                      <img
                        src={item.nft.image}
                        alt={item.nft.name}
                        className="
                          h-[50px]
                          w-[50px]
                          shrink-0
                          rounded-[6px]
                          object-cover
                        "
                      />

                      <div className="min-w-0">
                        <p
                          className="
                            truncate
                            text-[12px]
                            font-bold
                            text-[#F5F1EB]
                            sm:text-[14px]
                          "
                        >
                          {item.nft.name}
                        </p>

                        <p
                          className="
                            mt-[3px]
                            truncate
                            text-[10px]
                            text-[#C68B56]
                            sm:text-[12px]
                          "
                        >
                          ID do token: #
                          {item.nft.id}
                        </p>
                      </div>
                    </div>

                    <span
                      className="
                        text-center
                        text-[11px]
                        text-[#CFB28C]
                        sm:text-[12px]
                      "
                    >
                      (x {item.quantity})
                    </span>

                    <span
                      className="
                        text-right
                        text-[12px]
                        font-bold
                        text-[#E89950]
                        sm:text-[14px]
                      "
                    >
                      {itemSubtotal.toFixed(2)} ETH
                    </span>
                  </div>
                )
              })}
            </div>

            {/* TOTALS */}

            <div
              className="
                ml-auto
                mt-[8px]
                flex
                w-full
                max-w-[321px]
                flex-col
                gap-[12px]
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  text-[12px]
                  sm:text-[14px]
                "
              >
                <span className="text-[#F5F1EB]">
                  Taxa de rede
                </span>

                <span className="text-[#F5F1EB]">
                  {networkFee.toFixed(3)} ETH
                </span>
              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  text-[12px]
                  font-bold
                  sm:text-[14px]
                "
              >
                <span>Total</span>

                <span className="text-[#E89950]">
                  {(subtotal + networkFee).toFixed(3)} ETH
                </span>
              </div>
            </div>
          </div>

          {/* ================= FOOTER NOTE ================= */}

          <div
            className="
              mt-[4px]
              flex
              min-h-[134px]
              w-full
              flex-col
              items-center
              justify-between
              border-t
              border-[#3F2319]
              pt-[12px]
            "
          >
            <p
              className="
                max-w-[490px]
                text-center
                text-[12px]
                font-normal
                leading-[18px]
                text-[#CFB28C]
                sm:text-[14px]
                sm:leading-[22px]
              "
            >
              Transação confirmada na Ethereum. A
              propriedade foi transferida para sua
              carteira conectada e registrada na rede.
            </p>

            <Button
              type="button"
              onClick={() => {
                console.info(
                    'Transação simulada pelo MSW:',
                    payment.transactionId,
                )
                }}
              className="
                mt-[16px]
                h-[48px]
                rounded-[4px]
                bg-[#D98B47]
                px-[20px]
                text-[14px]
                font-bold
                text-[#140D0A]
                hover:bg-[#E89B55]
              "
            >
              Ver no Etherscan
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

type TransactionMetaProps = {
  label: string
  value: string
  last?: boolean
}

function TransactionMeta({
  label,
  value,
  last = false,
}: TransactionMetaProps) {
  return (
    <div
      className={`
        flex
        min-w-0
        flex-col
        justify-center
        ${
          last
            ? ''
            : 'sm:border-r sm:border-[#D98B47] sm:pr-[12px]'
        }
      `}
    >
      <span className="text-[10px] leading-[14px] text-[#CFB28C] sm:text-[12px]">
        {label}
      </span>

      <span
        className="
          truncate
          text-[10px]
          leading-[14px]
          text-[#CFB28C]
          sm:text-[12px]
        "
        title={value}
      >
        {value}
      </span>
    </div>
  )
}