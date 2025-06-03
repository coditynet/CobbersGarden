import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import db from "@/server/db";
import { news } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import EditForm from "./EditForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title is required" }),
  content: z.string().min(2, { message: "Content is required" }),
  image: z
    .string()
    .url({ message: "Image must be a valid URL" })
    .optional()
    .or(z.literal("")),
  link: z
    .string()
    .url({ message: "Link must be a valid URL" })
    .optional()
    .or(z.literal("")),
});

async function updateNews(formData: FormData) {
  "use server";
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const id = Number(formData.get("id"));
  const values = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    image: formData.get("image") as string,
    link: formData.get("link") as string,
  };

  const parsed = formSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error("Invalid form data");
  }

  await db
    .update(news)
    .set({
      title: parsed.data.title,
      content: parsed.data.content,
      image: parsed.data.image || null,
      link: parsed.data.link || null,
    })
    .where(eq(news.id, id));

  revalidatePath("/admin/news");
  redirect("/admin/news");
}

export default async function EditNewsPage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  const newsItem = await db
    .select()
    .from(news)
    .where(eq(news.id, Number(params.id)))
    .then((res) => res[0]);

  if (!newsItem) {
    notFound();
  }

  // Ensure required fields are not null
  if (!newsItem.title || !newsItem.content) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/news"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to News
        </Link>
      </div>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Edit News</h1>
          <EditForm newsItem={newsItem} updateNews={updateNews} />
        </div>
      </div>
    </div>
  );
}
