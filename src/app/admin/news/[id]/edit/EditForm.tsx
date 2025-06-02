"use client";

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

type FormData = z.infer<typeof formSchema>;

interface EditFormProps {
  initial: {
    id: number;
    title: string;
    content: string;
    image?: string | null;
    link?: string | null;
  };
  id: number;
  updateNews: (formData: FormData) => Promise<void>;
}

export default function EditForm({ initial, id, updateNews }: EditFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initial.title,
      content: initial.content,
      image: initial.image || "",
      link: initial.link || "",
    },
  });

  async function onSubmit(values: FormData) {
    const formData = new FormData();
    formData.append("id", id.toString());
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("image", values.image || "");
    formData.append("link", values.link || "");

    await updateNews(formData);
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow border border-yellow-200">
      <h1 className="text-2xl font-bold mb-6 text-yellow-900">Edit News</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="News title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="News content" rows={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-yellow-400 text-yellow-900 hover:bg-yellow-300"
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
