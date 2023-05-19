import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"
export const POST = async (req)=>{
    const {userId,prompt,tag} = await req.json()
    console.log("------reached--------")

    try{
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save()

        return new Response(JSON.stringify(newPrompt),{status:201})

    }catch(error){
        return new Response('Faied to create new Response',{status:500})
    }
}