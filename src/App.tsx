import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import Dashboard from "./pages/Dashboard";
import DashboardHome from './pages/DashboardHome';
import Bookings from './pages/Bookings';
import Documents from './pages/Documents';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Onboarding from './pages/Onboarding';
import { SignedIn, SignedOut, SignIn, SignUp, useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";

const ProtectedDashboard = () => {
  const { user } = useUser();
  // Check onboarding status from unsafeMetadata
  const onboardingComplete = user?.unsafeMetadata?.onboardingComplete;
  if (!onboardingComplete) {
    return <Navigate to="/onboarding" />;
  }
  return <Dashboard />;
};

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <span className="text-lg text-gray-500">Loading...</span>
  </div>
);

const queryClient = new QueryClient();

const App = () => {
  const { isLoaded, user } = useUser();
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
            <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" afterSignInUrl="/dashboard" />} />
            <Route path="/sign-up" element={
              <>
                <SignedIn>
                  <Navigate to="/dashboard" />
                </SignedIn>
                <SignedOut>
                  <SignUp routing="path" path="/sign-up" afterSignUpUrl="/dashboard" />
                </SignedOut>
              </>
            } />
            <Route path="/dashboard" element={<SignedIn><ProtectedDashboard /></SignedIn>}>
              <Route index element={<DashboardHome />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="documents" element={<Documents />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/onboarding" element={<SignedIn><Onboarding /></SignedIn>} />
            <Route path="/" element={
              isLoaded ? (
                user ? <Navigate to="/dashboard" /> : <Index />
              ) : <LoadingFallback />
            } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
};

export default App;
