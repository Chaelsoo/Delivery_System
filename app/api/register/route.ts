import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import connectDB from "@/lib/connectdb";
import User from "@/models/userModels";


export async function POST(req: Request) {
  connectDB()
  try {
        const data = await req.json()
      const {email , FirstName , LastName , password } = data
      const user = await User.findOne({Email:email})
      if(user !== null){
        return NextResponse.json({message:"User Already Exists"},{status:400})
      }
      const salt = await bcrypt.genSalt(10)
      const hashed = await bcrypt.hash(password,salt)
      const instant = await User.create({email,FirstName,LastName,password:hashed})
      if(instant){
        return NextResponse.json(instant,{status:201})
      }else{
        return NextResponse.json({message:"Invalid Request"},{status:404})
      }
  } catch (error) {
    console.error(error);
    return NextResponse.json({message:"Fuck you"})
}
}