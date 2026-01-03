import { useState, useEffect } from 'react';
import { Activity, TrendingUp, Award, Target, Plus, Save, X, Calculator, BarChart3, PieChart } from 'lucide-react';
import { PhaseHeader } from '../PhaseHeader';

// UNDRR 10 Essentials definitions
const essentials = [
  {
    number: 1,
    name: "Organize for disaster resilience",
    description: "Establish organizational structure and partnerships for disaster risk reduction",
    keyIndicators: [
      "Existence of DRRM office/committee",
      "Multi-stakeholder coordination mechanisms",
      "Clear roles and responsibilities",
      "Regular meetings and reporting"
    ]
  },
  {
    number: 2,
    name: "Identify, understand and use current and future risk scenarios",
    description: "Conduct comprehensive risk assessments and scenario planning",
    keyIndicators: [
      "Updated hazard maps",
      "Risk assessment reports",
      "Climate change vulnerability analysis",
      "Scenario-based planning"
    ]
  },
  {
    number: 3,
    name: "Strengthen financial capacity for resilience",
    description: "Secure and manage financial resources for DRRM activities",
    keyIndicators: [
      "DRRM budget allocation",
      "Disaster contingency funds",
      "Insurance coverage",
      "Access to external funding"
    ]
  },
  {
    number: 4,
    name: "Pursue resilient urban development and design",
    description: "Integrate DRRM into urban planning and infrastructure development",
    keyIndicators: [
      "Land use planning compliance",
      "Building code enforcement",
      "Critical infrastructure protection",
      "Green infrastructure implementation"
    ]
  },
  {
    number: 5,
    name: "Safeguard natural buffers to help mitigate hazards",
    description: "Protect and restore ecosystems that provide natural protection",
    keyIndicators: [
      "Mangrove forest conservation",
      "Watershed protection",
      "Coastal zone management",
      "Biodiversity conservation"
    ]
  },
  {
    number: 6,
    name: "Strengthen institutional capacity for resilience",
    description: "Build organizational and technical capacity for DRRM",
    keyIndicators: [
      "Staff training programs",
      "Technical expertise availability",
      "Equipment and resources",
      "Knowledge management systems"
    ]
  },
  {
    number: 7,
    name: "Understand and strengthen societal resilience",
    description: "Engage communities and build social capital for resilience",
    keyIndicators: [
      "Community DRRM committees",
      "Public awareness campaigns",
      "Vulnerable groups inclusion",
      "Social cohesion measures"
    ]
  },
  {
    number: 8,
    name: "Increase infrastructure resilience",
    description: "Ensure critical infrastructure can withstand disasters",
    keyIndicators: [
      "Infrastructure risk assessments",
      "Retrofitting programs",
      "Redundancy and backup systems",
      "Maintenance protocols"
    ]
  },
  {
    number: 9,
    name: "Ensure effective preparedness and response",
    description: "Develop and test emergency preparedness and response plans",
    keyIndicators: [
      "Emergency response plans",
      "Early warning systems",
      "Evacuation protocols",
      "Regular drills and exercises"
    ]
  },
  {
    number: 10,
    name: "Recover better after disasters",
    description: "Implement post-disaster recovery that builds back better",
    keyIndicators: [
      "Recovery planning frameworks",
      "Damage and loss assessments",
      "Build back better principles",
      "Learning and adaptation mechanisms"
    ]
  }
];

// Mock initial data
const mockInitialScores = [
  { id: 1, essential_number: 1, essential_name: "Organize for disaster resilience", score: 65, notes: "Strong DRRM committee but limited stakeholder engagement" },
  { id: 2, essential_number: 2, essential_name: "Identify, understand and use current and future risk scenarios", score: 72, notes: "Comprehensive risk assessments completed annually" },
  { id: 3, essential_number: 3, essential_name: "Strengthen financial capacity for resilience", score: 45, notes: "Limited budget allocation, seeking external funding" },
  { id: 4, essential_number: 4, essential_name: "Pursue resilient urban development and design", score: 58, notes: "Building code enforcement needs improvement" },
  { id: 5, essential_number: 5, essential_name: "Safeguard natural buffers to help mitigate hazards", score: 82, notes: "Excellent mangrove conservation programs" },
  { id: 6, essential_number: 6, essential_name: "Strengthen institutional capacity for resilience", score: 53, notes: "Staff training programs need expansion" },
  { id: 7, essential_number: 7, essential_name: "Understand and strengthen societal resilience", score: 48, notes: "Community engagement requires more inclusive approaches" },
  { id: 8, essential_number: 8, essential_name: "Increase infrastructure resilience", score: 61, notes: "Critical infrastructure assessment completed, retrofitting ongoing" },
  { id: 9, essential_number: 9, essential_name: "Ensure effective preparedness and response", score: 75, notes: "Well-developed emergency response plans with regular testing" },
  { id: 10, essential_number: 10, essential_name: "Recover better after disasters", score: 42, notes: "Recovery frameworks need strengthening" }
];

