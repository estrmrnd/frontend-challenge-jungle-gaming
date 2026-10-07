import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const profileLinks = [
  'Meu perfil',
  'Minha coleção',
  'Atividade',
  'Estúdio do criador',
  'Lista de interesse',
]

const helpLinks = [
  'Central de ajuda',
  'Como comprar NFTs',
  'Carteira e segurança',
  'Política do mercado',
  'Denunciar item',
]

const collectionLinks = [
  'Arte digital',
  'Fotografia',
  'Música',
  'Arte 3D',
  'Utilidade',
]

const socialButtonClass = `
  flex h-[32px] w-[32px]
  shrink-0
  items-center justify-center
  rounded-[4px]
  border border-[#D28A4C]
  bg-transparent
  text-[#D28A4C]
`

export function Footer() {
  return (
    <footer
      className="
        mx-auto
        hidden
        w-full
        max-w-[1200px]
        lg:block
      "
    >
      {/* Faixa institucional */}
      <div
        className="
          flex
          min-h-[88px]
          w-full
          items-center
          bg-[#38220F]
          px-6
          py-5
          xl:h-[88px]
          xl:px-8
          xl:py-0
        "
      >
        <div
          className="
            grid
            w-full
            grid-cols-4
            items-center
            gap-5
            xl:gap-0
          "
        >
          <p
            className="
              text-[14px]
              font-bold
              text-[#F5F1EB]
            "
          >
            KURIO
          </p>

          <p
            className="
              text-[13px]
              font-normal
              leading-[18px]
              text-[#F5F1EB]
              xl:text-[14px]
            "
          >
            Feito para colecionadores,
            <br />
            criadores e cultura
          </p>

          <p
            className="
              text-[13px]
              font-normal
              text-[#F5F1EB]
              xl:text-[14px]
            "
          >
            contato@email.com
          </p>

          <p
            className="
              whitespace-nowrap
              text-[13px]
              font-normal
              text-[#F5F1EB]
              xl:text-[14px]
            "
          >
            +55 11 4002 8922
          </p>
        </div>
      </div>

      {/* Área de links */}
      <div
        className="
          grid
          min-h-[236px]
          w-full
          grid-cols-[0.9fr_1.1fr_0.9fr_1.3fr]
          gap-5
          bg-[#241612]
          px-6
          py-8
          xl:h-[236px]
          xl:grid-cols-4
          xl:gap-0
          xl:px-8
        "
      >
        <FooterColumn
          title="Meu perfil"
          links={profileLinks}
        />

        <FooterColumn
          title="Central de ajuda"
          links={helpLinks}
        />

        <FooterColumn
          title="Coleções"
          links={collectionLinks}
        />

        {/* Redes sociais e carteiras */}
        <div className="min-w-0">
          <h3
            className="
              text-[15px]
              font-bold
              leading-4
              text-[#F5F1EB]
              xl:text-[17px]
            "
          >
            Redes sociais
          </h3>

          <div
            className="
              mt-4
              flex
              flex-wrap
              gap-2
            "
          >
            <button
              type="button"
              aria-label="Facebook"
              className={socialButtonClass}
            >
              <FaFacebookF className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-label="Instagram"
              className={socialButtonClass}
            >
              <FaInstagram className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-label="X"
              className={socialButtonClass}
            >
              <FaXTwitter className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-label="LinkedIn"
              className={socialButtonClass}
            >
              <FaLinkedinIn className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-label="YouTube"
              className={socialButtonClass}
            >
              <FaYoutube className="h-4 w-4" />
            </button>
          </div>

          <h3
            className="
              mt-7
              text-[15px]
              font-bold
              leading-4
              text-[#F5F1EB]
              xl:text-[17px]
            "
          >
            Carteiras compatíveis
          </h3>

          <div
            className="
              mt-3
              inline-flex
              max-w-full
              items-center
              rounded-[4px]
              bg-[#38220F]
              px-2
              py-2
              text-[8px]
              font-bold
              text-[#D28A4C]
              xl:h-[26px]
              xl:px-[10px]
              xl:py-0
              xl:text-[9px]
            "
          >
            METAMASK · WALLETCONNECT · COINBASE
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        className="
          flex
          h-[50px]
          w-full
          items-center
          justify-center
          bg-[#140D0A]
          px-6
          text-center
          text-[14px]
          font-normal
          leading-[30px]
          text-[#F5F1EB]
        "
      >
        © 2026 Kurio. Propriedade digital
        para todos.
      </div>
    </footer>
  )
}

type FooterColumnProps = {
  title: string
  links: string[]
}

function FooterColumn({
  title,
  links,
}: FooterColumnProps) {
  return (
    <div className="min-w-0">
      <h3
        className="
          text-[15px]
          font-bold
          leading-4
          text-[#F5F1EB]
          xl:text-[17px]
        "
      >
        {title}
      </h3>

      <div
        className="
          mt-4
          flex
          flex-col
          gap-[10px]
        "
      >
        {links.map((link) => (
          <button
            key={link}
            type="button"
            className="
              w-fit
              max-w-full
              bg-transparent
              p-0
              text-left
              text-[13px]
              font-normal
              leading-4
              text-[#F5F1EB]
              xl:text-[14px]
            "
          >
            {link}
          </button>
        ))}
      </div>
    </div>
  )
}