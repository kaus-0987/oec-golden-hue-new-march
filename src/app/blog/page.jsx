import React from "react";
import Blogs from "@/components/blogs/Blogs";

export const metadata = {
  title: "Study Abroad Blog - Latest Updates & Tips | OEC Dubai",
  description:
    "Stay updated with the latest study abroad news, visa changes, and university admission tips from OEC Dubai’s expert consultants.",
  openGraph: {
    title: "Study Abroad Blog - Latest Updates & Tips | OEC Dubai",
    description:
      "Stay updated with the latest study abroad news, visa changes, and university admission tips from OEC Dubai’s expert consultants.",
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
    title: "Study Abroad Blog - Latest Updates & Tips | OEC Dubai",
    description:
      "Stay updated with the latest study abroad news, visa changes, and university admission tips from OEC Dubai’s expert consultants.",
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

const BlogsPage = () => {
  return <Blogs />;
};

export default BlogsPage;
