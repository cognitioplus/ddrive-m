import React, { useState } from 'react';
import { BarChart3, TrendingUp, AlertCircle, Map, Download, Filter, Upload } from 'lucide-react';
import PhaseHeader from '../PhaseHeader';

export default function DiagnosisPhase() {
  const [activeView, setActiveView] = useState<'heatmap' | 'vulnerability' | 'impact'>('heatmap');
  const [selectedBarangay, setSelectedBarangay] = useState<string | null>(null);

  const vulnerabilityData = [
    { 
      name: "San Roque", 
      population: "12,400", 
      infrastructure: "Bridge/School", 
      hazard: "Flood/Earthquake",
      score: 8.2,
      exposure: "High",
      capacity: "Medium"
    },
    { 
      name: "Santa Maria", 
      population: "5,120", 
      infrastructure: "Coastal Wall", 
      hazard: "Tsunami/Storm Surge",
      score: 6.5,
      exposure: "Medium",
      capacity: "Low"
    },
    { 
      name: "Malaya", 
      population: "18,900", 
      infrastructure: "Substation", 
      hazard: "Landslide/Flood",
      score: 9.1,
      exposure: "Very High",
      capacity: "Low"
    },
    { 
      name: "Bagong Silang", 
      population: "7,800", 
      infrastructure: "Health Center", 
      hazard: "Fire/Earthquake",
      score: 5.8,
      exposure: "Medium",
      capacity: "Medium"
    },
  ];

  const riskCategories = [
    { name: "Geophysical", value: 72, color: "bg-red-500" },
    { name: "Hydrometeorological", value: 85, color: "bg-orange-500" },
    { name: "Biological", value: 45, color: "bg-yellow-500" },
    { name: "Technological", value: 38, color: "bg-blue-500" },
  ];

  const impactAnalysis = [
    { sector: "Population", affected: "45,220", percentage: 34, trend: "up" },
    { sector: "Infrastructure", affected: "128 units", percentage: 42, trend: "stable" },
    { sector: "Agriculture", affected: "₱2.4M", percentage: 28, trend: "down" },
    { sector: "Economy", affected: "₱8.1M", percentage: 51, trend: "up" },
  ];

  return (
    <div className="space-y-6">
      <PhaseHeader 
        title="Diagnosis" 
        description="Risk Analysis & Vulnerability Assessment Framework"
      />

      {/* Action Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors">
            <Upload size={16} />
            <span>Import Data</span>
          </button>
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors">
            <Filter size={16} />
            <span>Filters</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500">Last Updated:</span>
          <span className="text-xs text-emerald-400 font-mono">2025-01-04 14:32</span>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex space-x-2 border-b border-slate-800">
        {[
          { id: 'heatmap', label: 'Risk Heatmap' },
          { id: 'vulnerability', label: 'Vulnerability Matrix' },
          { id: 'impact', label: 'Impact Analysis' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id as any)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeView === tab.id
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      {activeView === 'heatmap' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Spatial Risk Heatmap */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-white">Spatial Risk Distribution</h3>
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <Download size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-8 gap-1 aspect-video mb-4">
              {Array.from({ length: 64 }).map((_, i) => {
                const riskLevel = i % 11 === 0 ? 'critical' : i % 5 === 0 ? 'high' : i % 3 === 0 ? 'medium' : 'low';
                return (
                  <div 
                    key={i} 
                    className={`rounded border border-slate-950/20 flex items-center justify-center text-[8px] font-bold transition-all hover:scale-110 cursor-pointer
                      ${riskLevel === 'critical' ? 'bg-red-900/70 text-red-200' : 
                        riskLevel === 'high' ? 'bg-orange-900/60 text-orange-200' : 
                        riskLevel === 'medium' ? 'bg-yellow-900/50 text-yellow-200' :
                        'bg-slate-800/50 text-slate-500'}`}
                    title={`Grid ${i + 1}`}
                  >
                    {riskLevel === 'critical' ? '!!!' : riskLevel === 'high' ? '!!' : ''}
                  </div>
                );
              })}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-4 text-[10px] text-slate-500">
                <div className="flex items-center"><div className="w-3 h-3 bg-red-900/70 mr-1.5 rounded-sm"></div> Critical (9-10)</div>
                <div className="flex items-center"><div className="w-3 h-3 bg-orange-900/60 mr-1.5 rounded-sm"></div> High (7-8)</div>
                <div className="flex items-center"><div className="w-3 h-3 bg-yellow-900/50 mr-1.5 rounded-sm"></div> Medium (4-6)</div>
                <div className="flex items-center"><div className="w-3 h-3 bg-slate-800/50 mr-1.5 rounded-sm"></div> Low (1-3)</div>
              </div>
              <span className="text-[10px] text-slate-600 font-mono">Resolution: 500m²</span>
            </div>
          </div>

          {/* Risk Category Breakdown */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-sm font-bold text-white mb-6">Risk Categories</h3>
              <div className="space-y-4">
                {riskCategories.map((category) => (
                  <div key={category.name}>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-400">{category.name}</span>
                      <span className="text-white font-mono">{category.value}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${category.color} transition-all duration-500`}
                        style={{ width: `${category.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-sm font-bold text-white mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Total Barangays</span>
                  <span className="text-sm font-bold text-white">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">High Risk Areas</span>
                  <span className="text-sm font-bold text-red-400">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Population at Risk</span>
                  <span className="text-sm font-bold text-orange-400">45,220</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'vulnerability' && (
        <div className="grid grid-cols-1 gap-6">
          {/* Vulnerability Data Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-white">Comprehensive Vulnerability Assessment</h3>
              <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-white rounded-lg transition-colors flex items-center space-x-2">
                <Download size={14} />
                <span>Export CSV</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-800">
                  <tr>
                    <th className="pb-3 pr-4 font-medium">Barangay</th>
                    <th className="pb-3 pr-4 font-medium">Population</th>
                    <th className="pb-3 pr-4 font-medium">Critical Infrastructure</th>
                    <th className="pb-3 pr-4 font-medium">Primary Hazard</th>
                    <th className="pb-3 pr-4 font-medium">Exposure</th>
                    <th className="pb-3 pr-4 font-medium">Capacity</th>
                    <th className="pb-3 pr-4 font-medium text-right">Risk Score</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  {vulnerabilityData.map((row, i) => (
                    <tr 
                      key={i} 
                      className={`border-b border-slate-800/50 hover:bg-slate-800/30 cursor-pointer transition-colors ${
                        selectedBarangay === row.name ? 'bg-slate-800/50' : ''
                      }`}
                      onClick={() => setSelectedBarangay(row.name)}
                    >
                      <td className="py-4 pr-4 font-medium text-white">{row.name}</td>
                      <td className="py-4 pr-4">{row.population}</td>
                      <td className="py-4 pr-4">{row.infrastructure}</td>
                      <td className="py-4 pr-4">{row.hazard}</td>
                      <td className="py-4 pr-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          row.exposure === 'Very High' ? 'bg-red-900/30 text-red-400' :
                          row.exposure === 'High' ? 'bg-orange-900/30 text-orange-400' :
                          'bg-yellow-900/30 text-yellow-400'
                        }`}>
                          {row.exposure}
                        </span>
                      </td>
                      <td className="py-4 pr-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          row.capacity === 'Low' ? 'bg-red-900/30 text-red-400' :
                          'bg-blue-900/30 text-blue-400'
                        }`}>
                          {row.capacity}
                        </span>
                      </td>
                      <td className="py-4 pr-4 font-mono text-right">
                        <span className={`text-sm font-bold ${
                          row.score >= 8 ? 'text-red-400' :
                          row.score >= 6 ? 'text-orange-400' :
                          'text-yellow-400'
                        }`}>
                          {row.score.toFixed(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed View */}
          {selectedBarangay && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-white">Detailed Analysis: {selectedBarangay}</h3>
                <button 
                  onClick={() => setSelectedBarangay(null)}
                  className="text-xs text-slate-500 hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
                  <div className="text-[10px] text-slate-500 uppercase mb-2">Hazard Profile</div>
                  <div className="text-sm text-white font-medium">Multi-hazard zone requiring integrated approach</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
                  <div className="text-[10px] text-slate-500 uppercase mb-2">Vulnerability Drivers</div>
                  <div className="text-sm text-white font-medium">High population density, aging infrastructure</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
                  <div className="text-[10px] text-slate-500 uppercase mb-2">Recommended Actions</div>
                  <div className="text-sm text-white font-medium">Early warning system, structural reinforcement</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeView === 'impact' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Impact Projections */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white mb-6">Multi-Sectoral Impact Analysis</h3>
            <div className="space-y-4">
              {impactAnalysis.map((item) => (
                <div key={item.sector} className="bg-slate-950 border border-slate-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <AlertCircle size={16} className={
                        item.percentage > 40 ? 'text-red-400' : 
                        item.percentage > 25 ? 'text-orange-400' : 
                        'text-yellow-400'
                      } />
                      <span className="text-sm font-bold text-white">{item.sector}</span>
                    </div>
                    <TrendingUp size={14} className={
                      item.trend === 'up' ? 'text-red-400' : 
                      item.trend === 'down' ? 'text-emerald-400' : 
                      'text-slate-500'
                    } />
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-lg font-mono text-white">{item.affected}</span>
                    <span className="text-xs text-slate-500">Estimated {item.percentage}% impact</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cascading Effects */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white mb-6">Cascading Effects Analysis</h3>
            <div className="space-y-4">
              <div className="bg-slate-950 border-l-4 border-red-500 rounded-r-lg p-4">
                <h4 className="text-xs font-bold text-red-400 mb-2">PRIMARY IMPACT</h4>
                <p className="text-sm text-slate-300">Infrastructure damage disrupts emergency services</p>
              </div>
              <div className="ml-4 bg-slate-950 border-l-4 border-orange-500 rounded-r-lg p-4">
                <h4 className="text-xs font-bold text-orange-400 mb-2">SECONDARY IMPACT</h4>
                <p className="text-sm text-slate-300">Limited access delays medical response by 40%</p>
              </div>
              <div className="ml-8 bg-slate-950 border-l-4 border-yellow-500 rounded-r-lg p-4">
                <h4 className="text-xs font-bold text-yellow-400 mb-2">TERTIARY IMPACT</h4>
                <p className="text-sm text-slate-300">Economic losses estimated at ₱8.1M over 6 months</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}