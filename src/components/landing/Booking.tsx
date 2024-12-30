"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Check } from "lucide-react";

const serviceTypes = [
  {
    category: "Rasenpflege",
    options: [
      { value: "rasen-standard", label: "Standard Rasenmähen", price: "ab 35€" },
      { value: "rasen-premium", label: "Premium Rasenpflege (inkl. Düngen)", price: "ab 55€" },
      { value: "vertikutieren", label: "Vertikutieren", price: "ab 45€" }
    ]
  },
  {
    category: "Baumpflege",
    options: [
      { value: "baum-schnitt", label: "Baumschnitt", price: "ab 80€" },
      { value: "totholz", label: "Totholzentfernung", price: "ab 95€" },
      { value: "sturmschaden", label: "Sturmschadenbeseitigung", price: "nach Aufwand" }
    ]
  },
  {
    category: "Gartengestaltung",
    options: [
      { value: "neuanlage", label: "Neuanlage Garten", price: "nach Aufwand" },
      { value: "umgestaltung", label: "Umgestaltung", price: "nach Aufwand" },
      { value: "pflanzplan", label: "Pflanzplanung", price: "ab 120€" }
    ]
  }
];

const Booking = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleContinue = () => {
    if (step === 1 && selectedService) {
      setStep(2);
    } else if (step === 2 && email) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Anfrage eingegangen",
      description: "Wir werden uns in Kürze bei Ihnen melden.",
    });
    // Reset form
    setStep(1);
    setSelectedCategory("");
    setSelectedService("");
    setEmail("");
  };

  const selectedServiceDetails = serviceTypes
    .flatMap(cat => cat.options)
    .find(service => service.value === selectedService);

  return (
    <section id="booking" className="py-24 bg-gradient-to-br from-garden-background via-white to-garden-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-garden-primary text-center mb-16">
            <span className="relative">
              Jetzt Termin buchen
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-garden-accent" />
            </span>
          </h2>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Progress Steps */}
            <div className="flex border-b">
              <div className={`flex-1 p-4 text-center ${step >= 1 ? 'text-garden-primary' : 'text-gray-400'}`}>
                <div className="flex items-center justify-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 1 ? 'bg-garden-primary text-white' : 'bg-gray-200'
                  }`}>
                    {step > 1 ? <Check className="w-5 h-5" /> : "1"}
                  </div>
                  <span>Service wählen</span>
                </div>
              </div>
              <div className={`flex-1 p-4 text-center ${step >= 2 ? 'text-garden-primary' : 'text-gray-400'}`}>
                <div className="flex items-center justify-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 2 ? 'bg-garden-primary text-white' : 'bg-gray-200'
                  }`}>
                    2
                  </div>
                  <span>Kontakt</span>
                </div>
              </div>
            </div>

            <div className="p-8">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-lg font-playfair text-garden-primary">
                      Kategorie
                    </Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full text-lg p-6">
                        <SelectValue placeholder="Wählen Sie eine Kategorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((category) => (
                          <SelectItem key={category.category} value={category.category}>
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
                          .find(cat => cat.category === selectedCategory)
                          ?.options.map((service) => (
                            <div
                              key={service.value}
                              className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                                selectedService === service.value 
                                  ? 'border-garden-primary bg-garden-primary/5' 
                                  : 'border-transparent bg-gray-50 hover:bg-gray-100'
                              }`}
                              onClick={() => setSelectedService(service.value)}
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{service.label}</span>
                                <span className="text-garden-primary font-medium">{service.price}</span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="bg-garden-background/20 p-4 rounded-lg">
                    <p className="font-medium">Gewählter Service:</p>
                    <p className="text-garden-primary">{selectedServiceDetails?.label}</p>
                    <p className="text-sm text-garden-secondary">{selectedServiceDetails?.price}</p>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-lg font-playfair text-garden-primary">
                      Ihre E-Mail-Adresse
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="max@beispiel.de"
                      className="text-lg p-6"
                      required
                    />
                  </div>
                </div>
              )}

              <Button
                onClick={handleContinue}
                disabled={step === 1 ? !selectedService : !email}
                className="w-full mt-8 bg-garden-primary hover:bg-garden-accent text-white text-lg p-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                {step === 1 ? "Weiter" : "Anfrage senden"}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;