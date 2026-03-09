import React from "react";
import Resources from "@/components/resources/Resources";

export const metadata = {
  title: "Free Study Abroad Resources - Guides & Checklists | OEC Dubai",
  description:
    "Download free study abroad resources, including admission checklists, visa documents, and scholarship guides from OEC Dubai.",
  openGraph: {
    title: "Free Study Abroad Resources - Guides & Checklists | OEC Dubai",
    description:
      "Download free study abroad resources, including admission checklists, visa documents, and scholarship guides from OEC Dubai.",
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
    title: "Free Study Abroad Resources - Guides & Checklists | OEC Dubai",
    description:
      "Download free study abroad resources, including admission checklists, visa documents, and scholarship guides from OEC Dubai.",
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

const Resourcespage = () => {
  return <Resources />;
};

export default Resourcespage;
