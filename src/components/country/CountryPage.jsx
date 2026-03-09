"use client";
import React, { useEffect, useState } from "react";
import News from "./News";
import Blogs from "./Blogs";
import Courses from "./Courses";
import ajaxCall from "@/helpers/ajaxCall";
import { BookOpenCheck, GraduationCap, Newspaper } from "lucide-react";

const ShimmerEffect = () => (
  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-300/50 to-transparent"></div>
);

const Skeleton = ({ className }) => (
  <div
    className={`relative overflow-hidden bg-gray-200 rounded-md ${className}`}
  >
    <ShimmerEffect />
  </div>
);

const HeaderSkeleton = () => (
  <div className="bg-gray-700 mt-20 mb-10 py-20 md:py-32 text-center">
    <div className="max-w-7xl mx-auto px-4">
      <Skeleton className="h-12 w-1/2 mx-auto mb-4" />
      <Skeleton className="h-20 w-32 mx-auto" />
    </div>
  </div>
);

const TabsSkeleton = () => (
  <div className="flex flex-wrap justify-center gap-3">
    {Array.from({ length: 4 }).map((_, i) => (
      <Skeleton key={i} className="h-10 w-28 rounded-full" />
    ))}
  </div>
);

const InfoCardSkeleton = () => (
  <div className="bg-gray-200 p-5 rounded-xl flex items-center gap-4 relative overflow-hidden">
    <Skeleton className="w-12 h-12 rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-5 w-3/4" />
    </div>
    <ShimmerEffect />
  </div>
);

const ContentSkeleton = () => (
  <div className="bg-gray-200 p-8 rounded-xl relative overflow-hidden">
    <div className="space-y-4">
      <Skeleton className="h-6 w-1/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
    <ShimmerEffect />
  </div>
);

const tabs = [
  { id: "overview", name: "Overview", icon: GraduationCap },
  { id: "blogs", name: "Blogs", icon: Newspaper },
  { id: "courses", name: "Courses", icon: BookOpenCheck },
  { id: "latest-news", name: "Latest News", icon: Newspaper },
];

const RenderHtmlContent = ({ html }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="prose prose-lg max-w-none text-gray-700"
    />
  );
};

const CountryPage = ({ normalCountry }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [countryData, setCountryData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await ajaxCall("/academics/academics/countries/", {
          method: "GET",
        });
        if (response?.data?.results?.length > 0) {
          const data = response.data.results.find(
            (country) => country.name === normalCountry
          );
          setCountryData(data);
        } else {
          setCountryData({});
        }
      } catch (error) {
        setCountryData({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, [normalCountry]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <HeaderSkeleton />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <TabsSkeleton />
        </div>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <InfoCardSkeleton key={i} />
            ))}
          </div>
          <ContentSkeleton />
        </main>
      </div>
    );
  }

  if (!countryData) {
    return (
      <div className="text-center py-40">
        <h1 className="text-3xl font-bold text-red-600">Country Not Found</h1>
        <p className="text-gray-500 mt-2">
          The requested country could not be found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <header className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white mt-20 mb-10 py-20 md:py-32 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {countryData.name}
          </h1>
          <img
            src={countryData.flag_image}
            alt={`${countryData.name} flag`}
            className="h-20 w-auto mx-auto rounded-lg shadow-lg"
          />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-wrap justify-center gap-3">
          {tabs.map(({ id, name, icon: Icon }) => (
            <button
              key={id}
              className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 text-sm ${
                activeTab === id
                  ? "bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white"
                  : "bg-white text-amber-900 border border-primary-800 shadow"
              }`}
              onClick={() => setActiveTab(id)}
            >
              <Icon className="w-4 h-4 mr-2 text-white" />
              {name}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === "overview" && (
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <RenderHtmlContent html={countryData.description} />
          </div>
        )}
        {activeTab === "blogs" && <Blogs country={normalCountry} />}
        {activeTab === "courses" && <Courses country={normalCountry} />}
        {activeTab === "latest-news" && (
          <News activeTab={activeTab} countryData={countryData} />
        )}
      </main>
    </div>
  );
};

export default CountryPage;
