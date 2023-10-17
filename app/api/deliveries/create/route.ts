import connectDB from "@/lib/connectdb"
import delivery from "@/models/deliveryModels";
import { NextResponse } from "next/server";

async function generatesUniqueCode() {
    const length = 8;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = ''
    while (true) {
      code = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        code += chars.charAt(randomIndex);
      }
      let search = await delivery.findOne({code:code})
      if (!search){
        break;
      }
    }
    return code;
  }


export async function POST(req:Request){
    connectDB()
    const data = await req.json()
    const { adress,items,priority,owner } = data
    //generate code
    const code = await generatesUniqueCode()

    const deliv = await delivery.create({adresse:adress,code:code,items:items,priority:priority,owner:owner})
    return NextResponse.json(deliv,{status:201})
}