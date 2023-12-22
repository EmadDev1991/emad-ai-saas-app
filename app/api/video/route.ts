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

       



        // check if user is authenticated
        if (!userId) {
            return new NextResponse('UnAuthorizes', { status: 402 })
        }


        // check if there is are messages in the request
        if (!prompt) {
            return new NextResponse('prompt are required', { status: 400 })
        }


        const response = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
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
