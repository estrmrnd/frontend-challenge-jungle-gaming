import {
  Eye,
  EyeOff,
} from 'lucide-react'

import { Input } from '@/components/ui/input'

type PasswordFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  visible: boolean
  onToggle: () => void
}

export function PasswordField({
  label,
  value,
  onChange,
  visible,
  onToggle,
}: PasswordFieldProps) {
  return (
    <label className="flex flex-col gap-3 text-sm text-[#F5F1EB]">
      <span>{label}</span>

      <div className="relative">
        <Input
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="
            h-10
            rounded-none
            border-[#4A2B20]
            bg-transparent
            px-3
            pr-11
            text-[#F5F1EB]
            shadow-none
            focus-visible:border-[#D28A4C]
            focus-visible:ring-0
          "
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={
            visible
              ? 'Ocultar senha'
              : 'Mostrar senha'
          }
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-[#B98A60]
          "
        >
          {visible ? (
            <EyeOff size={16} />
          ) : (
            <Eye size={16} />
          )}
        </button>
      </div>
    </label>
  )
}