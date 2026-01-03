import React, { useState } from 'react';
import { 
  Swords, AlertTriangle, Globe, Play, Radio, Pause, RotateCcw, 
  TrendingUp, Users, Target, Award, FileText, Clock
} from 'lucide-react';
import PhaseHeader from '../PhaseHeader';

interface ScenarioResult {
  casualties: number;
  infrastructureDamage: number;
  economicLoss: string;
  evacuees: number;
  responseTime: number;
}

export default function ValidationPhase() {
  const [simScore, setSimScore] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [scenarioResults, setScenarioResults] = useState<ScenarioResult | null>(null);
  const [currentPhase, setCurrentPhase] = useState(0);

  const scenarios = [
    {
      id: 'big-one',
      title: 'The Big One',
      subtitle: 'Magnitude 7.2 Earthquake Scenario',
      description: 'West Valley Fault rupture affecting Metro Manila and surrounding provinces',
      icon: AlertTriangle,
      color: 'orange',
      complexity: 'High',
      duration: '72 hours',
      stakeholders: 15
    },
    {
      id: 'super-typhoon',
      title: 'Super Typhoon',
      subtitle: 'Category 5 with Storm Surge',
      description: 'Sustained winds 250+ kph, 4-6m storm surge, widespread flooding',
      icon: Globe,
      color: 'blue',
      complexity: 'Very High',
      duration: '96 hours',
      stakeholders: 18
    },
    {
      id: 'tsunami',
      title: 'Tsunami Event',
      subtitle: 'Magnitude 8.0 Offshore Earthquake',
      description: 'Philippine Trench rupture generating 5-10m tsunami waves',
      icon: Target,
      color: 'cyan',
      complexity: 'High',
      duration: '48 hours',
      stakeholders: 12
    },
    {
      id: 'volcanic',
      title: 'Volcanic Eruption',
      subtitle: 'Phreatic to Plinian Eruption',
      description: 'Major volcanic activity with ashfall affecting multiple regions',
      icon: AlertTriangle,
      color: 'red',
      complexity: 'High',
      duration: '120 hours',
      stakeholders: 14
    },
  ];

  const decisionPoints = [
    { id: 1, phase: 'Preparation', action: 'Activate Response Clusters', points: 10, time: 'T-6 hours' },
    { id: 2, phase: 'Preparation', action: 'Deploy RDANA Teams to Forward Positions', points: 10, time: 'T-4 hours' },
    { id: 3, phase: 'Response', action: 'Establish Emergency Operations Center', points: 15, time: 'T+0 hours' },
    { id: 4, phase: 'Response', action: 'Coordinate Multi-Agency Response', points: 15, time: 'T+2 hours' },
    { id: 5, phase: 'Recovery', action: 'Implement Business Continuity Plans', points: 10, time: 'T+24 hours' },
    { id: 6, phase: 'Recovery', action: 'Damage Assessment & Recovery Planning', points: 10, time: 'T+48 hours' },
  ];

  const performanceMetrics = [
    { name: 'ICS Compliance', score: 92, benchmark: 85 },
    { name: 'Response Time', score: 88, benchmark: 80 },
    { name: 'Resource Efficiency', score: 78, benchmark: 75 },
    { name: 'Communication', score: 95, benchmark: 90 },
    { name: 'Coordination', score: 85, benchmark: 80 },
  ];

  const runSimulation = (scenarioId: string) => {
    setActiveScenario(scenarioId);
    setIsSimulating(true);
    setCurrentPhase(0);
    setScenarioResults(null);

    const interval = setInterval(() => {
      setCurrentPhase((prev) => {
        if (prev >= 5) {
          clearInterval(interval);
          setIsSimulating(false);
          
          const results: ScenarioResult = {
            casualties: Math.floor(Math.random() * 500) + 100,
            infrastructureDamage: Math.floor(Math.random() * 40) + 30,
            economicLoss: `₱${(Math.random() * 5 + 2).toFixed(1)}B`,
            evacuees: Math.floor(Math.random() * 50000) + 20000,
            responseTime: Math.floor(Math.random() * 30) + 15
          };
          setScenarioResults(results);
          
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <PhaseHeader 
        title="Validation" 
        description="Scenario Testing & Capacity Verification Framework"
      />

      {/* Status Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-lg ${isSimulating ? 'bg-blue-900/30' : 'bg-indigo-900/30'}`}>
              <Swords size={20} className={isSimulating ? 'text-blue-400 animate-pulse' : 'text-indigo-400'} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {isSimulating ? 'Simulation In Progress' : 'Validation Suite Ready'}
              </h3>
              <p className="text-xs text-slate-500">
                {isSimulating ? `Phase ${currentPhase + 1} of 6 - ${decisionPoints[currentPhase]?.phase}` : 'Select a scenario to begin'}
              </p>
            </div>
          </div>
          
          {activeScenario && (
            <div className="flex items-center space-x-3">
              {isSimulating ? (
                <button 
                  onClick={() => setIsSimulating(false)}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center space-x-2"
                >
                  <Pause size={14} />
                  <span>Pause</span>
                </button>
              ) : (
                <button 
                  onClick={() => {
                    setSimScore(0);
                    setCurrentPhase(0);
                    setScenarioResults(null);
                  }}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-bold transition-colors flex items-center space-x-2"
                >
                  <RotateCcw size={14} />
                  <span>Reset</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario Selection */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <h3 className="text-sm font-bold text-white">Disaster Scenario Library</h3>
              <span className="text-xs px-2 py-0.5 bg-indigo-900/30 text-indigo-400 rounded-full">
                {scenarios.length} Scenarios
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scenarios.map((scenario) => {
                const Icon = scenario.icon;
                const isActive = activeScenario === scenario.id;
                
                return (
                  <button
                    key={scenario.id}
                    onClick={() => !isSimulating && runSimulation(scenario.id)}
                    disabled={isSimulating}
                    className={`p-5 rounded-xl border text-left group transition-all ${
                      isActive
                        ? 'bg-slate-800 border-indigo-500 ring-2 ring-indigo-500/20'
                        : 'bg-slate-950 border-slate-800 hover:border-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    <div className={`mb-3 inline-block p-2 rounded-lg bg-${scenario.color}-900/30 group-hover:scale-110 transition-transform`}>
                      <Icon size={24} className={`text-${scenario.color}-400`} />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">{scenario.title}</h4>
                    <p className="text-[10px] text-slate-500 mb-3">{scenario.subtitle}</p>
                    <p className="text-xs text-slate-400 mb-4 leading-relaxed">{scenario.description}</p>
                    
                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-3 border-t border-slate-800">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <Target size={10} />
                          <span>{scenario.complexity}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock size={10} />
                          <span>{scenario.duration}</span>
                        </span>
                      </div>
                      <span className="flex items-center space-x-1">
                        <Users size={10} />
                        <span>{scenario.stakeholders} agencies</span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Simulation Results */}
          {scenarioResults && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-white">Simulation Results</h3>
                <span className="text-xs px-3 py-1 bg-emerald-900/30 text-emerald-400 rounded-full font-bold">
                  COMPLETED
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-center">
                  <div className="text-[10px] text-slate-500 uppercase mb-2">Casualties</div>
                  <div className="text-2xl font-bold text-red-400">{scenarioResults.casualties}</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-center">
                  <div className="text-[10px] text-slate-500 uppercase mb-2">Infrastructure</div>
                  <div className="text-2xl font-bold text-orange-400">{scenarioResults.infrastructureDamage}%</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-center">
                  <div className="text-[10px] text-slate-500 uppercase mb-2">Economic Loss</div>
                  <div className="text-2xl font-bold text-yellow-400">{scenarioResults.economicLoss}</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-center">
                  <div className="text-[10px] text-slate-500 uppercase mb-2">Evacuees</div>
                  <div className="text-2xl font-bold text-blue-400">{scenarioResults.evacuees.toLocaleString()}</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-center">
                  <div className="text-[10px] text-slate-500 uppercase mb-2">Response Time</div>
                  <div className="text-2xl font-bold text-emerald-400">{scenarioResults.responseTime}m</div>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
                <h4 className="text-xs font-bold text-white mb-3">Performance Analysis</h4>
                <div className="space-y-3">
                  {performanceMetrics.map((metric) => (
                    <div key={metric.name}>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-slate-400">{metric.name}</span>
                        <span className={`font-mono ${
                          metric.score >= metric.benchmark ? 'text-emerald-400' : 'text-orange-400'
                        }`}>
                          {metric.score}% {metric.score >= metric.benchmark ? '✓' : '⚠'}
                        </span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            metric.score >= metric.benchmark ? 'bg-emerald-500' : 'bg-orange-500'
                          }`}
                          style={{ width: `${metric.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full mt-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center space-x-2">
                <FileText size={14} />
                <span>Generate Full Report</span>
              </button>
            </div>
          )}
        </div>

        {/* Decision Simulation Panel */}
        <div className="space-y-6">
          {/* EOC Decision Simulator */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="text-center mb-6">
              <div className="inline-block p-3 bg-emerald-900/30 text-emerald-400 rounded-lg mb-3">
                <Radio size={20} />
              </div>
              <h2 className="text-lg font-bold text-white">EOC Decision Sim</h2>
              <p className="text-xs text-slate-500 mt-1">
                ICS Compliance Check Active
              </p>
            </div>
            
            <div className="text-center mb-6">
              <div className="inline-flex items-center space-x-2 text-4xl font-mono text-emerald-400">
                <Award size={32} className="text-emerald-500" />
                <span>{simScore}</span>
              </div>
              <div className="text-xs text-slate-500 mt-2">Current Score</div>
            </div>

            <div className="space-y-2 mb-6">
              {decisionPoints.slice(0, 3).map((decision) => (
                <button
                  key={decision.id}
                  onClick={() => setSimScore(s => s + decision.points)}
                  disabled={!isSimulating}
                  className="w-full text-left p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-white">{decision.action}</span>
                    <span className="text-emerald-400 font-mono text-[10px]">+{decision.points}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>{decision.phase}</span>
                    <span>{decision.time}</span>
                  </div>
                </button>
              ))}
            </div>

            {simScore > 0 && (
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400">Readiness Level</span>
                  <span className={`text-xs font-bold ${
                    simScore >= 50 ? 'text-emerald-400' :
                    simScore >= 30 ? 'text-blue-400' :
                    'text-orange-400'
                  }`}>
                    {simScore >= 50 ? 'EXCELLENT' : simScore >= 30 ? 'GOOD' : 'DEVELOPING'}
                  </span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${Math.min((simScore / 70) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Validation History */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white mb-4">Recent Validations</h3>
            <div className="space-y-2">
              {[
                { name: 'Mag 7.2 West Valley', date: 'Jan 3', result: 'PASS', score: 94 },
                { name: 'Category 5 Typhoon', date: 'Dec 28', result: 'PASS', score: 88 },
                { name: 'Multi-Hazard Drill', date: 'Dec 15', result: 'READY', score: 91 },
              ].map((validation, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div>
                    <div className="text-xs font-bold text-white">{validation.name}</div>
                    <div className="text-[10px] text-slate-500">{validation.date}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-[10px] font-bold mb-1 ${
                      validation.result === 'PASS' ? 'text-emerald-400' : 'text-blue-400'
                    }`}>
                      {validation.result}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">{validation.score}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Indicators */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white mb-4">Compliance Status</h3>
            <div className="space-y-3">
              {[
                { standard: 'ICS Framework', status: 'compliant' },
                { standard: 'RA 10121', status: 'compliant' },
                { standard: 'OCD-DILG 2024', status: 'compliant' },
                { standard: 'UNDRR Guidelines', status: 'review' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{item.standard}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.status === 'compliant' 
                      ? 'bg-emerald-900/30 text-emerald-400' 
                      : 'bg-blue-900/30 text-blue-400'
                  }`}>
                    {item.status === 'compliant' ? '✓ COMPLIANT' : 'IN REVIEW'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}