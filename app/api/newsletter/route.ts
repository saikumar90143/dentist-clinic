import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 });
    }

    // In production: add to email list (Mailchimp, Resend, etc.)
    console.log('Newsletter subscription:', { email, name, subscribedAt: new Date().toISOString() });

    return NextResponse.json({
      success: true,
      message: `Thank you${name ? `, ${name}` : ''}! You've been subscribed to SmileCraft dental tips.`,
    });
  } catch {
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
