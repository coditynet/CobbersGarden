import { Suspense } from "react";
import Link from "next/link";
import { Trash2, Plus, Pencil } from "lucide-react";
import db from "@/server/db";
import { news } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { eq, desc } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function deleteNews(formData: FormData) {
  "use server";
  const {userId} = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const id = formData.get("id") as string;
  await db.delete(news).where(eq(news.id, parseInt(id)));
  revalidatePath("/admin/news");
}

async function NewsTable() {
  const {userId} = await auth();
  if (!userId) {
    redirect("/");
  }
  const allNews = await db.select().from(news).orderBy(desc(news.createdAt));
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {allNews.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.createdAt?.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/news/${item.id}/edit`}
                    className="text-gray-600 hover:text-gray-900"
                    title="Edit"
                  >
                    <Pencil className="w-5 h-5" />
                  </Link>
                  <form action={deleteNews} className="inline">
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminNewsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">News</h1>
        <Link
          href="/admin/news/create"
          className="inline-flex items-center gap-2 rounded-md bg-garden-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-garden-primary/90 focus:outline-none focus:ring-2 focus:ring-garden-primary focus:ring-offset-2"
        >
          <Plus className="w-5 h-5" />
          Create News
        </Link>
      </div>
      <Suspense
        fallback={<div className="text-gray-600">Loading news...</div>}
      >
        <NewsTable />
      </Suspense>
    </div>
  );
}
