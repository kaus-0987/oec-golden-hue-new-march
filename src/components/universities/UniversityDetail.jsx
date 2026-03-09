"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ajaxCall from "@/helpers/ajaxCall";
import {
  MapPin,
  Star,
  Building,
  Award,
  Calendar,
  PoundSterling,
  Mail,
  Phone,
  ExternalLink,
  BookOpen,
  ChevronLeft,
  Library,
  ClipboardList,
  Globe,
  Home,
  Clock,
  CreditCard,
} from "lucide-react";
import { motion } from "framer-motion";

const UniversityDetail = ({ slug }) => {
  const [university, setUniversity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUniversity = async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall(
          `/academics/academics/universities/${slug}/`,
          {
            method: "GET",
          }
        );

        if (response?.data) {
          setUniversity(response.data);
        } else {
          setError("University not found");
        }
      } catch (error) {
        console.log("Error fetching university:", error);
        setError("Failed to load university data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUniversity();
  }, [slug]);

  const formatTuitionFee = (min, max) => {
    if (!min && !max) return "N/A";
    if (min && max) return `£${min} - £${max}`;
    return min ? `From £${min}` : `Up to £${max}`;
  };

  const formatEstablishedYear = (year) => {
    if (!year) return "";
    const currentYear = new Date().getFullYear();
    const yearsOld = currentYear - year;
    return `Established ${year} (${yearsOld}+ years)`;
  };

  const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    return `£${parseFloat(amount).toLocaleString()}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-gray-200 rounded w-3/4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-96 bg-gray-200 rounded-xl"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-full"></div>
                <div className="h-6 bg-gray-200 rounded w-5/6"></div>
                <div className="h-6 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-64 bg-gray-200 rounded-xl"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 py-12"
      >
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          <h3 className="font-bold text-lg mb-1">Error</h3>
          <p>{error}</p>
          <Link
            href="/universities"
            className="mt-3 inline-flex items-center text-primary-600 hover:text-amber-900 font-medium transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to universities
          </Link>
        </div>
      </motion.div>
    );
  }

  if (!university) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 py-12"
      >
        <div className="bg-primary-50 border border-primary-200 text-amber-900 px-4 py-3 rounded-lg">
          <h3 className="font-bold text-lg mb-1">University Not Found</h3>
          <p>The requested university could not be found.</p>
          <Link
            href="/universities"
            className="mt-3 inline-flex items-center text-primary-600 hover:text-amber-900 font-medium transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to universities
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gray-50"
    >
      <header className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white mt-20 py-20 md:py-32 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative"
          >
            <div className="relative z-10">
              <h1 className="text-3xl md:text-5xl font-bold mb-2">
                {university.name}
              </h1>
              <div className="flex items-center text-lg text-secondary-400">
                <MapPin className="h-5 w-5 mr-2" />
                <span>
                  {university.city && `${university.city}, `}
                  {university.country_name}
                  {university.state && `, ${university.state}`}
                </span>
              </div>
            </div>

            {university.logo && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="w-32 h-32 bg-white rounded-full p-2 shadow-xl border-4 border-white/20 relative z-10"
              >
                <img
                  src={university.logo}
                  alt={`${university.name} logo`}
                  width={128}
                  height={128}
                  className="w-full h-full object-contain rounded-full"
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-8">
              {university.banner_image && (
                <motion.div variants={itemVariants}>
                  <div className="rounded-xl overflow-hidden shadow-lg relative h-64 md:h-80">
                    <img
                      src={university.banner_image}
                      alt={`${university.name} campus`}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </motion.div>
              )}

              {university.is_featured && (
                <motion.div
                  variants={itemVariants}
                  className="bg-secondary-500 text-white px-4 py-3 rounded-lg flex items-center shadow-md"
                >
                  <Award className="h-5 w-5 mr-2" />
                  <span className="font-medium">Featured University</span>
                </motion.div>
              )}

              <motion.section variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                  <BookOpen className="h-6 w-6 mr-2 text-white" />
                  About {university.name}
                </h2>
                {university.description ? (
                  <div
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: university.description }}
                  />
                ) : (
                  <p className="text-amber-700">
                    No description available for this university.
                  </p>
                )}
              </motion.section>

              {university.facilities && (
                <motion.section variants={itemVariants}>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                    <Library className="h-6 w-6 mr-2 text-white" />
                    Facilities
                  </h2>
                  <div
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: university.facilities }}
                  />
                </motion.section>
              )}

              {university.admission_requirements && (
                <motion.section variants={itemVariants}>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                    <ClipboardList className="h-6 w-6 mr-2 text-white" />
                    Admission Requirements
                  </h2>
                  <div
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: university.admission_requirements,
                    }}
                  />
                </motion.section>
              )}

              <motion.section variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                  <Globe className="h-6 w-6 mr-2 text-white" />
                  Quick Facts
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center text-gray-500 mb-1">
                      <Home className="h-4 w-4 mr-2 text-white" />
                      <span className="text-sm text-amber-900">Type</span>
                    </div>
                    <p className="text-gray-700 capitalize">
                      {university.university_type || "Not specified"}
                    </p>
                  </div>

                  {university.established_year && (
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex items-center text-gray-500 mb-1">
                        <Clock className="h-4 w-4 mr-2 text-white" />
                        <span className="text-sm text-amber-900">
                          Established
                        </span>
                      </div>
                      <p className="text-gray-700">
                        {formatEstablishedYear(university.established_year)}
                      </p>
                    </div>
                  )}

                  {university.application_fee && (
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex items-center text-gray-500 mb-1">
                        <CreditCard className="h-4 w-4 mr-2 text-white" />
                        <span className="text-sm text-amber-900">
                          Application Fee
                        </span>
                      </div>
                      <p className="text-gray-700">
                        {formatCurrency(university.application_fee)}
                      </p>
                    </div>
                  )}

                  {university.course_count !== undefined && (
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex items-center text-gray-500 mb-1">
                        <BookOpen className="h-4 w-4 mr-2 text-white" />
                        <span className="text-sm text-amber-900">
                          Courses Offered
                        </span>
                      </div>
                      <p className="text-gray-700">
                        {university.course_count > 0
                          ? `${university.course_count}+ courses`
                          : "Not specified"}
                      </p>
                    </div>
                  )}
                </div>
              </motion.section>
            </div>

            <div className="space-y-6">
              <motion.div
                variants={itemVariants}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
              >
                <h3 className="font-semibold text-xl mb-4 text-amber-900 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-white" />
                  University Highlights
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center text-gray-500 mb-1">
                      <Building className="h-4 w-4 mr-2 text-white" />
                      <span className="text-sm text-amber-900">Type</span>
                    </div>
                    <p className="text-gray-700 capitalize">
                      {university.university_type || "Not specified"}
                    </p>
                  </div>

                  {university.established_year && (
                    <div>
                      <div className="flex items-center text-gray-500 mb-1">
                        <Calendar className="h-4 w-4 mr-2 text-white" />
                        <span className="text-sm text-amber-900">
                          Established
                        </span>
                      </div>
                      <p className="text-gray-700">
                        {formatEstablishedYear(university.established_year)}
                      </p>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center text-gray-500 mb-1">
                      <PoundSterling className="h-4 w-4 mr-2 text-white" />
                      <span className="text-sm text-amber-900">
                        Tuition Fees
                      </span>
                    </div>
                    <p className="text-gray-700">
                      {formatTuitionFee(
                        university.tuition_fee_min,
                        university.tuition_fee_max
                      )}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center text-gray-500 mb-1">
                      <CreditCard className="h-4 w-4 mr-2 text-white" />
                      <span className="text-sm text-amber-900">
                        Application Fee
                      </span>
                    </div>
                    <p className="text-gray-700">
                      {formatCurrency(university.application_fee)}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center text-gray-500 mb-1">
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      <span className="text-sm text-amber-900">Rankings</span>
                    </div>
                    {university.ranking_national > 0 && (
                      <p className="text-gray-700 mb-1">
                        National: #{university.ranking_national}
                      </p>
                    )}
                    {university.ranking_global > 0 && (
                      <p className="text-gray-700">
                        Global: #{university.ranking_global}
                      </p>
                    )}
                    {!university.ranking_national &&
                      !university.ranking_global && (
                        <p className="text-gray-500">Not ranked</p>
                      )}
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
              >
                <h3 className="font-semibold text-xl mb-4 text-amber-900 flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-white" />
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {university.address && (
                    <div>
                      <div className="flex items-center text-gray-500 mb-1">
                        <MapPin className="h-4 w-4 mr-2 text-white" />
                        <span className="text-sm text-amber-900">
                          Address
                        </span>
                      </div>
                      <p className="text-gray-700">{university.address}</p>
                    </div>
                  )}

                  {university.email && (
                    <div>
                      <div className="flex items-center text-gray-500 mb-1">
                        <Mail className="h-4 w-4 mr-2 text-white" />
                        <span className="text-sm text-amber-900">Email</span>
                      </div>
                      <a
                        href={`mailto:${university.email}`}
                        className="text-gray-700 hover:text-amber-900 hover:underline transition-colors"
                      >
                        {university.email}
                      </a>
                    </div>
                  )}

                  {university.phone && (
                    <div>
                      <div className="flex items-center text-gray-500 mb-1">
                        <Phone className="h-4 w-4 mr-2 text-white" />
                        <span className="text-sm text-amber-900">Phone</span>
                      </div>
                      <a
                        href={`tel:${university.phone}`}
                        className="text-gray-700 hover:text-amber-900 hover:underline transition-colors"
                      >
                        {university.phone}
                      </a>
                    </div>
                  )}

                  {university.website_url && (
                    <div>
                      <div className="flex items-center text-gray-500 mb-1">
                        <ExternalLink className="h-4 w-4 mr-2 text-white" />
                        <span className="text-sm text-amber-900">
                          Website
                        </span>
                      </div>
                      <a
                        href={university.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-amber-900 hover:underline transition-colors"
                      >
                        {university.website_url.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>

              {university.location_map && (
                <motion.div
                  variants={itemVariants}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
                >
                  <h3 className="font-semibold text-xl mb-4 text-amber-900 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-white" />
                    Location
                  </h3>
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <iframe
                      src={university.location_map}
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    ></iframe>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default UniversityDetail;
