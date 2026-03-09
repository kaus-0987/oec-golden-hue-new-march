import React from "react";
import ajaxCall from "@/helpers/ajaxCall";
import BlogDetails from "@/components/blogs/BlogDetails";

// Generate static params for blog posts
export async function generateStaticParams() {
  // Return empty array for now - can be populated with actual blog slugs if needed
  return [];
}

export const generateMetadata = async ({ params }) => {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post was not found",
    };
  }

  try {
    const { data: blog } = await ajaxCall(`/blog/blog/posts/${slug}/`, {
      method: "GET",
    });
    return {
      title: blog?.meta_title,
      description: blog?.meta_description,
      openGraph: {
        title: blog?.meta_title,
        description: blog?.meta_description,
        images: [
          {
            url: blog?.featured_image,
            alt: blog?.featured_image || blog?.meta_title,
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
        title: blog?.meta_title,
        description: blog?.meta_description,
        images: [
          {
            url: blog?.featured_image,
            alt: blog?.featured_image || blog?.meta_title,
            width: 800,
            height: 600,
          },
        ],
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      title: "Blog Post",
      description: "Read our latest blog post",
    };
  }
};

const BlogDetail = async ({ params }) => {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return <div>Blog Not Found</div>;
  }

  const { data: blog } = await ajaxCall(`/blog/blog/posts/${slug}/`, {
    method: "GET",
  });

  const getBlogSchema = () => {
    if (!blog) return null;

    return {
      "@context": "https://schema.org",
      "@type": "Article",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://oecdubai.com/blog/${slug}`,
      },
      headline: blog?.meta_title,
      description: blog?.meta_description,
      image: blog?.featured_image,
      author: {
        "@type": "Person",
        name: blog?.author_name,
      },
      publisher: {
        "@type": "Organization",
        name: "OEC Dubai",
        logo: {
          "@type": "ImageObject",
          url: "https://oecdubai.com/oec.png",
        },
      },
      datePublished: blog?.published_at,
    };
  };

  const blogSchema = getBlogSchema();

  return (
    <>
      {blogSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
      )}
      <BlogDetails slug={slug} />
    </>
  );
};

export default BlogDetail;
