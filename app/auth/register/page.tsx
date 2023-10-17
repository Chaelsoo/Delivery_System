"use client"
import Image from "next/image"
import axios from "axios"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignUp() {
    const router = useRouter();
    const data=useRef({
        email:'',
        username:'',
        password:'',
    })
    const confirm = useRef("")
    const [dif,setDif] = useState(false)
    const [bad,setBad] = useState(false)
    const [loading,setLoading] = useState(false)
    const [email,setEmail] = useState(false)

    // Dif.current= false

    async function handleSubmit(event:any) {
        event.preventDefault();
        try{
          setLoading(true)
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        if(confirm.current !== data.current.password){
            setDif(true)
            setLoading(false)
            return
        }
        if(data.current.password.length < 7){
          setBad(true)
          setLoading(false)
          return
        }
        const response = await axios.post("/api/register/",data.current,config)
        if(response.status === 201 ){
          router.push('/auth/login')
        }
        setLoading(false)
    }catch(error:any){
        setLoading(false)
        if (error.response.status === 400){
          setEmail(true)
        }
    }
    }
  return (
    <>
 <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto "
            src="/register.png"
            alt="Register"
            width={80}
            height={100}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" >
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
                  onFocus={()=>{setDif(false); setBad(false); setEmail(false)}}
                  onChange={(e)=>data.current.email = e.target.value}
                  className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="FirstName"
                  name="FirstName"
                  type="FirstName"
                  autoComplete="FirstName"
                  required
                  onFocus={()=>{setDif(false); setBad(false); setEmail(false)}}
                  onChange={(e)=>data.current.username=e.target.value}
                  className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="LastName"
                  name="LastName"
                  type="LastName"
                  autoComplete="LastName"
                  required
                  onFocus={()=>{setDif(false); setBad(false); setEmail(false)}}
                  onChange={(e)=>data.current.LastName=e.target.value}
                  className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div> */}

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
                  onFocus={()=>{setDif(false); setBad(false); setEmail(false)}}
                  onChange={(e)=>data.current.password=e.target.value}
                  className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm Password
                </label>

              </div>
              <div className="mt-2">
                <input
                    onFocus={()=>{setDif(false); setBad(false); setEmail(false)}}
                  id="Confirm"
                  name="Confirm"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e)=>confirm.current=e.target.value}
                  className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div>
              <button
                className="flex w-full justify-center rounded-md bg-violet-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSubmit}
                disabled={loading}
              >
              {loading ? 'Processing...' : 'Sign Up'}
              </button>
              <div className="flex justify-center items-between flex-wrap">
              <p className={`${dif ? 'block w-4/5' : 'hidden'} rounded-xl bg-red-400 w-3/4 mt-5 p-2 text-center`}>
              Passwords don't Match !
              </p>
              <p className={`${bad ? 'block w-4/5' : 'hidden'} rounded-xl bg-red-400 w-3/4 mt-5 p-2 text-center`}>
              Passwords not Secure !
              </p>
              <p className={`${email ? 'block w-4/5' : 'hidden'} rounded-xl bg-red-400 w-3/4 mt-5 p-2 text-center`}>
              Email Already Exists !
              </p>
              <p className='mt-10 text-zinc-700'> Already have an Account ? <Link href={"/auth/login"} className='text-indigo-600'>Sign in Here </Link></p>

              </div>

            </div>
          </form>

        </div>
      </div>
    </>
  )
}

