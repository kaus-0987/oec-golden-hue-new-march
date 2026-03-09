import React from "react";
import StepperCollegeFinder from "@/components/aiCollegeFinder/StepperCollegeFinder";

export const metadata = {
  title: "AI College Finder | OEC Dubai",
  description:
    "Discover the best universities for your study abroad dream with OEC Dubai's AI-powered college finder.",
  openGraph: {
    title: "AI College Finder | OEC Dubai",
    description:
      "Discover the best universities for your study abroad dream with OEC Dubai's AI-powered college finder.",
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
    title: "AI College Finder | OEC Dubai",
    description:
      "Discover the best universities for your study abroad dream with OEC Dubai's AI-powered college finder.",
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

const AICollegeFinderPage = () => {
  return <StepperCollegeFinder />;
};

export default AICollegeFinderPage;
