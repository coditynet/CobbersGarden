import { NextResponse } from 'next/server';
import { z } from 'zod';
import { resend } from '@/lib/resend';
import CustomerConfirmationEmail from '@/components/emails/CustomerConfirmation';
import AdminNotificationEmail from '@/components/emails/AdminNotification';

const bookingSchema = z.object({
  service: z.string({
    required_error: "Bitte wählen Sie einen Service aus",
  }),
  name: z.string()
    .min(2, "Name muss mindestens 2 Zeichen lang sein")
    .max(50, "Name darf maximal 50 Zeichen lang sein"),
  email: z.string()
    .email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  phone: z.string()
    .optional(),
  message: z.string()
    .min(10, "Nachricht muss mindestens 10 Zeichen lang sein")
    .max(1000, "Nachricht darf maximal 1000 Zeichen lang sein"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = bookingSchema.parse(body);
    
    // Send confirmation email to customer
    await resend.emails.send({
      from: 'Cobbers Garden <noreply@cobbers-garden.de>',
      replyTo: 'info@cobbers-garden.de',
      to: validatedData.email,
      subject: 'Ihre Buchungsanfrage bei Cobbers Garden',
      react: CustomerConfirmationEmail(validatedData) as React.ReactElement,
    });

    // Send notification email to admin
    await resend.emails.send({
      from: 'Cobbers Garden <noreply@cobbers-garden.de>',
      replyTo: validatedData.email,
      to: 'info@cobbers-garden.de',
      subject: `Neue Buchungsanfrage von ${validatedData.name}`,
      react: AdminNotificationEmail(validatedData) as React.ReactElement,
    });

    return NextResponse.json({ 
      success: true, 
      message: "Buchungsanfrage erfolgreich gesendet" 
    });

  } catch (error) {
    console.error('Booking error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          errors: error.errors 
        }, 
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: "Ein Fehler ist aufgetreten" 
      }, 
      { status: 500 }
    );
  }
} 