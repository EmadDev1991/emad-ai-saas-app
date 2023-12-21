

import { NextResponse } from 'next/server';
export const runtime = 'edge'

import Replicate from "replicate";
import { auth } from '@clerk/nextjs'


const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export const POST = async (request: Request) => {
    try {
        const { userId } = auth()
        const body = await request.json()
        const { prompt } = body;

        console.log(prompt)



        // check if user is authenticated
        if (!userId) {
            return new NextResponse('UnAuthorizes', { status: 402 })
        }


        // check if there is are messages in the request
        if (!prompt) {
            return new NextResponse('prompt are required', { status: 400 })
        }


        const response = await replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
                input: {
                    prompt_a: prompt
                }
            }
        );


        if (response) {
            return NextResponse.json(response)
        }

    } catch (error) {
        return new NextResponse('internal error', { status: 500 })
    }

}
