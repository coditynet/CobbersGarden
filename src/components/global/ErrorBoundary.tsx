'use client';

import { Component, ReactNode } from 'react';
import * as Sentry from '@sentry/nextjs';
import { Button } from '@/components/ui/button';
import { Home, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error) {
    Sentry.captureException(error);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-garden-background flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
              <h1 className="text-3xl font-playfair font-bold text-garden-primary mb-4">
                Oops! Etwas ist schief gelaufen
              </h1>
              <p className="text-garden-secondary mb-8">
                Es tut uns leid, aber es ist ein unerwarteter Fehler aufgetreten. 
                Unser Team wurde automatisch benachrichtigt.
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Seite neu laden
                </Button>
                <Link href="/">
                  <Button className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Zur Startseite
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}