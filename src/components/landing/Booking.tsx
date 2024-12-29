"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Booking = () => {
  const [size, setSize] = useState("");
  const [date, setDate] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Buchung eingegangen",
      description: "Wir werden uns in Kürze bei Ihnen melden.",
    });
  };

  return (
    <section id="booking" className="py-24 bg-gradient-to-br from-garden-background via-white to-garden-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-5xl font-playfair font-bold text-garden-primary text-center mb-16 relative">
            <span className="relative z-10">Jetzt Termin buchen</span>
            <div className="absolute w-24 h-2 bg-garden-accent bottom-0 left-1/2 transform -translate-x-1/2" />
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8 bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-xl">
            <div className="space-y-3">
              <Label htmlFor="size" className="text-lg font-playfair text-garden-primary">Rasenfläche (m²)</Label>
              <Input
                id="size"
                type="number"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="z.B. 200"
                className="font-inter text-lg p-6 border-garden-primary/20 focus:border-garden-accent transition-colors duration-300"
                required
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="date" className="text-lg font-playfair text-garden-primary">Wunschtermin</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="font-inter text-lg p-6 border-garden-primary/20 focus:border-garden-accent transition-colors duration-300"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-garden-primary hover:bg-garden-accent text-white font-inter text-lg py-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Anfrage senden
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Booking;