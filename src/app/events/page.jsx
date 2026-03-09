import React from "react";
import Events from "@/components/events/Events";

export const metadata = {
  title: "Upcoming Study Abroad Events & Webinars | OEC Dubai",
  description:
    "Join OEC Dubai’s free study abroad webinars, university fairs, and expert sessions for the latest updates on overseas education.",
  openGraph: {
    title: "Upcoming Study Abroad Events & Webinars | OEC Dubai",
    description:
      "Join OEC Dubai’s free study abroad webinars, university fairs, and expert sessions for the latest updates on overseas education.",
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
    title: "Upcoming Study Abroad Events & Webinars | OEC Dubai",
    description:
      "Join OEC Dubai’s free study abroad webinars, university fairs, and expert sessions for the latest updates on overseas education.",
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

const EventsPage = () => {
  return <Events />;
};

export default EventsPage;
