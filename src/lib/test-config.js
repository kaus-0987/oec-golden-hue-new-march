import { BookOpen, Star, FilePenLine, Ear } from "lucide-react";
import Reading from "@/components/IELTS/Reading/Reading";
import Writing from "@/components/IELTS/Writing/Writing";
import Listening from "@/components/IELTS/Listening/Listening";

export const testConfig = {
  ielts: {
    title: "IELTS",
    icon: <Star className="h-6 w-6 text-white" />,
  },
};

export const allTestCategories = {
  ielts: {
    reading: {
      title: "Reading",
      slug: "reading",
      description: "Assess your reading comprehension skills.",
      icon: <BookOpen className="h-10 w-10 text-amber-900" />,
    },
    writing: {
      title: "Writing",
      slug: "writing",
      description: "Practice writing tasks and improve your structure.",
      icon: <FilePenLine className="h-10 w-10 text-amber-900" />,
    },
    listening: {
      title: "Listening",
      slug: "listening",
      description: "Sharpen your listening skills with audio exercises.",
      icon: <Ear className="h-10 w-10 text-amber-900" />,
    },
  },
};

export const componentMap = {
  ielts: {
    reading: <Reading />,
    writing: <Writing />,
    listening: <Listening />,
  },
};
