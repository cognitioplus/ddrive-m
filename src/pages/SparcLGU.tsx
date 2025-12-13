import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Accordion } from "@/components/ui/accordion";
import { Zap } from "lucide-react";

// Assuming Chart.js is available in the environment globally (window.Chart)
// In a standard Vite project, you would import Chart from 'chart.js'.

/**
 * Defines the structure for the raw input scores.
 */
interface InputScores {
    [key: string]: number;
}

/**
 * Defines the structure for the calculated pillar and sub-pillar scores.
 */
interface CalculatedScores {
    C: string; A: string; S: string; E: string;
    C1: string; C2: string; A1: string; A2: string;
    S1: string; S2: string; E1: string; E2: string;
    overall: string;
}

// Initial state for LGU indicators, reflecting typical mid-range challenges
const initialScores: InputScores = {
    // C1: Tactical Response Capacity
    C1_1: 2, C1_2: 2, C1_3: 1,
    // C2: Strategic Commitment (MOVE)
    C2_1: 1, C2_2: 2, C2_3: 1, 
    // A1: Dynamic Learning & Review
    A1_1: 3, A1_2: 1, A1_3: 2,
    // A2: Financial Continuity (Absorptive/QRF)
    A2_1: 1, A2_2: 2, A2_3: 3,
    // S1: Intrinsic Service Resilience
    S1_1: 1, S1_2: 2,
    // S2: Policy Agility & Enforcement
    S2_1: 2, S2_2: 1,
    // E1: Physical Buffers & Inventory
    E1_1: 1, E1_2: 2,
    // E2: Site Control & Planning
    E2_1: 1, E2_2: 3,
};

// Definitions for the assessment questions (LGU-specific)
const assessmentQuestions = {
    C: {
        name: "Coping (C) - Strategic Preparedness & Response", color: "bg-blue-700", subPillars: [
            { id: 'C1', name: 'Tactical Response Capacity (Execution)', questions: [
                { key: 'C1_1', label: 'Integrated Early Warning System (EWS) dissemination protocol' },
                { key: 'C1_2', label: 'Functionality of BDRRM committees and response teams' },
                { key: 'C1_3', label: 'Availability of pre-positioned non-food items and logistics' },
            ]},
            { id: 'C2', name: 'Strategic Commitment (Preparedness/MOVE)', questions: [
                { key: 'C2_1', label: 'LDRRMP is fully integrated into the Comprehensive Development Plan (CDP)' },
                { key: 'C2_2', label: 'Executive commitment (Mayor/Council) to DRRM budget allocation (>5% LDRRMF)' },
                { key: 'C2_3', label: 'Formal mechanisms for inter-LGU cooperation in joint response drills' },
            ]},
        ]
    },
    A: {
        name: "Adaptability (A) - Resource & Continuity Buffers", color: "bg-green-700", subPillars: [
            { id: 'A1', name: 'Dynamic Learning & Review (Adaptability)', questions: [
                { key: 'A1_1', label: 'Mandatory post-disaster evaluation leading to policy/process change' },
                { key: 'A1_2', label: 'Regular training for LGU staff on climate projections and future risk scenarios' },
                { key: 'A1_3', label: 'Institutionalized knowledge sharing mechanism with other LGUs (best practices)' },
            ]},
            { id: 'A2', name: 'Financial Continuity (Absorptive Capacity)', questions: [
                { key: 'A2_1', label: 'Timely replenishment and accessible utilization of Quick Response Fund (QRF)' },
                { key: 'A2_2', label: 'Diversification of local revenue sources (not overly dependent on IRA)' },
                { key: 'A2_3', label: 'Availability of dedicated disaster insurance for critical public assets' },
            ]},
        ]
    },
    S: {
        name: "Sensitivity (S) - Agility & Susceptibility Reduction", color: "bg-yellow-700", subPillars: [
            { id: 'S1', name: 'Intrinsic Service Resilience (Devolved Functions)', questions: [
                { key: 'S1_1', label: 'Resilience planning for critical health and social welfare services' },
                { key: 'S1_2', label: 'Integration of disaster risk reduction into local building codes and standards' },
            ]},
            { id: 'S2', name: 'Policy Agility & Enforcement (Agility)', questions: [
                { key: 'S2_1', label: 'Strict enforcement of CLUP policies in hazard zones' },
                { key: 'S2_2', label: 'Speed and ease of regulatory compliance for resilient infrastructure projects' },
            ]},
        ]
    },
    E: {
        name: "Exposure (E) - Physical Asset Control", color: "bg-red-700", subPillars: [
            { id: 'E1', name: 'Physical Buffers & Inventory (Exposure)', questions: [
                { key: 'E1_1', label: 'Mandated inventory and retrofitting plan for critical public infrastructure' },
                { key: 'E1_2', label: 'Active management and protection of natural ecosystem buffers (e.g., mangroves, watersheds)' },
            ]},
            { id: 'E2', name: 'Site Control & Planning (Exposure)', questions: [
                { key: 'E2_1', label: 'Proactive relocation planning for informal settlers in high-risk zones' },
                { key: 'E2_2', label: 'Inter-LGU agreement for cross-boundary hazard mapping and resource sharing' },
            ]},
        ]
    },
};

