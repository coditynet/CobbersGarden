"use client";

import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useState } from "react";

interface NewsViewSheetProps {
  title: string;
  content: string;
  createdAt: Date | null;
  image: string | null;
  link: string | null,
}

export function Preview({ title, content, createdAt, image, link }: NewsViewSheetProps) {
  const [Lin, setLink] = useState("");
  
  return (
    <Sheet>
      <SheetTrigger>
        <Button className="p-2 rounded hover:bg-yellow-200 transition-colors" title="View" variant={"ghost"}>
          <Eye className="w-5 h-5 text-yellow-900" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            Created: {createdAt?.toLocaleString()}
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">{content}</div>
        <div className="py-4">
          {image && <img src={image} alt={title} />}
        </div>
        <div>
          <Link href={link ?? ""}><Button className={`${link ? "block" : "hidden"}`}>Click</Button></Link>
        </div>
        <SheetFooter>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}