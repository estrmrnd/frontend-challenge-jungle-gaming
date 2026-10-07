import { FaFacebookF } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

export function SocialAuth() {
  return (
    <div
      className="
        mt-9
        flex
        w-full
        shrink-0
        flex-col
        gap-3
        lg:mt-0
        lg:h-[144px]
        lg:px-20
        lg:pt-6
      "
    >
      <div className="flex h-4 items-center gap-3">
        <div className="h-px flex-1 bg-[#3F2319]" />

        <span
          className="
            whitespace-nowrap
            font-mono
            text-[11px]
            text-[#F5F1EB]
          "
        >
          Ou continue com
        </span>

        <div className="h-px flex-1 bg-[#3F2319]" />
      </div>

      <button
        type="button"
        className="
          flex
          h-10
          w-full
          cursor-pointer
          items-center
          justify-center
          gap-3
          rounded-[4px]
          border
          border-[#3F2319]
          font-mono
          text-[11px]
          text-[#CFB28C]
          transition-colors
          hover:border-[#D28A4C]
        "
      >
        <FcGoogle size={18} />

        <span>
          Continuar com Google
        </span>
      </button>

      <button
        type="button"
        className="
          flex
          h-10
          w-full
          cursor-pointer
          items-center
          justify-center
          gap-3
          rounded-[4px]
          border
          border-[#3F2319]
          font-mono
          text-[11px]
          text-[#CFB28C]
          transition-colors
          hover:border-[#D28A4C]
        "
      >
        <FaFacebookF
          size={17}
          color="#4267B2"
        />

        <span>
          Continuar com Facebook
        </span>
      </button>
    </div>
  )
}