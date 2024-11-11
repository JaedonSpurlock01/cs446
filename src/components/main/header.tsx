import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";
import { QrCode } from "lucide-react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

const links = [
  {
    name: "Home",
    ref: "/",
  },
  {
    name: "Create",
    ref: "/create",
  },
  {
    name: "Account",
    ref: "/account",
  },
] as const;

export const Header = () => {
  const currentUrl = window.location.pathname;
  const auth = useAuth();
  const isLoading = !auth.isLoaded;

  return (
    <div className="h-20 w-full flex items-center justify-between px-4 sm:px-20">
      <div
        className="flex items-center gap-2 hover:cursor-pointer"
        onClick={() => window.location.replace("/")} // useNavigate doesn't work because were not inside the wrapper of react-router-dom
      >
        <QrCode />
        <h1 className="hidden sm:block text-2xl font-semibold tracking-tighter text-neutral-800">
          Portfolio Creator
        </h1>
      </div>
      <nav className="flex space-x-4 items-center h-full">
        {links.map((link) => (
          <a
            href={link.ref}
            className={
              "h-full flex items-center tracking-tighter justify-center  transition" +
              (currentUrl === link.ref ? "text-blue-500" : "")
            }
          >
            {link.name}
          </a>
        ))}
        {isLoading ? (
          <Loader className="animate-spin repeat-infinite w-[2.5rem] h-[2.5rem]" />
        ) : (
          <>
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
                      width: "2.5rem",
                      height: "2.5rem",
                    },
                  },
                }}
              />
            </SignedIn>
          </>
        )}
      </nav>
    </div>
  );
};
