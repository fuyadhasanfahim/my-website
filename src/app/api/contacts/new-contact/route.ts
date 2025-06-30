import { sendEmail } from '@/lib/nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            website,
            howDidYouFindUs,
            message,
        } = await req.json();

        if (!firstName || !lastName || !email || !howDidYouFindUs || !message) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'All fields are required',
                },
                {
                    status: 400,
                }
            );
        }

        await sendEmail({
            to: process.env.EMAIL_USER!,
            subject: 'New Contact Form Submission',
            html: `
                <h2>New Contact Request</h2>
                <p><strong>First Name:</strong> ${firstName}</p>
                <p><strong>Last Name:</strong> ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                <p><strong>Website:</strong> ${website || 'N/A'}</p>
                <p><strong>How did you find us:</strong> ${howDidYouFindUs}</p>
                <p><strong>Message:</strong><br/>${message}</p>
            `,
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Contact request sent successfully',
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: 'An error occurred',
                errorMessage: (error as Error).message,
            },
            {
                status: 500,
            }
        );
    }
}
