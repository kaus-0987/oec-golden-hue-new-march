import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import BottomNavigation from "@/components/ui/BottomNavigation";

export const metadata = {
  title: "OEC Dubai - Best Overseas Education Consultants for Study Abroad",
  description: 
  "OEC Dubai helps students achieve their dream of studying abroad. Get expert guidance on university selection, visas, scholarships & more for the UK, USA, Canada, Australia & Europe.",
  icons: {
    icon: [
      { url: "/oec.png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    shortcut: "/oec.png",
  },
  openGraph: {
    title: "OEC Dubai - Best Overseas Education Consultants for Study Abroad",
    description:
      "OEC Dubai helps students achieve their dream of studying abroad. Get expert guidance on university selection, visas, scholarships & more for the UK, USA, Canada, Australia & Europe.",
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
    title: "OEC Dubai - Best Overseas Education Consultants for Study Abroad",
    description:
      "OEC Dubai helps students achieve their dream of studying abroad. Get expert guidance on university selection, visas, scholarships & more for the UK, USA, Canada, Australia & Europe.",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta
          name="google-site-verification"
          content="BBEJORnmYafy3WXKp8YM_vAEOoWDnJp7kh2XtH4-6LI"
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <BottomNavigation />
      </body>
    </html>
  );
}
