"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const formSchema = z.object({
  title: z.string().min(2, { message: "Title is required" }),
  content: z.string().min(2, { message: "Content is required" }),
  image: z.string().url({ message: "Image must be a valid URL" }).optional().or(z.literal("")),
  link: z.string().url({ message: "Link must be a valid URL" }).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

interface EditFormProps {
  newsItem: {
    id: number;
    title: string | null;
    content: string | null;
    image: string | null;
    link: string | null;
    createdAt: Date;
    updatedAt: Date | null;
  };
  updateNews: (formData: FormData) => Promise<void>;
}

export default function EditForm({ newsItem, updateNews }: EditFormProps) {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: newsItem.title || "",
      content: newsItem.content || "",
      image: newsItem.image || "",
      link: newsItem.link || "",
    },
  });

  async function onSubmit(values: FormValues) {
    const formData = new FormData();
    formData.append("id", newsItem.id.toString());
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("image", values.image || "");
    formData.append("link", values.link || "");
    await updateNews(formData);
  }

  return (
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
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/news")}
          >
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}
