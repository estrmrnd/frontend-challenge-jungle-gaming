import type { ReactNode } from 'react'

type WalletFieldProps = {
  label?: string
  required?: boolean
  children: ReactNode
}

export function WalletField({
  label,
  required = false,
  children,
}: WalletFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-xs text-[#F5F1EB]">
      <span className={label ? '' : 'invisible'}>
        {label || 'Campo'}

        {required && (
          <span className="text-[#D28A4C]">
            *
          </span>
        )}
      </span>

      {children}
    </label>
  )
}