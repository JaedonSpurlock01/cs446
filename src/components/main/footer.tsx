import { Linkedin, Github, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer className="w-full py-6 bg-gradient-to-r from-blue-200 to-blue-600 rounded-lg p-6 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2024 Portfolio Creator. All rights reserved.</p>
            </div>
            <nav className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">
                About
              </a>
              <a href="#" className="hover:text-gray-300">
                Features
              </a>
              <a href="#" className="hover:text-gray-300">
                Contact
              </a>
            </nav>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-300">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
