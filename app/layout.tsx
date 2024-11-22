import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MyDiary with AI-generated insights',
  description: 'A sophisticated personal diary app with AI-generated insights',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ja'>
      <body
        className={`${inter.className} bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen`}
      >
        <div className='max-w-2xl mx-auto p-6'>{children}</div>
      </body>
    </html>
  )
}
