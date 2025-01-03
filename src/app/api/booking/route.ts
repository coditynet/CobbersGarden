import { NextResponse } from "next/server";
import { z } from "zod";
import { resend } from "@/lib/resend";
import BookingEmail from "@/components/emails/BookingEmail";

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
  phone: z.string().optional(),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(1000, "Le message ne peut pas dépasser 1000 caractères"),
  images: z.array(z.any()).optional(), // We'll handle image validation separately
});

export async function POST(request: Request) {
  try {
    // Get the form data
    const formData = await request.formData();

    // Extract the basic fields
    const bookingData = {
      service: formData.get("service"),
      category: formData.get("category"),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    // Handle images separately
    const imageFiles = formData.getAll("images");

    // Validate the data
    const validatedData = bookingSchema.parse({
      ...bookingData,
      images: imageFiles,
    });

    // Upload images if present
    let uploadedImageUrls: string[] = [];
    if (imageFiles && imageFiles.length > 0) {
      // Here you would implement your image upload logic
      // For example, using uploadthing, AWS S3, or similar
      // uploadedImageUrls = await Promise.all(imageFiles.map(file => uploadImage(file)));
    }

    // Prepare email data
    const emailData = {
      ...validatedData,
      imageUrls: uploadedImageUrls,
      submittedAt: new Date().toISOString(),
    };

    // Send confirmation email to customer
    await resend.emails.send({
      from: "Cobbers Garden <noreply@cobbers-garden.de>",
      replyTo: "info@cobbers-garden.de",
      to: validatedData.email,
      subject: "Confirmation de votre demande - Cobbers Garden",
      react: BookingEmail({
        ...emailData,
        isCustomer: true,
      }) as React.ReactElement,
    });

    console.log(mail);

    // Send notification email to admin
    await resend.emails.send({
      from: "Cobbers Garden <noreply@cobbers-garden.de>",
      replyTo: validatedData.email,
      to: "info@cobbers-garden.de",
      subject: `Nouvelle demande de ${validatedData.name} - ${validatedData.category}`,
      react: BookingEmail({
        ...emailData,
        isCustomer: false,
      }) as React.ReactElement,
    });

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

    return NextResponse.json(
      {
        success: false,
        message: "Une erreur s'est produite lors de l'envoi de votre demande",
      },
      { status: 500 },
    );
  }
}
