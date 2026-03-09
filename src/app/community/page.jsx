import React from "react";
import Community from "@/components/community/Community";

export const metadata = {
  title: "Study Abroad Community - Connect & Learn | OEC Dubai",
  description:
    "Join the OEC Dubai Study Abroad Community to connect with fellow aspirants, share experiences, and get expert guidance on universities, visas, and global education trends.",
  openGraph: {
    title: "Study Abroad Community - Connect & Learn | OEC Dubai",
    description:
      "Join the OEC Dubai Study Abroad Community to connect with fellow aspirants, share experiences, and get expert guidance on universities, visas, and global education trends.",
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
    title: "Study Abroad Community - Connect & Learn | OEC Dubai",
    description:
      "Join the OEC Dubai Study Abroad Community to connect with fellow aspirants, share experiences, and get expert guidance on universities, visas, and global education trends.",
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

const Communitypage = () => {
  return <Community />;
};

export default Communitypage;
