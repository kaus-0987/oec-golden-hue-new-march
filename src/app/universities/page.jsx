import React from "react";
import Universities from "@/components/universities/Universities";

export const metadata = {
  title: "Top Universities Abroad - Partner Institutions | OEC Dubai",
  description:
    "Discover the best global universities partnered with OEC Dubai for admissions in the UK, USA, Canada, Australia & Europe.",
  openGraph: {
    title: "Top Universities Abroad - Partner Institutions | OEC Dubai",
    description:
      "Discover the best global universities partnered with OEC Dubai for admissions in the UK, USA, Canada, Australia & Europe.",
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
    title: "Top Universities Abroad - Partner Institutions | OEC Dubai",
    description:
      "Discover the best global universities partnered with OEC Dubai for admissions in the UK, USA, Canada, Australia & Europe.",
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

const UniversitiesPage = () => {
  return <Universities />;
};

export default UniversitiesPage;
