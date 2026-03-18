import { NextResponse } from "next/server";
import { z } from "zod";
import { resend } from "@/lib/mail";
import BookingEmail from "@/components/emails/BookingEmail";
import { prepareBookingImageAttachments } from "@/server/booking-images";

export const runtime = "nodejs";

const bookingSchema = z.object({
  service: z.string({
    required_error: "Veuillez sélectionner un service",
  }),
  category: z.string({
    required_error: "Veuillez sélectionner une catégorie",
  }),
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
  email: z.string().email("Veuillez entrer une adresse e-mail valide"),
  phone: z.string().optional().nullable(),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(1000, "Le message ne peut pas dépasser 1000 caractères"),
});

export async function POST(request: Request) {
  try {
    if (!resend) {
      throw new Error("Missing RESEND_API_KEY environment variable");
    }

    const formData = await request.formData();

    const bookingData = {
      service: formData.get("service"),
      category: formData.get("category"),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || null,
      message: formData.get("message"),
    };

    const imageFiles = formData
      .getAll("images")
      .filter((value): value is File => value instanceof File && value.size > 0);

    const validatedData = bookingSchema.parse(bookingData);
    const preparedImages = await prepareBookingImageAttachments(imageFiles);
    const service = validatedData.service.trim() || validatedData.category;

    const emailData = {
      ...validatedData,
      service,
      attachmentNames: preparedImages.attachmentNames,
      imageCount: preparedImages.attachmentNames.length,
      submittedAt: new Date().toISOString(),
    };

    const customerEmailResult = await resend.emails.send({
      from: "Cobbers Garden <bookings@cobbersgarden.fr>",
      replyTo: "contact@cobbersgarden.fr",
      to: validatedData.email,
      subject: "Confirmation de votre demande - Cobbers Garden",
      react: BookingEmail({
        ...emailData,
        isCustomer: true,
      }) as React.ReactElement,
    });

    if (customerEmailResult.error) {
      throw new Error(customerEmailResult.error.message);
    }

    const adminEmailResult = await resend.emails.send({
      from: "Cobbers Garden <bookings@cobbersgarden.fr>",
      replyTo: validatedData.email,
      to: "contact@cobbersgarden.fr",
      subject: `Nouvelle demande de ${validatedData.name} - ${validatedData.category}`,
      attachments: preparedImages.attachments,
      react: BookingEmail({
        ...emailData,
        isCustomer: false,
      }) as React.ReactElement,
    });

    if (adminEmailResult.error) {
      throw new Error(adminEmailResult.error.message);
    }

    return NextResponse.json({
      success: true,
      message: "Votre demande a été envoyée avec succès",
    });
  } catch (error) {
    console.error("Booking error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Une erreur s'est produite lors de l'envoi de votre demande",
      },
      { status: 500 },
    );
  }
}
