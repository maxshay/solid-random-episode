import { JSX, ParentProps } from "solid-js";
import clsx from "clsx";

function Button(
  props: ParentProps<
    { class?: string } & JSX.ButtonHTMLAttributes<HTMLButtonElement>
  >
) {
  const className = clsx(
    "justify-center items-center flex rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500",
    props.class
  );

  return (
    <button type="button" {...props} class={className}>
      {props.children}
    </button>
  );
}

export default Button;
