import React, { useState } from 'react';
import {
  Cog,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Save,
  X,
  Target,
} from 'lucide-react';
import PhaseHeader from '../PhaseHeader';

// ===== MOCK DATA =====
const mockRisks = [
  {
    id: 1,
    title: 'Typhoon damage to infrastructure',
    hazard_id: 1,
    likelihood: 4,
    impact: 5,
    risk_score: 20,
    classification: 'Critical',
    category: 'Natural Disaster',
    ai_summary:
      'High probability of typhoon occurrence during rainy season with severe impact on facility operations.',
  },
  {
    id: 2,
    title: 'Earthquake structural damage',
    hazard_id: 2,
    likelihood: 3,
    impact: 5,
    risk_score: 15,
    classification: 'High',
    category: 'Natural Hazard',
    ai_summary:
      'Moderate earthquake probability with potential for significant structural damage.',
  },
  {
    id: 3,
    title: 'Fire incident in warehouse',
    hazard_id: 3,
    likelihood: 2,
    impact: 4,
    risk_score: 8,
    classification: 'Medium',
    category: 'Safety',
    ai_summary:
      'Low fire probability but high potential impact on inventory and operations.',
  },
  {
    id: 4,
    title: 'Data breach from cyber attack',
    hazard_id: 5,
    likelihood: 3,
    impact: 4,
    risk_score: 12,
    classification: 'High',
    category: 'Cybersecurity',
    ai_summary:
      'Moderate cyber threat with significant business impact potential.',
  },
  {
    id: 5,
    title: 'Supply chain disruption',
    hazard_id: 6,
    likelihood: 3,
    impact: 3,
    risk_score: 9,
    classification: 'Medium',
    category: 'Operational',
    ai_summary:
      'Moderate probability of supply chain issues affecting business continuity.',
  },
];

const mockActions = [
  {
    id: 1,
    action_type: 'Emergency Evacuation Plan',
    description: 'Establish comprehensive evacuation procedures for typhoon scenarios',
    status: 'Completed' as const,
    priority: 'Critical' as const,
    risk_id: 1,
    risk_category: 'Natural Hazard',
    assigned_agency: 'NDRRMC',
    local_controls: 'LGU evacuation protocols, PHIVOLCS early warning integration',
    timeline: 'Immediate',
    resources_needed: 'Evacuation vehicles, Emergency shelters, Medical supplies',
    responsible_team: 'DRRM Committee',
    created_at: '2025-12-28T08:00:00Z',
  },
  {
    id: 2,
    action_type: 'Structural Reinforcement',
    description: 'Retrofit building structures to withstand earthquake forces',
    status: 'In Progress' as const,
    priority: 'High' as const,
    risk_id: 2,
    risk_category: 'Natural Hazard',
    assigned_agency: 'DPWH',
    local_controls: 'Building code compliance, Structural engineering standards',
    timeline: '3 months',
    resources_needed: 'Structural engineers, Reinforcement materials, Safety equipment',
    responsible_team: 'Engineering Department',
    created_at: '2025-12-27T10:00:00Z',
  },
];

const treatmentStrategiesByCategory: Record<
  string,
  Array<{ strategy: string; timeline: string; resources: string }>
