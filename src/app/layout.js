import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "@/lib/StoreProvider";
import UpdateCart from "@/app/components/UpdateCart";
import Home from "./page";
import { Suspense } from "react";
import Loading from "./components/Loading";
import FetchToken from "./_utility/FetchToken";

// todo 
// DisplayItemsCard


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: {
    template: "%s | j-shop",
    default: "J-Shop"
  },
  description: "A cloth store",
};
export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" dir="ltr">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900`}
        >
          <StoreProvider>
            <UpdateCart />
            <FetchToken />
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </StoreProvider>
          <script src="https://cdn.lordicon.com/lordicon.js"></script>
        </body>
      </html>
    </>
  );
}
