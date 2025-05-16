
import type { Metadata } from 'next'
import { Toaster } from 'sonner'
export const metadata: Metadata = {
  title: 'Entwicklera - Admin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}
        <Toaster/>
      </body>
    </html>
  )
}