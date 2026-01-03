import React, { useState } from 'react';
import { 
  Target, TrendingUp, Activity, Award, Info, 
  AlertTriangle, BarChart3, Zap, CheckCircle2, 
  FileText, Network, MapIcon, Shield, Users,
  Bell, Clock, Database, RefreshCw
} from 'lucide-react';
import PhaseHeader from './PhaseHeader';

// Tooltip component
const Tooltip = ({ content, children }: { content: string; children: React.ReactNode }) => {
  const [show, setShow] = useState(false);
  
  return (
    <div className="relative inline-block">
      <div 
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="cursor-help inline-flex items-center"
      >
        {children}
      </div>
      
      {show && (
        <div className="absolute z-50 bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs rounded-lg p-3 shadow-2xl max-w-xs w-64 border border-slate-700">
          <div className="text-slate-200 leading-relaxed">{content}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-2 h-2 bg-slate-800 rotate-45 border-r border-b border-slate-700"></div>
        </div>
      )}
    </div>
  );
};

// Stat card component with tooltip
const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  tooltip,
  trend
}: { 
  title: string; 
  value: string | number; 
  icon: any; 
  color: string; 
  tooltip: string;
  trend?: { value: string; direction: 'up' | 'down' | 'stable' };
}) => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all group">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <Tooltip content={tooltip}>
        <Info size={16} className="text-slate-500 group-hover:text-slate-400 transition-colors" />
      </Tooltip>
    </div>
    <div className="space-y-2">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{title}</p>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-white">{value}</span>
        {trend && (
          <div className={`flex items-center space-x-1 text-xs font-bold ${
            trend.direction === 'up' ? 'text-emerald-400' :
            trend.direction === 'down' ? 'text-red-400' :
            'text-slate-400'
          }`}>
            <TrendingUp size={12} className={trend.direction === 'down' ? 'rotate-180' : ''} />
            <span>{trend.value}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Phase card component with tooltip
const PhaseCard = ({ 
  phase 
}: { 
  phase: {
    id: number;
    name: string;
    icon: any;
    color: string;
    value: string | number;
    label: string;
    description: string;
    tooltip: string;
    status: 'optimal' | 'good' | 'warning' | 'critical';
  }
}) => {
  const Icon = phase.icon;
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'optimal': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'good': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'warning': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'critical': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all cursor-pointer group hover:shadow-xl`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-lg ${phase.color}`}>
          <Icon size={20} className="text-white" />
        </div>
        <Tooltip content={phase.tooltip}>
          <Info size={14} className="text-slate-500 group-hover:text-slate-400 transition-colors" />
        </Tooltip>
      </div>
      
      <div className="space-y-3">
        <div>
          <h4 className="font-bold text-sm text-white mb-1">{phase.name}</h4>
          <p className="text-xs text-slate-500">{phase.description}</p>
        </div>
        
        <div className="pt-3 border-t border-slate-800">
          <div className="flex items-end justify-between mb-2">
            <span className="text-xs text-slate-500">{phase.label}</span>
            <span className="text-2xl font-bold text-white">{phase.value}</span>
          </div>
          <div className={`text-[10px] font-bold px-2 py-1 rounded-full border inline-block ${getStatusColor(phase.status)}`}>
            {phase.status.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [lastUpdate] = useState(new Date().toLocaleString());

  // Mock stats - in production, these would come from API/Supabase
  const stats = {
    riskConfidence: 94,
    alertReadiness: 100,
    planMaturity: 'GOLD',
    stakeholders: 28,
    activeHazards: 12,
    criticalRisks: 8,
    overallResilience: 87.3,
    criticalAlerts: 3,
    teamMembers: 45,
    activeSims: 2
  };

  const phases = [
    {
      id: 1,
      name: 'Detection',
      icon: MapIcon,
      color: 'bg-blue-600',
      value: stats.activeHazards,
      label: 'Active Hazards',
      description: 'Multi-source monitoring',
      status: 'good' as const,
      tooltip: 'Real-time hazard detection from PAGASA, PHIVOLCS, NOAH, and other Philippine agencies. Shows the total number of currently monitored hazards across all detection sources including weather systems, seismic activity, and flood warnings.'
    },
    {
      id: 2,
      name: 'Diagnosis',
      icon: BarChart3,
      color: 'bg-orange-600',
      value: stats.criticalRisks,
      label: 'Critical Risks',
      description: 'ISO 31000 analysis',
      status: 'warning' as const,
      tooltip: 'Risk assessments classified as "Critical" (risk score 8-10) based on ISO 31000 methodology. These represent the highest priority risks requiring immediate attention and treatment planning across multiple barangays.'
    },
    {
      id: 3,
      name: 'Response',
      icon: Zap,
      color: 'bg-red-600',
      value: '15/18',
      label: 'Active Units',
      description: 'ICS deployment',
      status: 'optimal' as const,
      tooltip: 'Currently deployed emergency response units including ambulances, rescue boats, fire trucks, and field hospitals. Shows active/total available units following Incident Command System protocols.'
    },
    {
      id: 4,
      name: 'Integration',
      icon: Database,
      color: 'bg-emerald-600',
      value: '8.04 GB/s',
      label: 'Data Throughput',
      description: 'Multi-system sync',
      status: 'optimal' as const,
      tooltip: 'Real-time data pipeline performance showing throughput from all integrated systems including ArcGIS, LGU databases, PAGASA API, PHIVOLCS feeds, and other critical data sources.'
    },
    {
      id: 5,
      name: 'Validation',
      icon: CheckCircle2,
      color: 'bg-indigo-600',
      value: stats.activeSims,
      label: 'Active Simulations',
      description: 'Scenario testing',
      status: 'good' as const,
      tooltip: 'Currently running disaster scenario simulations testing response capabilities for typhoons, earthquakes, floods, and other hazards. These validate preparedness and identify improvement opportunities.'
    },
    {
      id: 6,
      name: 'Enhancement',
      icon: FileText,
      color: 'bg-purple-600',
      value: 8,
      label: 'Active Plans',
      description: 'AI-powered',
      status: 'optimal' as const,
      tooltip: 'Active disaster risk reduction, contingency, and business continuity plans currently implemented. Generated using AI-powered templates compliant with RA 10121 and OCD-DILG v.2024 standards.'
    },
    {
      id: 7,
      name: 'Monitoring',
      icon: Network,
      color: 'bg-slate-600',
      value: stats.criticalAlerts,
      label: 'Critical Alerts',
      description: 'Command center',
      status: 'warning' as const,
      tooltip: 'Critical severity alerts currently active in the monitoring system requiring immediate coordination through the multi-agency Emergency Operations Center. Includes real-time stakeholder communication feeds.'
    }
  ];

  const statCards = [
    {
      title: 'Risk Confidence',
      value: `${stats.riskConfidence}%`,
      icon: Target,
      color: 'bg-blue-600',
      tooltip: 'Confidence level in risk assessment accuracy based on data quality, completeness, and validation from multiple authoritative sources. Higher confidence enables better decision-making.',
      trend: { value: '+2%', direction: 'up' as const }
    },
    {
      title: 'Alert Readiness',
      value: `${stats.alertReadiness}%`,
      icon: Bell,
      color: 'bg-emerald-600',
      tooltip: 'Percentage of alert systems, communication channels, and stakeholder networks that are operational and ready for immediate deployment during emergency situations.',
      trend: { value: '0%', direction: 'stable' as const }
    },
    {
      title: 'Plan Maturity',
      value: stats.planMaturity,
      icon: Award,
      color: 'bg-indigo-600',
      tooltip: 'Maturity level of DRRM plans based on comprehensiveness, compliance with standards, testing frequency, and integration with operational procedures. Levels: Bronze, Silver, Gold, Platinum.',
      trend: { value: '↑', direction: 'up' as const }
    },
    {
      title: 'Stakeholders',
      value: stats.stakeholders,
      icon: Users,
      color: 'bg-purple-600',
      tooltip: 'Total number of active stakeholders including LGUs, NGOs, national agencies, community organizations, and private sector partners participating in the DRRM ecosystem.',
      trend: { value: '+3', direction: 'up' as const }
    },
  ];

  const resilienceScores = [
    { name: 'Governance', score: 70, benchmark: 75, color: 'bg-blue-500' },
    { name: 'Risk Identification', score: 85, benchmark: 80, color: 'bg-emerald-500' },
    { name: 'Response Capacity', score: 92, benchmark: 85, color: 'bg-indigo-500' },
    { name: 'Financial Capacity', score: 68, benchmark: 70, color: 'bg-orange-500' },
    { name: 'Infrastructure', score: 78, benchmark: 75, color: 'bg-purple-500' },
  ];

  const recentValidations = [
    { name: 'Mag 7.2 West Valley', date: 'Jan 3', result: 'PASS', score: 94, icon: Target, color: 'text-orange-400' },
    { name: 'Category 5 Typhoon', date: 'Dec 28', result: 'PASS', score: 88, icon: Activity, color: 'text-blue-400' },
    { name: 'Multi-Hazard Drill', date: 'Dec 15', result: 'READY', score: 91, icon: Shield, color: 'text-emerald-400' },
  ];

  const systemStatus = [
    { name: 'Database Connection', status: 'Online', color: 'bg-emerald-500' },
    { name: 'Multi-Agency Integration', status: 'Active', color: 'bg-emerald-500' },
    { name: 'Real-Time Monitoring', status: 'Operational', color: 'bg-emerald-500' },
    { name: 'AI Analytics Engine', status: 'Ready', color: 'bg-emerald-500' },
    { name: 'Report Generation', status: 'Available', color: 'bg-emerald-500' },
    { name: 'Emergency Broadcast', status: 'Standby', color: 'bg-blue-500' },
  ];

  return (
    <div className="space-y-6">
      <PhaseHeader title="Dashboard" description="Intelligence Lifecycle Platform Overview" />

      {/* Status Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs text-slate-400">All Systems Operational</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <Clock size={14} />
            <span>Last Updated: {lastUpdate}</span>
          </div>
          <button className="flex items-center space-x-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
            <RefreshCw size={14} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <StatCard 
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
            tooltip={card.tooltip}
            trend={card.trend}
          />
        ))}
      </div>

      {/* Phase Status Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Activity size={20} className="text-blue-400" />
            <h3 className="text-lg font-bold text-white">Intelligence Cycle Phase Status</h3>
          </div>
          <Tooltip content="Click on any phase card to navigate to the detailed view for that specific phase of the risk management cycle.">
            <Info size={16} className="text-slate-500 hover:text-slate-400 transition-colors" />
          </Tooltip>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {phases.map((phase) => (
            <PhaseCard key={phase.id} phase={phase} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resilience Scorecard */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white">Resilience Scorecard (UNDRR)</h3>
            <Tooltip content="Overall community resilience score calculated using the UNDRR 10 Essentials framework. This weighted score considers multiple dimensions of disaster resilience and preparedness.">
              <Info size={16} className="text-slate-500 hover:text-slate-400 transition-colors" />
            </Tooltip>
          </div>
          <div className="space-y-4">
            {resilienceScores.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-slate-400">{item.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-600">Target: {item.benchmark}%</span>
                    <span className={`font-mono ${item.score >= item.benchmark ? 'text-emerald-400' : 'text-orange-400'}`}>
                      {item.score}%
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color} transition-all duration-500`}
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">Overall Score</span>
              <span className="text-2xl font-bold text-emerald-400">{stats.overallResilience}%</span>
            </div>
          </div>
        </div>

        {/* Recent Validation Sims */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white">Recent Validation Sims</h3>
            <Tooltip content="Recently completed disaster scenario simulations and drills testing organizational preparedness and response capabilities.">
              <Info size={16} className="text-slate-500 hover:text-slate-400 transition-colors" />
            </Tooltip>
          </div>
          <div className="space-y-3">
            {recentValidations.map((validation, i) => {
              const Icon = validation.icon;
              return (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Icon size={16} className={validation.color} />
                    <div>
                      <div className="text-xs font-bold text-white">{validation.name}</div>
                      <div className="text-[10px] text-slate-500">{validation.date}</div>
                    </div>
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
              );
            })}
          </div>
        </div>
      </div>

      {/* System Status & Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white">System Status</h3>
            <Tooltip content="Real-time status of all integrated systems and data sources in the DDRiVE-M platform.">
              <Info size={16} className="text-slate-500 hover:text-slate-400 transition-colors" />
            </Tooltip>
          </div>
          <div className="space-y-3">
            {systemStatus.map((system, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-950 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 ${system.color} rounded-full ${system.color === 'bg-emerald-500' ? 'animate-pulse' : ''}`}></div>
                  <span className="text-xs text-slate-300">{system.name}</span>
                </div>
                <span className={`text-xs font-bold ${
                  system.color === 'bg-emerald-500' ? 'text-emerald-400' : 'text-blue-400'
                }`}>
                  {system.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">DDRiVE-M Intelligence System</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-4">
                Comprehensive disaster detection, response, intelligence, validation, and enhancement management platform compliant with Philippine standards and international frameworks.
              </p>
            </div>
            <Activity className="w-16 h-16 opacity-20" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Tooltip content="Republic Act 10121: Philippine Disaster Risk Reduction and Management Act of 2010">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium cursor-help hover:bg-white/30 transition-colors">
                RA 10121
              </span>
            </Tooltip>
            <Tooltip content="ISO 31000: International standard for risk management principles and guidelines">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium cursor-help hover:bg-white/30 transition-colors">
                ISO 31000
              </span>
            </Tooltip>
            <Tooltip content="OCD-DILG v.2024: Office of Civil Defense and DILG guidelines for local government implementation">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium cursor-help hover:bg-white/30 transition-colors">
                OCD-DILG
              </span>
            </Tooltip>
            <Tooltip content="UNDRR 10 Essentials: Framework for making cities and communities resilient to disasters">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium cursor-help hover:bg-white/30 transition-colors">
                UNDRR
              </span>
            </Tooltip>
            <Tooltip content="ICS: Incident Command System for standardized emergency management">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium cursor-help hover:bg-white/30 transition-colors">
                ICS
              </span>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}