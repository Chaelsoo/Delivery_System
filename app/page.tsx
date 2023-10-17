'use client'
import { IUser } from "@/types"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"



function Dashboard() {
  const { data:session, status} = useSession()
  const router = useRouter()
  if(session){
    router.push('/deliveries')
  }

  return (
    <>   
    <>
    <img src="/background.jpg"
    alt="background"
    className="absolute inset-100 bg-cover bg-center h-full flex items-center w-screen z-0"
    />
    <div className="relative  z-10 flex justify-center">
     
      <div className="flex justify-center flex-wrap mt-96 w-1/3"> 
             <h1 className="font-bold block text-3xl mb-5 text-black"> Welcome to our Delivery System </h1>
             <br/> <br/>
        <Link href={"/auth/login"}>
         <button className="px-5 py-3 text-black   bg-violet-300 rounded-2xl mr-5 ml-16"> Login </button> </Link>  <Link href={"/auth/register"}> <button className="px-5 py-3 text-black bg-red-300 rounded-2xl"> Register </button> </Link></div>
    </div>
    </>

    </>

    )
}

export default Dashboard