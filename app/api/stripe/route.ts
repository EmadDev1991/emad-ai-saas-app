import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismaDB from "@/lib/prismadb";
import {stripe} from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingUrl = absoluteUrl("/settings")


export const GET = async() => {
    
    try {
        const { userId } = auth()
        
        const user = await currentUser();
       
        if(!userId || !user ){
            return new  NextResponse("unauthorized1111", {status:401})
        }

        const userSubscription = await prismaDB.userSubscription.findUnique({
            where: {
                userId
            }
        })


        

        if(userSubscription && userSubscription.stripeCustomerId){
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url:  settingUrl
            })

            return new NextResponse(JSON.stringify({url: stripeSession.url}))
        }


        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingUrl,
            cancel_url: settingUrl,
            payment_method_types:['card'],
            mode: 'subscription',
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items:[
                {
                    price_data:{
                        currency: 'USD',
                        product_data:{
                            name: "emadAI Pro",
                            description: 'Unlimited AI Generation'
                        },
                        unit_amount: 2000,
                        recurring:{
                            interval: 'month'
                        }
                    },
                    quantity: 1
                }
            ],

            metadata: {
                userId
            }
        })

        console.log(userSubscription)


        return new NextResponse(JSON.stringify({url: stripeSession.url }))

    } catch (error) {
        return new NextResponse(`internal error-----${error}`, {status: 500})
        console.log(error)
    }
}