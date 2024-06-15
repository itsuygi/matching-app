import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Matching App",
  description: "Made by Uygi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://kit.fontawesome.com/6135f8c6a5.js" crossorigin="anonymous"></script>
        
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
