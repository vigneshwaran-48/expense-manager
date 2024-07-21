import React from "react";
import { Metadata } from "next";
import "../globals.css";
import { Poppins } from "next/font/google";
import StoreProvider from "../providers/StoreProvider";
import Sidebar from "./components/Sidebar";
import UserProvider from "../providers/UserProvider";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create account in CareLink",
};

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" className={`w-full h-full ${poppins.className}`}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon_io/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon_io/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon_io/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon_io/site.webmanifest" />
      </head>
      <body className="w-full h-full flex mode-dark bg-dark-bg text-color-text p-2 justify-around sm:p-4">
        <StoreProvider>
          <UserProvider>
            <Sidebar />
            <main className="w-full h-full bg-light-bg rounded md:w-[calc(100%-var(--sidebar-width))]">
              {children}
            </main>
          </UserProvider>
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
