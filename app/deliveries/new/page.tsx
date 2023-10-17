"use client"

import axios from "axios"
import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


function CreateDelivery() {
    const places = ["Algiers","Oran","Chlef","Sidi Belabes","Tlemcen","Setif","Annaba","Tiaret","Tissemsilet","Boumerdas","Bejaia","Tizi Ouzou","Jijel","Messila","Mostaganem","Tamanraset","Bisekra","Batna","Oum El Bouaki","Tipaza","Ain Defla","Blida","Adrar","Laghouat","Bechar","Bouira","Djelfa","Skikda","Medea","Tarf","Khenchela","Illizi","Souk Ahras","Relizane","Guelma","Saida","Tebessa"]
    const { data:session, status} = useSession()
    //@ts-ignore
    const priorities = [
        {name:"Normal",id:1},
        {name:"Considerable",id:2},
        {name:"High",id:3},
    ]
    const router = useRouter()
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const [succesfull,setSuccesfull] = useState(false)

    const [adress,setAdress] = useState("Algiers")
    const [priorityy,setPriority] = useState("Patient")
    const [items,setItems] = useState(0)
    async function create(e:any){
      e.preventDefault()
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        if(session){
        try{
            setLoading(true)
            //@ts-ignore
        const response = await axios.post('/api/deliveries/create',JSON.stringify({adress:adress,priority:priorityy,items:items,owner:session?.user.id,}),config)
        if(response.status === 201){
            console.log(response.data)
            setSuccesfull(true)
            setTimeout(()=>router.push('/deliveries'),3000)
        }
        setLoading(false)
        }catch(error){
        setLoading(false)
            console.log(error)
            setError(true)
        }
    }}

  return (
    <>
   <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto "
            src="/delivery.png"
            alt="Your Company"
            width={120}
            height={100}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Make Your Delivery 
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                 Address
              </label>
              <div className="mt-2">
                <select onFocus={()=>{setError(false)}}  required onChange={(e)=>setAdress(e.target.value)}  className="text-center block bg-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  {places.map((place)=><option value={place}>{place}</option>)}
                </select>
                {/* <input
                  id="adress"
                  name="adress"
                  type="adress"
                  required
                  onFocus={()=>{setError(false)}}
                  onChange={(e)=>setAdress(e.target.value)}
                  className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                /> */}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Number of items
                </label>

              </div>
              <div className="mt-2">
                <input
                  type="number"
                  required
                  value={items}
                  onFocus={()=>{setError(false);}}

                 // @ts-ignore
                  onChange={(e)=>setItems(e.target.value)}
                  className="bg-white text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex justify-around">
             {priorities.map((priority) => (
             
            <label  key={priority.id} className="flex justify-end text-black items-center bg-violet-200 p-3 rounded-2xl cursor-pointer"> <span className="mr-2">{priority.name} </span> <br/>               
             <input
                className="mr-1 cursor-pointer bg-white color-white"
            key={priority.id}
            type="checkbox"
            name="priority"
            checked={priorityy === priority.name}
            onChange={(e) =>setPriority(priority.name)
            }
          >
          </input>
          </label>
        ))}
        </div>

            <div className="flex justify-between">
            <button
                type="submit"
                onClick={(()=>router.push("/deliveries"))}
                disabled={loading}
                className="flex w-1/3 justify-center rounded-md bg-red-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Back
              </button>
              <button
                type="submit"
                onClick={create}
                disabled={loading}
                className="flex w-2/4 justify-center rounded-md bg-violet-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Processing..." : "Submit"}
              </button>
              
            </div>
          </form>
          <div className="flex justify-center items-between flex-wrap">
          <p className={`${error ? 'block w-4/5' : 'hidden'} rounded-xl bg-red-400 w-3/4 mt-5 p-2 text-center `}>
            Something went wrong
              </p>
              <p className={`${succesfull ? 'block w-4/5' : 'hidden'} rounded-xl bg-green-300 w-3/4 mt-5  text-center p-5`}>
                Your Delivery has been created, Please approach the nearest company branch with your items 
              </p>
              </div>
        </div>
      </div>
    </>

  )
}

export default CreateDelivery