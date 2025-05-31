import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-white">

      <SignedOut>
        <div className="flex h-screen items-center justify-center">
          <p>Please sign in to access the admin area</p>
        </div>
      </SignedOut>
      <div className="relative z-0 p-8 pt-20">
        {/* Admin Navbar */}
        <nav className="mb-8 flex gap-4 border-b border-yellow-300 pb-2">
          <Link href="/admin/news" className="px-4 py-2 rounded-md font-semibold text-yellow-900 bg-yellow-200 border border-yellow-300 shadow-sm hover:bg-yellow-300 transition-colors">News</Link>
          <span className="px-4 py-2 rounded-md font-semibold text-yellow-400 bg-yellow-50 border border-yellow-100 cursor-not-allowed opacity-60">Bookings</span>
          <span className="px-4 py-2 rounded-md font-semibold text-yellow-400 bg-yellow-50 border border-yellow-100 cursor-not-allowed opacity-60">More</span>
        </nav>
        {children}
      </div>
    </div>
  );
} 