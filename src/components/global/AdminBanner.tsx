"use client";

import { SignedIn, SignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";

export default function AdminBanner() {
  return (
    <SignedIn>
      <div className="fixed top-0 left-0 right-0 z-[60] bg-garden-accent/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <span className="font-medium text-garden-primary">Logged in as Admin</span>
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="text-sm font-medium text-garden-primary hover:text-garden-primary/80 transition-colors"
              >
                Dashboard
              </Link>
              <SignOutButton><LogOut /></SignOutButton>
            </div>
          </div>
        </div>
      </div>
    </SignedIn>
  );
} 