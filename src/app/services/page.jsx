import React from "react";
import Services from "@/components/services/Services";

export const metadata = {
  title:
    "Study Abroad Services - OEC Dubai’s Expert Overseas Education Support",
  description:
    "OEC Dubai offers end-to-end study abroad services, including university selection, visa assistance, scholarship guidance, and IELTS coaching for global education.",
  openGraph: {
    title:
      "Study Abroad Services - OEC Dubai’s Expert Overseas Education Support",
    description:
      "OEC Dubai offers end-to-end study abroad services, including university selection, visa assistance, scholarship guidance, and IELTS coaching for global education.",
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
    title:
      "Study Abroad Services - OEC Dubai’s Expert Overseas Education Support",
    description:
      "OEC Dubai offers end-to-end study abroad services, including university selection, visa assistance, scholarship guidance, and IELTS coaching for global education.",
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

const Servicespage = () => {
  return <Services />;
};

export default Servicespage;
