"use client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import LoginForm from "@/features/auth/components/LoginForm";

export default function Home({ Component, pageProps }: any) {
  return <Provider store={store}>{<LoginForm {...pageProps} />}</Provider>;
}
