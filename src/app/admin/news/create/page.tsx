"use client";
import { useRouter } from "next/navigation";
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
import { createNews } from "./server";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title is required" }),
  content: z.string().min(2, { message: "Content is required" }),
  image: z.string().url({ message: "Image must be a valid URL" }).optional().or(z.literal("")),
  link: z.string().url({ message: "Link must be a valid URL" }).optional().or(z.literal("")),
});

export default function NewsCreatePage() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", content: "", image: "", link: "" },
  });

  async function onSubmit(values) {
    const ok = await createNews(values);
    if (ok) router.push("/admin/news");
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow border border-yellow-200">
      <h1 className="text-2xl font-bold mb-6 text-yellow-900">Create News</h1>
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
          <Button type="submit" className="w-full bg-yellow-400 text-yellow-900 hover:bg-yellow-300">Create</Button>
        </form>
      </Form>
    </div>
  );
} 