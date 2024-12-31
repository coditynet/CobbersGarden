'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'identified_only',
    // Session recording configuration
    session_recording: {
      maskAllInputs: true, // Mask all input fields
      maskTextSelector: '[data-ph-mask]', // Mask elements with this attribute
      maskNetworkRequestPath: true, // Mask URLs in network requests
      maskNetworkRequestPayload: true, // Mask request payloads
      // Elements to ignore in recording
      ignoreSelector: '[data-ph-ignore]'
    }
  })
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}