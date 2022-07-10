/** @jsx h */
import { h } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";

export default function Footer() {
  return (
    <div
      class={tw`flex w-full justify-center items-center absolute bottom-0 pb-3 text-sm text-gray-200`}
    >
      <p>
        made with {`<3`} by{" "}
        <strong>
          <a
            href="https://github.com/asheeeshh"
            target="_blank"
            class="text-underline underline text-gray-200"
            style={{ textDecoration: "underline" }}
          >
            ashish
          </a>
        </strong>
      </p>
    </div>
  );
}
