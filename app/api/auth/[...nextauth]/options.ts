import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '@/models/userModels'
import connectDB from '@/lib/connectdb'
import bcrypt from 'bcrypt'
import { IUser } from '@/types'


export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            credentials: {
                email: {
                    label: "Email:",
                    type: "text",
                    placeholder: "your-cool-email"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                },
            },
            // @ts-ignore
            async authorize(credentials:any){
                connectDB()
                const user = await User.findOne({email:credentials.email}).select('+password')
                if(!user){
                    throw new Error("User not found")
                }

                const isPasswordCorrect = await bcrypt.compare(credentials?.password,user.password)
                if (!isPasswordCorrect){
                    throw new Error("Invalid Credentials")
                }          
                
                let newUser:IUser = {FirstName:user.FirstName,
                    LastName:user.LastName,
                    email:user.email,
                    isAuth:user.isAuth,
                    id:user._id,
                }
                
                return newUser
                


            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn: "/auth/login",
    },
    session:{
        strategy:"jwt",
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user  as IUser
            return session
        }
    },
    debug: process.env.NODE_ENV === "development"
}

