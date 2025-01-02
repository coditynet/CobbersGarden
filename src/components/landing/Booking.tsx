"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Check, Upload, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import LoadingDots from "@/components/ui/LoadingDots";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  clearSavedData,
} from "@/hooks/useAutosave";
import posthog from "posthog-js";
import Image from "next/image";
import validator from 'validator';

const bookingSchema = z.object({
  service: z.string({
    required_error: "Veuillez sélectionner un service",
  }),
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
  email: z.string().email("Veuillez entrer une adresse e-mail valide"),
  phone: z.string()
    .optional()
    .refine(
      (value) => !value || validator.isMobilePhone(value),
      "Veuillez entrer un numéro de téléphone français valide"
    ),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(1000, "Le message ne peut pas dépasser 1000 caractères"),
  images: z.array(z.custom<File>()).optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const serviceTypes = [
  {
    category: "Rasenpflege",
    options: [
      {
        value: "rasen-standard",
        label: "Standard Rasenmähen",
        price: "",
      },
      {
        value: "rasen-premium",
        label: "Premium Rasenpflege (inkl. Düngen)",
        price: "",
      },
      { value: "vertikutieren", label: "Vertikutieren", price: "" },
    ],
  },
  {
    category: "Baumpflege",
    options: [
      { value: "baum-schnitt", label: "Baumschnitt", price: "" },
      { value: "totholz", label: "Totholzentfernung", price: "" },
      {
        value: "sturmschaden",
        label: "Sturmschadenbeseitigung",
        price: "",
      },
    ],
  },
  {
    category: "Gartengestaltung",
    options: [
      { value: "neuanlage", label: "Neuanlage Garten", price: "" },
      { value: "umgestaltung", label: "Umgestaltung", price: "" },
      { value: "pflanzplan", label: "Pflanzplanung", price: "" },
    ],
  },
];

const Booking = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState<BookingFormData>({
    service: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof BookingFormData, string>>
  >({});
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [images, setImages] = useState<File[]>([]);

  // Initialize form with saved data
  useEffect(() => {
    const initializeForm = async () => {
      const savedData = loadFromLocalStorage("booking-form");
      if (savedData) {
        setFormData(savedData);
        if (savedData.service) {
          setSelectedService(savedData.service);
          setStep(2);
        }

        toast({
          title: "Formular wiederhergestellt",
          description: "Ihre vorherigen Eingaben wurden geladen.",
        });
      }
      // Add small delay to ensure smooth transition
      await new Promise((resolve) => setTimeout(resolve, 300));
      setIsInitializing(false);
    };

    initializeForm();
  }, []);

  // Autosave form data
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveToLocalStorage("booking-form", formData);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formData]);

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    posthog.capture("service_selected", {
      service,
      category: selectedCategory,
      timeToSelect: startTime ? Math.floor((Date.now() - startTime) / 1000) : 0,
    });
  };

  const handleContinue = () => {
    if (step === 1 && validateStep(1)) {
      posthog.capture("booking_step_completed", {
        step: 1,
        service: selectedService,
        category: selectedCategory,
      });
      setFormData((prev) => ({ ...prev, service: selectedService }));
      setStep(2);
    } else if (step === 2 && validateStep(2)) {
      handleSubmit();
    }
  };

  const handleFormError = (errors: any) => {
    posthog.capture("booking_form_error", {
      step,
      errors: Object.keys(errors),
      service: selectedService,
    });
  };

  const validateStep = (stepNumber: number) => {
    if (stepNumber === 1) {
      if (!selectedService) {
        setErrors({ service: "Bitte wählen Sie einen Service aus" });
        handleFormError({ service: "Missing service" });
        return false;
      }
      return true;
    }

    if (stepNumber === 2) {
      try {
        bookingSchema.parse({
          ...formData,
          service: selectedService,
        });
        setErrors({});
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const newErrors: Partial<Record<keyof BookingFormData, string>> = {};
          error.errors.forEach((err) => {
            if (err.path[0]) {
              newErrors[err.path[0] as keyof BookingFormData] = err.message;
            }
          });
          setErrors(newErrors);
          handleFormError(newErrors);
        }
        return false;
      }
    }
    return false;
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;
    setIsLoading(true);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          service: selectedService,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Ein Fehler ist aufgetreten");
      }

      // Calculate time spent
      const timeSpent = startTime
        ? Math.floor((Date.now() - startTime) / 1000)
        : 0;

      posthog.people.set({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        $initial_service: selectedService,
      });

      posthog.capture("booking_submitted", {
        service: selectedService,
        hasPhone: !!formData.phone,
        timeToComplete: timeSpent,
        stepsCompleted: step,
        formStarted: !!startTime,
      });

      // Track conversion
      posthog.capture("$convert", {
        service: selectedService,
        timeToConvert: timeSpent,
      });

      clearSavedData("booking-form");
      setIsSubmitted(true);
      setStartTime(null);

      toast({
        title: "Erfolg!",
        description: data.message,
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description:
          error instanceof Error
            ? error.message
            : "Etwas ist schief gelaufen. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedServiceDetails = serviceTypes
    .flatMap((cat) => cat.options)
    .find((service) => service.value === selectedService);

  if (isInitializing) {
    return (
      <section
        id="booking"
        className="py-24 bg-gradient-to-br from-garden-background via-white to-garden-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-garden-primary text-center mb-16">
              <span className="relative">
                Jetzt Termin buchen
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-garden-accent hidden md:block" />
              </span>
            </h2>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-16 flex justify-center items-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-garden-primary rounded-full animate-[bounce_0.7s_infinite]" />
                    <div className="w-3 h-3 bg-garden-primary rounded-full animate-[bounce_0.7s_0.1s_infinite]" />
                    <div className="w-3 h-3 bg-garden-primary rounded-full animate-[bounce_0.7s_0.2s_infinite]" />
                  </div>
                  <p className="text-garden-secondary">
                    Formular wird geladen...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="booking"
      className="py-24 bg-gradient-to-br from-garden-background via-white to-garden-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-garden-primary text-center mb-16">
            <span className="relative">
              {isSubmitted ? "Vielen Dank!" : "Jetzt Termin buchen"}
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
                    {step > 1 || isSubmitted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      "1"
                    )}
                  </div>
                  <span>Service wählen</span>
                </div>
              </div>
              <div className="flex-1 p-4 text-center text-garden-primary">
                <div className="flex items-center justify-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isSubmitted
                        ? "bg-garden-primary text-white"
                        : "bg-gray-200"
                    }`}>
                    {isSubmitted ? <Check className="w-5 h-5" /> : "2"}
                  </div>
                  <span>Kontakt</span>
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
                    Ihre Anfrage wurde erfolgreich gesendet
                  </h3>
                  <p className="text-garden-secondary mb-8">
                    Wir werden uns in Kürze bei Ihnen melden, um einen passenden
                    Termin zu vereinbaren.
                  </p>
                  <Button
                    onClick={() => {
                      setStep(1);
                      setSelectedCategory("");
                      setSelectedService("");
                      setIsSubmitted(false);
                      setFormData({
                        service: "",
                        name: "",
                        email: "",
                        phone: "",
                        message: "",
                      });
                    }}
                    className="bg-garden-primary hover:bg-garden-accent text-white px-8 py-4 rounded-xl transition-all duration-300">
                    Neue Anfrage
                  </Button>
                </div>
              ) : (
                <>
                  {step === 1 ? (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-lg font-playfair text-garden-primary">
                          Kategorie
                        </Label>
                        <Select
                          value={selectedCategory}
                          onValueChange={setSelectedCategory}>
                          <SelectTrigger className="w-full text-lg p-6">
                            <SelectValue placeholder="Wählen Sie eine Kategorie" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceTypes.map((category) => (
                              <SelectItem
                                key={category.category}
                                value={category.category}>
                                {category.category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {selectedCategory && (
                        <div className="space-y-3">
                          <Label className="text-lg font-playfair text-garden-primary">
                            Service
                          </Label>
                          <div className="grid gap-4">
                            {serviceTypes
                              .find((cat) => cat.category === selectedCategory)
                              ?.options.map((service) => (
                                <div
                                  key={service.value}
                                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                                    selectedService === service.value
                                      ? "border-garden-primary bg-garden-primary/5"
                                      : "border-transparent bg-gray-50 hover:bg-gray-100"
                                  }`}
                                  onClick={() =>
                                    setSelectedService(service.value)
                                  }>
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium">
                                      {service.label}
                                    </span>
                                    <span className="text-garden-primary font-medium">
                                      {service.price}
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      <Button
                        onClick={handleContinue}
                        disabled={!selectedService}
                        className="w-full mt-8 bg-garden-primary hover:bg-garden-accent text-white text-lg p-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                        Weiter
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-garden-background/20 p-4 rounded-lg">
                        <p className="font-medium">Gewählter Service:</p>
                        <p className="text-garden-primary">
                          {selectedServiceDetails?.label}
                        </p>
                        <p className="text-sm text-garden-secondary">
                          {selectedServiceDetails?.price}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label
                            htmlFor="name"
                            className="text-lg font-playfair text-garden-primary">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                name: e.target.value,
                              });
                              if (errors.name) validateStep(2);
                            }}
                            placeholder="Max Mustermann"
                            className={`text-lg p-6 ${errors.name ? "border-red-500" : ""}`}
                            required
                          />
                          {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div className="space-y-3">
                          <Label
                            htmlFor="email"
                            className="text-lg font-playfair text-garden-primary">
                            E-Mail
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              });
                              if (errors.email) validateStep(2);
                            }}
                            placeholder="max@beispiel.de"
                            className={`text-lg p-6 ${errors.email ? "border-red-500" : ""}`}
                            required
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label
                          htmlFor="phone"
                          className="text-lg font-playfair text-garden-primary">
                          Téléphone (optionnel)
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="06 12 34 56 78"
                          className="text-lg p-6"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm">{errors.phone}</p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label
                          htmlFor="message"
                          className="text-lg font-playfair text-garden-primary">
                          Ihre Nachricht
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            });
                            if (errors.message) validateStep(2);
                          }}
                          placeholder="Beschreiben Sie Ihr Anliegen..."
                          className={`min-h-[120px] text-lg p-6 ${errors.message ? "border-red-500" : ""}`}
                          required
                        />
                        {errors.message && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label className="block">Bilder (optional)</Label>
                        <div
                          className={`border-2 border-dashed rounded-xl p-6 transition-colors
                          ${images.length < 10 ? "cursor-pointer hover:border-garden-accent" : ""}
                          ${errors.images ? "border-red-500" : "border-gray-300"}`}>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            id="image-upload"
                            onChange={(e) => {
                              if (e.target.files) {
                                const newFiles = Array.from(e.target.files);
                                const totalImages =
                                  images.length + newFiles.length;
                                if (totalImages > 10) {
                                  toast({
                                    title: "Zu viele Bilder",
                                    description:
                                      "Sie können maximal 10 Bilder hochladen",
                                    variant: "destructive",
                                  });
                                  return;
                                }
                                setImages((prev) => [...prev, ...newFiles]);
                                setFormData((prev) => ({
                                  ...prev,
                                  images: [...(prev.images || []), ...newFiles],
                                }));
                              }
                            }}
                          />
                          <label
                            htmlFor="image-upload"
                            className="flex flex-col items-center gap-2">
                            <Upload
                              className={`w-8 h-8 ${images.length < 10 ? "text-garden-primary" : "text-gray-400"}`}
                            />
                            <div className="text-center">
                              <p className="text-sm font-medium text-garden-primary">
                                {images.length < 10 ? (
                                  <>Klicken Sie hier, um Bilder hochzuladen</>
                                ) : (
                                  <span className="text-gray-400">
                                    Maximale Anzahl an Bildern erreicht
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-garden-secondary mt-1">
                                JPG, PNG oder GIF (max. 10 Bilder)
                              </p>
                            </div>
                          </label>
                        </div>

                        {/* Image Preview Grid */}
                        {images.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                            {images.map((image, index) => (
                              <div
                                key={index}
                                className="relative aspect-square group">
                                <div className="w-full h-full rounded-lg overflow-hidden border border-gray-200">
                                  <Image
                                    src={URL.createObjectURL(image)}
                                    alt={`Vorschau ${index + 1}`}
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
                                    setFormData((prev) => ({
                                      ...prev,
                                      images: (prev.images || []).filter(
                                        (_, i) => i !== index
                                      ),
                                    }));
                                  }}
                                  className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-red-50 transition-colors">
                                  <X className="w-4 h-4 text-red-500" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {images.length > 0 && (
                          <p className="text-sm text-garden-secondary">
                            {images.length} von 10 Bildern ausgewählt
                          </p>
                        )}
                      </div>

                      <Button
                        onClick={handleSubmit}
                        disabled={isLoading || Object.keys(errors).length > 0}
                        className="w-full mt-8 bg-garden-primary hover:bg-garden-accent text-white text-lg p-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <LoadingDots />
                          </div>
                        ) : (
                          <>
                            Anfrage senden
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
