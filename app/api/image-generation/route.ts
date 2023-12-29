import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server'
import OpenAi from 'openai';

import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';


const openai = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY
})




export const POST = async (request: Request) => {

    try {
        const body = await request.json();
        const { prompt, amount, resolution } = body
        const { userId } = auth()
        const isPro = await checkSubscription()


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

        const freeTrial = await checkApiLimit()

        if(!freeTrial && !isPro){
            return new NextResponse('Free trial has expired', {status:403})
        }


        const response = await openai.images.generate({ prompt: prompt, n: +amount, size: resolution, model: "dall-e-3" })

        if(!isPro){
            await increaseApiLimit()
        }
        
      
        if (response) {
            return NextResponse.json(response.data)
        }


    } catch (err) {
        console.log(err)
        return new NextResponse('Code generation internal error', { status: 500 })
    }





}