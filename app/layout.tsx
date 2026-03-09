import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Telenor Flexbox-utfordring',
  description: 'Lær CSS Flexbox med Telenor',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nb">
      <body>{children}</body>
    </html>
  )
}
