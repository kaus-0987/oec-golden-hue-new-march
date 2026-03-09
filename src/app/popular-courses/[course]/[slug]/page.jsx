import React from "react";
import CourseDetail from "@/components/courses/CourseDetail";
import ajaxCall from "@/helpers/ajaxCall";

// Generate static params for static export
export async function generateStaticParams() {
  return [];
}

export const generateMetadata = async ({ params }) => {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return {
      title: "Course Not Found",
      description: "The requested course was not found",
    };
  }

  try {
    const { data: course } = await ajaxCall(
      `/academics/academics/courses/${slug}/`,
      {
        method: "GET",
      }
    );
    return {
      title: course?.meta_title,
      description: course?.meta_description,
      openGraph: {
        title: course?.meta_title,
        description: course?.meta_description,
        images: [
          {
            url: "https://oecdubai.com/oec.png",
            alt: course?.meta_title,
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
        title: course?.meta_title,
        description: course?.meta_description,
        images: [
          {
            url: "https://oecdubai.com/oec.png",
            alt: course?.meta_title,
            width: 800,
            height: 600,
          },
        ],
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      title:
        "Best Courses to Study Abroad - Career-Focused Programs | OEC Dubai",
      description:
        "Explore high-demand courses like Engineering, MBA, Medicine & more with OEC Dubai’s guidance on top universities abroad.",
    };
  }
};

const CourseDetailsPage = async ({ params }) => {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return <div>Course Not Found</div>;
  }
  return <CourseDetail slug={slug} />;
};

export default CourseDetailsPage;