> = {
  'Natural Hazard': [
    { strategy: 'Early warning system implementation', timeline: '1-2 weeks', resources: 'Weather monitoring equipment, communication systems' },
    { strategy: 'Evacuation plan development and drills', timeline: '2-4 weeks', resources: 'Emergency vehicles, shelters, trained personnel' },
    { strategy: 'Infrastructure reinforcement', timeline: '1-6 months', resources: 'Engineering expertise, construction materials' },
    { strategy: 'Emergency supplies stockpiling', timeline: '1-2 weeks', resources: 'Food, water, medical supplies, generators' },
    { strategy: 'Community preparedness training', timeline: 'Ongoing', resources: 'Training materials, facilitators, venues' },
  ],
  Safety: [
    { strategy: 'Fire safety equipment installation', timeline: '1-2 weeks', resources: 'Fire extinguishers, alarms, sprinkler systems' },
    { strategy: 'Safety protocol implementation', timeline: '1 week', resources: 'Safety manuals, signage, training materials' },
    { strategy: 'Emergency response training', timeline: '2-4 weeks', resources: 'Trainers, simulation equipment, venues' },
    { strategy: 'Regular safety inspections', timeline: 'Monthly', resources: 'Inspection checklists, safety officers' },
    { strategy: 'Personal protective equipment (PPE) provision', timeline: 'Immediate', resources: 'PPE inventory, distribution system' },
  ],
  Cybersecurity: [
    { strategy: 'Firewall and security software implementation', timeline: '1-2 weeks', resources: 'Security software licenses, IT personnel' },
    { strategy: 'Regular security audits', timeline: 'Quarterly', resources: 'Security auditors, assessment tools' },
    { strategy: 'Employee cybersecurity training', timeline: 'Monthly', resources: 'Training platforms, cybersecurity experts' },
    { strategy: 'Data backup and recovery systems', timeline: '1-2 weeks', resources: 'Backup infrastructure, cloud storage' },
    { strategy: 'Incident response planning', timeline: '2-4 weeks', resources: 'Response team, communication protocols' },
  ],
  Operational: [
    { strategy: 'Process redundancy implementation', timeline: '1-3 months', resources: 'Alternative systems, process documentation' },
    { strategy: 'Supply chain diversification', timeline: '2-6 months', resources: 'Supplier database, procurement team' },
    { strategy: 'Staff cross-training', timeline: '1-3 months', resources: 'Training programs, experienced staff' },
    { strategy: 'Alternative resource planning', timeline: '1-2 months', resources: 'Resource inventory, contingency budget' },
    { strategy: 'Business continuity planning', timeline: '1-3 months', resources: 'BCP framework, stakeholder engagement' },
  ],
  Legal: [
    { strategy: 'Regulatory compliance review', timeline: '1-2 months', resources: 'Legal counsel, compliance checklists' },
    { strategy: 'Legal counsel engagement', timeline: 'Immediate', resources: 'Legal retainer, consultation fees' },
    { strategy: 'Policy and procedure updates', timeline: '1-2 months', resources: 'Policy templates, legal review' },
    { strategy: 'Staff legal awareness training', timeline: '1 month', resources: 'Training materials, legal experts' },
    { strategy: 'Documentation and record keeping', timeline: 'Ongoing', resources: 'Document management system, storage' },
  ],
  Health: [
    { strategy: 'Health and safety protocols', timeline: '1 week', resources: 'Protocol templates, health officers' },
    { strategy: 'Medical emergency response plan', timeline: '2-4 weeks', resources: 'Medical personnel, emergency equipment' },
    { strategy: 'Health monitoring systems', timeline: '1-2 months', resources: 'Monitoring equipment, health data systems' },
    { strategy: 'Sanitation and hygiene measures', timeline: 'Immediate', resources: 'Cleaning supplies, hygiene stations' },
    { strategy: 'Healthcare provider partnerships', timeline: '1-2 months', resources: 'Partnership agreements, coordination meetings' },
  ],
};

const agenciesByCategory: Record<string, string[]> = {
  'Natural Disaster': ['NDRRMC', 'PAGASA', 'PHIVOLCS', 'DILG', 'DPWH'],
  Safety: ['BFP', 'DOLE', 'DILG', 'LGU'],
  Cybersecurity: ['DICT', 'NBI', 'DTI', 'DND'],
  Operational: ['DTI', 'DOH', 'DILG', 'LGU'],
  Legal: ['DOJ', 'DILG', 'LGU', 'SEC'],
  Health: ['DOH', 'LGU', 'DSWD', 'PhilHealth'],
};

// ===== TYPES =====
type Risk = (typeof mockRisks)[0];

interface Action {
  id: number;
  action_type: string;
  description: string;
  status: 'Planned' | 'In Progress' | 'Completed' | 'On Hold';
  priority: string;
  risk_id: number;
  risk_category: string;
  assigned_agency: string;
  local_controls: string;
  timeline: string;
  resources_needed: string;
  responsible_team: string;
  created_at: string;
  risk_title?: string;
}

type NewActionForm = {
  action_type: string;
  description: string;
  status: 'Planned' | 'In Progress' | 'Completed' | 'On Hold';
  priority: string;
  risk_id: string;
  risk_category: string;
  assigned_agency: string;
  local_controls: string;
  timeline: string;
  resources_needed: string;
  responsible_team: string;
  custom_strategy: string;
};

