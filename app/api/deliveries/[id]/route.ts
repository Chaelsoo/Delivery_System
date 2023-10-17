import connectDB from "@/lib/connectdb"
import delivery from "@/models/deliveryModels"
import { NextResponse } from "next/server"


export async function DELETE(req:any,{ params }:any){
    connectDB()
    const id = params?.id
    if (id){
    const deliver = await delivery.findById(id)
    if (deliver){
    await delivery.deleteOne(deliver)
    return NextResponse.json({message:"Succesfully Deleted Delivery"},{status:200})
    }else{
        return NextResponse.json({message:"Delivery Not Found"},{status:400})
    }
    }else{
        return NextResponse.json({message:"Invalid Request"},{status:400})
    }
}