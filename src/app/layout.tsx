import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Provider from "@/providers/Provider";
import { Toaster } from "@/components/ui/sonner";

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunitoSans.className}>
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Converse",
  description:
    "A real-time messaging platform with a focus on user experience.",
};
