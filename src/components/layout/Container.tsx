import { ParentProps } from 'solid-js'
import clsx from 'clsx'

type ContainerProps = ParentProps<{
  class: string,
}>

function Container(props: ContainerProps) {
  return (
    <div
      {...props}
      class={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', props.class)}
    />
  )
}

export default Container