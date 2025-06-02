import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import db from "@/server/db";
import { news } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import EditForm from "./EditForm";

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

export default async function NewsEditPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  const item = await db.query.news.findFirst({ where: eq(news.id, id) });
  if (!item) notFound();

  return <EditForm initial={item} id={id} updateNews={updateNews} />;
}
