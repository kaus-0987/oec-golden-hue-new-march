"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ajaxCall from "@/helpers/ajaxCall";
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  GraduationCap,
  BookOpen,
  Calendar,
} from "lucide-react";

const Header = () => {
  const mobileMenuRef = useRef(null);
  const exploreDropdownRef = useRef(null);
  const [countries, setCountries] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchDropdownData = async () => {
      setIsLoading(true);
      try {
        const [countriesResponse, coursesResponse] = await Promise.all([
          ajaxCall("/academics/academics/countries/", { method: "GET" }),
          ajaxCall("/academics/academics/course-categories/", {
            method: "GET",
          }),
        ]);

        if (countriesResponse?.data?.results?.length > 0) {
          setCountries(countriesResponse.data.results);
        }
        if (coursesResponse?.data?.results?.length > 0) {
          setCourses(coursesResponse.data.results);
        }
      } catch (error) {
        console.error("Failed to fetch dropdown data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDropdownData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        exploreDropdownRef.current &&
        !exploreDropdownRef.current.contains(event.target)
      ) {
        setIsExploreOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        isMobileMenuOpen
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const exploreCards = [
    {
      title: "Explore",
      subtitle: "universities & colleges abroad",
      bgColor: "bg-secondary-500",
      href: "/universities",
      icon: GraduationCap,
    },
    {
      title: "Blogs",
      subtitle: "Study abroad articles & more",
      bgColor: "bg-gray-500",
      href: "/blog",
      icon: BookOpen,
    },
    {
      title: "Events",
      subtitle: "Fairs, webinars & meetups",
      bgColor: "bg-primary-700",
      href: "/events",
      icon: Calendar,
    },
  ];

  const getMenuSections = () => {
    const topCountries = countries.filter((c) => c.university_count > 0);
    const topCourses = courses.filter((c) => c.course_count >= 0);

    return [
      {
        title: "Top Universities",
        subtitle: "Search colleges & universities by country",
        items:
          topCountries.length > 0
            ? [
                ...topCountries.map((country) => ({
                  name: country.name,
                  href: `/universities/${country.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`,
                })),
                { name: "Explore All", href: "/universities" },
              ]
            : [],
      },
      {
        title: "Country Guides",
        subtitle: "What, where, why of education across countries",
        items:
          topCountries.length > 0
            ? [
                ...topCountries.map((country) => ({
                  name: country.name,
                  href: `/country-guides/${country.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`,
                })),
                { name: "Explore All", href: "/country-guides" },
              ]
            : [],
      },
      {
        title: "Popular Courses",
        subtitle: "Course details, structure, pre-reqs & more...",
        items:
          topCourses.length > 0
            ? [
                ...topCourses.map((course) => ({
                  name: course.name,
                  href: `/popular-courses/${course.slug}`,
                })),
                { name: "Explore All", href: "/popular-courses" },
              ]
            : [],
      },
    ];
  };

  const menuSections = getMenuSections();

  const navigationItems = [
    { name: "Services", href: "/services" },
    { name: "Explore", hasDropdown: true },
    { name: "Resources", href: "/resources" },
    { name: "FAQs", href: "/faqs" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-100 shadow-lg" : "bg-white"
      }`}
    >
      <div className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-6">
            <Link
              href="tel:+919876543210"
              className="flex items-center gap-2 hover:text-primary-200 transition-colors text-xs md:text-sm"
            >
              <Phone size={14} />
              <span>+91 93275 81167</span>
            </Link>
            <Link
              href="mailto:uk@oecdubai.com"
              className="flex items-center gap-2 hover:text-primary-200 transition-colors text-xs md:text-sm"
            >
              <Mail size={14} />
              <span>uk@oecdubai.com</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-2 text-primary-100 text-sm">
            <GraduationCap size={16} />
            <span>Aspire. Apply. Achieve.</span>
          </div>
        </div>
      </div>

      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden">
                  <img
                    src="/OEC.png"
                    alt="OEC"
                    className="w-full h-full object-contain"
                  />
                </div>
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navigationItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  ref={item.hasDropdown ? exploreDropdownRef : null}
                >
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setIsExploreOpen(!isExploreOpen)}
                        className="flex items-center gap-1 text-amber-900 hover:text-amber-900 font-medium transition-colors duration-200 py-2"
                      >
                        {item.name}
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            isExploreOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isExploreOpen && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-[90vw] max-w-[900px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-2/5 p-4 md:p-6 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200">
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
                                {exploreCards.map((card, index) => (
                                  <Link
                                    key={index}
                                    href={card.href}
                                    onClick={() => setIsExploreOpen(false)}
                                    className="group flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-all duration-200 border border-gray-200"
                                  >
                                    <div
                                      className={`${card.bgColor} p-2 md:p-3 rounded-lg text-white shadow-sm`}
                                    >
                                      <card.icon size={20} />
                                    </div>
                                    <div>
                                      <h3 className="font-bold text-gray-900 text-base md:text-lg">
                                        {card.title}
                                      </h3>
                                      <p className="text-amber-700 text-xs md:text-sm mt-1">
                                        {card.subtitle}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>

                            <div className="w-full md:w-3/5 flex flex-col md:flex-row">
                              <div className="w-full md:w-1/2 p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-200">
                                <div className="space-y-3">
                                  {menuSections.map((section, index) => (
                                    <div
                                      key={index}
                                      onClick={() => setActiveSection(index)}
                                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                        activeSection === index
                                          ? "bg-primary-50 border border-primary-100"
                                          : "hover:bg-gray-50"
                                      }`}
                                    >
                                      <h3 className="font-semibold text-gray-900 text-base md:text-lg">
                                        {section.title}
                                      </h3>
                                      <p className="text-gray-500 text-xs md:text-sm">
                                        {section.subtitle}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="w-full md:w-1/2 p-4 md:p-6">
                                <div className="space-y-3">
                                  <h3 className="font-semibold text-amber-900 text-base md:text-lg">
                                    {menuSections[activeSection]?.title}
                                  </h3>
                                  {isLoading ? (
                                    <div className="space-y-2">
                                      {[...Array(5)].map((_, i) => (
                                        <div
                                          key={i}
                                          className="h-10 bg-gray-100 rounded-lg animate-pulse"
                                        ></div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="max-h-[300px] overflow-y-auto scrollable-menu pr-2">
                                      <ul className="space-y-2">
                                        {menuSections[
                                          activeSection
                                        ]?.items?.map((item, itemIndex) => (
                                          <li key={itemIndex}>
                                            <Link
                                              href={item.href}
                                              onClick={() =>
                                                setIsExploreOpen(false)
                                              }
                                              className="block px-3 py-2 text-sm md:text-base rounded-lg hover:bg-primary-50 text-gray-700 transition-colors"
                                            >
                                              {item.name}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-amber-900 font-medium transition-colors duration-200 py-2 text-sm md:text-base"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div
          ref={mobileMenuRef}
          className={`lg:hidden bg-white overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-screen opacity-100 shadow-lg"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-3 space-y-2">
            {navigationItems.map((item) => (
              <div
                key={item.name}
                className="border-b border-gray-100 last:border-0"
              >
                {item.hasDropdown ? (
                  <div className="py-3">
                    <button
                      onClick={() => setIsExploreOpen(!isExploreOpen)}
                      className="flex items-center justify-between w-full text-gray-700 font-medium"
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${
                          isExploreOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isExploreOpen && (
                      <div className="mt-2 pl-4 space-y-3">
                        <div className="grid grid-cols-1 gap-3">
                          {exploreCards.map((card, index) => (
                            <Link
                              key={index}
                              href={card.href}
                              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div
                                className={`${card.bgColor} p-2 rounded-lg text-white`}
                              >
                                <card.icon size={18} />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">
                                  {card.title}
                                </h4>
                                <p className="text-amber-700 text-xs mt-1">
                                  {card.subtitle}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        {isLoading ? (
                          <div className="space-y-2">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className="h-10 bg-gray-100 rounded-lg animate-pulse"
                              ></div>
                            ))}
                          </div>
                        ) : (
                          <div className="max-h-[300px] overflow-y-auto scrollable-menu">
                            <ul className="space-y-2">
                              {menuSections[0].items?.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                  <Link
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-3 py-2 text-sm rounded-lg hover:bg-primary-50 text-gray-700 transition-colors"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-3 text-gray-700 hover:text-amber-900 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
