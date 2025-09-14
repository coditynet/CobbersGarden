"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Check, Upload, X } from "lucide-react";
import LoadingDots from "@/components/ui/LoadingDots";
import { clearSavedData } from "@/hooks/useAutosave";
import posthog from "posthog-js";
import Image from "next/image";

import CategorySelector from "../ui/CategorySelector";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const bookingSchema = z.object({
  category: z.string({
    required_error: "Veuillez sélectionner une catégorie",
  }),
  service: z.string().optional(),
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(5000, "Le nom ne peut pas dépasser 5000 caractères"),
  email: z.string().email("Veuillez entrer une adresse e-mail valide"),
  phone: z.string().optional(),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(1000, "Le message ne peut pas dépasser 1000 caractères"),
  images: z.array(z.custom<File>()).optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const Booking = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const { toast } = useToast();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      category: "",
      service: "",
      name: "",
      email: "",
      phone: "",
      message: "",
      images: [],
    },
  });

  useEffect(() => {
    setIsLoading(false);
    setIsInitializing(false);
    if (!startTime) setStartTime(Date.now());
  }, [startTime]);

  if (isInitializing) {
    return (
      <section 
        id="booking"
        className="py-24 bg-gradient-to-br from-garden-background via-white to-garden-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-garden-primary text-center mb-16">
              <span className="relative">
                Réserver un rendez-vous maintenant.
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-garden-accent hidden md:block" />
              </span>
            </h2>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-16 flex justify-center items-center">
                <LoadingDots />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const handleContinue = () => {
    if (step === 1) {
      const category = form.getValues("category");
      if (!category) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner une catégorie",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
      return;
    }
  };

  const onSubmit = async (data: BookingFormValues) => {
    if (step === 1) {
      handleContinue();
      return;
    }

    setIsLoading(true);

    try {
      const submitFormData = new FormData();
      submitFormData.append("category", data.category);
      submitFormData.append("service", data.service || "");
      submitFormData.append("name", data.name);
      submitFormData.append("email", data.email);
      if (data.phone) submitFormData.append("phone", data.phone);
      submitFormData.append("message", data.message);

      if (images.length > 0) {
        images.forEach((image) => {
          submitFormData.append("images", image);
        });
      }

      const response = await fetch("/api/booking", {
        method: "POST",
        body: submitFormData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Une erreur s'est produite");
      }

      const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;

      posthog.people.set({
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        $initial_service: data.service,
      });

      posthog.capture("booking_submitted", {
        category: data.category,
        service: data.service,
        hasPhone: !!data.phone,
        timeToComplete: timeSpent,
        stepsCompleted: step,
        formStarted: !!startTime,
      });

      clearSavedData("booking-form");
      clearSavedData("booking-form-images");
      setIsSubmitted(true);
      setStartTime(null);

      toast({
        title: "Succès!",
        description: responseData.message,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur s'est produite",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="booking"
      className="py-24 bg-gradient-to-br from-garden-background via-white to-garden-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-garden-primary text-center mb-16">
            <span className="relative">
              {isSubmitted ? "Merci!" : "Demande de devis"}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-garden-accent hidden md:block" />
            </span>
          </h2>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex border-b">
              <div className="flex-1 p-4 text-center text-garden-primary">
                <div className="flex items-center justify-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step > 1 || isSubmitted
                        ? "bg-garden-primary text-white"
                        : "bg-gray-200"
                    }`}>
                    {step > 1 || isSubmitted ? <Check className="w-5 h-5" /> : "1"}
                  </div>
                  <span>Choisir un service</span>
                </div>
              </div>
              <div className="flex-1 p-4 text-center text-garden-primary">
                <div className="flex items-center justify-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isSubmitted ? "bg-garden-primary text-white" : "bg-gray-200"
                    }`}>
                    {isSubmitted ? <Check className="w-5 h-5" /> : "2"}
                  </div>
                  <span>Contact</span>
                </div>
              </div>
            </div>

            <div className="p-8">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-garden-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-garden-primary" />
                  </div>
                  <h3 className="text-2xl font-playfair font-bold text-garden-primary mb-4">
                    Votre demande a été envoyée avec succès.
                  </h3>
                  <p className="text-garden-secondary mb-8">
                    Nous vous contacterons bientôt pour convenir d&apos;un rendez-vous.
                  </p>
                  <Button
                    onClick={() => {
                      setStep(1);
                      form.reset();
                      setIsSubmitted(false);
                      setImages([]);
                    }}
                    className="bg-garden-primary hover:bg-garden-accent text-white px-8 py-4 rounded-xl transition-all duration-300">
                    Nouvelle demande
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {step === 1 ? (
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-playfair text-garden-primary">
                              Catégorie
                            </FormLabel>
                            <FormControl>
                              <CategorySelector
                                selectedCategory={field.value}
                                onSelectCategory={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg font-playfair text-garden-primary">
                                Nom
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Max Mustermann"
                                  className="text-lg p-6"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg font-playfair text-garden-primary">
                                E-Mail
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="max.payne@exemple.fr"
                                  className="text-lg p-6"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg font-playfair text-garden-primary">
                                Téléphone (optionnel)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  placeholder="06 12 34 56 78"
                                  className="text-lg p-6"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg font-playfair text-garden-primary">
                                Votre message
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Décrivez votre demande..."
                                  className="min-h-[120px] text-lg p-6"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="space-y-3">
                          <FormLabel className="block">Images (optional)</FormLabel>
                          <div
                            className={`border-2 border-dashed rounded-xl p-6 transition-colors
                            ${images.length < 10 ? "cursor-pointer hover:border-garden-accent" : ""}
                            ${form.formState.errors.images ? "border-red-500" : "border-gray-300"}`}>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              id="image-upload"
                              onChange={(e) => {
                                if (e.target.files) {
                                  const newFiles = Array.from(e.target.files);
                                  const totalImages = images.length + newFiles.length;
                                  if (totalImages > 10) {
                                    toast({
                                      title: "Trop d'images",
                                      description:
                                        "Vous pouvez télécharger jusqu'à 10 images maximum",
                                      variant: "destructive",
                                    });
                                    return;
                                  }
                                  setImages((prev) => [...prev, ...newFiles]);
                                }
                              }}
                            />
                            <label
                              htmlFor="image-upload"
                              className="flex flex-col items-center gap-2">
                              <Upload
                                className={`w-8 h-8 ${
                                  images.length < 10
                                    ? "text-garden-primary"
                                    : "text-gray-400"
                                }`}
                              />
                              <div className="text-center">
                                <p className="text-sm font-medium text-garden-primary">
                                  {images.length < 10 ? (
                                    <>Cliquez ici pour importer des images.</>
                                  ) : (
                                    <span className="text-gray-400">
                                      Nombre maximal d&apos;images atteint.
                                    </span>
                                  )}
                                </p>
                                <p className="text-xs text-garden-secondary mt-1">
                                  JPG, PNG ou GIF (max. 10 images)
                                </p>
                              </div>
                            </label>
                          </div>

                          {images.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                              {images.map((image, index) => (
                                <div
                                  key={index}
                                  className="relative aspect-square group">
                                  <div className="w-full h-full rounded-lg overflow-hidden border border-gray-200">
                                    <Image
                                      src={URL.createObjectURL(image)}
                                      alt={`Preview ${index + 1}`}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setImages((prev) =>
                                        prev.filter((_, i) => i !== index)
                                      );
                                    }}
                                    className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-red-50 transition-colors">
                                    <X className="w-4 h-4 text-red-500" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={step === 1 ? handleContinue : undefined}
                      type={step === 1 ? "button" : "submit"}
                      disabled={isLoading || (step === 1 && !form.watch("category"))}
                      className="w-full mt-8 bg-garden-primary hover:bg-garden-accent text-white text-lg p-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <LoadingDots />
                      ) : (
                        <>
                          {step === 1 ? "Continuer" : "Envoyer la demande"}
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
