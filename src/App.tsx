import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";

// Layout components
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

// Feature components
import DDRiVERWidget from "@/components/DDRiVERWidget";
import Dashboard from "@/pages/Dashboard";
import DDRiVERPage from "@/pages/DDRiVER";
import RiskAssessment from "@/pages/RiskAssessment";
import Sparc from "@/pages/Sparc";
import PlanGenerator from "@/pages/PlanGenerator";
import PlanLibrary from "@/pages/PlanLibrary";
import Compliance from "@/pages/Compliance";
import Collaboration from "@/pages/Collaboration";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen flex flex-col">
          {/* Global layout */}
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-4">
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/risk-assessment" element={<RiskAssessment />} />
                  <Route path="/sparc" element={<Sparc />} />
                  <Route path="/plan-generator" element={<PlanGenerator />} />
                  <Route path="/plan-library" element={<PlanLibrary />} />
                  <Route path="/compliance" element={<Compliance />} />
                  <Route path="/collaboration" element={<Collaboration />} />
                  <Route path="/ddriver" element={<DDRiVERPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </main>
          </div>

          {/* DDRiVER widget always mounted */}
          <DDRiVERWidget />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
