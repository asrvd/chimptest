/** @jsx h */
import { h } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";

export default function Header() {
  return (
    <div
      class={tw`flex flex-col justify-center items-center sm:w-[80%] md:w-1/2 lg:w-1/4 flex-wrap text-center text-gray-200`}
    >
      <h1 class={tw`text-center text-3xl font-bold`}>ChimpTest</h1>
      <p>
        are you smarter than a{" "}
        <a
          href="https://www.youtube.com/watch?v=zsXP8qeFF6A"
          target="_blank"
          class="text-underline underline text-gray-200"
          style={{ textDecoration: "underline", textDecorationStyle: "dotted" }}
        >
          chimpanzee
        </a>
        ?<br />
        the game will start when you click on <strong>1</strong>, you will have
        to select the numbers in sequence to win the game.
      </p>
    </div>
  );
}
