import React from "react"
import type { Metadata } from 'next'
import { Quicksand, Dancing_Script } from 'next/font/google'

import './globals.css'

const quicksand = Quicksand({ subsets: ['latin'], variable: '--font-quicksand' })
const dancingScript = Dancing_Script({ subsets: ['latin'], variable: '--font-dancing' })

export const metadata: Metadata = {
  title: 'For Kumkum - Be My Valentine?',
  description: 'A special Valentine\'s Day message for someone truly amazing',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} ${dancingScript.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
