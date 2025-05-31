import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import db from "@/server/db";
import { news } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title is required" }),
  content: z.string().min(2, { message: "Content is required" }),
  image: z.string().url({ message: "Image must be a valid URL" }).optional().or(z.literal("")),
  link: z.string().url({ message: "Link must be a valid URL" }).optional().or(z.literal("")),
});

async function updateNews(id: number, values: any) {
  const parsed = formSchema.safeParse(values);
  if (!parsed.success) return false;
  await db.update(news).set({
    title: parsed.data.title,
    content: parsed.data.content,
    image: parsed.data.image || null,
    link: parsed.data.link || null,
  }).where(eq(news.id, id));
  return true;
}

export default async function NewsEditPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const item = await db.query.news.findFirst({ where: eq(news.id, id) });
  if (!item) notFound();

  // This is a server component, so we need to pass initial values to a client form
  return (
    <EditForm initial={item} id={id} />
  );
}

function EditForm({ initial, id }: { initial: any, id: number }) {
  "use client";
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initial.title,
      content: initial.content,
      image: initial.image || "",
      link: initial.link || "",
    },
  });

  async function onSubmit(values: any) {
    const ok = await updateNews(id, values);
    if (ok) redirect("/admin/news");
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow border border-yellow-200">
      <h1 className="text-2xl font-bold mb-6 text-yellow-900">Edit News</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="News title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="content" render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="News content" rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="image" render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="link" render={({ field }) => (
            <FormItem>
              <FormLabel>Link (optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <Button type="submit" className="w-full bg-yellow-400 text-yellow-900 hover:bg-yellow-300">Save</Button>
        </form>
      </Form>
    </div>
  );
} 