import React from 'react';
import { Zap, Target, Shield, TrendingUp, RotateCcw } from 'lucide-react';

const SparcLGU: React.FC = () => {
  // AI Recommendations Simulation (Abundance Mindset)
  const aiRecommendations = [
    {
      title: "Unlock Fiscal Capacity through QRF Agility (Adaptability)",
      description: "Focus on procedural agility (A2). Streamline the replenishment and liquidation of the Quick Response Fund (QRF) to minimize bureaucratic friction. This guarantees immediate financial absorption capacity and empowers local DRRMOs to act without delay, maximizing impact.",
      pillar: "A"
    },
    {
      title: "Establish a Multi-Sectoral Resilience Compact (Coping & Exposure)",
      description: "Formalize an executive mandate (C2) to establish a regular 'Resilience Cabinet' involving the LGU, private sector, and academia. Leverage this collective expertise to jointly map cross-boundary hazards (E2) and fund the retrofitting of key public infrastructure (E1).",
      pillar: "C/E"
    },
    {
      title: "Translate CLUP into Actionable Policy Agility (Sensitivity)",
      description: "The LGU should aggressively enforce the Comprehensive Land Use Plan (S2) by simplifying and accelerating permits for resilient private construction while imposing strict regulatory costs on non-compliant projects in hazard zones. This proactive Agility dramatically lowers intrinsic susceptibility (S1) over the long term.",
      pillar: "S"
    }
  ];

  const pillarColorsMap: Record<string, string> = {
    C: 'text-blue-600 bg-blue-50',
    A: 'text-green-600 bg-green-50',
    S: 'text-yellow-600 bg-yellow-50',
    E: 'text-red-600 bg-red-50',
  };

  return (
    <div className="bg-white border border-slate-800 rounded-xl p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
          <Zap size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">SPARC LGU Assessment</h3>
          <p className="text-sm text-slate-600">
            Strategic Priorities for Adaptability, Resilience, and Capability
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {aiRecommendations.map((rec, index) => {
          const pillarKey = rec.pillar.split('/')[0]; // Get first pillar if compound (e.g., "C" from "C/E")
          const colorClass = pillarColorsMap[pillarKey] || 'text-slate-600 bg-slate-50';

          return (
            <div key={index} className={`p-4 rounded-lg border ${colorClass}`}>
              <div className="flex items-start justify-between">
                <h4 className="font-semibold text-slate-900">{rec.title}</h4>
                <span className="text-xs font-bold px-2 py-1 bg-white rounded-full border">
                  Pillar {rec.pillar}
                </span>
              </div>
              <p className="text-sm text-slate-700 mt-2">{rec.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200">
        <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
          <Target size={14} />
          SPARC Pillars Overview
        </h4>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span>C: Coping (Preparedness)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span>A: Adaptability (Learning)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
            <span>S: Sensitivity (Policy)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span>E: Exposure (Control)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SparcLGU;