// Resilience calculation weights and methodology
const resilienceWeights = {
  // Weights based on UNDRR priority and Philippine context
  organizationalStructure: 0.25,
  riskAssessment: 0.20,
  financialCapacity: 0.15,
  infrastructure: 0.20,
  communityEngagement: 0.20
};

export function IntegrationPhase() {
  const [scores, setScores] = useState(mockInitialScores);
  const [loading, setLoading] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [selectedEssential, setSelectedEssential] = useState(null);
  const [assessmentData, setAssessmentData] = useState({
    essential_number: 1,
    indicators: Array(4).fill({ rating: 3, evidence: '' }),
    comments: ''
  });
  const [historicalData] = useState([
    { year: 2022, overallScore: 52.3, essentials: mockInitialScores.map(s => ({...s, score: s.score - 8})) },
    { year: 2023, overallScore: 58.7, essentials: mockInitialScores.map(s => ({...s, score: s.score - 4})) },
    { year: 2024, overallScore: 60.1, essentials: mockInitialScores }
  ]);

  // Calculate overall score with weighted methodology
  const calculateOverallScore = (currentScores) => {
    if (currentScores.length === 0) return 0;
    
    // Group essentials by category for weighted calculation
    const organizationalEssentials = [1, 6]; // Organize and Institutional Capacity
    const riskAssessmentEssentials = [2];    // Risk scenarios
    const financialEssentials = [3];         // Financial capacity
    const infrastructureEssentials = [4, 5, 8]; // Urban dev, Natural buffers, Infrastructure
    const communityEssentials = [7, 9, 10];  // Societal, Preparedness, Recovery
    
    const getAverageScore = (essentialNumbers) => {
      const relevantScores = currentScores.filter(s => essentialNumbers.includes(s.essential_number));
      return relevantScores.length > 0 
        ? relevantScores.reduce((sum, s) => sum + s.score, 0) / relevantScores.length
        : 0;
    };
    
    const orgScore = getAverageScore(organizationalEssentials);
    const riskScore = getAverageScore(riskAssessmentEssentials);
    const financialScore = getAverageScore(financialEssentials);
    const infraScore = getAverageScore(infrastructureEssentials);
    const communityScore = getAverageScore(communityEssentials);
    
    // Apply weighted formula
    const weightedScore = (
      orgScore * resilienceWeights.organizationalStructure +
      riskScore * resilienceWeights.riskAssessment +
      financialScore * resilienceWeights.financialCapacity +
      infraScore * resilienceWeights.infrastructure +
      communityScore * resilienceWeights.communityEngagement
    );
    
    return Math.round(weightedScore * 10) / 10; // Round to 1 decimal
  };

  const overallScore = calculateOverallScore(scores);

  const getScoreColor = (score) => {
    if (score >= 75) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    if (score >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreLevel = (score) => {
    if (score >= 75) return 'Excellent';
    if (score >= 50) return 'Good';
    if (score >= 25) return 'Fair';
    return 'Needs Improvement';
  };

  const calculateEssentialScore = (indicators) => {
    // Each indicator rated 1-5, converted to percentage
    const totalRating = indicators.reduce((sum, ind) => sum + (ind.rating || 3), 0);
    const maxRating = indicators.length * 5;
    return Math.round((totalRating / maxRating) * 100);
  };

  const handleAssessmentSubmit = () => {
    if (!selectedEssential) return;
    
    const newScore = calculateEssentialScore(assessmentData.indicators);
    const essentialInfo = essentials.find(e => e.number === selectedEssential.number);
    
    const updatedScores = scores.map(score => 
      score.essential_number === selectedEssential.number
        ? { 
            ...score, 
            score: newScore,
            notes: assessmentData.comments || `Assessment based on ${assessmentData.indicators.filter(ind => ind.rating).length} indicators`
          }
        : score
    );
    
    setScores(updatedScores);
    setShowAssessmentModal(false);
    setSelectedEssential(null);
    setAssessmentData({
      essential_number: 1,
      indicators: Array(4).fill({ rating: 3, evidence: '' }),
      comments: ''
    });
  };

  const startAssessment = (essential) => {
    setSelectedEssential(essential);
    const currentScore = scores.find(s => s.essential_number === essential.number);
    setAssessmentData({
      essential_number: essential.number,
      indicators: essential.keyIndicators.map((indicator, index) => ({
        rating: currentScore ? Math.round(currentScore.score / 20) : 3, // Convert % to 1-5 scale
        evidence: '',
        indicator
      })),
      comments: currentScore?.notes || ''
    });
    setShowAssessmentModal(true);
  };

  const updateIndicatorRating = (index, rating) => {
    const newIndicators = [...assessmentData.indicators];
    newIndicators[index] = { ...newIndicators[index], rating };
    setAssessmentData({ ...assessmentData, indicators: newIndicators });
  };

  const updateIndicatorEvidence = (index, evidence) => {
    const newIndicators = [...assessmentData.indicators];
    newIndicators[index] = { ...newIndicators[index], evidence };
    setAssessmentData({ ...assessmentData, indicators: newIndicators });
  };

  const currentYearScore = historicalData[2]?.overallScore || overallScore;
  const previousYearScore = historicalData[1]?.overallScore || 0;
  const yearOverYearChange = currentYearScore - previousYearScore;

  return (
    <div>
      <PhaseHeader
        icon={Activity}
        title="Phase 4: Integration"
        description="UNDRR 10 Essentials for Making Cities & Communities Resilient - Philippine Context"
        colorClass="bg-yellow-600"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overall Score</p>
              <p className="text-3xl font-bold text-gray-900">{overallScore.toFixed(1)}%</p>
            </div>
            <Award className="w-10 h-10 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Top Essential</p>
              <p className="text-2xl font-bold text-gray-900">
                {scores.length > 0 ? Math.max(...scores.map(s => s.score)).toFixed(0) : 0}%
              </p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Year-over-Year</p>
              <p className={`text-2xl font-bold ${yearOverYearChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {yearOverYearChange >= 0 ? '+' : ''}{yearOverYearChange.toFixed(1)}%
              </p>
            </div>
            <BarChart3 className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="text-lg font-bold text-gray-900">{getScoreLevel(overallScore)}</p>
            </div>
            <Activity className="w-10 h-10 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Resilience Methodology Explanation */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-start space-x-3">
          <Calculator className="w-6 h-6 text-yellow-600 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Robust Resilience Scoring Methodology</h3>
            <p className="text-sm text-gray-700 mb-2">
              Our resilience score uses a weighted formula based on UNDRR guidelines and Philippine DRRM priorities:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 text-xs">
              <div className="bg-yellow-50 p-2 rounded">
                <span className="font-medium">Organizational (25%)</span>
                <div className="text-gray-600">Essentials 1, 6</div>
              </div>
              <div className="bg-blue-50 p-2 rounded">
                <span className="font-medium">Risk Assessment (20%)</span>
                <div className="text-gray-600">Essential 2</div>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <span className="font-medium">Financial (15%)</span>
                <div className="text-gray-600">Essential 3</div>
              </div>
              <div className="bg-purple-50 p-2 rounded">
                <span className="font-medium">Infrastructure (20%)</span>
                <div className="text-gray-600">Essentials 4, 5, 8</div>
              </div>
              <div className="bg-red-50 p-2 rounded">
                <span className="font-medium">Community (20%)</span>
                <div className="text-gray-600">Essentials 7, 9, 10</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-yellow-900 mb-2">Overall Resilience Score</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 flex items-center justify-end pr-3 ${getScoreColor(overallScore)}`}
                style={{ width: `${overallScore}%` }}
              >
                <span className="text-white font-bold">{overallScore.toFixed(1)}%</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-yellow-900">{getScoreLevel(overallScore)}</p>
            <p className="text-sm text-yellow-700">Year: 2025</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setShowAssessmentModal(true)}
          className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Conduct Resilience Assessment
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">UNDRR 10 Essentials Scorecard</h3>
          <p className="text-sm text-gray-600 mt-1">Track progress across all essentials for disaster resilience</p>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            {essentials.map((essential) => {
              const scoreData = scores.find(s => s.essential_number === essential.number);
              const score = scoreData?.score || 0;
              const notes = scoreData?.notes || 'No assessment conducted yet';
              
              return (
                <div key={essential.number} className="border rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-600 text-white font-bold text-sm">
                          {essential.number}
                        </span>
                        <div>
                          <h4 className="font-semibold text-gray-900">{essential.name}</h4>
                          <p className="text-xs text-gray-600 mt-1">{essential.description}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 ml-11 mt-2">{notes}</p>
                    </div>
                    <div className="text-right ml-4 flex flex-col items-end">
                      <p className="text-2xl font-bold text-gray-900">{score}%</p>
                      <p className="text-xs text-gray-500">{getScoreLevel(score)}</p>
                      <button
                        onClick={() => startAssessment(essential)}
                        className="mt-2 text-xs bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700 transition-colors"
                      >
                        Assess
                      </button>
                    </div>
                  </div>

                  <div className="ml-11">
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${getScoreColor(score)}`}
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Year-over-Year Improvement Tracking</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {historicalData.map((data, index) => (
            <div key={data.year} className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-gray-900 mb-2">{data.year}</div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className={`h-full rounded-full ${getScoreColor(data.overallScore)}`}
                  style={{ width: `${data.overallScore}%` }}
                ></div>
              </div>
              <div className="text-lg font-semibold">{data.overallScore.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">{getScoreLevel(data.overallScore)}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-start space-x-3">
            <PieChart className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Resilience Trend Analysis</h4>
              <p className="text-sm text-gray-700">
                Your resilience score has improved by {(yearOverYearChange / previousYearScore * 100).toFixed(1)}% 
                compared to last year. Focus areas for continued improvement include Financial Capacity (Essential 3) 
                and Community Resilience (Essentials 7 & 10).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Modal */}
      {showAssessmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">
                {selectedEssential 
                  ? `Assess: ${selectedEssential.name}` 
                  : 'Conduct Resilience Assessment'}
              </h3>
              <button onClick={() => setShowAssessmentModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {selectedEssential ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Key Indicators Assessment</h4>
                  <div className="space-y-4">
                    {assessmentData.indicators.map((indicator, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="font-medium text-gray-900 mb-2">
                          {index + 1}. {indicator.indicator}
                        </div>
                        
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5 scale)</label>
                          <div className="flex space-x-2">
                            {[1, 2, 3, 4, 5].map(rating => (
                              <button
                                key={rating}
                                onClick={() => updateIndicatorRating(index, rating)}
                                className={`px-3 py-2 rounded border ${
                                  indicator.rating === rating
                                    ? 'bg-yellow-600 text-white border-yellow-600'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                              >
                                {rating}
                              </button>
                            ))}
                          </div>
                          <div className="flex justify-between text-xs text-gray-600 mt-1">
                            <span>Inadequate (1)</span>
                            <span>Satisfactory (3)</span>
                            <span>Excellent (5)</span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Evidence/Comments</label>
                          <textarea
                            value={indicator.evidence}
                            onChange={(e) => updateIndicatorEvidence(index, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            rows="2"
                            placeholder="Provide evidence or additional comments for this indicator"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Overall Comments</label>
                  <textarea
                    value={assessmentData.comments}
                    onChange={(e) => setAssessmentData({...assessmentData, comments: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    rows="3"
                    placeholder="Add overall comments or recommendations for this essential"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">
                      Current Score: <span className="font-semibold">
                        {calculateEssentialScore(assessmentData.indicators)}%
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Rating Scale: 1=Inadequate, 2=Developing, 3=Satisfactory, 4=Strong, 5=Excellent
                    </p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowAssessmentModal(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAssessmentSubmit}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Assessment
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-700">
                  Select an essential to conduct a detailed resilience assessment. Each essential is evaluated 
                  based on key indicators using a 1-5 rating scale.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {essentials.map(essential => (
                    <button
                      key={essential.number}
                      onClick={() => startAssessment(essential)}
                      className="p-4 text-left border rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-600 text-white font-bold text-sm">
                          {essential.number}
                        </span>
                        <span className="font-medium">{essential.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}