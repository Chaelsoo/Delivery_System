import './globals.css'
import type { Metadata } from 'next'
import Navbar from './deliveries/navbar'
import { Domine } from 'next/font/google'
import Provider from '@/context/provider'

export const domine = Domine({
  subsets:['latin']
})

export const metadata: Metadata = {
  title: 'Delivery',
  description: 'For Workers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full bg-white' data-theme="light">
      <Provider>
      <body className={domine.className +"h-full bg-white"}  >
        {children}
        </body>
        </Provider>
    </html>
  )
}
