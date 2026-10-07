import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const labelClass =
  'text-[14px] font-medium leading-[17px] text-[#F5F1EB]'

const inputClass =
  'h-[40px] w-full min-w-0 rounded-[3px] border-[#3F2319] bg-transparent px-[12px] text-[13px] text-[#F5F1EB] placeholder:text-[#B99062] focus-visible:border-[#D28A4C] focus-visible:ring-0'

const selectClass =
  'h-[40px] w-full min-w-0 rounded-[3px] border-[#3F2319] bg-transparent px-[12px] text-[13px] text-[#B99062] focus:ring-0'

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-[12px]">
      <label className={labelClass}>
        {label.replace('*', '').trim()}

        {label.includes('*') && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  )
}

export function CollectorProfileForm() {
  return (
    <section
      className="
        flex
        w-full
        min-w-0
        flex-col
        gap-[24px]
        xl:w-[763px]
      "
    >
      <h1 className="text-[20px] font-bold leading-[24px] text-[#F5F1EB]">
        Perfil do colecionador
      </h1>

      {/* DUAS COLUNAS */}

      <div
        className="
          grid
          w-full
          min-w-0
          grid-cols-2
          gap-[18px]
          xl:gap-[24px]
        "
      >
        {/* COLUNA ESQUERDA */}

        <div className="flex min-w-0 flex-col gap-[12px]">
          <Field label="Nome de exibição*">
            <Input
              name="displayName"
              placeholder="Nome de exibição"
              className={inputClass}
            />
          </Field>

          <Field label="Rede *">
            <Select>
              <SelectTrigger
                className={selectClass}
              >
                <SelectValue placeholder="Selecione uma rede" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ethereum">
                  Ethereum
                </SelectItem>

                <SelectItem value="polygon">
                  Polygon
                </SelectItem>

                <SelectItem value="solana">
                  Solana
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="Endereço da carteira*">
            <Input
              name="walletAddress"
              placeholder="Endereço 0x da carteira"
              className={inputClass}
            />
          </Field>

          <Field label="Tipo de carteira*">
            <Select>
              <SelectTrigger
                className={selectClass}
              >
                <SelectValue placeholder="Selecione uma carteira" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="metamask">
                  MetaMask
                </SelectItem>

                <SelectItem value="walletconnect">
                  WalletConnect
                </SelectItem>

                <SelectItem value="coinbase">
                  Coinbase Wallet
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="E-mail*">
            <Input
              type="email"
              name="email"
              placeholder="seuemail@exemplo.com"
              className={inputClass}
            />
          </Field>
        </div>

        {/* COLUNA DIREITA */}

        <div className="flex min-w-0 flex-col gap-[12px]">
          <Field label="Nome de usuário*">
            <Input
              name="username"
              placeholder="Nome de usuário"
              className={inputClass}
            />
          </Field>

          <Field label="Nome do perfil*">
            <Input
              name="profileName"
              placeholder="Nome do perfil"
              className={inputClass}
            />
          </Field>

          <Field label="Carteira secundária">
            <Input
              name="secondaryWallet"
              placeholder="ENS ou carteira secundária (opcional)"
              className={inputClass}
            />
          </Field>

          <Field label="Código de indicação*">
            <Input
              name="referralCode"
              placeholder="Código de indicação"
              className={inputClass}
            />
          </Field>

          <Field label="Nome ENS *">
            <div className="flex w-full min-w-0">
              <Input
                name="ensName"
                placeholder="Nome ENS"
                className={`${inputClass} min-w-0 rounded-r-none`}
              />

              <Select defaultValue="eth">
                <SelectTrigger
                  className="
                    h-[40px]
                    w-[85px]
                    shrink-0
                    rounded-l-none
                    rounded-r-[3px]
                    border-[#3F2319]
                    bg-transparent
                    px-[10px]
                    text-[13px]
                    text-[#F5F1EB]
                    focus:ring-0
                  "
                >
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="eth">
                    .eth
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Field>
        </div>
      </div>

      {/* OUTRA CARTEIRA */}

      <label className="flex cursor-pointer items-center gap-[8px]">
        <input
          type="radio"
          name="anotherWallet"
          className="accent-[#D28A4C]"
        />

        <span className="text-[13px] text-[#F5F1EB]">
          Usar outra carteira?
        </span>
      </label>

      {/* OBSERVAÇÃO */}

      <div className="flex w-full min-w-0 flex-col gap-[12px]">
        <label className={labelClass}>
          Observação do colecionador
          (opcional)
        </label>

        <Textarea
          name="collectorNote"
          placeholder="Escreva uma observação..."
          className="
            min-h-[150px]
            w-full
            min-w-0
            resize-none
            rounded-[3px]
            border-[#3F2319]
            bg-transparent
            px-[12px]
            py-[10px]
            text-[13px]
            text-[#F5F1EB]
            placeholder:text-[#B99062]
            focus-visible:border-[#D28A4C]
            focus-visible:ring-0
          "
        />
      </div>
    </section>
  )
}