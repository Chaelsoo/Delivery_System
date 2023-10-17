"use client"

import React, { useRef, useState } from 'react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
function Login() {
    const router = useRouter()
    const data = useRef({
    email:'',
    password:''
    })
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const [exist,setExist] = useState(false)

    async function handleClick(e:any) {
      e.preventDefault()
    try{   
      setLoading(true)
        const response = await signIn("credentials",{...data.current,
          redirect:false,
        })
        console.log(response)
        setLoading(false)
        if(response?.error){
          if(response?.error === "User not found"){
            setExist(true)
          }
          setError(true)
        }else{
          router.push("/")
        }
}catch(error){
  setLoading(false)
  console.log(error)

}}

  return (
    <>
   <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-32">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto "
            src="/login.png"
            alt="Your Company"
            width={80}
            height={100}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onFocus={()=>{setError(false); setExist(false)}}
                  onChange={(e)=>data.current.email = e.target.value}
                  className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onFocus={()=>{setError(false); setExist(false)}}
                  onChange={(e)=>data.current.password = e.target.value}
                  className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleClick}
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-violet-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Processing..." : "Sign In"}
              </button>
            </div>
          </form>
          <div className="flex justify-center items-between flex-wrap">
          <p className={`${error ? 'block w-4/5' : 'hidden'} rounded-xl bg-red-400 w-3/4 mt-5 p-2 text-center `}>
             {exist ? "Email doesn't Exist !": "Incorrect Password"}  
              </p>
          <p className='mt-10 text-zinc-700'> Don't have an Account ? <Link href={"/auth/register"} className='text-indigo-600'>Sign up Here </Link></p>
              </div>
        </div>
      </div>
    </>
  )
}

export default Login