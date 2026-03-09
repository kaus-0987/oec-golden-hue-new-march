"use client";
import React, { useState } from "react";
import {
  Users,
  BookOpen,
  Globe,
  Calendar,
  MessageCircle,
  Trophy,
} from "lucide-react";
import Events from "./Events";
import StudentBlogs from "./StudentBlogs";
import AlumniNetwork from "./AlumniNetwork";
import KnowledgeBase from "./KnowledgeBase";
import CountryGuides from "./CountryGuides";
import SuccessStories from "./SuccessStories";

const Community = () => {
  const [activeTab, setActiveTab] = useState("knowledge-base");

  const tabs = [
    { id: "knowledge-base", name: "Knowledge Base", icon: BookOpen },
    { id: "success-stories", name: "Success Stories", icon: Trophy },
    { id: "country-guides", name: "Country Guides", icon: Globe },
    { id: "events", name: "Events", icon: Calendar },
    { id: "student-blogs", name: "Student Blogs", icon: MessageCircle },
    { id: "alumni-network", name: "Alumni Network", icon: Users },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "knowledge-base":
        return <KnowledgeBase />;
      case "success-stories":
        return <SuccessStories />;
      case "country-guides":
        return <CountryGuides />;
      case "events":
        return <Events />;
      case "student-blogs":
        return <StudentBlogs />;
      case "alumni-network":
        return <AlumniNetwork />;
      default:
        return <KnowledgeBase />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 text-white mt-20 mb-20 py-20 md:py-32 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Connect. Learn. Succeed.
          </h1>
          <p className="text-white text-xl md:text-2xl max-w-4xl mx-auto">
            From university selection to career guidance - we support you at
            every step of your study abroad journey
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
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

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {renderContent()}
        </div>
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              Our Growing Community
            </h2>
            <p className="text-amber-700 max-w-2xl mx-auto">
              Join a thriving network of students, alumni, and education experts
              committed to your success
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: "50,000+", label: "Community Members", icon: Users },
              { number: "15,000+", label: "Success Stories", icon: Trophy },
              { number: "500+", label: "Knowledge Articles", icon: BookOpen },
              { number: "85+", label: "Countries Connected", icon: Globe },
            ].map(({ number, label, icon: Icon }, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-sm"
              >
                <div className="text-primary-600 mb-3 flex justify-center">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-amber-900 mb-2">
                  {number}
                </div>
                <div className="text-amber-700">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;
