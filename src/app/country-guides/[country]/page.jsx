import React from "react";
import ajaxCall from "@/helpers/ajaxCall";
import CountryPage from "@/components/country/CountryPage";

// Generate static params for country guides
export async function generateStaticParams() {
  return [];
}

export const generateMetadata = async ({ params }) => {
  const resolvedParams = await params;
  const country = resolvedParams?.country;
  const normalCountry = country
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  if (!country) {
    return {
      title: "Country Not Found | OEC Dubai",
      description: "The requested country was not found on OEC Dubai.",
    };
  }

  try {
    const { data: country } = await ajaxCall(
      `/academics/academics/countries/`,
      {
        method: "GET",
      }
    );
    const countryData = country.results.find((c) => c.name === normalCountry);
    const meta_title = `Study in ${countryData?.name} - Top Universities & Visa Guidance | OEC Dubai`;
    const meta_description = `Get expert advice on studying in the ${countryData?.meta_description} including top universities, courses, scholarships, and student visa requirements with OEC Dubai.`;

    return {
      title: meta_title,
      description: meta_description,
      openGraph: {
        title: meta_title,
        description: meta_description,
        images: [
          {
            url: countryData?.flag_image,
            alt: countryData?.flag_image || countryData?.name,
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
        title: meta_title,
        description: meta_description,
        images: [
          {
            url: countryData?.flag_image,
            alt: countryData?.flag_image || countryData?.name,
            width: 800,
            height: 600,
          },
        ],
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      title: "Study Abroad with OEC Dubai",
      description:
        "Explore guides, tips, and expert advice for studying abroad with OEC Dubai.",
    };
  }
};

export const Country = async ({ params }) => {
  const resolvedParams = await params;
  const country = resolvedParams?.country;

  if (!country) {
    return <div>Country Not Found</div>;
  }

  const normalCountry = country
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return <CountryPage normalCountry={normalCountry} />;
};

export default Country;
