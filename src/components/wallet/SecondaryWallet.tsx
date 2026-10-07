export function SecondaryWallet() {
  return (
    <section
      className="
        mt-8
        flex
        w-full
        min-w-0
        items-start
        justify-between
        gap-4
      "
    >
      <div className="flex min-w-0 flex-col gap-3">
        <h2 className="text-sm font-medium text-[#F5F1EB]">
          Carteira secundária
        </h2>

        <p className="text-[10px] text-[#B98A60]">
          Você ainda não adicionou uma carteira secundária.
        </p>
      </div>

      <div
        className="
          flex
          min-w-0
          shrink-0
          items-center
          gap-2
          text-[10px]
        "
      >
        <span
          className="
            size-3
            shrink-0
            rounded-full
            border
            border-[#D28A4C]
          "
        />

        <span className="text-[#F5F1EB]">
          Igual à carteira principal
        </span>

        <button
          type="button"
          className="
            shrink-0
            text-[#D28A4C]
          "
        >
          Adicionar
        </button>
      </div>
    </section>
  )
}