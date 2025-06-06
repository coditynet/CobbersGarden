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
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { DatePicker } from "@/components/ui/DatePicker";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title is required" }),
  content: z.string().min(2, { message: "Content is required" }),
  image: z.string().url({ message: "Image must be a valid URL" }).optional().or(z.literal("")),
  link: z.string().url({ message: "Link must be a valid URL" }).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewsCreatePage() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", content: "", image: "", link: "" },
  });

  async function onSubmit(values: FormValues) {
    const ok = await createNews(values);
    if (ok) router.push("/admin/news");
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
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Create News</h1>
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
                    <Textarea 
                      placeholder="News content" 
                      rows={5} 
                      className="resize-none"
                      {...field} 
                    />
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
          <FormField control={form.control} name="content" render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                    {/* <DatePicker
                      selected={field.value ? new Date(field.value) : null} />
                      */}
                      </FormControl>
            </FormItem>
          )} />
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/news")}
                >
                  Cancel
                </Button>
                <Button type="submit">Create News</Button>
              </div>
        </form>
      </Form>
        </div>
      </div>
    </div>
  );
} 