// ✅ DEFAULT EXPORT — THIS IS THE KEY FIX
const ResponsePhase: React.FC = () => {
  const [actions, setActions] = useState<Action[]>(mockActions);
  const [risks] = useState<Risk[]>(mockRisks);
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [showAddActionModal, setShowAddActionModal] = useState<boolean>(false);
  const [selectedRisk, setSelectedRisk] = useState<string>('');
  const [selectedStrategy, setSelectedStrategy] = useState<string>('');
  const [newAction, setNewAction] = useState<NewActionForm>({
    action_type: '',
    description: '',
    status: 'Planned',
    priority: '',
    risk_id: '',
    risk_category: '',
    assigned_agency: '',
    local_controls: '',
    timeline: '',
    resources_needed: '',
    responsible_team: '',
    custom_strategy: '',
  });

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Planned':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'On Hold':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-600 text-white';
      case 'High':
        return 'bg-orange-600 text-white';
      case 'Medium':
        return 'bg-yellow-600 text-gray-900';
      case 'Low':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const getPriorityFromRisk = (riskScore: number): string => {
    if (riskScore >= 20) return 'Critical';
    if (riskScore >= 12) return 'High';
    if (riskScore >= 6) return 'Medium';
    return 'Low';
  };

  const handleAddAction = () => {
    if (!newAction.action_type || !newAction.risk_id) return;

    const risk = risks.find((r) => r.id.toString() === newAction.risk_id);
    const priority = newAction.priority || getPriorityFromRisk(risk?.risk_score || 0);

    const newActionObj: Action = {
      id: actions.length + 1,
      action_type: newAction.action_type,
      description: newAction.description,
      status: newAction.status,
      priority,
      risk_id: parseInt(newAction.risk_id),
      risk_category: newAction.risk_category,
      assigned_agency: newAction.assigned_agency,
      local_controls: newAction.local_controls,
      timeline: newAction.timeline,
      resources_needed: newAction.resources_needed,
      responsible_team: newAction.responsible_team,
      created_at: new Date().toISOString(),
      risk_title: risk?.title,
    };

    setActions([newActionObj, ...actions]);
    setNewAction({
      action_type: '',
      description: '',
      status: 'Planned',
      priority: '',
      risk_id: '',
      risk_category: '',
      assigned_agency: '',
      local_controls: '',
      timeline: '',
      resources_needed: '',
      responsible_team: '',
      custom_strategy: '',
    });
    setSelectedRisk('');
    setSelectedStrategy('');
    setShowAddActionModal(false);
  };

  const handleRiskSelection = (riskId: string) => {
    const risk = risks.find((r) => r.id.toString() === riskId);
    if (risk) {
      setSelectedRisk(riskId);
      setNewAction((prev) => ({
        ...prev,
        risk_id: riskId,
        risk_category: risk.category,
        priority: getPriorityFromRisk(risk.risk_score),
      }));
    }
  };

  const handleStrategySelection = (strategyObj: { strategy: string; timeline: string; resources: string }) => {
    setSelectedStrategy(strategyObj.strategy);
    setNewAction((prev) => ({
      ...prev,
      action_type: strategyObj.strategy,
      timeline: strategyObj.timeline,
      resources_needed: strategyObj.resources,
    }));
  };

  const filteredActions = selectedPriority === 'All'
    ? actions
    : actions.filter((a) => a.priority === selectedPriority);

  const plannedCount = actions.filter((a) => a.status === 'Planned').length;
  const inProgressCount = actions.filter((a) => a.status === 'In Progress').length;
  const completedCount = actions.filter((a) => a.status === 'Completed').length;
  const criticalRisks = risks.filter((r) => r.classification === 'Critical').length;
  const riskCategories = Array.from(new Set(risks.map((r) => r.category)));

  return (
    <div>
      <PhaseHeader
        icon={Cog}
        title="Phase 3: Response"
        description="Coherent and responsive risk treatment planning with Philippine context integration"
        colorClass="bg-red-700"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Planned</p>
              <p className="text-3xl font-bold text-gray-900">{plannedCount}</p>
            </div>
            <Clock className="w-10 h-10 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-3xl font-bold text-gray-900">{inProgressCount}</p>
            </div>
            <Cog className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-gray-900">{completedCount}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical Risks</p>
              <p className="text-3xl font-bold text-gray-900">{criticalRisks}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setShowAddActionModal(true)}
          className="inline-flex items-center px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Risk Treatment
        </button>
      </div>

      {/* Risk Treatment Overview by Category */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Treatment Coverage by Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {riskCategories.map((category) => {
            const categoryRisks = risks.filter((r) => r.category === category);
            const categoryActions = actions.filter((a) => a.risk_category === category);
            const coverage = categoryRisks.length > 0 ? Math.round((categoryActions.length / categoryRisks.length) * 100) : 0;

            return (
              <div key={category} className="border-2 rounded-lg p-4 bg-gradient-to-br from-red-50 to-orange-50">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-red-600" />
                  <h4 className="font-semibold text-red-900">{category}</h4>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Risks:</span>
                    <span className="font-semibold ml-1">{categoryRisks.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Treatments:</span>
                    <span className="font-semibold ml-1">{categoryActions.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Coverage:</span>
                    <span
                      className={`font-semibold ml-1 ${
                        coverage >= 80 ? 'text-green-600' : coverage >= 50 ? 'text-yellow-600' : 'text-red-600'
                      }`}
                    >
                      {coverage}%
                    </span>
                  </div>
                </div>
                {coverage < 100 && (
                  <button
                    onClick={() => {
                      setShowAddActionModal(true);
                      const firstUnaddressedRisk = categoryRisks.find(
                        (r) => !categoryActions.some((a) => a.risk_id === r.id)
                      );
                      if (firstUnaddressedRisk) {
                        handleRiskSelection(firstUnaddressedRisk.id.toString());
                      }
                    }}
                    className="mt-2 text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors"
                  >
                    Add Treatment
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {criticalRisks > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-red-900 mb-3 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Critical Risks Requiring Immediate Response
          </h3>
          <div className="space-y-3">
            {risks
              .filter((r) => r.classification === 'Critical')
              .slice(0, 3)
              .map((risk) => {
                const hasTreatment = actions.some((a) => a.risk_id === risk.id);
                return (
                  <div key={risk.id} className="bg-white rounded p-3 border border-red-200 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{risk.title}</div>
                      <div className="text-sm text-red-700">
                        Risk Score: {risk.risk_score} | {risk.classification}
                      </div>
                    </div>
                    {!hasTreatment && (
                      <button
                        onClick={() => {
                          setShowAddActionModal(true);
                          handleRiskSelection(risk.id.toString());
                        }}
                        className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                      >
                        Add Treatment
                      </button>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Response Actions & Treatment Canvas</h3>
          <div className="flex space-x-2">
            {['All', 'Critical', 'High', 'Medium', 'Low'].map((priority) => (
              <button
                key={priority}
                onClick={() => setSelectedPriority(priority)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedPriority === priority
                    ? 'bg-red-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          {filteredActions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Cog className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p>No response actions found. Add your first risk treatment!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredActions.map((action) => (
                <div
                  key={action.id}
                  className={`border-2 rounded-lg p-4 transition-all hover:shadow-md ${getStatusColor(action.status)}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-lg">{action.action_type}</h4>
                        {action.priority && (
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(action.priority)}`}>
                            {action.priority}
                          </span>
                        )}
                        {action.risk_title && (
                          <span className="text-sm text-gray-600 ml-2">→ {action.risk_title}</span>
                        )}
                      </div>
                      {action.description && (
                        <p className="text-sm opacity-80 mb-2">{action.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/50">
                        {action.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    {action.local_controls && (
                      <div className="bg-white/50 rounded p-3">
                        <p className="text-xs font-semibold text-gray-700 mb-1">Philippine Local Controls:</p>
                        <p className="text-sm">{action.local_controls}</p>
                      </div>
                    )}
                    {action.assigned_agency && (
                      <div className="bg-white/50 rounded p-3">
                        <p className="text-xs font-semibold text-gray-700 mb-1">Assigned Agency:</p>
                        <p className="text-sm font-medium">{action.assigned_agency}</p>
                      </div>
                    )}
                    {(action.timeline || action.responsible_team) && (
                      <div className="bg-white/50 rounded p-3 col-span-full md:col-span-1">
                        <div className="flex space-x-4 text-sm">
                          {action.timeline && (
                            <div>
                              <p className="text-xs font-semibold text-gray-700">Timeline:</p>
                              <p>{action.timeline}</p>
                            </div>
                          )}
                          {action.responsible_team && (
                            <div>
                              <p className="text-xs font-semibold text-gray-700">Team:</p>
                              <p>{action.responsible_team}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {action.resources_needed && (
                      <div className="bg-white/50 rounded p-3 col-span-full md:col-span-1">
                        <p className="text-xs font-semibold text-gray-700 mb-1">Resources Needed:</p>
                        <p className="text-sm">{action.resources_needed}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Philippine Agency Integration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
            <h4 className="font-semibold text-blue-900 mb-2">NDRRMC</h4>
            <p className="text-sm text-blue-800">
              National Disaster Risk Reduction and Management Council - Primary coordination
            </p>
          </div>
          <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
            <h4 className="font-semibold text-green-900 mb-2">DILG</h4>
            <p className="text-sm text-green-800">
              Department of Interior and Local Government - LGU coordination
            </p>
          </div>
          <div className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50">
            <h4 className="font-semibold text-purple-900 mb-2">DTI</h4>
            <p className="text-sm text-purple-800">
              Department of Trade and Industry - Business continuity support
            </p>
          </div>
          <div className="border-2 border-orange-200 rounded-lg p-4 bg-orange-50">
            <h4 className="font-semibold text-orange-900 mb-2">LGU</h4>
            <p className="text-sm text-orange-800">Local Government Units - Ground-level implementation</p>
          </div>
        </div>
      </div>

      {/* Add Action Modal */}
      {showAddActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Add Risk Treatment</h3>
              <button onClick={() => setShowAddActionModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Risk Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Risk to Treat *</label>
                <select
                  value={selectedRisk}
                  onChange={(e) => handleRiskSelection(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Choose a risk from your risk register</option>
                  {risks.map((risk) => (
                    <option key={risk.id} value={risk.id}>
                      {risk.title} - {risk.classification} (Score: {risk.risk_score})
                    </option>
                  ))}
                </select>
              </div>

              {selectedRisk && (
                <>
                  {/* Pre-defined Strategies */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Recommended Treatment Strategies</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                      {treatmentStrategiesByCategory[newAction.risk_category]?.map((strategy, index) => (
                        <button
                          key={index}
                          onClick={() => handleStrategySelection(strategy)}
                          className={`p-3 text-left rounded border-2 transition-colors ${
                            selectedStrategy === strategy.strategy
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                          }`}
                        >
                          <div className="font-medium text-sm">{strategy.strategy}</div>
                          <div className="text-xs text-gray-600 mt-1">
                            Timeline: {strategy.timeline} | Resources: {strategy.resources.substring(0, 50)}...
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Strategy */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Custom Treatment Strategy</label>
                    <input
                      type="text"
                      value={newAction.action_type}
                      onChange={(e) => setNewAction({ ...newAction, action_type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter custom treatment strategy"
                    />
                  </div>

                  {/* Action Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={newAction.description}
                        onChange={(e) => setNewAction({ ...newAction, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        rows={2}
                        placeholder="Describe the treatment action in detail"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
                      <input
                        type="text"
                        value={newAction.timeline}
                        onChange={(e) => setNewAction({ ...newAction, timeline: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="e.g., 2 weeks, 3 months"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Agency</label>
                      <select
                        value={newAction.assigned_agency}
                        onChange={(e) => setNewAction({ ...newAction, assigned_agency: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="">Select assigned agency</option>
                        {agenciesByCategory[newAction.risk_category]?.map((agency) => (
                          <option key={agency} value={agency}>
                            {agency}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={newAction.status}
                        onChange={(e) =>
                          setNewAction({ ...newAction, status: e.target.value as NewActionForm['status'] })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="Planned">Planned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Local Controls & Philippine Context</label>
                    <textarea
                      value={newAction.local_controls}
                      onChange={(e) => setNewAction({ ...newAction, local_controls: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      rows={2}
                      placeholder="Specify Philippine-specific controls, regulations, or local requirements"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Resources Needed</label>
                      <input
                        type="text"
                        value={newAction.resources_needed}
                        onChange={(e) => setNewAction({ ...newAction, resources_needed: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="List required resources"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Responsible Team</label>
                      <input
                        type="text"
                        value={newAction.responsible_team}
                        onChange={(e) => setNewAction({ ...newAction, responsible_team: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Team or department responsible"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={() => setShowAddActionModal(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddAction}
                      disabled={!newAction.action_type || !newAction.risk_id}
                      className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Add Treatment
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ✅ DEFAULT EXPORT — MATCHES App.tsx IMPORT
export default ResponsePhase;
