import type { Metadata } from "next"
import { Geist, Inter } from "next/font/google"
import type { ReactNode } from "react"

import "@/styles/globals.css"

import { ThemeProvider } from "next-themes"
import { Providers } from "@/components/providers"
import { cn } from "@/lib/utils"

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

export const metadata: Metadata = {
  title: "AI Voice Studio",
  description: "AI Voice Studio is a web application that allows users to generate realistic AI voices from text input. It provides a user-friendly interface for creating and customizing voice outputs, making it easy for users to produce high-quality audio content.",
  keywords: ["AI Voice Studio", "AI voices", "text-to-speech", "voice generation", "audio content creation"],
  authors: [{ name: "Ridwan", url: "https://ridwan.dev" }],
  creator: "Ridwan",
  publisher: "Ridwan",
  openGraph: {
    title: "AI Voice Studio",
    description: "AI Voice Studio is a web application that allows users to generate realistic AI voices from text input. It provides a user-friendly interface for creating and customizing voice outputs, making it easy for users to produce high-quality audio content.",
    url: "https://ai-voice-studio.vercel.app",
    siteName: "AI Voice Studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Voice Studio",
    description: "AI Voice Studio is a web application that allows users to generate realistic AI voices from text input. It provides a user-friendly interface for creating and customizing voice outputs, making it easy for users to produce high-quality audio content.",
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", inter.variable)}
    >
      <body className="antialiased min-h-svh flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Providers>

            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}