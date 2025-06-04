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

interface NewsViewSheetProps {
  title: string;
  content: string;
  createdAt: Date | null;
  image: string | null;
}

export function Preview({ title, content, createdAt, image }: NewsViewSheetProps) {
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
        <SheetFooter>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}