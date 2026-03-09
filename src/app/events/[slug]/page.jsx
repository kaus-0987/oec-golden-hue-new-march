import React from "react";
import EventDetails from "@/components/events/EventDetails";
import ajaxCall from "@/helpers/ajaxCall";

// Generate static params for events
export async function generateStaticParams() {
  return [];
}

export const generateMetadata = async ({ params }) => {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return {
      title: "Event Not Found | OEC Dubai",
      description: "The requested event was not found on OEC Dubai.",
    };
  }

  try {
    const { data: event } = await ajaxCall(`/events/events/events/${slug}/`, {
      method: "GET",
    });
    return {
      title: event?.meta_title,
      description: event?.meta_description,
      openGraph: {
        title: event?.meta_title,
        description: event?.meta_description,
        images: [
          {
            url: event?.featured_image,
            alt: event?.featured_image || event?.meta_title,
            width: 800,
            height: 600,
          },
        ],
        siteName: "OEC Dubai",
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: event?.meta_title,
        description: event?.meta_description,
        images: [
          {
            url: event?.featured_image,
            alt: event?.featured_image || event?.meta_title,
            width: 800,
            height: 600,
          },
        ],
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      title: "Upcoming Study Abroad Events & Webinars | OEC Dubai",
      description: "Check out our events and webinars for study abroad.",
    };
  }
};

const EventDetailPage = async ({ params }) => {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return <div>Event Not Found</div>;
  }
  return <EventDetails slug={slug} />;
};

export default EventDetailPage;
