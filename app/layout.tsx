import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Telenorium Gladiator Challenge',
  description: 'Learn CSS Flexbox in a Roman gladiator arena — by Telenor',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
