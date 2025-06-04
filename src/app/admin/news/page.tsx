import { Suspense } from "react";
import Link from "next/link";
import { Trash2, Plus, Pencil,} from "lucide-react";
import db from "@/server/db";
import { news } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { eq, desc } from "drizzle-orm";
import { Preview } from "./sheet";

async function deleteNews(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await db.delete(news).where(eq(news.id, parseInt(id)));
  revalidatePath("/admin/news");
}

async function NewsTable() {
  const allNews = await db.select().from(news).orderBy(desc(news.createdAt));
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-yellow-200 rounded-lg bg-white shadow-sm">
        <thead className="bg-yellow-100">
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-yellow-900">
              Title
            </th>
            <th className="px-4 py-2 text-left font-semibold text-yellow-900">
              Created
            </th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {allNews.map((item) => (
            <tr
              key={item.id}
              className="border-b last:border-b-0 hover:bg-yellow-50 transition-colors"
            >
              <td className="px-4 py-2 font-medium text-yellow-900">
                {item.title}
              </td>
              <td className="px-4 py-2 text-yellow-700">
                {item.createdAt?.toLocaleString()}
              </td>
              <td className="px-4 py-2 flex gap-2">
                <Link
                  href={`/admin/news/${item.id}/edit`}
                  className="p-2 rounded hover:bg-yellow-200 transition-colors"
                  title="Edit"
                > 
                  <Pencil className="w-5 h-5 text-yellow-900" />
                </Link>
                <Preview 
                title={item.title ?? "error"}
                content={item.content ?? "error"}
                createdAt={item.createdAt}
                image={item.image}
                />
                <form action={deleteNews}>
                  <input type="hidden" name="id" value={item.id} />
                  <button
                    type="submit"
                    className="p-2 rounded hover:bg-red-100 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </form>
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
        <h1 className="text-2xl font-bold text-yellow-900">News</h1>
        <Link
          href="/admin/news/create"
          className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-yellow-900 font-semibold rounded shadow hover:bg-yellow-300 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create News
        </Link>
      </div>
      <Suspense
        fallback={<div className="text-yellow-700">Loading news...</div>}
      >
        <NewsTable />
      </Suspense>
    </div>
  );
}
