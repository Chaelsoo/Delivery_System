"use client"

import { options } from "../api/auth/[...nextauth]/options"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { usePathname } from 'next/navigation'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const { data:session, status} = useSession()
  const router = useRouter()
  let dashboard = true
  const pathname = usePathname()
  if (pathname === "/deliveries/new"){
    dashboard = false
  }
  async function handleLogOut(e:any) {
    e.preventDefault()
    signOut()
  }
  async function handleLogin() {
    router.push("/auth/login")
  }
  async function Deliver() {
    router.push("/deliveries/new")
  }
  return (
    <div className="navbar bg-base-300 w-full">
      
  <div className="flex-1">
    <a className="btn btn-active text-black normal-case text-xl"> Delivery </a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal">
      <li className="btn" onClick={Deliver}>
        New Delivery </li>
      <li className="btn ml-3" onClick={handleLogOut}>
        Sign Out
      </li>
    </ul>
  </div>
</div>
    // <>
    //     <div className="flex justify-between bg-zinc-800 p-4 h-16 z-10">
    //         <h4 className="p-1 text-violet-200 font-bold"> Delivery System </h4>
    //         <ul className="flex justify-between">
    //             {dashboard ? (<li className="font-bold hover:underline hover:font-bold p-1 mr-5 cursor-pointer text-violet-300 "> <Link href={"/deliveries/new"}> New Delivery </Link></li>) : ''}
    //             {session ? (<li className="font-bold hover:underline hover:font-bold pt-1 pb-1 pr-1 cursor-pointer text-violet-300" > <span onClick={handleLogOut}>Log Out </span></li>) : (<li className="font-bold hover:underline hover:font-bold pt-1 pb-1 pr-1 cursor-pointer text-violet-300" > <span onClick={handleLogin}> Login </span></li>)}
    //         </ul>
    //     </div>
    
    // </>
  )
}
