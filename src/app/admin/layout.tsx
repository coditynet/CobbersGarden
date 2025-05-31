import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { LogOut, LayoutDashboard } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-white">
      <SignedIn>
        {/* Border and top-left button area */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
          <div className="absolute top-0 left-0 w-full h-full border-2 border-yellow-400" style={{boxSizing: 'border-box'}} />
          <div className="absolute  top-0 left-0 flex items-start">
            <div className="flex flex-col gap-2 items-center justify-center bg-yellow-400 rounded-br-2xl rounded-tl-xl shadow-md p-3 mt-[-2px] ml-[-2px] pointer-events-auto z-20">
              <Link href="/admin" className="hover:bg-yellow-300 rounded-full p-2 transition-colors" title="Dashboard">
                <LayoutDashboard className="w-6 h-6 text-yellow-900" />
              </Link>
              <SignOutButton>
                <button className="hover:bg-yellow-300 rounded-full p-2 transition-colors">
                  <LogOut className="w-6 h-6 text-yellow-900" />
                </button>
              </SignOutButton>
            </div>
          </div>
        </div>
      </SignedIn>
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