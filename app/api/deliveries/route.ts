 import connectDB from "@/lib/connectdb";
import delivery from "@/models/deliveryModels";
import { NextResponse } from "next/server";

 export async function GET(req:Request){
    connectDB()
    const all = await delivery.find()
    return NextResponse.json(all,{status:200})
 }


