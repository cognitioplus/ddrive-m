import React, { useState } from 'react';
import { FileText, Zap, Download, Save, CheckCircle2, BookOpen, Shield, AlertCircle } from 'lucide-react';
import PhaseHeader from '../PhaseHeader';
import PlanGenerator from '../PlanGenerator'; // ✅ Import PlanGenerator

const EnhancementPhase: React.FC = () => {
  const [generatedPlan, setGeneratedPlan] = useState<string>("");
  const [planType, setPlanType] = useState<string>("LDRRMP");
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const planTypes = [
    { 
      id: 'LDRRMP', 
      name: 'LDRRMP', 
      fullName: 'Local Disaster Risk Reduction & Management Plan',
      description: 'Comprehensive 5-year plan aligned with RA 10121',
      icon: Shield,
      compliance: ['RA 10121', 'OCD-DILG']
    },
    { 
      id: 'Contingency', 
      name: 'Contingency', 
      fullName: 'Emergency Contingency Plan',
      description: 'Hazard-specific operational response protocols',
      icon: AlertCircle,
      compliance: ['ICS', 'SPHERE']
    },
    { 
      id: 'DANA', 
      name: 'DANA', 
      fullName: 'Disaster Needs Assessment & Analysis',
      description: 'Post-disaster impact and recovery assessment',
      icon: FileText,
      compliance: ['PDNA', 'DALA']
    },
    { 
      id: 'BCP', 
      name: 'BCP', 
      fullName: 'Business Continuity Plan',
      description: 'Organizational resilience and recovery strategy',
      icon: BookOpen,
      compliance: ['ISO 22301', 'NIST']
    },
  ];

  const templates = [
    { id: 'flood', name: 'Flood Scenario', hazard: 'Hydrometeorological' },
    { id: 'earthquake', name: 'Earthquake Scenario', hazard: 'Geophysical' },
    { id: 'typhoon', name: 'Typhoon Scenario', hazard: 'Hydrometeorological' },
    { id: 'tsunami', name: 'Tsunami Scenario', hazard: 'Geophysical' },
    { id: 'volcanic', name: 'Volcanic Eruption', hazard: 'Geophysical' },
    { id: 'pandemic', name: 'Pandemic Scenario', hazard: 'Biological' },
  ];

  const recentPlans = [
    { name: 'LDRRMP 2025-2030', date: 'Jan 2, 2025', status: 'Final', version: 'v3.2' },
    { name: 'Typhoon Contingency', date: 'Dec 28, 2024', status: 'Draft', version: 'v1.8' },
    { name: 'Earthquake BCP', date: 'Dec 15, 2024', status: 'Review', version: 'v2.1' },
  ];

  const handlePlanGenerated = (content: string) => {
    setGeneratedPlan(content);
  };

  return (
    <div className="space-y-6">
      <PhaseHeader 
        icon={Zap}
        title="Phase 6: Enhancement"
        description="AI-Powered Statutory Plan Generation & Compliance Engine"
        colorClass="bg-blue-700" // ✅ Blue for "innovation/enhancement"
      />

      {/* ✅ DELEGATE TO PlanGenerator — CLEAN SEPARATION OF CONCERNS */}
      <PlanGenerator
        planType={planType}
        setPlanType={setPlanType}
        planTypes={planTypes}
        templates={templates}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        customPrompt={customPrompt}
        setCustomPrompt={setCustomPrompt}
        onPlanGenerated={handlePlanGenerated}
      />

      {/* Post-Generation Actions & Recent Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Recent Plans & Compliance */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white mb-4">Recent Plans</h3>
            <div className="space-y-2">
              {recentPlans.map((plan, i) => (
                <div key={i} className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-xs font-bold text-white">{plan.name}</div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      plan.status === 'Final' ? 'bg-emerald-900/30 text-emerald-400' :
                      plan.status === 'Review' ? 'bg-blue-900/30 text-blue-400' :
                      'bg-orange-900/30 text-orange-400'
                    }`}>
                      {plan.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>{plan.date}</span>
                    <span className="font-mono">{plan.version}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white mb-4">Compliance Framework</h3>
            <div className="space-y-3">
              {[
                { name: 'RA 10121', status: 'active' },
                { name: 'OCD-DILG v.2024', status: 'active' },
                { name: 'Climate Adaptive', status: 'active' },
                { name: 'UNDRR Sendai', status: 'reference' },
              ].map((guideline) => (
                <div key={guideline.name} className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{guideline.name}</span>
                  <CheckCircle2 
                    size={14} 
                    className={guideline.status === 'active' ? 'text-emerald-400' : 'text-slate-600'} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generated Plan Display */}
        <div className="lg:col-span-3">
          {generatedPlan && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Generated Plan</h3>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors">
                    <Save size={14} />
                    <span>Save Draft</span>
                  </button>
                  <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors">
                    <Download size={14} />
                    <span>Export</span>
                  </button>
                </div>
              </div>
              
              <div className="p-6 min-h-[400px] max-h-[500px] overflow-y-auto custom-scrollbar">
                <div className="prose prose-invert prose-sm max-w-none">
                  <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {generatedPlan}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancementPhase;
