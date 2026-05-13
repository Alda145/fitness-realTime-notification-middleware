import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(
        private readonly paymentService: PaymentService,
    ) { }

    @Post('create-checkout-session')
    async createCheckoutSession(@Body() body: any) {
        return await this.paymentService.createCheckoutSession(body);
    }
}