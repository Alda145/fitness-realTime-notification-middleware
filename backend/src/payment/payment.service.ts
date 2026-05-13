import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
    private stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    async createCheckoutSession(data: any) {
        const amount = Math.round(data.amount * 100);

        const session = await this.stripe.checkout.sessions.create({
            mode: 'payment',

            line_items: [
                {
                    price_data: {
                        currency: data.currency.toLowerCase(),
                        product_data: {
                            name: 'Fitness Pricing Payment',
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],

            success_url:`${process.env.FRONTEND_URL}/payment-success`,
            cancel_url: `${process.env.FRONTEND_URL}/pricing`,
        });

        return {
            url: session.url,
        };
    }
}