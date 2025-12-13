import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout components
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

// Pages
import Dashboard from "@/pages/Dashboard";
import RiskAssessment from "@/pages/RiskAssessment";
import PlanGenerator from "@/pages/PlanGenerator";
import PlanLibrary from "@/pages/PlanLibrary";
import Compliance from "@/pages/Compliance";
import Collaboration from "@/pages/Collaboration";
import Sparc from "@/pages/Sparc";
import DDRiVERPage from "@/pages/DDRiVER";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* Global header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar navigation */}
        <Sidebar />

        {/* Main content area with routing */}
        <main className="flex-1 p-6 overflow-y-auto">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/risk-assessment" element={<RiskAssessment />} />
              <Route path="/plan-genrator" element={<PlanGenerator />} />
              <Route path="/plan-library" element={<PlanLibrary />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route path="/collaboration" element={<Collaboration />} />
              <Route path="/sparc" element={<Sparc />} />
              <Route path="/ddriver" element={<DDRiVERPage />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
