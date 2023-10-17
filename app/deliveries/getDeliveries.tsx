"use client"

import { useEffect,useRef,useState } from "react"
import axios from "axios"
import { Session } from "inspector"
import { PassThrough } from "stream"


export default function List() {
    const [deliveries,setDeliveries] = useState([])
    const [loading,setLoading] = useState(false)
    const [there,setThere] = useState(null)
    const [session,setSession] = useState(null)


    useEffect(()=>{

        async function getSession() {
          try {
            const response = await axios.get("/api/auth/session");
            setSession(response.data)
          } catch (error) {
            console.log(error);
          }
        }
    
        getSession()

      },[])

      useEffect(()=>{
        
        async function getall() {
          try {
            const response = await axios.get("/api/deliveries");
            //@ts-ignore
            if (session?.user.isAuth) {
              setDeliveries(response.data);
            } else {
              setDeliveries(response.data.filter((delivery: any) => {
                //@ts-ignore
                return delivery.owner === session?.user.id;
              }));
            }
          } catch (error) {
            console.log(error);
          }
        }
        if(session){
        getall();
        }
      }, [session]);
    
    async function handleDelete(key:any){
        try{
            setLoading(true)
            const response = await axios.delete(`/api/deliveries/${key}`)
            console.log(response)
            setLoading(false)
            if(response.status === 200){
                //@ts-ignore
                setDeliveries(deliveries.filter((delivery)=>{return delivery?._id !== key}))
            }
        }catch(error){
            setLoading(false)
            console.log(error)
        }
    }
    //@ts-ignore
    if(session){
    return (
        <div>
          <center>
          <section className="grid grid-cols-gallery gap-3">
              {deliveries.map((delivery: any) => (
                <div  key={delivery?._id}
                onMouseEnter={()=>setThere(delivery?._id)}
                onMouseLeave={()=>setThere(null)}
                className="mb-5 justify-self-center rounded-3xl w-11/12 md:w-1/2 mt-10  bg-zinc-700 ml-10 mr-10">
                <div
                  className="border-b-2 border-neutral-100 px-6 py-3  dark:text-neutral-50">
                  <h4 className="font-bold"> {delivery?.code} </h4>
                </div>
                <div className="p-6">
                  <h5
                    className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Location {delivery?.adresse}
                  </h5>
                  <p className="mb-1 text-base text-neutral-600 dark:text-neutral-200">
                    Number of Items {delivery?.items}
                  </p>
                  <p className="mb-3">
                    {delivery?.priority === "Considerable" && (
                      <span className="text-yellow-500">Considerable Priority</span>
                    )}
                    {delivery?.priority === "High" && (
                      <span className="text-red-400">High Priority</span>
                    )}
                    {delivery?.priority === "Normal" && (
                      <span className="text-green-500">Normal Priority</span>
                    )}  
                </p>
                  <button
                    type="button"
                    className={`${(there === delivery?._id) ? "inline-block" :  "hidden"} + rounded bg-red-400 px-6 pb-2 pt-2.5 text-xs font-bold leading-normal text-white  transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]  dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] `}
                    onClick={()=>handleDelete(delivery?._id)}>
                    {loading ? "Processing..." : "DELETE"}
                  </button>
                </div>
              </div>
                // <div key={delivery?._id} classNameName="flex w-full justify-between mt-10 bg-indigo-300 rounded-2xl h-48 ml-3 mb-3 ">`
                //   <h3 classNameName="p-3 font-bold h-3 block">
                //     Delivery Code: {delivery?.code}
                //   </h3>
                //   <br/>
                //   <h3 classNameName="p-3 font-bold"> Adress : {delivery?.adresse}</h3>
                //   <h3 classNameName="p-3 font-bold"> Items : {delivery?.items}</h3>
                  
                  
                //   <span classNameName="ml-auto mt-auto p-3 bg-orange-600 rounded-tl-2xl rounded-tr-2xl"> {delivery?.priority} </span>
                //   <button id={delivery?._id} classNameName="ml-3 mt-auto p-3 bg-red-800 rounded-br-2xl rounded-tl-2xl" onClick={() => handleDelete(delivery?._id)}> {loading ? "Processing..." : "Delete"} </button>
                // </div>
              ))}
            </section>

          </center>
        </div>
      );
                    
        

      
}else{ return( <div className="flex justify-center items-center "> Loading... </div>)}}