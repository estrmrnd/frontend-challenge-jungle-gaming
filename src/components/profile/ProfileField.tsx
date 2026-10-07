import type { ReactNode } from 'react'

type ProfileFieldProps = {
  label: string
  required?: boolean
  children: ReactNode
}

export function ProfileField({
  label,
  required = false,
  children,
}: ProfileFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-xs text-[#F5F1EB]">
      <span>
        {label}

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