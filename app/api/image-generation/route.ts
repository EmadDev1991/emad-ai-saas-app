import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server'
import OpenAi from 'openai';


const openai = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY
})




export const POST = async (request: Request) => {

    try {
        const body = await request.json();
        const { prompt, amount, resolution } = body
        const { userId } = auth()



        // check if user is authenticated
        if (!userId) {
            return new NextResponse('UnAuthorizes', { status: 402 })
        }


        // check if there is are messages in the request
        if (!prompt) {
            return new NextResponse('image generation prompt is required', { status: 400 })
        }

        if (!amount || !resolution) {
            return new NextResponse('Please specify images count and the resolution', { status: 400 })
        }


        const response = await openai.images.generate({ prompt: prompt, n: +amount, size: resolution })

        console.log(response)
        if (response) {
            return NextResponse.json(response.data)
        }


    } catch (err) {
        console.log(err)
        return new NextResponse('Code generation internal error', { status: 500 })
    }





}