import { NextResponse } from 'next/server';

import { OpenAI } from 'openai'
import { auth } from '@clerk/nextjs'

import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});



const instructionMessage = { 
    role: 'system', 
    content:'you are a code generator. you must answer only in markdown code snippets. use code comments for explanation'
}



export const POST = async (request: Request) => {
    try {
        const { userId } = auth()
        const body = await request.json()
        const { messages } = body;
        const isPro = await checkSubscription()


        // check if user is authenticated
        if (!userId) {
            return new NextResponse('UnAuthorizes', { status: 402 })
        }


        // check if there is are messages in the request
        if (!messages) {
            return new NextResponse('messages are required', { status: 400 })
        }

        const freeTrial = await checkApiLimit()
       
        if(!freeTrial && !isPro){
            return new NextResponse('Free trial has expired', {status:403})
        }

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [ instructionMessage, ...messages],
        })

        if(!isPro){
            await increaseApiLimit()
        }
        



        if (response) {
            return NextResponse.json(response.choices[0].message.content)
        }


    } catch (error) {
        return new NextResponse('Code generation internal error', { status: 500 })
    }

}


