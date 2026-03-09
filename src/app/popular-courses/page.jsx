import React from "react";
import Courses from "@/components/courses/Courses";

export const metadata = {
  title: "Best Courses to Study Abroad - Career-Focused Programs | OEC Dubai",
  description:
    "Explore high-demand courses like Engineering, MBA, Medicine & more with OEC Dubai’s guidance on top universities abroad.",
  openGraph: {
    title: "Best Courses to Study Abroad - Career-Focused Programs | OEC Dubai",
    description:
      "Explore high-demand courses like Engineering, MBA, Medicine & more with OEC Dubai’s guidance on top universities abroad.",
    images: [
      {
        url: "https://oecdubai.com/oec.png",
        width: 800,
        height: 600,
        alt: "OEC Dubai",
      },
    ],
    siteName: "OEC Dubai",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Courses to Study Abroad - Career-Focused Programs | OEC Dubai",
    description:
      "Explore high-demand courses like Engineering, MBA, Medicine & more with OEC Dubai’s guidance on top universities abroad.",
    images: [
      {
        url: "https://oecdubai.com/oec.png",
        width: 800,
        height: 600,
        alt: "OEC Dubai",
      },
    ],
  },
};

const PopularCourses = () => {
  return <Courses />;
};

export default PopularCourses;
