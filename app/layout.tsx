import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>FREE Grow a Garden Pets | Raccoon & Dragonfly</title>
        <meta
          name="description"
          content="Get FREE Grow a Garden pets! Collect rare raccoons, dragonflies, and more by completing simple tasks. No Robux needed!"
        />
        <meta property="og:title" content="FREE Grow a Garden Pets!" />
        <meta property="og:description" content="Get rare pets like raccoons and dragonflies for FREE!" />
        <meta property="og:image" content="https://aldi.today/photo/raccoon.jpg" />
        <meta property="og:url" content="https://onmod.site" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="https://aldi.today/photo/websitelogo.webp" type="image/webp" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Open+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
          {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-J1BSNLE03B"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J1BSNLE03B');
          `,
        }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
