"use client";
import React from "react";
import Link from "next/link";
import {
  Users,
  FileText,
  Edit3,
  GraduationCap,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function StudyAbroadHero() {
  const services = [
    {
      icon: <Users className="w-5 h-5" />,
      title: "Personalised Counselling",
      description:
        "One-on-one sessions to understand your goals and preferences",
      color: "bg-pink-100 text-pink-600",
      borderColor: "border-pink-200",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Profile Building",
      description: "Enhance your academic and extracurricular profile",
      color: "bg-blue-100 text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      icon: <Edit3 className="w-5 h-5" />,
      title: "Application Guidance",
      description: "Expert help with essays, recommendations, and forms",
      color: "bg-primary-100 text-primary-600",
      borderColor: "border-primary-200",
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      title: "Visa Assistance",
      description:
        "Comprehensive support for visa documentation and interviews",
      color: "bg-orange-100 text-orange-600",
      borderColor: "border-orange-200",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: "Financial Planning",
      description: "Scholarship and loan guidance for your education",
      color: "bg-indigo-100 text-indigo-600",
      borderColor: "border-indigo-200",
    },
  ];

  // Animation variants
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

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white">
      <div className="container mx-auto px-4 py-12 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 lg:space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="bg-secondary-500 bg-clip-text text-transparent">
                  Stress-Free Study
                </span>
                <br />
                <span>Abroad Applications:</span>
                <br />
                <span className="bg-secondary-500 bg-clip-text text-transparent">
                  Expert Guidance Awaits
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-white-100 leading-relaxed">
                Get expert study abroad counselling and assistance with your
                application process. Our team of professionals will provide you
                with personalized support and guidance every step of the way.
              </p>
            </motion.div>

            <Link href="/services">
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-white text-amber-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Our Services
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </motion.button>
            </Link>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 top-0 h-full w-0.5 bg-secondary-500"></div>

            <div className="space-y-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-12"
                >
                  <div
                    className={`absolute left-6 top-6 -ml-2.5 w-5 h-5 rounded-full ${service.color.replace(
                      "bg-",
                      "bg-"
                    )} border-2 ${service.borderColor} z-10`}
                  ></div>

                  <div
                    className={`p-6 rounded-xl shadow-lg border ${service.borderColor} bg-gray-800 hover:bg-gray-700 transition-colors duration-300`}
                  >
                    <div className="flex items-start">
                      <div className={`${service.color} p-3 rounded-lg mr-4`}>
                        {service.icon}
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-semibold text-white">
                            {service.title}
                          </h3>
                        </div>
                        <p className="text-gray-300">{service.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
