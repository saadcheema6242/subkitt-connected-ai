import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { userEmail, planName, price, type } = await request.json();
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "muhammadsaadc49@gmail.com";

        // Here they would add their SendGrid / NodeMailer logic
        console.log(`[EMAIL NOTIFICATION] Type: ${type}`);
        console.log(`To: ${type === 'admin' ? ADMIN_EMAIL : userEmail}`);
        console.log(`Body: ${planName} purchased by ${userEmail}. Price: $${price}`);

        // This is a placeholder for real email service integration
        // const sgMail = require('@sendgrid/mail');
        // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        // await sgMail.send({...});

        return NextResponse.json({ success: true, message: "Notification simulation successful" });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
