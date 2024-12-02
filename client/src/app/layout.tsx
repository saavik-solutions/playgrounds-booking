import { ReactNode } from "react";
import Providers from "../components/providers/Provider"; // Adjust the import path as needed
import "./globals.css";

export const metadata = {
  title: "Grounds Booking App",
  description: "Book your Grounds and have fun",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers> 
      </body>
    </html>
  );
}
