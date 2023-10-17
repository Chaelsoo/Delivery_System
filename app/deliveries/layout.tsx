import Navbar from './navbar'
import { Domine } from 'next/font/google'
import Provider from '@/context/provider'

export const domine = Domine({
  subsets:['latin']
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full bg-white' data-theme="light">
      <Provider>
      <body className={domine.className +"h-full bg-white"}  >
        <Navbar/> 
        {children}
        </body>
        </Provider>
    </html>
  )
}