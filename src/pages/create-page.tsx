import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
  const user = useUser();
  const navigate = useNavigate();

  if (!user.isSignedIn) {
    return (
      <section className="w-full min-h-screen flex flex-col justify-center items-center gap-4">
        <p className="text-2xl font-semibold tracking-tighter text-neutral-800">
          You must be signed in to create a profile
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
    <section className="w-full min-h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-2xl font-semibold tracking-tighter text-neutral-800">
        Create a portfolio
      </h1>

      <div className="flex flex-col p-4 bg-primary-foreground items-center justify-center gap-4 rounded-lg border border-border">
        <img
          src={user.user.imageUrl}
          alt={user.user.fullName || "User Avatar"}
          className="rounded-full w-24 h-24"
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-lg text-center font-semibold tracking-tighter text-neutral-800">
            {user.user.fullName}
          </h2>
          <p className="text-sm text-muted-foreground">
            {user.user.emailAddresses[0].emailAddress}
          </p>
        </div>
      </div>
    </section>
  );
}
