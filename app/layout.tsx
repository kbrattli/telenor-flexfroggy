import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Telenor Flexbox Challenge',
  description: 'Learn CSS Flexbox with Telenor',
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
