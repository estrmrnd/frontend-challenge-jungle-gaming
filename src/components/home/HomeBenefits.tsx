import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const benefits = [
  {
    letter: 'W',
    title: 'Segurança da carteira',
    description:
      'Proteja sua carteira e colecione arte digital verificada com confiança.',
  },
  {
    letter: 'C',
    title: 'Criadores em destaque',
    description:
      'Conheça artistas, estúdios e comunidades que moldam a cultura digital na rede.',
  },
  {
    letter: 'D',
    title: 'Alertas de lançamentos',
    description:
      'Receba calendários de cunhagem, novidades de listas de acesso e análises do mercado.',
  },
]

export function HomeBenefits() {
  return (
    <section
      className="
        mx-auto
        mt-16
        hidden
        w-full
        max-w-[1200px]
        bg-[#241612]
        lg:block
      "
    >
      <div
        className="
          mx-auto
          grid
          w-full
          grid-cols-[repeat(3,minmax(0,1fr))_minmax(240px,1.25fr)]
          gap-0
          px-6
          py-8
          xl:min-h-[202px]
          xl:w-[1154px]
          xl:px-0
        "
      >
        {benefits.map(
          (benefit, index) => (
            <div
              key={benefit.title}
              className={`
                flex
                min-w-0
                flex-col
                gap-[10px]
                px-4
                ${
                  index !== 0
                    ? 'border-l border-[#D28A4C]'
                    : ''
                }
                xl:w-[264.67px]
              `}
            >
              <div
                className="
                  flex
                  h-[64px]
                  w-[64px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#D98B43]
                  text-[20px]
                  font-bold
                  text-[#140D0A]
                  xl:h-[74px]
                  xl:w-[74px]
                "
              >
                {benefit.letter}
              </div>

              <h3
                className="
                  w-full
                  text-[15px]
                  font-bold
                  leading-[18px]
                  text-[#F5F1EB]
                  xl:text-[17px]
                  xl:leading-[16px]
                "
              >
                {benefit.title}
              </h3>

              <p
                className="
                  w-full
                  text-[13px]
                  font-normal
                  leading-[20px]
                  text-[#CFB28C]
                  xl:w-[204px]
                  xl:text-[14px]
                  xl:leading-[22px]
                "
              >
                {benefit.description}
              </p>
            </div>
          ),
        )}

        {/* Newsletter */}
        <div
          className="
            flex
            min-w-0
            flex-col
            gap-4
            border-l
            border-[#D28A4C]
            pl-4
            xl:w-[325px]
          "
        >
          <div
            className="
              flex
              w-full
              min-w-0
              flex-col
              xl:w-[325px]
            "
          >
            <h3
              className="
                w-full
                text-[16px]
                font-bold
                leading-[16px]
                text-[#F5F1EB]
                xl:h-[32px]
                xl:w-[325px]
                xl:text-[18px]
              "
            >
              Antecipe-se ao próximo
              <br />
              lançamento
            </h3>

            <div
              className="
                mt-2
                flex
                h-10
                w-full
                min-w-0
                xl:w-[325px]
              "
            >
              <Input
                type="email"
                placeholder="digite seu e-mail..."
                className="
                  h-10
                  min-w-0
                  flex-1
                  rounded-l-[4px]
                  rounded-r-none
                  border-0
                  bg-[#3B2517]
                  px-3
                  text-[12px]
                  text-[#CFB28C]
                  shadow-none
                  placeholder:text-[#9D764D]
                  focus-visible:ring-0
                  xl:px-[14px]
                  xl:text-[13px]
                "
              />

              <Button
                type="button"
                className="
                  h-10
                  shrink-0
                  rounded-l-none
                  rounded-r-[4px]
                  bg-[#D28A4C]
                  px-3
                  text-[12px]
                  font-bold
                  text-[#140D0A]
                  shadow-none
                  hover:bg-[#D28A4C]
                  xl:px-[18px]
                  xl:text-[14px]
                "
              >
                Enviar
              </Button>
            </div>
          </div>

          <p
            className="
              w-full
              text-[12px]
              font-normal
              leading-[20px]
              text-[#CFB28C]
              xl:w-[325px]
              xl:text-[13px]
              xl:leading-[22px]
            "
          >
            Receba lançamentos
            selecionados, histórias de
            criadores e novidades do
            mercado.
          </p>
        </div>
      </div>
    </section>
  )
}