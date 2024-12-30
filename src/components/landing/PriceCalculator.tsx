import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PriceCalculator = () => {
  const [size, setSize] = useState("");
  const basePrice = 35;
  const pricePerSqm = 0.5;

  const calculatePrice = () => {
    const sqm = parseFloat(size);
    if (isNaN(sqm)) return basePrice;
    return basePrice + (sqm * pricePerSqm);
  };

  return (
    <section className="py-24 bg-garden-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-playfair font-bold text-garden-primary text-center mb-8">
            Berechnen Sie Ihren Preis
          </h2>
          <div className="space-y-6">
            <div>
              <Label htmlFor="size" className="text-lg text-garden-primary mb-2">
                Wie groß ist Ihre Rasenfläche?
              </Label>
              <div className="flex gap-4">
                <Input
                  id="size"
                  type="number"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="z.B. 200"
                  className="text-lg"
                />
                <span className="flex items-center text-garden-secondary">m²</span>
              </div>
            </div>
            <div className="bg-garden-background/50 p-6 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-lg text-garden-primary">Geschätzter Preis:</span>
                <span className="text-2xl font-bold text-garden-primary">
                  {calculatePrice().toFixed(2)}€
                </span>
              </div>
            </div>
            <Button className="w-full bg-garden-primary hover:bg-garden-accent text-white text-lg py-6">
              Jetzt buchen
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator; 