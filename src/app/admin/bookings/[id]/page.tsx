"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Check, X, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const services = [
  "Rasenmähen",
  "Heckenschnitt",
  "Gartenpflege",
  "Baumschnitt",
  "Unkrautentfernung",
  "Vertikutieren",
  // Add more services as needed
];

interface BookingDetails {
  id: string;
  service: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: "pending" | "approved" | "declined";
  adminNotes?: string;
  price?: number;
  estimatedDuration?: string;
  createdAt: string;
}

export default function AdminBookingReview() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [adminData, setAdminData] = useState({
    service: "",
    adminNotes: "",
    price: "",
    estimatedDuration: "",
  });

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/admin/bookings/${params.id}`);
        if (!response.ok) throw new Error("Booking not found");
        const data = await response.json();
        setBooking(data);
        setAdminData({
          service: data.service || "",
          adminNotes: data.adminNotes || "",
          price: data.price?.toString() || "",
          estimatedDuration: data.estimatedDuration || "",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Buchung konnte nicht geladen werden",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [params.id]);

  const handleUpdateBooking = async (status: "approved" | "declined") => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/admin/bookings/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...adminData,
          status,
          price: parseFloat(adminData.price),
        }),
      });

      if (!response.ok) throw new Error("Failed to update booking");

      toast({
        title: "Erfolg",
        description: status === "approved" 
          ? "Buchung wurde erfolgreich bestätigt" 
          : "Buchung wurde abgelehnt",
      });

      router.push("/admin/bookings");
    } catch (error) {
      toast({
        title: "Error",
        description: "Änderungen konnten nicht gespeichert werden",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-garden-primary" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-garden-primary mb-4">
            Buchung nicht gefunden
          </h1>
          <Button onClick={() => router.push("/admin/bookings")}>
            Zurück zur Übersicht
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-playfair font-bold text-garden-primary mb-8">
            Buchungsanfrage Review
          </h1>

          {/* Customer Details Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-garden-primary mb-4">
              Kundendetails
            </h2>
            <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Email:</strong> {booking.email}</p>
              {booking.phone && <p><strong>Telefon:</strong> {booking.phone}</p>}
              <p><strong>Eingegangen am:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
            </div>
          </div>

          {/* Service Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-garden-primary mb-4">
              Service Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-garden-secondary mb-2">
                  Service
                </label>
                <Select
                  value={adminData.service}
                  onValueChange={(value) => setAdminData(prev => ({ ...prev, service: value }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Service auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-garden-secondary mb-2">
                  Kundennachricht
                </label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {booking.message}
                </div>
              </div>
            </div>
          </div>

          {/* Price and Duration Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-garden-primary mb-4">
              Preis & Zeitplanung
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-garden-secondary mb-2">
                  Preis (€)
                </label>
                <Input
                  type="number"
                  value={adminData.price}
                  onChange={(e) => setAdminData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="0.00"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-garden-secondary mb-2">
                  Geschätzte Dauer
                </label>
                <Input
                  value={adminData.estimatedDuration}
                  onChange={(e) => setAdminData(prev => ({ ...prev, estimatedDuration: e.target.value }))}
                  placeholder="z.B. 2-3 Stunden"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Admin Notes Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-garden-primary mb-4">
              Interne Notizen
            </h2>
            <Textarea
              value={adminData.adminNotes}
              onChange={(e) => setAdminData(prev => ({ ...prev, adminNotes: e.target.value }))}
              placeholder="Interne Notizen zur Buchung..."
              className="w-full h-32"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              onClick={() => handleUpdateBooking("declined")}
              variant="destructive"
              disabled={isSaving}
              className="w-full sm:w-auto flex items-center justify-center gap-2"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
              Ablehnen
            </Button>
            <Button
              onClick={() => handleUpdateBooking("approved")}
              disabled={isSaving || !adminData.price || !adminData.service}
              className="w-full sm:w-auto bg-garden-primary hover:bg-garden-accent flex items-center justify-center gap-2"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              Bestätigen
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 