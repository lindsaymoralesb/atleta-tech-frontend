"use client;"

import HomePage from "./components/HomePage";import {
  ThirdwebProvider,
} from "thirdweb/react";

export default function Home() {

  return (
    <ThirdwebProvider>
      <HomePage />
    </ThirdwebProvider>
  );
}
