import { NextResponse } from 'next/server';
import { z } from 'zod';
import { resend } from '@/lib/mail';

const updateBookingSchema = z.object({
  status: z.enum(["approved", "declined"]),
  service: z.string().min(1, "Service is required"),
  price: z.number().min(0),
  estimatedDuration: z.string().optional(),
  adminNotes: z.string().optional(),
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Here you would fetch the booking from your database
    // For now, we'll return mock data
    const booking = {
      id: params.id,
      service: "Rasenmähen",
      name: "Max Mustermann",
      email: "max@example.com",
      phone: "+49123456789",
      message: "Ich hätte gerne meinen Rasen gemäht.",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json(
      { error: "Booking not found" },
      { status: 404 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = updateBookingSchema.parse(body);

    // Here you would update the booking in your database
    // For now, we'll just simulate a success response

    // Send email based on status
    if (validatedData.status === "approved") {
      // Send approval email to customer
      await resend.emails.send({
        from: "Cobbers Garden <noreply@cobbers-garden.de>",
        replyTo: "info@cobbers-garden.de",
        to: "eliasnau09@gmail.com", // You would get this from your database
        subject: "Ihre Buchung wurde bestätigt",
        text: `Ihre Buchung wurde bestätigt. Preis: ${validatedData.price}€, Geschätzte Dauer: ${validatedData.estimatedDuration}`,
      });
    } else {
      // Send decline email to customer
      await resend.emails.send({
        from: "Cobbers Garden <noreply@cobbers-garden.de>",
        replyTo: "info@cobbers-garden.de",
        to: "eliasnau09@gmail.com", // You would get this from your database
        subject: "Ihre Buchung wurde leider abgelehnt",
        text: "Ihre Buchung wurde leider abgelehnt. Bei Fragen kontaktieren Sie uns gerne.",
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update booking error:', error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
} 