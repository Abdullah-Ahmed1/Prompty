import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { signIn } from 'next-auth/react'
import User from '@models/user'
import { connectToDB } from '@utils/database'

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks : {
        async session({ session }){
            try{
                
                const sessionUser = await User.findOne({
                    email : session.user.email
                })
                session.user.id = sessionUser._id.toString()
                return session
            }catch(err){
                console.log(err)
            }
        },
        async signIn({profile}){
            console.log("reachedddddddddddddd sign In")
            try{
                await connectToDB();
                const userExists = await User.findOne({
                    email:profile.email
                }) 
                if(!userExists){
                    await User.create({
                        email:profile.email,
                        username:profile.name.replace(" ","").toLowerCase(),
                        image :profile.picture
                    })
                }
                return true
            }catch(err){
                console.log(err)
                return false
            }
            await connectToDB();
        }
    }

   
   
})

export {handler as GET,handler as POST}