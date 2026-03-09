import React from "react";
import ContactUs from "@/components/contactUs/ContactUs";

export const metadata = {
  title: "Contact OEC Dubai - Get Free Study Abroad Consultation",
  description:
    "Need help studying abroad? Contact OEC Dubai today for free counseling on universities, visas, and scholarships for the UK, USA, Canada & more.",
  openGraph: {
    title: "Contact OEC Dubai - Get Free Study Abroad Consultation",
    description:
      "Need help studying abroad? Contact OEC Dubai today for free counseling on universities, visas, and scholarships for the UK, USA, Canada & more.",
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
    title: "Contact OEC Dubai - Get Free Study Abroad Consultation",
    description:
      "Need help studying abroad? Contact OEC Dubai today for free counseling on universities, visas, and scholarships for the UK, USA, Canada & more.",
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

const ContactUsPage = () => {
  return <ContactUs />;
};

export default ContactUsPage;
