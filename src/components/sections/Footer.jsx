"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ajaxCall from "@/helpers/ajaxCall";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/oecbaroda", name: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/oecdubai", name: "Instagram" },
  { icon: Twitter, href: "https://x.com/oec_india", name: "Twitter" },
];

const company = [
  { name: "Universities", href: "/universities" },
  { name: "Courses", href: "/courses" },
  { name: "Blog & Articles", href: "/blog" },
  { name: "Resources", href: "/resources" },
  { name: "FAQ", href: "/faqs" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact Us", href: "/contact-us" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [services, setServices] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await ajaxCall("/services/services/", {
          method: "GET",
        });

        if (response?.data?.results?.length > 0) {
          setServices(response.data.results);
        } else {
          setServices([]);
        }
      } catch (error) {
        console.log("Error fetching services:", error);
        setServices([]);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await ajaxCall("/academics/academics/countries/", {
          method: "GET",
        });

        if (response?.data?.results?.length > 0) {
          setCountries(response.data.results);
        } else {
          setCountries([]);
        }
      } catch (error) {
        console.log("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <footer
      className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white"
      aria-labelledby="footer-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 id="footer-heading" className="sr-only">
          Footer navigation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden ">
                  <img
                    src="/OEC.png"
                    alt="OEC"
                    className="w-full h-full object-contain"
                  />
                </div>
              </Link>
            </div>
            <p className="text-white mb-4 text-sm">
              Your trusted partner for international education with 10 years of
              experience and 2,000+ successful placements.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Established:</strong> 2015
              </p>
              <p>
                <strong>Students Placed:</strong> 2,000+
              </p>
              <p>
                <strong>Countries:</strong> {countries.length}+
              </p>
              <p>
                <strong>Success Rate:</strong> 95%
              </p>
            </div>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-white hover:text-white transition-colors duration-200"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon size={20} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={"/services"}
                    className="text-white hover:text-white transition-colors duration-200 text-sm"
                    aria-label={`Learn about ${item.name}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Study Destinations</h3>
            <ul className="space-y-2">
              {countries.map((country) => (
                <li key={country.id}>
                  <Link
                    href={`/country-guides/${country.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="text-white hover:text-white transition-colors duration-200 text-sm"
                    aria-label={`Study in ${country.name}`}
                  >
                    Study in {country.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white hover:text-white transition-colors duration-200 text-sm"
                    aria-label={`View ${item.name}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin
                  size={16}
                  className="text-white mt-1 flex-shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-medium">Head Office: Vadodara</p>
                  <p className="text-white">
                    2nd Floor, Prestige Building, Race Course Circle
                    <br />
                    Beside Axis Bank, Vadodara 390007
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone
                  size={16}
                  className="text-white"
                  aria-hidden="true"
                />
                <a href="tel:+919327581167" className="hover:underline">
                  +91 93275 81167, +91 89055 70642
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail
                  size={16}
                  className="text-white"
                  aria-hidden="true"
                />
                <a href="mailto:uk@oecdubai.com" className="hover:underline">
                  uk@oecdubai.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone
                  size={16}
                  className="text-white"
                  aria-hidden="true"
                />
                <a
                  href="tel:+918905570642"
                  className="font-medium text-white hover:underline"
                >
                  Emergency: +91 8905570642
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white mt-12 pt-8 text-center text-sm text-white">
          <p>
            &copy; {currentYear} OEC Dubai. All rights reserved. |{" "}
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link href="/terms-and-conditions" className="hover:text-white">
              Terms & Conditions
            </Link>{" "}
            |{" "}
            <Link href="/disclaimer" className="hover:text-white">
              Disclaimer
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
