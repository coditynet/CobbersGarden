import { SignedOut } from "@clerk/nextjs";
import AdminNavbar from "@/components/admin/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <SignedOut>
        <div className="flex h-screen items-center justify-center">
          <p className="text-gray-600">Please sign in to access the admin area</p>
        </div>
      </SignedOut>
      <div className="relative">
        <AdminNavbar />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
        </main>
      </div>
    </div>
  );
} 