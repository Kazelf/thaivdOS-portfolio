import { Georama, Roboto_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./styles/globals.css";
import "react-vertical-timeline-component/style.min.css";

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
  verification: {
    google: "1ZopRgwzU2_JK9VH8wg6Y9JabDzIUWPxcje5cPBVU8k",
  },
  title: "Vũ Đình Thái",
  description: "macOS-style portfolio by Vu Dinh Thai",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/images/thai.png",
    apple: "/images/thai.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Thai Portfolio",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6f7" },
    { media: "(prefers-color-scheme: dark)", color: "#1e1e1f" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${georama.variable} ${robotoMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
