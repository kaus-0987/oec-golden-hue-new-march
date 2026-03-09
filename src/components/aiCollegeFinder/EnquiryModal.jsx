"use client";
import React, { useState, useEffect } from "react";
import { X, Loader2, Check } from "lucide-react";
import ajaxCall from "@/helpers/ajaxCall";

const EnquiryModal = ({ isOpen, onClose, course, formData }) => {
  const [enquiryData, setEnquiryData] = useState({
    name: "",
    email: "",
    phone: "",
    intake: "not-sure",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [countries, setCountries] = useState([]);

  // Fetch countries when modal opens
  useEffect(() => {
    if (isOpen) {
      const fetchCountries = async () => {
        try {
          const response = await ajaxCall("/academics/academics/countries/", {
            method: "GET",
          });
          setCountries(response.data?.results || []);
        } catch (err) {
          console.error("Error fetching countries:", err);
        }
      };
      fetchCountries();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Map degree level to education choice
  const getEducationLevel = (degree) => {
    const mapping = {
      "Bachelor's Degree": "bachelors_ongoing",
      "Master's Degree": "bachelors_completed",
      "PhD": "masters_completed",
      "Diploma/Certificate": "high_school",
    };
    return mapping[degree] || "other";
  };

  // Get country ID from country name
  const getCountryId = (countryName) => {
    const country = countries.find(
      (c) => c.name.toLowerCase() === countryName.toLowerCase()
    );
    return country ? country.id : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Prepare the enquiry message with stepper form data
      const detailedMessage = `
Course Enquiry: ${course.name}
University: ${course.university}
Country: ${course.country}

Student Profile:
- Degree Level: ${formData.degree}
- Field of Study: ${formData.field}
- Preferred Country: ${formData.country}
- GPA: ${formData.gpa}
- Test Scores: ${formData.testScore || "Not provided"}
- Work Experience: ${formData.workExperience || "None"}

Additional Message:
${enquiryData.message}
      `.trim();

      const countryId = getCountryId(formData.country);
      if (!countryId) {
        throw new Error("Unable to find country. Please try again.");
      }

      const payload = {
        name: enquiryData.name,
        email: enquiryData.email,
        phone: enquiryData.phone,
        country_interested: countryId,
        interested_intake: enquiryData.intake,
        current_education: getEducationLevel(formData.degree),
        enquiry_details: detailedMessage,
      };

      console.log("Submitting enquiry with payload:", payload);

      const response = await ajaxCall("/enquiry/enquiries/", {
        method: "POST",
        data: payload,
      });

      if (response.isError) {
        // Log the full error for debugging
        console.error("Enquiry submission error:", response.error?.response?.data);
        
        // Extract validation errors if available
        const errorData = response.error?.response?.data;
        if (errorData && typeof errorData === 'object') {
          const errorMessages = Object.entries(errorData)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
            .join('\n');
          throw new Error(errorMessages || "Failed to submit enquiry");
        }
        
        throw new Error(response.error?.message || "Failed to submit enquiry");
      }

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setEnquiryData({ 
          name: "", 
          email: "", 
          phone: "", 
          intake: "not-sure",
          message: "" 
        });
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setEnquiryData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Course Enquiry</h2>
            <p className="text-sm text-amber-700 mt-1">
              Fill in your details to enquire about this course
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-amber-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Success State */}
        {isSuccess && (
          <div className="p-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Enquiry Submitted Successfully!
              </h3>
              <p className="text-green-700">
                Our team will contact you shortly.
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        {!isSuccess && (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Course Details */}
            <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
              <h3 className="font-semibold text-black mb-2">
                {course.name}
              </h3>
              <p className="text-sm text-primary-700">
                {course.university}, {course.country}
              </p>
            </div>

            {/* Your Profile Summary */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3">
                Your Profile
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-amber-700">Degree:</span>{" "}
                  <span className="font-medium text-gray-900">
                    {formData.degree}
                  </span>
                </div>
                <div>
                  <span className="text-amber-700">Field:</span>{" "}
                  <span className="font-medium text-gray-900">
                    {formData.field}
                  </span>
                </div>
                <div>
                  <span className="text-amber-700">GPA:</span>{" "}
                  <span className="font-medium text-gray-900">
                    {formData.gpa}
                  </span>
                </div>
                {formData.testScore && (
                  <div>
                    <span className="text-amber-700">Test Score:</span>{" "}
                    <span className="font-medium text-gray-900">
                      {formData.testScore}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={enquiryData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={enquiryData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={enquiryData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Intake <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={enquiryData.intake}
                  onChange={(e) => handleChange("intake", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="spring">Spring (Jan-Mar)</option>
                  <option value="summer">Summer (Apr-Jun)</option>
                  <option value="fall">Fall (Sep-Nov)</option>
                  <option value="winter">Winter (Dec-Feb)</option>
                  <option value="not-sure">Not Sure</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Message (Optional)
                </label>
                <textarea
                  value={enquiryData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Any specific questions or requirements..."
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Enquiry"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EnquiryModal;
