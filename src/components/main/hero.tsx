import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Brush, Code, Layers, LucideQrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AnimatedCounter = ({
  end,
  duration = 2000,
}: {
  end: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start > end) {
              clearInterval(timer);
              setCount(end);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    const currentNode = countRef.current;

    if (currentNode) {
      observer.observe(currentNode);
    }

    return () => {
      if (currentNode) {
        observer.unobserve(currentNode);
      }
    };
  }, [end, duration]);

  return <span ref={countRef}>{count}</span>;
};

export const Hero = () => {
  const navigate = useNavigate();
  const [qrVisible, setQrVisible] = useState(false);

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <main className="flex-grow w-full bg-gray-100">
        {/* Hero Section */}
        <section className="w-full relative py-16 md:py-32 lg:py-40 xl:py-48 bg-gradient-to-r from-blue-600 to-blue-200 rounded-lg p-8">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white">
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

        <div className="flex flex-col md:flex-row w-full items-center">
          {/* Interactive QR Code Section */}
          <section className="w-full md:w-1/2 py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Experience the Power of QR
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl">
                  Share your portfolio instantly with a simple scan. See it in
                  action!
                </p>
                <div className="relative w-64 h-64 bg-gray-100 rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                      qrVisible ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <LucideQrCode className="w-40 h-40 text-blue-500" />
                  </div>
                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-blue-500 transition-opacity duration-500 ${
                      qrVisible ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <span className="text-white text-lg font-semibold">
                      Your Portfolio
                    </span>
                  </div>
                </div>
                <Button
                  className="mt-4 bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105 transition-all duration-200"
                  onClick={() => setQrVisible(!qrVisible)}
                >
                  {qrVisible ? "Hide QR Code" : "Show QR Code"}
                </Button>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="w-full md:w-1/2 py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center">
            <div className="w-full px-4 md:px-6 mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {[
                  {
                    icon: Layers,
                    title: "Customizable Layouts",
                    description:
                      "Choose from a variety of professional templates to showcase your work in style.",
                  },
                  {
                    icon: Code,
                    title: "Add Your Projects & Links",
                    description:
                      "Easily showcase your projects, skills, and important links in one place.",
                  },
                  {
                    icon: Brush,
                    title: "Generate QR Code",
                    description:
                      "Create a recruiter-friendly QR code for easy sharing of your portfolio.",
                  },
                ].map((feature, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-lg duration-300 transform hover:scale-105 transition-transform"
                  >
                    <CardHeader>
                      <feature.icon className="w-10 h-10 text-blue-500 mb-2 group-hover:animate-bounce" />
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>{feature.description}</CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Animated Stats Section */}
        <section className="w-full py-8 md:py-16 lg:py-24 mt-[-8rem]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { value: 100, label: "Portfolios Created", suffix: "+" },
                { value: 95, label: "Satisfaction Rate", suffix: "%" },
                { value: 24, label: "Support Available", suffix: "/7" },
              ].map((stat, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-4xl font-bold text-blue-500">
                    <AnimatedCounter end={stat.value} />
                    {stat.suffix}
                  </h3>
                  <p className="text-xl text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
