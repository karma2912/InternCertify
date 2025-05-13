
import type { Metadata } from 'next'
import { Toaster } from 'sonner'
export const metadata: Metadata = {
  title: 'Your New App Name',
  description: 'Your app description',
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