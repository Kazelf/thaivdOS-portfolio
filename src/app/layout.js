import { Georama, Roboto_Mono } from "next/font/google";
import "./globals.css";

const georama = Georama({
  subsets: ["latin"],
  variable: "--font-georama",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata = {
  title: "Vũ Đình Thái",
  description: "Thai Vu Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${georama.variable} ${robotoMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
