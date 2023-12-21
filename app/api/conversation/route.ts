import { NextResponse } from 'next/server';
export const runtime = 'edge'


import { OpenAI } from 'openai'
import { auth } from '@clerk/nextjs'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


export const POST = async (request: Request) => {
    try {
        const { userId } = auth()
        const body = await request.json()
        const { messages } = body;

        console.log(messages)



        // check if user is authenticated
        if (!userId) {
            return new NextResponse('UnAuthorizes', { status: 402 })
        }


        // check if there is are messages in the request
        if (!messages) {
            return new NextResponse('messages are required', { status: 400 })
        }

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
        })



        if (response) {
            return NextResponse.json(response.choices[0].message.content)
        }


    } catch (error) {
        return new NextResponse('internal error', { status: 500 })
    }

}
