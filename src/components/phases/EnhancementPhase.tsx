import React, { useState } from 'react';
import { FileText, Zap, Download, Save, CheckCircle2, BookOpen, Shield, AlertCircle } from 'lucide-react';
import PhaseHeader from '../PhaseHeader';

const apiKey = ""; // Managed by environment

const fetchGemini = async (prompt: string, systemInstruction: string = "") => {
  try {
    let retries = 0;
    const delays = [1000, 2000, 4000, 8000, 16000];
    const contents = [{ parts: [{ text: prompt }] }];
    
    while (retries < 5) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            systemInstruction: { parts: [{ text: systemInstruction }] }
          })
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
      }
      
      await new Promise(res => setTimeout(res, delays[retries]));
      retries++;
    }
    return "AI generation currently unavailable. Please try again later.";
  } catch (error) {
    return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
};

export default function EnhancementPhase() {
  const [generatedPlan, setGeneratedPlan] = useState("");
  const [planType, setPlanType] = useState("LDRRMP");
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
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

  const generatePlan = async () => {
    setIsGenerating(true);
    
    const currentPlanType = planTypes.find(p => p.id === planType);
    const templateInfo = selectedTemplate ? templates.find(t => t.id === selectedTemplate) : null;
    
    const basePrompt = customPrompt || 
      `Generate a comprehensive executive summary for a Philippine ${currentPlanType?.fullName} (${planType})${
        templateInfo ? ` focusing on ${templateInfo.name} preparedness and response` : ''
      }.`;
    
    const enhancedPrompt = `${basePrompt}

Include the following sections:
1. Executive Summary (overview of the plan's objectives and scope)
2. Risk Assessment (key vulnerabilities and hazards identified)
3. Strategic Objectives (aligned with Philippine DRRM framework)
4. Key Programs and Activities (specific interventions and timelines)
5. Resource Requirements (budget, personnel, equipment)
6. Implementation Framework (roles, responsibilities, coordination mechanisms)
7. Monitoring & Evaluation (indicators and review processes)

Ensure compliance with:
${currentPlanType?.compliance.map(c => `- ${c}`).join('\n')}

Use professional disaster management terminology and Philippine context.`;

    const systemInstruction = `You are an expert Philippine DRRM planner with deep knowledge of RA 10121, OCD-DILG guidelines, and international best practices. Generate detailed, actionable, and compliant disaster management plans.`;
    
    const res = await fetchGemini(enhancedPrompt, systemInstruction);
    setGeneratedPlan(res);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <PhaseHeader 
        title="Enhancement" 
        description="AI-Powered Statutory Plan Generation & Compliance Engine"
      />

      {/* Plan Type Selection */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-900/30 text-blue-400 rounded-lg">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Statutory Plan Forge</h2>
              <p className="text-xs text-slate-500">RA 10121 & OCD-DILG v.2024 Compliant</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {planTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setPlanType(type.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  planType === type.id
                    ? 'bg-slate-800 border-blue-500 ring-2 ring-blue-500/20'
                    : 'bg-slate-950 border-slate-800 hover:border-blue-500/50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <Icon size={20} className={planType === type.id ? 'text-blue-400' : 'text-slate-500'} />
                  <span className="text-[10px] font-bold text-slate-500">{type.id}</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{type.name}</h4>
                <p className="text-[10px] text-slate-400 mb-3 leading-relaxed">{type.description}</p>
                <div className="flex flex-wrap gap-1">
                  {type.compliance.map((standard) => (
                    <span key={standard} className="text-[9px] px-1.5 py-0.5 bg-slate-800 text-slate-500 rounded">
                      {standard}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Templates */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white mb-4">Scenario Templates</h3>
            <div className="space-y-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id === selectedTemplate ? null : template.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedTemplate === template.id
                      ? 'bg-slate-800 border-blue-500'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-white mb-1">{template.name}</div>
                  <div className="text-[10px] text-slate-500">{template.hazard}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Guidelines */}
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

          {/* Recent Plans */}
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
        </div>

        {/* Main Editor */}
        <div className="lg:col-span-3 space-y-6">
          {/* Custom Prompt */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white mb-4">Custom Instructions (Optional)</h3>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Add specific requirements, focus areas, or customization instructions..."
              className="w-full h-24 px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={generatePlan}
              disabled={isGenerating}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-xl font-bold flex items-center space-x-2 transition-all"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Zap size={16} />
                  <span>Generate Plan</span>
                </>
              )}
            </button>
            
            {generatedPlan && !isGenerating && (
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
            )}
          </div>

          {/* Generated Content */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h3 className="text-sm font-bold text-white">Generated Plan</h3>
                {generatedPlan && (
                  <span className="text-[10px] px-2 py-1 bg-emerald-900/30 text-emerald-400 rounded-full font-bold">
                    READY
                  </span>
                )}
              </div>
              {generatedPlan && (
                <div className="text-xs text-slate-500">
                  {generatedPlan.length} characters • {Math.ceil(generatedPlan.split(' ').length / 200)} min read
                </div>
              )}
            </div>
            
            <div className="p-6 min-h-[500px] max-h-[600px] overflow-y-auto custom-scrollbar">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                  <div className="text-center">
                    <p className="text-sm text-white font-medium">Generating your plan...</p>
                    <p className="text-xs text-slate-500 mt-1">This may take 30-60 seconds</p>
                  </div>
                </div>
              ) : generatedPlan ? (
                <div className="prose prose-invert prose-sm max-w-none">
                  <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {generatedPlan}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <FileText size={48} className="text-slate-700" />
                  <div>
                    <p className="text-sm text-slate-400 mb-2">No plan generated yet</p>
                    <p className="text-xs text-slate-600">
                      Select a plan type and click "Generate Plan" to create AI-powered documentation
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