const SparcLGU: React.FC = () => {
  const [responses, setResponses] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (key: string) => {
    setResponses((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Calculate completion percentage
  const totalQuestions = Object.values(sparcQuestions).flat().length;
  const answered = Object.values(responses).filter(Boolean).length;
  const completion = Math.round((answered / totalQuestions) * 100);

 return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <Zap className="text-yellow-500" size={28} />
        <h1 className="text-2xl font-bold text-slate-800">SPARC LGU Evaluation</h1>
      </div>
      <p className="text-slate-600 max-w-2xl">
        This tool helps Local Government Units (LGUs) assess their disaster resilience capacity across Adaptability, Financial Continuity, Sensitivity, and Exposure pillars.
      </p>
      
      {/* Progress bar */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Completion Status</h2>
        <Progress value={completion} className="mb-2" />
        <p className="text-sm text-slate-600">{completion}% completed</p>
      </Card>

      
      {/* Accordion with questions */}
      <Accordion type="multiple" className="space-y-4">
        {Object.entries(sparcQuestions).map(([pillar, questions]) => (
          <Card key={pillar} className="p-4">
            <h2 className="text-lg font-semibold mb-3">{pillar}</h2>
            <div className="space-y-2">
              {questions.map((q) => (
                <div key={q.key} className="flex items-center gap-2">
                  <Checkbox
                    checked={responses[q.key] || false}
                    onCheckedChange={() => handleToggle(q.key)}
                  />
                  <span className="text-sm text-slate-700">{q.label}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </Accordion>
      
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

// Helper to map pillar ID to color for consistency
const pillarColorsMap: { [key: string]: string } = {
    C: 'text-blue-700',
    A: 'text-green-700',
    S: 'text-yellow-700',
    E: 'text-red-700',
};

// Helper function to map score to a textual level
const getResilienceLevel = (score: number): string => {
    if (score >= 2.5) return 'Managed (3.0)';
    if (score >= 1.5) return 'Moderate (2.0)';
    if (score >= 0.5) return 'Low (1.0)';
    return 'Initial (0.0)';
};


// --- CORE LOGIC (MEMOIZED FOR PERFORMANCE) ---

const calculateScores = (rawScores: InputScores): { scores: CalculatedScores, priorityAreas: any[] } => {
    
    const pillarRawScores: { [key: string]: number[] } = {};
    const priorityAreas: any[] = [];
    
    // Group raw scores by sub-pillar (e.g., C1, C2, A1, ...)
    Object.keys(rawScores).forEach(key => {
        const subPillarId = key.substring(0, 2); // e.g., 'C1'
        if (!pillarRawScores[subPillarId]) pillarRawScores[subPillarId] = [];
        pillarRawScores[subPillarId].push(rawScores[key]);
    });

    // Helper to calculate average of a sub-pillar
    const subPillarAvg = (id: string) => {
        const arr = pillarRawScores[id] || [];
        const validScores = arr.filter(v => v !== 0);
        if (validScores.length === 0) return 0;
        return (validScores.reduce((a, b) => a + b, 0) / validScores.length);
    };

    // 1. Calculate Sub-Pillar Scores
    const C1 = subPillarAvg('C1'); // Tactical Response
    const C2 = subPillarAvg('C2'); // Strategic Commitment (MOVE)
    const A1 = subPillarAvg('A1'); // Dynamic Learning
    const A2 = subPillarAvg('A2'); // Financial Continuity
    const S1 = subPillarAvg('S1'); // Intrinsic Service
    const S2 = subPillarAvg('S2'); // Policy Agility
    const E1 = subPillarAvg('E1'); // Physical Buffers
    const E2 = subPillarAvg('E2'); // Site Control

    // 2. Calculate Main Pillar Scores (Average of Sub-Pillars)
    let C = (C1 + C2) / 2;
    let A = (A1 + A2) / 2;
    let S = (S1 + S2) / 2;
    let E = (E1 + E2) / 2;

    // 3. Apply Governance Enforcement Rule (Coping Pillar)
    // If Strategic Commitment (C2/MOVE) is below 2.0, cap the overall Coping score at 3.0.
    if (C2 < 2.0 && C > 3.0) {
        // console.warn(`Governance Rule Applied: C score capped from ${C.toFixed(2)} to 3.0 due to low Strategic Commitment (C2: ${C2.toFixed(2)}).`);
        C = 3.0;
    }

    const calculatedScores: CalculatedScores = {
        C: C.toFixed(2), A: A.toFixed(2), S: S.toFixed(2), E: E.toFixed(2),
        C1: C1.toFixed(2), C2: C2.toFixed(2), A1: A1.toFixed(2), A2: A2.toFixed(2),
        S1: S1.toFixed(2), S2: S2.toFixed(2), E1: E1.toFixed(2), E2: E2.toFixed(2),
        overall: ((C + A + S + E) / 4).toFixed(2),
    };

    // 4. Determine Priority Areas
    const mainPillars = [{ key: 'C', score: C }, { key: 'A', score: A }, { key: 'S', score: S }, { key: 'E', score: E }];
    
    // Check main pillar score thresholds
    mainPillars.forEach(p => {
        if (p.score < 1.5) {
            priorityAreas.push({ key: p.key, score: p.score, isCritical: true, reason: 'Overall pillar requires immediate attention.' });
        } else if (p.score < 2.5) {
            priorityAreas.push({ key: p.key, score: p.score, isCritical: false, reason: 'Moderate performance, institutionalize processes for higher impact.' });
        }
    });

    // Check sub-pillar score thresholds (more critical gap identification)
    const subPillars = { C1, C2, A1, A2, S1, S2, E1, E2 };
    Object.keys(subPillars).forEach(subKey => {
        const score = subPillars[subKey as keyof typeof subPillars];
        const parentKey = subKey[0];
        const subPillarDef = assessmentQuestions[parentKey as keyof typeof assessmentQuestions].subPillars.find(s => s.id === subKey);
        const subLabel = subPillarDef ? subPillarDef.name : subKey;

        if (score < 1.0) {
            priorityAreas.push({
                key: subKey,
                score: score,
                isSubCritical: true,
                parent: parentKey,
                label: subLabel,
                reason: `${subLabel} is critically low (Primary diagnostic gap). Requires immediate executive attention.`,
            });
        }
    });

    return { scores: calculatedScores, priorityAreas };
};


// --- REACT COMPONENT ---

const App: React.FC = () => {
    const [inputScores, setInputScores] = useState<InputScores>(initialScores);
    const [isAssessed, setIsAssessed] = useState(false);
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<any>(null);

    // Memoize the calculation results
    const { scores, priorityAreas } = useMemo(() => calculateScores(inputScores), [inputScores]);

    // Handle input changes
    const handleInputChange = (key: string, value: string) => {
        const numericValue = parseInt(value);
        if (numericValue >= 0 && numericValue <= 3) {
            setInputScores(prev => ({
                ...prev,
                [key]: numericValue,
            }));
        }
    };

    // Trigger assessment and scroll
    const runAssessment = () => {
        setIsAssessed(true);
        // Ensure the chart updates before scrolling
        setTimeout(() => {
            document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    // Chart update logic using useEffect
    useEffect(() => {
        if (!isAssessed || !chartRef.current || typeof window.Chart === 'undefined') return;

        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        const data = {
            labels: ['Coping (Preparedness)', 'Adaptability (Learning)', 'Sensitivity (Policy)', 'Exposure (Control)'],
            datasets: [{
                label: 'SPARC Maturity Score',
                data: [parseFloat(scores.C), parseFloat(scores.A), parseFloat(scores.S), parseFloat(scores.E)],
                backgroundColor: 'rgba(25, 118, 210, 0.3)',
                borderColor: 'rgba(25, 118, 210, 1)',
                pointBackgroundColor: 'rgba(25, 118, 210, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(25, 118, 210, 1)',
                borderWidth: 2,
            }]
        };

        const config: any = { // Use 'any' type for Chart.js config if type definitions are not imported
            type: 'radar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { display: true },
                        suggestedMin: 0,
                        suggestedMax: 3.5,
                        pointLabels: { font: { size: 14 } },
                        ticks: { stepSize: 1 }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context: any) {
                                return ` ${context.label}: ${context.parsed.r.toFixed(2)}`;
                            }
                        }
                    }
                }
            }
        };

        if (chartInstanceRef.current) {
            chartInstanceRef.current.data = data;
            chartInstanceRef.current.update();
        } else {
            // @ts-ignore
            chartInstanceRef.current = new window.Chart(ctx, config);
        }

    }, [isAssessed, scores]);

    // Render the assessment form inputs
    const renderAssessmentInputs = () => (
        Object.entries(assessmentQuestions).map(([pillarKey, pillar]) => (
            <div key={pillarKey} className="card bg-white overflow-hidden">
                <div className={`pillar-header ${pillar.color} text-white p-3 rounded-t-xl font-bold`}>
                    Pillar {pillarKey}: {pillar.name}
                </div>
                <div className="p-5 space-y-3">
                    {pillar.subPillars.map(subPillar => (
                        <React.Fragment key={subPillar.id}>
                            <h3 className={`font-semibold text-lg ${pillarColorsMap[pillarKey]} mt-4`}>{subPillar.id}. {subPillar.name}</h3>
                            {subPillar.questions.map(q => (
                                <label key={q.key} className="block text-gray-700 flex justify-between items-center">
                                    <span className="flex-1 mr-4">{q.label}</span>
                                    <input
                                        type="number"
                                        min="0"
                                        max="3"
                                        value={inputScores[q.key]}
                                        onChange={(e) => handleInputChange(q.key, e.target.value)}
                                        className="w-20 text-center border p-1 rounded focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </label>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        ))
    );

    // Render the diagnostic summary
    const renderDiagnosticSummary = () => {
        const pillarSummary = Object.entries(assessmentQuestions).map(([key, pillar]) => {
            const score = parseFloat(scores[key as keyof CalculatedScores]);
            const scoreText = getResilienceLevel(score);
            let reason = '';
            let bgColor = '';

            if (score < 1.5) {
                reason = `Requires focused intervention. Core institutional processes are either non-existent or inconsistently applied.`;
                bgColor = 'bg-red-50';
            } else if (score < 2.5) {
                reason = `Performance is moderate. Policies exist, but execution or political will for enforcement requires significant strengthening.`;
                bgColor = 'bg-yellow-50';
            } else {
                reason = `Performance is strong. Indicators of institutionalization and proactive governance are present.`;
                bgColor = 'bg-green-50';
            }

            return (
                <div key={key} className={`p-3 rounded-lg ${bgColor} border`}>
                    <h4 className={`font-bold ${pillarColorsMap[key]}`}>{key}. {pillar.name} - {score.toFixed(2)} ({scoreText})</h4>
                    <p className="text-sm italic text-gray-600">{reason}</p>
                    <div className="mt-2 text-xs">
                        {pillar.subPillars.map(sub => {
                            const subKey = sub.id as keyof CalculatedScores;
                            const subScore = parseFloat(scores[subKey]);
                            const subLevel = getResilienceLevel(subScore);
                            const isCritical = subScore < 1.0;
                            return (
                                <p key={sub.id}>
                                    <span className="font-semibold">{sub.name}:</span> 
                                    <span className={`${isCritical ? 'text-red-600 font-bold' : 'text-gray-800'}`}>
                                        {subScore.toFixed(2)}
                                    </span> ({subLevel})
                                </p>
                            );
                        })}
                    </div>
                </div>
            );
        });

        // Filter and render priority areas
        const criticalSubPillars = priorityAreas.filter(p => p.isSubCritical);
        const moderateMainPillars = priorityAreas.filter(p => !p.isSubCritical && p.score < 2.5);

        const priorityList = [...criticalSubPillars, ...moderateMainPillars].map((area, index) => (
            <li key={index} className={area.isSubCritical ? 'text-red-700' : 'text-orange-700'}>
                <span className="font-bold">{area.key} ({area.score.toFixed(2)}):</span> {area.reason || area.label}
            </li>
        ));

        return (
            <>
                {pillarSummary}
                <h4 className="font-bold mt-4 text-lg text-gray-800">🎯 Priority Action Areas (Sub-Pillar Gaps)</h4>
                <ul className="list-disc list-inside ml-2 text-sm space-y-1">
                    {priorityList.length > 0 
                        ? priorityList 
                        : <li className='text-green-700'>No critical gaps identified. Focus on Optimization (Score {'\u003e'} 2.5).</li>
                    }
                </ul>
            </>
        );
    };

    return (
        <div className="p-4 sm:p-8 min-h-screen bg-gray-50">
            {/* Load Chart.js for the visualization */}
            <script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"></script>

            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">SPARC-CASE LGU Resilience Assessment</h1>
                <p className="text-center text-gray-600 mb-8">Evaluate Local Government Unit (LGU) maturity against mandates and devolved functions (0-3 scale).</p>

                {/* Assessment Form */}
                <div id="assessment-form" className="space-y-6 mb-10">
                    {renderAssessmentInputs()}
                    <button 
                        onClick={runAssessment} 
                        className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition duration-300 shadow-lg transform hover:scale-[1.01]"
                    >
                        Run SPARC-CASE Assessment & Generate Recommendations
                    </button>
                </div>

                {/* Results Section */}
                {isAssessed && (
                    <div id="results" className="animate-in fade-in duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Resilience Diagnostic & Action Plan for LGU</h2>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Chart Visualization */}
                            <div className="card bg-white p-6 shadow-lg">
                                <h3 className="text-xl font-semibold mb-4 text-center">Resilience Maturity Radar</h3>
                                <div className="h-96">
                                    <canvas ref={chartRef} id="radarChart"></canvas>
                                </div>
                                <p className="text-center text-sm mt-4">Overall SPARC Score: <span id="overall-score" className="font-bold text-2xl text-indigo-600">{scores.overall}</span></p>
                            </div>

                            {/* Pillar Diagnostics & Action Areas */}
                            <div className="card bg-white p-6 space-y-4 shadow-lg">
                                <h3 className="text-xl font-semibold mb-4 border-b pb-2">Pillar Diagnostics & Priority Action Areas</h3>
                                <div id="diagnostic-summary">
                                    {renderDiagnosticSummary()}
                                </div>
                            </div>
                        </div>

                        {/* AI Recommendations Section (Simulated) */}
                        <div className="card bg-white p-6 mt-6 shadow-lg">
                            <h3 className="text-2xl font-bold mb-4 text-indigo-700 border-b pb-2">AI-Powered Predictive Recommendations (Abundance Mindset)</h3>
                            <div id="ai-recommendations" className="space-y-4">
                                <p className="italic text-gray-600">Based on the analysis, here are systemic growth recommendations:</p>
                                {aiRecommendations.map((rec, index) => (
                                    <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2 bg-indigo-50 rounded-r-md">
                                        <h4 className="font-semibold text-gray-800">
                                            {rec.title} 
                                            <span className="text-sm font-normal text-indigo-500 ml-2">[Targets: {rec.pillar}]</span>
                                        </h4>
                                        <p className="text-sm text-gray-700">{rec.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SparcLGU;
