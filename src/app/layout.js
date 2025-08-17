import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "@/lib/StoreProvider";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import InitApp from "@/components/InitApp";
import Script from "next/script";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: {
    template: "%s | Jagraon Garments",
    default: "Jagraon Garments",
  },
  description: "A cloth store",
};
export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" dir="ltr">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Amarante&family=Architects+Daughter&display=swap" rel="stylesheet" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
          <StoreProvider>
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <InitApp />
          </StoreProvider>
          <script src="https://cdn.lordicon.com/lordicon.js"></script>
        </body>
      </html>
    </>
  );
}
