import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  useUser,
  SignedIn,
  UserButton,
} from "@clerk/clerk-react"; // Import SignedIn component
import { useNavigate } from "react-router-dom";
import { Ellipsis } from "lucide-react";

export default function AccountPage() {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  if (!isSignedIn) {
    return (
      <section className="w-full h-[50rem] flex flex-col justify-center items-center gap-4 px-4">
        <p className="text-2xl font-semibold tracking-tighter text-neutral-800">
          You must be signed in to view an account and edit profiles
        </p>
        <Button className="bg-blue-400 text-white hover:bg-blue-500">
          <SignInButton mode="modal" />
        </Button>
        <Button
          className="bg-white text-blue-500 hover:bg-gray-300"
          onClick={() => navigate("/")}
        >
          Go to Home
        </Button>
      </section>
    );
  }

  return (
    <div className="w-full" onClick={() => setActiveDropdown(null)}>
      {/* User Info Section */}
      <div className="bg-gray-100 overflow-hidden shadow-lg mb-8 w-full">
        <div className="bg-gradient-to-r from-blue-600 to-blue-200 h-48 flex flex-col justify-center items-center relative">
          <h1 className="text-4xl font-semibold text-white">Your Account</h1>

          {user?.imageUrl && (
            <img
              src={user.imageUrl}
              alt="User Profile"
              className="absolute bottom-[-6rem] rounded-full border-4 border-white shadow-lg
                md:w-40 md:h-40 md:left-20 md:bottom-[-5rem] 
                lg:w-56 lg:h-56 lg:left-28 lg:bottom-[-7rem] lg:max-w-[224px] lg:max-h-[224px]
                max-w-[160px] max-h-[160px] w-auto h-auto"
            />
          )}
        </div>

        {/* Username and Email */}
        <div className="pt-24 pb-6 px-8 text-center flex flex-col items-center justify-center relative mb-4">
          <h2 className="text-3xl font-bold">
            {user?.fullName || "User Name"}
          </h2>
          <p className="text-gray-600 text-lg">
            {user?.primaryEmailAddress?.emailAddress || "user@example.com"}
          </p>

          {/* Edit Button */}
          <Button className="mt-4 bg-blue-500 text-white hover:bg-blue-600">
            Edit Account
          </Button>
        </div>
      </div>

      {/* Profiles Section */}
      <div className="bg-white shadow-lg p-8 w-full">
        <h3 className="text-2xl font-semibold mb-6">Your Profiles</h3>
        <p className="text-gray-500 mb-6">
          Here, you can view, edit, or delete your created profiles.
        </p>
        {/* Profiles list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["Profile 1", "Profile 2", "Profile 3"].map((profile, index) => (
            <div
              key={index}
              className="border p-6 shadow-md hover:bg-slate-200 cursor-pointer rounded-md flex justify-between items-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-lg">{profile}</p>
              <Ellipsis
                className="text-gray-500 cursor-pointer hover:text-gray-700 transition-transform transform hover:scale-125"
                onClick={() => toggleDropdown(index)}
              />
              {activeDropdown === index && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded-md z-10 p-2">
                  <p className="p-2 hover:bg-gray-100 cursor-pointer">
                    Delete Profile
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
