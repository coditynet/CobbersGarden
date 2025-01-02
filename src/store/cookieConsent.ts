import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CookieConsent {
  analytics: boolean;
  necessary: boolean;
  timestamp: string | null;
  hasInteracted: boolean;
}

interface CookieConsentStore extends CookieConsent {
  setConsent: (consent: Partial<CookieConsent>) => void;
  resetConsent: () => void;
}

const initialState: CookieConsent = {
  analytics: false,
  necessary: true, // Always true as these are essential
  timestamp: null,
  hasInteracted: false,
};

export const useCookieConsent = create<CookieConsentStore>()(
  persist(
    (set) => ({
      ...initialState,
      setConsent: (consent) =>
        set((state) => ({
          ...state,
          ...consent,
          timestamp: new Date().toISOString(),
          hasInteracted: true,
        })),
      resetConsent: () => set(initialState),
    }),
    {
      name: "cookie-consent",
    },
  ),
);
