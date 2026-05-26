import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, service, doctor, date, time, notes } = body;

    // Validate required fields
    if (!name || !phone || !service || !date || !time) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields: name, phone, service, date, and time.' },
        { status: 400 }
      );
    }

    // Validate phone
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-+91]/g, ''))) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid Indian mobile number.' },
        { status: 400 }
      );
    }

    // Generate booking ID
    const bookingId = `SC-${Math.floor(10000 + Math.random() * 90000)}`;

    // In production, you would:
    // 1. Save to database
    // 2. Send confirmation SMS/email
    // 3. Notify the clinic via WhatsApp Business API
    console.log('New appointment booking:', { bookingId, name, phone, email, service, doctor, date, time, notes });

    return NextResponse.json({
      success: true,
      bookingId,
      message: 'Appointment confirmed! We will call you to confirm.',
      details: {
        bookingId,
        name,
        service,
        doctor: doctor || 'Best Available Specialist',
        date,
        time,
        clinic: 'SmileCraft Dental Clinic, Connaught Place',
        phone: '+91-9876543210',
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please call us at +91-9876543210.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'SmileCraft Appointment API is running.' });
}
