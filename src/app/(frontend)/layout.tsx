import { Toaster } from '@/components/ui/sonner'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import './styles.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Advocate - Change Through Collective Action',
  description:
    'Join Advocate to connect with like-minded individuals, amplify your voice, and drive meaningful change in your community through collective action.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className="min-h-screen bg-white antialiased" suppressHydrationWarning>
      <body
        className={`${inter.className} text-foreground relative flex min-h-screen w-full flex-col bg-white font-sans antialiased`}
      >
        {children}
        <Toaster richColors position="top-center" theme="light" />
      </body>
    </html>
  )
}
