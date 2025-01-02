'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useCookieConsent } from '@/store/cookieConsent';
import { X } from 'lucide-react';

export function CookieBanner() {
  const { analytics, hasInteracted, setConsent } = useCookieConsent();
  const [showDetails, setShowDetails] = useState(false);

  if (hasInteracted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="container mx-auto px-4 py-6">
        {!showDetails ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="text-sm text-garden-secondary flex-1">
              Nous utilisons des cookies pour améliorer votre expérience. 
              En continuant à utiliser ce site, vous acceptez notre{' '}
              <Link href="/privacy" className="text-garden-primary hover:underline">
                politique de confidentialité
              </Link>.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowDetails(true)}
              >
                Personnaliser
              </Button>
              <Button
                onClick={() => setConsent({ analytics: true, hasInteracted: true })}
              >
                Tout accepter
              </Button>
              <Button
                variant="ghost"
                onClick={() => setConsent({ analytics: false, hasInteracted: true })}
              >
                Refuser
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0"
              onClick={() => setShowDetails(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="space-y-6 pt-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">Paramètres des cookies</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Cookies nécessaires</p>
                      <p className="text-sm text-garden-secondary">
                        Requis pour le fonctionnement du site
                      </p>
                    </div>
                    <Switch checked disabled />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Cookies analytiques</p>
                      <p className="text-sm text-garden-secondary">
                        Nous aident à améliorer le site
                      </p>
                    </div>
                    <Switch
                      checked={analytics}
                      onCheckedChange={(checked) => 
                        setConsent({ analytics: checked })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => setConsent({ analytics: false, hasInteracted: true })}
                >
                  Enregistrer les préférences
                </Button>
                <Button
                  onClick={() => setConsent({ analytics: true, hasInteracted: true })}
                >
                  Accepter tout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 