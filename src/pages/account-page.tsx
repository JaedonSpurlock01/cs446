import { Button } from "@/components/ui/button";
import { SignInButton, useUser, useClerk } from "@clerk/clerk-react"; // Import SignedIn component
import { useNavigate } from "react-router-dom";

export default function AccountPage() {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const clerk = useClerk();

  if (!isSignedIn) {
    return (
      <section className="flex flex-col min-h-screen justify-center items-center">
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
    <div className="w-full">
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
          <Button
            className="mt-4 bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => clerk.openUserProfile()}
          >
            Edit Account
          </Button>
        </div>
      </div>
    </div>
  );
}
