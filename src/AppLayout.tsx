import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import RiskAssessment from '@/pages/RiskAssessment';
import PlanGenerator from '@/pages/PlanGenerator';
import PlanLibrary from '@/pages/PlanLibrary';
import Compliance from '@/pages/Compliance';
import Collaboration from '@/pages/Collaboration';

const AppLayout: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/risk-assessment" element={<RiskAssessment />} />
        <Route path="/plan-generator" element={<PlanGenerator />} />
        <Route path="/plan-library" element={<PlanLibrary />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/collaboration" element={<Collaboration />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppLayout;
