import React from "react";
import { Link } from "react-router-dom";

import { Heart, Share2, Users, Star } from "lucide-react";
import { Button } from "../Components/ui/Button.tsx";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 pt-20">
      {/* Padding added to offset fixed Navbar */}
      <main>
        <section className="hero container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Capture Your Special Moments
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create beautiful event albums and preserve your memories forever.
          </p>
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
          >
            Get Started
          </Button>
        </section>

        <section id="features" className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Why Choose MemoryKeeper?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Heart className="h-12 w-12 text-purple-600" />}
                title="Beautiful Albums"
                description="Create stunning digital albums with our easy-to-use tools."
              />
              <FeatureCard
                icon={<Share2 className="h-12 w-12 text-purple-600" />}
                title="Easy Sharing"
                description="Share your albums with friends and family with just a click."
              />
              <FeatureCard
                icon={<Users className="h-12 w-12 text-purple-600" />}
                title="Collaborative"
                description="Invite others to add their photos to your event albums."
              />
            </div>
          </div>
        </section>

        <section className="bg-purple-100 py-20">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              {/* Placeholder for Image */}
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Relive Your Precious Moments
              </h2>
              <p className="text-gray-600 mb-6">
                With MemoryKeeper, you can create beautiful digital albums for
                all your special events. From weddings to birthdays, vacations
                to graduations, preserve your memories in style.
              </p>
              <ul className="space-y-4">
                <FeatureListItem text="Unlimited photo and video uploads" />
                <FeatureListItem text="Smart organization with AI-powered tagging" />
                <FeatureListItem text="Customizable themes and layouts" />
                <FeatureListItem text="Secure cloud storage" />
              </ul>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Choose Your Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PricingCard
                title="Basic"
                price="$9.99"
                features={[
                  "5 event albums",
                  "100 GB storage",
                  "Basic themes",
                  "Email support",
                ]}
              />
              <PricingCard
                title="Pro"
                price="$19.99"
                features={[
                  "Unlimited event albums",
                  "500 GB storage",
                  "Premium themes",
                  "Priority support",
                ]}
                highlighted={true}
              />
              <PricingCard
                title="Family"
                price="$29.99"
                features={[
                  "Unlimited event albums",
                  "1 TB storage",
                  "All themes + custom options",
                  "24/7 support",
                ]}
              />
            </div>
          </div>
        </section>

        <section id="contact" className="bg-purple-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Ready to Start Preserving Memories?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Sign up now and get 30 days free trial. No credit card required.
            </p>
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
            >
              Start Free Trial
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold">MemoryKeeper</span>
              <p className="text-sm mt-2">
                © 2024 MemoryKeeper. All rights reserved.
              </p>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link
                    to="#"
                    className="hover:text-purple-400 transition duration-300"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-purple-400 transition duration-300"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-purple-400 transition duration-300"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-purple-50 rounded-lg p-6 text-center transition duration-300 hover:shadow-lg">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function FeatureListItem({ text }: { text: string }) {
  return (
    <li className="flex items-center space-x-2">
      <Star className="h-5 w-5 text-yellow-500" />
      <span>{text}</span>
    </li>
  );
}

function PricingCard({
  title,
  price,
  features,
  highlighted = false,
}: {
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-lg p-8 text-center transition duration-300 hover:shadow-lg ${
        highlighted ? "ring-2 ring-purple-600 shadow-lg" : ""
      }`}
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h3>
      <p className="text-4xl font-bold text-purple-600 mb-6">
        {price}
        <span className="text-base font-normal text-gray-600">/month</span>
      </p>
      <ul className="space-y-2 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-600">
            {feature}
          </li>
        ))}
      </ul>
      <Button
        className={`w-full ${
          highlighted
            ? "bg-purple-600 hover:bg-purple-700 text-white"
            : "bg-purple-100 hover:bg-purple-200 text-purple-600"
        } font-semibold py-2 px-4 rounded transition duration-300`}
      >
        Choose Plan
      </Button>
    </div>
  );
}
