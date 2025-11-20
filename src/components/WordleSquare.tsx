import { cn } from "./ui/cn"

function WordleSquare({ value, variant, className = "" }) {
  const baseStyle = `shadow-2xl grid place-items-center border-2 rounded-sm w-16 h-16 font-extrabold text-5xl ${className}`
  if (variant == "incorrect") {
    return (
      <div className={cn(`border-red text-red`, baseStyle)}>
        {value == null ? "" : value}
      </div>
    )
  }

  if (variant == "correct") {
    return (
      <div className={cn(`border-green text-green`, baseStyle)}>
        {value == null ? "" : value}
      </div>
    )
  }
  if (variant == "almost") {
    return (
      <div className={cn(`border-yellow text-yellow`, baseStyle)}>
        {value == null ? "" : value}
      </div>
    )
  }
  if (variant == "normal") {
    return (
      <div className={cn(`border-bg-soft `, baseStyle)}>
        {value == null ? "" : value}
      </div>
    )
  }
}

export default WordleSquare;
