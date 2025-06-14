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

interface NewsViewSheetProps {
  title: string;
  content: string;
  createdAt: Date | null;
  image: string | null;
  link: string | null,
}

export function Preview({ title, content, createdAt, image, link }: NewsViewSheetProps) {
  
  return (
    <Sheet>
      <SheetTrigger>
        <Button className="p-2 rounded transition-colors" title="Voir" variant={"ghost"}>
          <Eye className="text-yellow-600 mb-4 hover:text-yellow-900"/>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            Créé: {createdAt?.toLocaleString()}
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">{content}</div>
        <div className="py-4">
          {image && <img src={image} alt={title} />}
        </div>
        <div>
          <Link href={link ?? ""}><Button className={`${link ? "block" : "hidden"}`}>Appuyer</Button></Link>
        </div>
        <SheetFooter>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}