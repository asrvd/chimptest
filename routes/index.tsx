/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Footer from "../components/Footer.tsx";
import Chimp from "../islands/Chimp.tsx";
import Header from "../components/Header.tsx";


export default function Home() {
  return (
    <div
      class={tw`relative p-4 gap-10 mx-auto w-screen h-screen flex flex-col justify-center items-center bg-gray-700`}
    >
      <Header />
      <Chimp/>
      <Footer />
    </div>
  );
}
