import { JSX } from "solid-js"


function DiamondIcon(props: JSX.HTMLAttributes<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 6 6" {...props}>
      <path d="M3 0L6 3L3 6L0 3Z" stroke-width={2} stroke-linejoin="round" />
    </svg>
  )
}

export default DiamondIcon