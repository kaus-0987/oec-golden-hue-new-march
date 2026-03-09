"use client";
import React, { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  Clock,
  MessageCircle,
  MapPin,
  Loader2,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ajaxCall from "@/helpers/ajaxCall";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be at least 10 digits")
    .required("Phone number is required"),
  country_interested: yup.string().required("Please select a country"),
  interested_intake: yup.string().required("Please select an intake"),
  current_education: yup
    .string()
    .required("Please select your education level"),
  enquiry_details: yup
    .string()
    .required("Please enter your message")
    .min(10, "Must be at least 10 characters"),
});

const FormInput = ({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-gray-700 font-semibold mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      id={name}
      type={type}
      {...register(name)}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-lg border ${
        error ? "border-red-500" : "border-gray-300"
      } text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition`}
      aria-invalid={error ? "true" : "false"}
    />
    {error && (
      <p className="mt-1 text-sm text-red-600" role="alert">
        {error.message}
      </p>
    )}
  </div>
);

const FormSelect = ({ label, name, register, error, children }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-gray-700 font-semibold mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <select
      id={name}
      {...register(name)}
      className={`w-full px-4 py-3 rounded-lg border ${
        error ? "border-red-500" : "border-gray-300"
      } text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition appearance-none`}
      aria-invalid={error ? "true" : "false"}
    >
      {children}
    </select>
    {error && (
      <p className="mt-1 text-sm text-red-600" role="alert">
        {error.message}
      </p>
    )}
  </div>
);

const FormTextarea = ({ label, name, register, error, placeholder }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-gray-700 font-semibold mb-2">
      {label}
    </label>
    <textarea
      id={name}
      {...register(name)}
      placeholder={placeholder}
      rows="4"
      className={`w-full px-4 py-3 rounded-lg border ${
        error ? "border-red-500" : "border-gray-300"
      } text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition`}
      aria-invalid={error ? "true" : "false"}
    />
    {error && (
      <p className="mt-1 text-sm text-red-600" role="alert">
        {error.message}
      </p>
    )}
  </div>
);

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState({
    countries: true,
    branches: true,
  });
  const [error, setError] = useState({ countries: null, branches: null });
  const [branches, setBranches] = useState([]);
  const [countries, setCountries] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [expandedBranch, setExpandedBranch] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [countryResponse, branchResponse] = await Promise.all([
          ajaxCall("/academics/academics/countries/", { method: "GET" }),
          ajaxCall("/branches/branches/", { method: "GET" }),
        ]);

        setCountries(countryResponse.data?.results || []);
        const branchData = branchResponse.data?.results || [];
        setBranches(branchData);

        if (branchData.length > 0) {
          const mainBranch = branchData.find((branch) => branch.is_main_branch);
          setExpandedBranch(mainBranch ? mainBranch.id : branchData[0].id);
        }
      } catch (e) {
        console.error("Error fetching initial data:", e);
        setError({
          countries: "Could not load countries.",
          branches: "Could not load branch locations.",
        });
      } finally {
        setIsLoading({ countries: false, branches: false });
      }
    };

    fetchInitialData();
  }, []);

  const toggleBranch = (branchId) => {
    setExpandedBranch(expandedBranch === branchId ? null : branchId);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await ajaxCall("/enquiry/enquiries/", {
        method: "POST",
        data,
      });
      if (response.status === 201 || response.status === 200) {
        setFormSubmitted(true);
        reset();
      } else {
        throw new Error("An unexpected error occurred.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setSubmitError(
          "Please review your input. Some fields may be incorrect."
        );
      } else {
        setSubmitError(
          "Submission failed. Please check your connection and try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnotherInquiry = () => {
    setFormSubmitted(false);
    setSubmitError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white mt-20 py-20 md:py-32 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact Our Study Abroad Experts
          </h1>
          <p className="text-white text-xl md:text-2xl max-w-4xl mx-auto">
            Begin your international education adventure. Reach out to our
            expert counselors for tailored advice and support.
          </p>
        </div>
      </header>

      <main>
        <section className="py-16 bg-gray-50" aria-labelledby="contact-methods">
          <div className="max-w-7xl mx-auto px-4">
            <h2 id="contact-methods" className="sr-only">
              Contact Methods
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                <a
                  href="tel:+919327581167"
                  className="text-amber-700 hover:text-primary-600 transition-colors block mb-2"
                >
                  +91 93275 81167
                </a>
                <p className="text-gray-500 text-sm">Mon-Sat: 9 AM - 8 PM</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">WhatsApp</h3>
                <a
                  href="https://wa.me/919327581167"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 hover:text-green-600 transition-colors block mb-2"
                >
                  +91 93275 81167
                </a>
                <p className="text-gray-500 text-sm">24/7 Quick Support</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                <a
                  href="mailto:uk@oecdubai.com"
                  className="text-amber-700 hover:text-blue-600 transition-colors block mb-2"
                >
                  uk@oecdubai.com
                </a>
                <p className="text-gray-500 text-sm">Response within 2 hours</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Emergency</h3>
                <a
                  href="tel:+919876543212"
                  className="text-amber-700 hover:text-primary-600 transition-colors block mb-2"
                >
                  +91 98765 43212
                </a>
                <p className="text-gray-500 text-sm">
                  24/7 for current students
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="py-16 bg-white"
          aria-labelledby="consultation-section"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                id="consultation-section"
                className="text-3xl font-bold text-amber-900 mb-4"
              >
                Our Branches & Free Consultation
              </h2>
              <p className="text-lg text-amber-700 max-w-3xl mx-auto">
                Find our nearest branch or book a virtual consultation to start
                your study abroad journey today.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white">
                    <h3 className="text-xl font-semibold flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Our Branch Locations
                    </h3>
                  </div>
                  {isLoading.branches ? (
                    <div className="flex justify-center items-center p-8">
                      <Loader2 className="h-8 w-8 text-primary-600 animate-spin" />
                    </div>
                  ) : error.branches ? (
                    <div className="p-4 text-center text-red-600 bg-red-50">
                      <p>{error.branches}</p>
                    </div>
                  ) : (
                    <div className="p-2 space-y-2">
                      {branches.map((branch) => (
                        <div
                          key={branch.id}
                          className="bg-white rounded-lg border border-gray-200"
                        >
                          <button
                            onClick={() => toggleBranch(branch.id)}
                            aria-expanded={expandedBranch === branch.id}
                            className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-100 transition-colors rounded-lg"
                          >
                            <span className="font-medium text-black">
                              {branch.name}
                              {branch.is_main_branch && (
                                <span className="ml-2 bg-secondary-200 text-secondary-800 text-xs px-2 py-1 rounded-full">
                                  Main
                                </span>
                              )}
                            </span>
                            {expandedBranch === branch.id ? (
                              <ChevronUp className="h-5 w-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            )}
                          </button>
                          {expandedBranch === branch.id && (
                            <div className="p-4 pt-0">
                              <p className="text-amber-700 mb-3 whitespace-pre-line border-t border-gray-200 pt-3">
                                {branch.address}
                              </p>
                              <div className="space-y-2">
                                {branch.phone && (
                                  <div className="flex items-center text-sm">
                                    <Phone className="h-4 w-4 text-white mr-2 flex-shrink-0" />
                                    <a
                                      href={`tel:${branch.phone}`}
                                      className="text-amber-700 hover:text-primary-600"
                                    >
                                      {branch.phone}
                                    </a>
                                  </div>
                                )}
                                {branch.email && (
                                  <div className="flex items-center text-sm">
                                    <Mail className="h-4 w-4 text-white mr-2 flex-shrink-0" />
                                    <a
                                      href={`mailto:${branch.email}`}
                                      className="text-amber-700 hover:text-primary-600"
                                    >
                                      {branch.email}
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-gray-50 rounded-xl shadow-md p-6 md:p-8">
                  {formSubmitted ? (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-6 rounded-lg text-center">
                      <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                      <p>Your inquiry has been submitted successfully.</p>
                      <p>Our team will be in touch with you shortly.</p>
                      <button
                        onClick={handleAnotherInquiry}
                        className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        Make Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                      <h3 className="text-2xl font-semibold text-amber-900 mb-6 flex items-center">
                        <MessageCircle className="h-6 w-6 mr-2" />
                        Book Your Free Consultation
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                        <FormInput
                          label="Full Name"
                          name="name"
                          register={register}
                          error={errors.name}
                          placeholder="Your full name"
                        />
                        <FormInput
                          label="Email Address"
                          name="email"
                          type="email"
                          register={register}
                          error={errors.email}
                          placeholder="you@example.com"
                        />
                        <FormInput
                          label="Phone Number"
                          name="phone"
                          type="tel"
                          register={register}
                          error={errors.phone}
                          placeholder="Your phone number"
                        />

                        <FormSelect
                          label="Country of Interest"
                          name="country_interested"
                          register={register}
                          error={errors.country_interested}
                        >
                          <option value="">Select a Country</option>
                          {countries.map((country) => (
                            <option key={country.id} value={country.id}>
                              {country.name}
                            </option>
                          ))}
                        </FormSelect>

                        <FormSelect
                          label="Preferred Intake"
                          name="interested_intake"
                          register={register}
                          error={errors.interested_intake}
                        >
                          <option value="">Select an Intake</option>
                          <option value="spring">Spring (Jan-Mar)</option>
                          <option value="summer">Summer (Apr-Jun)</option>
                          <option value="fall">Fall (Sep-Nov)</option>
                          <option value="winter">Winter (Dec-Feb)</option>
                          <option value="not-sure">Not Sure</option>
                        </FormSelect>

                        <FormSelect
                          label="Current Education Level"
                          name="current_education"
                          register={register}
                          error={errors.current_education}
                        >
                          <option value="">Select Education</option>
                          <option value="high_school">High School</option>
                          <option value="bachelors_ongoing">
                            Bachelor's (Ongoing)
                          </option>
                          <option value="bachelors_completed">
                            Bachelor's (Completed)
                          </option>
                          <option value="masters_ongoing">
                            Master's (Ongoing)
                          </option>
                          <option value="masters_completed">
                            Master's (Completed)
                          </option>
                          <option value="other">Other</option>
                        </FormSelect>
                      </div>

                      <FormTextarea
                        label="Message"
                        name="enquiry_details"
                        register={register}
                        error={errors.enquiry_details}
                        placeholder="Tell us more about your study plans or any specific questions you have."
                      />

                      <div className="text-center mt-6">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full md:w-auto bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 hover:bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 disabled:bg-primary-300 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            "Submit Inquiry"
                          )}
                        </button>
                        {submitError && (
                          <div
                            className="mt-4 text-red-600 bg-red-100 border border-red-300 rounded-lg p-3 flex items-center justify-center text-sm"
                            role="alert"
                          >
                            <AlertTriangle className="h-5 w-5 mr-2" />
                            {submitError}
                          </div>
                        )}
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactUs;
