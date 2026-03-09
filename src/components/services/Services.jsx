"use client";
import React, { useState, useEffect } from "react";
import {
  FileText,
  Plane,
  Star,
  Users,
  Globe,
  Award,
  ArrowRight,
  Check,
  ChevronDown,
  DollarSign,
  GraduationCap,
  University,
  IdCard,
  Briefcase,
} from "lucide-react";
import FAQSection from "./faqs/Faqs";
import ajaxCall from "@/helpers/ajaxCall";
import FinancialCalculator from "./financialCalculator/financialCalculator";
import Link from "next/link";

const features = [
  {
    title: "Expert Guidance",
    description:
      "Our team includes former admissions officers, visa specialists, and education experts dedicated to your success.",
  },
  {
    title: "Comprehensive Services",
    description:
      "From university selection to post-graduation support, we provide end-to-end assistance for your study abroad journey.",
  },
  {
    title: "Proven Success",
    description:
      "With over a decade of experience and 95%+ visa success rate, we have helped thousands of students achieve their dreams.",
  },
  {
    title: "Personalized Support",
    description:
      "We understand that each student is unique and provide personalized guidance tailored to your specific goals and needs.",
  },
];

const slugToIdMap = [
  "university-selection",
  "visa-assistance",
  "application-support",
  "test-preparation",
  "scholarship-guidance",
  "pre-departure-briefing",
  "career-counseling",
  "education-loans",
];

const serviceIcons = {
  matching: University,
  application: FileText,
  visa: IdCard,
  financial: DollarSign,
  predeparture: Plane,
  support: GraduationCap,
  scholarship: Award,
  career: Briefcase,
};

const ExpandableSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl mb-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left bg-primary-50 hover:bg-primary-100 transition-colors flex items-center justify-between"
      >
        <h3 className="text-lg font-semibold text-amber-900">{title}</h3>
        <ChevronDown
          className={`w-5 h-5 text-primary-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="p-6 text-amber-700 bg-white">{children}</div>}
    </div>
  );
};

const renderKeyPoints = (htmlString) => {
  if (typeof window === "undefined") {
    return null;
  }
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;

  const listItems = tempDiv.querySelectorAll("li");

  return (
    <ul className="space-y-3">
      {Array.from(listItems).map((item, index) => (
        <li key={index} className="flex items-start">
          <Check className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
          <span className="text-gray-700">{item.textContent}</span>
        </li>
      ))}
    </ul>
  );
};

const ServicesSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-9 w-32 bg-gray-300 rounded-full"></div>
      ))}
    </div>

    <div className="h-[400px] mb-12 rounded-xl bg-gray-300"></div>

    <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="h-8 w-1/2 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="bg-gray-200 p-6 rounded-xl">
          <div className="h-6 w-1/3 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-4">
            <div className="h-5 w-full bg-gray-300 rounded"></div>
            <div className="h-5 w-full bg-gray-300 rounded"></div>
            <div className="h-5 w-full bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="text-center p-6 bg-white rounded-xl shadow-sm"
        >
          <div className="w-10 h-10 bg-gray-300 rounded-full mx-auto mb-3"></div>
          <div className="h-8 w-1/2 bg-gray-300 rounded mx-auto mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-300 rounded mx-auto"></div>
        </div>
      ))}
    </div>

    <div className="bg-primary-50 rounded-2xl p-8">
      <div className="h-8 w-1/3 bg-gray-300 rounded mx-auto mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="h-6 w-1/2 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-300 rounded mt-2"></div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <div className="w-56 h-14 bg-gray-300 rounded-full inline-block"></div>
      </div>
    </div>
  </div>
);

const Services = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [servicesData, setServicesData] = useState([]);
  const [bannerImages, setBannerImages] = useState({});
  const [bannerTitles, setBannerTitles] = useState({});
  const [servicesList, setServicesList] = useState([]);
  const [activeSection, setActiveSection] = useState("university-selection");
  const [bannerDescriptions, setBannerDescriptions] = useState({});

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall("/services/services/", {
          method: "GET",
        });

        if (response?.data?.results?.length > 0) {
          const servicesFromApi = response.data.results;
          setServicesData(servicesFromApi);

          const processedServices = [];
          const images = {};
          const titles = {};
          const descriptions = {};

          const defaultBannerImages = {
            "university-selection":
              "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop",
            "visa-assistance":
              "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
            "application-support":
              "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
            "test-preparation":
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
            "scholarship-guidance":
              "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=800&h=400&fit=crop",
            "pre-departure-briefing":
              "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop",
            "career-counseling":
              "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop",
            "education-loans":
              "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
          };

          servicesFromApi.forEach((service) => {
            const serviceId = slugToIdMap[service.slug] || service.slug;

            processedServices.push({
              id: serviceId,
              name: service.name,
              icon: serviceIcons[serviceId] || FileText,
            });

            images[serviceId] =
              service.image || defaultBannerImages[service.slug];
            titles[serviceId] = service.meta_title || service.name;
            descriptions[serviceId] =
              service.meta_description || service.short_description;
          });

          setServicesList(processedServices);
          setBannerImages(images);
          setBannerTitles(titles);
          setBannerDescriptions(descriptions);
        } else {
          setServicesData([]);
        }
      } catch (error) {
        console.log("Error fetching services:", error);
        setServicesData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    setIsVisible(true);
    const savedService = localStorage.getItem("activeEducationService");
    if (savedService) {
      setActiveSection(savedService);
    }
  }, []);

  const handleServiceChange = (serviceId) => {
    setActiveSection(serviceId);
    localStorage.setItem("activeEducationService", serviceId);
  };

  const getActiveServiceData = () => {
    return servicesData.find(
      (service) =>
        slugToIdMap[service.slug] === activeSection ||
        service.slug === activeSection
    );
  };

  const renderContent = () => {
    const activeService = getActiveServiceData();
    if (!activeService) return null;

    return (
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-amber-900 mb-4">
              {activeService.name}
            </h3>
            <div
              className="text-amber-700 mb-6 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: activeService.description }}
            />
            {activeService.notes && (
              <div className="flex items-center text-secondary-600 font-semibold mb-2">
                <Star className="w-5 h-5 mr-2" />
                <div
                  dangerouslySetInnerHTML={{ __html: activeService.notes }}
                />
              </div>
            )}
          </div>
          <div className="bg-primary-50 p-6 rounded-xl">
            <h4 className="font-semibold text-amber-900 mb-4">
              Key Features:
            </h4>
            {activeService.key_points &&
              renderKeyPoints(activeService.key_points)}
          </div>
        </div>
        {activeSection === "education-loans" && (
          <div className="mb-8">
            <FinancialCalculator />
          </div>
        )}
        <ExpandableSection title="How It Works">
          <div
            className="text-amber-700"
            dangerouslySetInnerHTML={{ __html: activeService.description }}
          />
        </ExpandableSection>
        <ExpandableSection title="Additional Information">
          <div
            className="text-amber-700"
            dangerouslySetInnerHTML={{
              __html: activeService.notes,
            }}
          />
        </ExpandableSection>
        <FAQSection activeSection={activeSection} />
      </div>
    );
  };

  const achievements = [
    {
      number: "50,000+",
      label: "Students Placed Globally",
      icon: <Users size={28} />,
    },
    {
      number: "500+",
      label: "Partner Universities",
      icon: <Award size={28} />,
    },
    { number: "50+", label: "Countries Covered", icon: <Globe size={28} /> },
    { number: "15+", label: "Years of Excellence", icon: <Star size={28} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white mt-20 mb-20 py-20 md:py-32 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Complete Study Abroad Solutions
          </h1>
          <p className="text-white text-xl md:text-2xl max-w-4xl mx-auto">
            From university selection to career guidance - we support you at
            every step of your study abroad journey
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        {isLoading ? (
          <ServicesSkeleton />
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {servicesList.map((service) => (
                <button
                  key={service.id}
                  className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 text-sm ${
                    activeSection === service.id
                      ? "bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 text-amber-900"
                      : "bg-white text-amber-700 border border-primary-800 shadow-lg"
                  }`}
                  onClick={() => handleServiceChange(service.id)}
                >
                  <service.icon className="w-4 h-4 mr-2 text-secondary-500" />
                  {service.name}
                </button>
              ))}
            </div>

            <div className="relative h-[400px] mb-12 rounded-xl overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src={bannerImages[activeSection]}
                  alt="Banner"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
              </div>

              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-6">
                  <div
                    className={`transform transition-all duration-500 ${
                      isVisible
                        ? "translate-x-0 opacity-100"
                        : "translate-x-10 opacity-0"
                    }`}
                  >
                    <h2 className="text-4xl font-bold text-white mb-4">
                      {bannerTitles[activeSection]}
                    </h2>
                    <p className="text-xl text-white/90 max-w-2xl">
                      {bannerDescriptions[activeSection]}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
              {renderContent()}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-white rounded-xl shadow-sm"
                >
                  <div className="text-secondary-500 mb-3 flex justify-center">
                    {achievement.icon}
                  </div>
                  <div className="text-3xl font-bold text-amber-700 mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-amber-700">{achievement.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-primary-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-8 text-center text-amber-900">
                Why Choose OEC Dubai?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm"
                  >
                    <h3 className="text-xl font-semibold mb-4 text-amber-700">
                      {feature.title}
                    </h3>
                    <p className="text-amber-700">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/contact-us"
                  className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white hover:bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 font-bold py-4 px-8 rounded-full inline-flex items-center transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Start Your Journey Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Services;
