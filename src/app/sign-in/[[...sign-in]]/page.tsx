'use client';

import { Button } from '@/components/ui/button';
import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
import Image from 'next/image';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-garden-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <Image
            src="/assets/img/cobbers_logo_full.png"
            alt="Cobbers Garden Logo"
            width={280}
            height={72}
            className="mx-auto mb-8"
          />
          <h1 className="text-2xl font-bold text-garden-primary">Sign in to your account</h1>
        </div>

        <SignIn.Root>

          <SignIn.Step name="start">
            <div className="space-y-4">
              <Clerk.Field name="identifier">
                <Clerk.Label className="block text-sm font-medium text-garden-primary">
                  Username
                </Clerk.Label>
                <Clerk.Input className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-garden-primary shadow-sm focus:border-garden-accent focus:outline-none focus:ring-1 focus:ring-garden-accent" />
                <Clerk.FieldError className="mt-1 text-sm text-red-600" />
              </Clerk.Field>

              <SignIn.Action submit className="w-full rounded-md bg-garden-accent px-4 py-2 text-sm font-medium text-white hover:bg-garden-accent/90 focus:outline-none focus:ring-2 focus:ring-garden-accent focus:ring-offset-2">
                Continue
              </SignIn.Action>
            </div>
          </SignIn.Step>

          <SignIn.Step name="verifications">
            <SignIn.Strategy name="password">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-garden-primary">Enter your password</h2>
                <Clerk.Field name="password">
                  <Clerk.Label className="block text-sm font-medium text-garden-primary">
                    Password
                  </Clerk.Label>
                  <Clerk.Input type="password" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-garden-primary shadow-sm focus:border-garden-accent focus:outline-none focus:ring-1 focus:ring-garden-accent" />
                  <Clerk.FieldError className="mt-1 text-sm text-red-600" />
                </Clerk.Field>
                <div className="flex flex-col space-y-2">
                  <SignIn.Action submit className="w-full rounded-md bg-garden-accent px-4 py-2 text-sm font-medium text-white hover:bg-garden-accent/90 focus:outline-none focus:ring-2 focus:ring-garden-accent focus:ring-offset-2">
                    Sign in
                  </SignIn.Action>
                  <SignIn.Action navigate="forgot-password" className="text-sm text-garden-accent hover:text-garden-accent/80">
                    Forgot password?
                  </SignIn.Action>
                </div>
              </div>
            </SignIn.Strategy>

            <SignIn.Strategy name="reset_password_email_code">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-garden-primary">Check your email</h2>
                <p className="text-sm text-gray-600">
                  We sent a code to <SignIn.SafeIdentifier />.
                </p>
                <Clerk.Field name="code">
                  <Clerk.Label className="block text-sm font-medium text-garden-primary">
                    Email code
                  </Clerk.Label>
                  <Clerk.Input className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-garden-primary shadow-sm focus:border-garden-accent focus:outline-none focus:ring-1 focus:ring-garden-accent" />
                  <Clerk.FieldError className="mt-1 text-sm text-red-600" />
                </Clerk.Field>
                <SignIn.Action submit className="w-full rounded-md bg-garden-accent px-4 py-2 text-sm font-medium text-white hover:bg-garden-accent/90 focus:outline-none focus:ring-2 focus:ring-garden-accent focus:ring-offset-2">
                  Continue
                </SignIn.Action>
                <div className="pt-2">
                  <Link href="/sign-in" passHref legacyBehavior>
                    <Button className="w-full rounded-md bg-white border border-garden-accent text-garden-accent hover:bg-garden-accent/10 focus:outline-none focus:ring-2 focus:ring-garden-accent focus:ring-offset-2">
                      Back to sign in
                    </Button>
                  </Link>
                </div>
              </div>
            </SignIn.Strategy>
          </SignIn.Step>

          <SignIn.Step name="forgot-password">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-garden-primary">Forgot your password?</h2>
              <SignIn.SupportedStrategy name="reset_password_email_code">
                <Button className="w-full rounded-md bg-garden-accent px-4 py-2 text-sm font-medium text-white hover:bg-garden-accent/90 focus:outline-none focus:ring-2 focus:ring-garden-accent focus:ring-offset-2">
                  Reset password
                </Button>
              </SignIn.SupportedStrategy>
              <SignIn.Action navigate="previous">Go back</SignIn.Action>
            </div>
          </SignIn.Step>

          <SignIn.Step name="reset-password">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-garden-primary">Reset your password</h2>
              <Clerk.Field name="password">
                <Clerk.Label className="block text-sm font-medium text-garden-primary">
                  New password
                </Clerk.Label>
                <Clerk.Input type="password" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-garden-primary shadow-sm focus:border-garden-accent focus:outline-none focus:ring-1 focus:ring-garden-accent" />
                <Clerk.FieldError className="mt-1 text-sm text-red-600" />
              </Clerk.Field>
              <Clerk.Field name="confirmPassword">
                <Clerk.Label className="block text-sm font-medium text-garden-primary">
                  Confirm password
                </Clerk.Label>
                <Clerk.Input type="password" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-garden-primary shadow-sm focus:border-garden-accent focus:outline-none focus:ring-1 focus:ring-garden-accent" />
                <Clerk.FieldError className="mt-1 text-sm text-red-600" />
              </Clerk.Field>
              <SignIn.Action submit className="w-full rounded-md bg-garden-accent px-4 py-2 text-sm font-medium text-white hover:bg-garden-accent/90 focus:outline-none focus:ring-2 focus:ring-garden-accent focus:ring-offset-2">
                Reset password
              </SignIn.Action>
            </div>
          </SignIn.Step>
        </SignIn.Root>
      </div>
    </div>
  );
} 