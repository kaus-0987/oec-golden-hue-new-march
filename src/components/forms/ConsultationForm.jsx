"use client";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import ajaxCall from "@/helpers/ajaxCall";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  MessageCircle,
  Loader2,
  AlertTriangle,
  X,
  CheckCircle,
} from "lucide-react";

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
  disabled,
}) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 font-semibold mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      id={name}
      type={type}
      {...register(name)}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-4 py-3 rounded-lg border ${
        error ? "border-red-500" : "border-gray-300"
      } text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed`}
    />
    {error && (
      <p className="mt-1 text-sm text-red-600" aria-live="polite">
        {error.message}
      </p>
    )}
  </div>
);

const FormSelect = ({ label, name, register, error, children, disabled }) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 font-semibold mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <select
        id={name}
        {...register(name)}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-lg border ${
          error ? "border-red-500" : "border-gray-300"
        } text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed`}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-600" aria-live="polite">
        {error.message}
      </p>
    )}
  </div>
);

const FormTextarea = ({ label, name, register, error, placeholder }) => (
  <div className="mt-4 mb-4">
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

const ConsultationForm = ({ isOpen, onClose, service, initialEnquiry, defaultCountry, inline = false }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(!inline); // Only load on init for modals
  const [hasInteracted, setHasInteracted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (
      initialEnquiry?.name &&
      initialEnquiry?.university &&
      initialEnquiry?.country &&
      (isOpen || inline)
    ) {
      const message = `I am interested in the "${initialEnquiry.name}" event at ${initialEnquiry.university}. Please provide more details.`;
      setValue("enquiry_details", message);
    }
  }, [initialEnquiry, isOpen, inline, setValue]);

  useEffect(() => {
    // For modal: fetch immediately when opened
    // For inline: fetch only after user interaction
    if (isOpen || (inline && hasInteracted)) {
      setCountriesLoading(true);
      const fetchCountries = async () => {
        try {
          const response = await ajaxCall("/academics/academics/countries/", {
            method: "GET",
          });
          const countriesData = response.data?.results || [];
          setCountries(countriesData);
          
          // Set default country if provided
          if (defaultCountry && countriesData.length > 0) {
            const defaultCountryObj = countriesData.find(
              c => c.name.toLowerCase() === defaultCountry.toLowerCase()
            );
            if (defaultCountryObj) {
              setValue("country_interested", defaultCountryObj.id.toString());
            }
          }
        } catch (e) {
          console.error("Error fetching countries:", e);
        } finally {
          setCountriesLoading(false);
        }
      };
      fetchCountries();
    }
  }, [isOpen, defaultCountry, setValue, inline, hasInteracted]);

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // If there's an event context (initialEnquiry with event name), modify the name field
      const submitData = { ...data };
      if (initialEnquiry?.name && data.name) {
        submitData.name = `${initialEnquiry.name} - ${data.name}`;
      }
      
      const response = await ajaxCall("/enquiry/enquiries/", {
        method: "POST",
        data: submitData,
      });
      if (response.status === 201 || response.status === 200) {
        setIsSuccess(true);
        reset();
        if (service === "Test Prep+") {
          router.push("/test-preparation");
        }
      } else {
        setSubmitError("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setSubmitError(
          "Please check your input; some fields might be invalid."
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

  const handleClose = () => {
    reset();
    setIsSuccess(false);
    setSubmitError(null);
    onClose();
  };

  const handleAnotherInquiry = () => {
    setIsSuccess(false);
    setSubmitError(null);
    reset();
  };

  if (!isOpen && !inline) return null;

  const handleFormInteraction = () => {
    if (inline && !hasInteracted) {
      setHasInteracted(true);
    }
  };

  const innerContent = (
    <div className={inline ? "" : "p-6 md:p-8"}>
      {isSuccess ? (
        <div className="text-center py-12">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-amber-900 mb-2">Thank You!</h3>
          <p className="text-amber-700 mb-6">Your consultation request has been sent. We'll be in touch soon.</p>
          <button onClick={handleAnotherInquiry} className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Book Another</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate onFocus={handleFormInteraction}>
          {!inline && (
            <h3 className="text-2xl font-semibold text-amber-900 mb-6 flex items-center">
              <MessageCircle className="h-6 w-6 mr-3 text-primary-600" />
              Book Your Free Consultation
            </h3>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <FormInput label="Name" name="name" register={register} error={errors.name} placeholder="Your full name" disabled={countriesLoading || isSubmitting} />
            <FormInput label="Email" name="email" type="email" register={register} error={errors.email} placeholder="you@example.com" disabled={countriesLoading || isSubmitting} />
            <FormInput label="Phone" name="phone" type="tel" register={register} error={errors.phone} placeholder="Your phone number" disabled={countriesLoading || isSubmitting} />

            <FormSelect label="Country Interested" name="country_interested" register={register} error={errors.country_interested} disabled={countriesLoading || isSubmitting}>
              <option value="">{countriesLoading ? "Loading countries..." : "Select Country"}</option>
              {!countriesLoading && countries.map((country) => (<option key={country.id} value={country.id}>{country.name}</option>))}
            </FormSelect>

            <FormSelect label="Interested Intake" name="interested_intake" register={register} error={errors.interested_intake} disabled={countriesLoading || isSubmitting}>
              <option value="">Select Intake</option>
              <option value="spring">Spring (January-March)</option>
              <option value="summer">Summer (April-June)</option>
              <option value="fall">Fall (September-November)</option>
              <option value="winter">Winter (December-February)</option>
              <option value="not-sure">Not sure</option>
            </FormSelect>

            <FormSelect label="Current Education" name="current_education" register={register} error={errors.current_education} disabled={countriesLoading || isSubmitting}>
              <option value="">Select Education Level</option>
              <option value="high_school">High School</option>
              <option value="bachelors_ongoing">Bachelor's (Ongoing)</option>
              <option value="bachelors_completed">Bachelor's (Completed)</option>
              <option value="masters_ongoing">Master's (Ongoing)</option>
              <option value="masters_completed">Master's (Completed)</option>
              <option value="other">Other</option>
            </FormSelect>
          </div>

          <FormTextarea label="Message" name="enquiry_details" register={register} error={errors.enquiry_details} placeholder="Tell us more about your study plans or any specific questions you have." />

          <div className="text-center mt-6">
            <button type="submit" disabled={countriesLoading || isSubmitting} className="w-full md:w-auto bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 hover:bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 disabled:bg-primary-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-10 rounded-lg transition-colors inline-flex items-center justify-center">
              {isSubmitting ? (<><Loader2 className="h-5 w-5 mr-2 animate-spin" />Submitting...</>) : ("Submit")}
            </button>
            {submitError && (<div className="mt-4 text-red-600 bg-red-100 border border-red-300 rounded-lg p-3 flex items-center justify-center text-sm" aria-live="assertive"><AlertTriangle className="h-5 w-5 mr-2" />{submitError}</div>)}
          </div>
        </form>
      )}
    </div>
  );

  if (inline) return innerContent;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50" role="dialog" aria-modal="true">
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-all duration-300 ease-out transform scale-95 opacity-0 animate-fade-in-scale">
        <button onClick={handleClose} className="absolute top-3 right-3 p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-amber-900 transition-colors z-10" aria-label="Close">
          <X className="h-6 w-6" />
        </button>

        {innerContent}
      </div>
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in-scale {
          animation: fadeInScale 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ConsultationForm;
