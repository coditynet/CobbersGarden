'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { useEffect } from 'react';
import { useCookieConsent } from '@/store/cookieConsent';

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug();
    },
    autocapture: false, // We'll enable this only after consent
  });
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  const { analytics, hasInteracted } = useCookieConsent();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Only enable PostHog if user has consented
    if (hasInteracted) {
      if (analytics) {
        posthog.opt_in_capturing();
      } else {
        posthog.opt_out_capturing();
      }
    }
  }, [analytics, hasInteracted]);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
} 