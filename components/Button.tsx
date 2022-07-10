/** @jsx h */
import { h } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";

export default function Button(props: h.JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      class={tw`px-2 duration-300 py-2 border(gray-500 2) hover:bg-gray-500 rounded shadow-md hover:shadow-2xl hover:ring-2 ring-blue-400 w-full hover:-translate-y-0.5 focus:outline-none text-gray-200`}
    />
  );
}
