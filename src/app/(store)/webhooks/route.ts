import { Metadata } from "@/actions/createCheckoutSession";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest){
    const body = await req.text();
    const headersList = await headers();
    const sig = headersList.get('stripe-signature');
    if(!sig){
        return NextResponse.json({error: "No signature"}, {status: 400})
    }
    const webHookSecret = process.env.STRIPE_WEBHOOL_SECRET;

    if(!webHookSecret){
        return NextResponse.json({error:"stripe web hook secret is not set"}, {status: 400})
    }

    let event:Stripe.Event;
    try {
        event =  stripe.webhooks.constructEvent(body, sig, webHookSecret)
    } catch (error) {
        return NextResponse.json({error:`stripe web hook verification failed ${error}`}, {status: 400})
        
    }

    if(event.type === "checkout.session.completed"){
        const session = event.data.object as Stripe.Checkout.Session;
        try {
            const order = await createOrderInSanity(session);
        } catch (error) {
            return NextResponse.json({error:`Error creating order ${error}`}, {status: 500})
        }

    }

    return NextResponse.json({ received: true })

}


async function createOrderInSanity(session: Stripe.Checkout.Session){
    const {id, amount_total, currency, metadata, payment_intent, customer, total_details} = session;
    const {orderNumber, customerEmail, customerName, clerkUserId} = metadata as Metadata;

    const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
        id,
        {
            expand: ["data.price.product"],
        }
    );

    const sanityProducts = lineItemsWithProduct.data.map((item) => ({
        _key: crypto.randomUUID(),
        product:{
            _type: "reference",
            _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
        },
        quantity: item.quantity || 0
    }))

    const order = await backendClient.create({
        _type: "order",
        orderNumber,
        stripeCheckoutSessionId:id,
        stripePaymentIntentId: payment_intent,
        customerName,
        stripeCustomerId: customer,
        clerkUserId: clerkUserId,
        email: customerEmail,
        currency,
        amountDiscount: total_details?.amount_discount? total_details?.amount_discount / 100 : 0,
        products: sanityProducts,
        total_price: amount_total ? amount_total / 100: 0,
        status: "paid",
        orderData: new Date().toString(),
    });

    return order;
}