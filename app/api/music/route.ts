

import { NextResponse } from 'next/server';

import Replicate from "replicate";
import { auth } from '@clerk/nextjs'

import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';


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

        const freeTrial = await checkApiLimit()
        console.log(freeTrial)
        if(!freeTrial){
            return new NextResponse('Free trial has expired', {status:403})
        }

        const response = await replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
                input: {
                    prompt_a: prompt
                }
            }
        );

        await increaseApiLimit()

        if (response) {
            return NextResponse.json(response)
        }

    } catch (error) {
        return new NextResponse('internal error', { status: 500 })
    }

}
