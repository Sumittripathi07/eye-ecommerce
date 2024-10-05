import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import Header from "./components/Header";
import { CartContextProvider } from "../lib/CartContext";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import CanvasCursor from "./components/other/canvas-cursor";
import Footer from "./components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Poppins({
  subsets: ["latin"],
  weight: "500",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <ClerkProvider>
        <SessionProvider session={session}>
          <CanvasCursor />
          <CartContextProvider>
            <main
              className={`${inter.className} min-h-screen max-w-screen-2xl mx-auto bg-background sm:px-6`}
            >
              <Header />
              <Toaster position="top-center" />
              <div className="min-h-screen">
                <Component {...pageProps} className="sm:mt-36" />
              </div>
              <Footer />
            </main>
          </CartContextProvider>
        </SessionProvider>
      </ClerkProvider>
    </>
  );
}
