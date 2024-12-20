import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { ClerkProvider } from "@clerk/clerk-react";
import { Footer } from "./components/main/footer.tsx";
import { Header } from "./components/main/header.tsx";

// CLERK PUBLISHABLE KEY TO MANAGE USERS
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <main className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Header />
          <App />
        </div>
        <Footer />
      </main>
    </ClerkProvider>
  </StrictMode>
);
