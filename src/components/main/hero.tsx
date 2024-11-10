import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Brush, Code, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <main className="flex-grow w-full">
        {/* Hero Section */}
        <section className="w-full relative py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-600 to-blue-200 rounded-lg p-6">
          <div className="absolute top-4 right-4">
            <SignedOut>
              <Button className="bg-white text-blue-500 hover:bg-gray-300">
                <SignInButton mode="modal" />
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: "3rem",
                      height: "3rem",
                    },
                  },
                }}
              />
            </SignedIn>
          </div>

          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white">
                Create Your Professional Portfolio in Minutes!
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                Showcase your skills, projects, and achievements with our
                easy-to-use portfolio builder.
              </p>
            </div>
            <Button
              className="bg-white text-blue-500 hover:bg-gray-300"
              size="lg"
              onClick={() => navigate("/create")}
            >
              Get Started
            </Button>
          </div>
        </section>
        {/* Features Section */}
        <section className="w-full pt-6 md:pt-12 lg:pt-16 bg-gray-100">
          <div className="w-full px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Layers className="w-10 h-10 text-blue-500 mb-2" />
                  <CardTitle>Customizable Layouts</CardTitle>
                </CardHeader>
                <CardContent>
                  Choose from a variety of professional templates to showcase
                  your work in style.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Code className="w-10 h-10 text-blue-500 mb-2" />
                  <CardTitle>Add Your Projects & Links</CardTitle>
                </CardHeader>
                <CardContent>
                  Easily showcase your projects, skills, and important links in
                  one place.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Brush className="w-10 h-10 text-blue-500 mb-2" />
                  <CardTitle>Generate QR Code</CardTitle>
                </CardHeader>
                <CardContent>
                  Create a recruiter-friendly QR code for easy sharing of your
                  portfolio.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
