import React from "react";
import { Metadata } from "next";
import "../globals.css";
import { Poppins } from "next/font/google";
import StoreProvider from "../providers/StoreProvider";
import Sidebar from "./components/Sidebar";
import DataProvider from "../providers/DataProvider";
import Body from "./components/Body";
import ToastContainer from "./components/toast/ToastContainer";
import CategoryCreationPage from "./categories/components/CategoryCreationPage";
import ExpensePopup from "./expense/components/ExpensePopup";
import ThemeProvider from "../providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Expense Manager",
  description: "Expense Manager home",
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
      <body className="w-full h-full">
        <StoreProvider>
          <DataProvider>
            <ThemeProvider>
              <ToastContainer />
              <CategoryCreationPage />
              <ExpensePopup />
              <Sidebar />
              <Body>{children}</Body>
            </ThemeProvider>
          </DataProvider>
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
