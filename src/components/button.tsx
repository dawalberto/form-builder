import clsx from "clsx"

export enum EButtonVariants {
  PRIMARY = "primary",
  DEFAULT = "default",
  DANGER = "danger",
}

export const Button = ({
  label,
  variant = EButtonVariants.DEFAULT,
  onClick,
}: {
  label: string
  variant?: EButtonVariants
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}) => (
  <button
    type="button"
    onClick={onClick}
    className={clsx(
      "border px-2 py-1 cursor-pointer border-stone-800 text-stone-800",
      variant === EButtonVariants.DEFAULT && "bg-stone-200",
      variant === EButtonVariants.PRIMARY && "bg-emerald-200",
      variant === EButtonVariants.DANGER && "bg-red-200",
    )}
  >
    {label}
  </button>
)
