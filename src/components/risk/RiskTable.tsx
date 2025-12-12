import React from 'react';
import { Risk, getRiskLevel, getRiskLevelColor } from '@/types/risk';
import { ChevronRight, AlertCircle } from 'lucide-react';

interface RiskTableProps {
  risks: Risk[];
  onRiskClick: (risk: Risk) => void;
}

const RiskTable: React.FC<RiskTableProps> = ({ risks, onRiskClick }) => {
  const getFrameworkBadge = (framework: string) => {
    const colors: Record<string, string> = {
      'ISO 31000': 'bg-blue-100 text-blue-800',
      'COSO ERM': 'bg-purple-100 text-purple-800',
      'DRRM': 'bg-green-100 text-green-800',
      'NIST': 'bg-orange-100 text-orange-800',
    };
    return colors[framework] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      'Identified': 'bg-gray-100 text-gray-700',
      'Active': 'bg-blue-100 text-blue-700',
      'Monitoring': 'bg-yellow-100 text-yellow-700',
      'Closed': 'bg-green-100 text-green-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  if (risks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 text-center">
        <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600">No risks found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-4 border-b bg-slate-50">
        <h3 className="text-lg font-semibold">Risk Register</h3>
        <p className="text-sm text-gray-600">{risks.length} risks identified</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Risk Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Framework</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Score</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Level</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Owner</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {risks.map(risk => {
              const score = risk.likelihood * risk.impact;
              const level = getRiskLevel(score);
              return (
                <tr key={risk.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onRiskClick(risk)}>
                  <td className="px-4 py-3 text-sm font-medium">{risk.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{risk.category?.name || 'N/A'}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded text-xs font-medium ${getFrameworkBadge(risk.framework)}`}>{risk.framework}</span></td>
                  <td className="px-4 py-3 text-sm font-bold">{score}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded text-xs font-medium ${getRiskLevelColor(level)}`}>{level}</span></td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded text-xs ${getStatusBadge(risk.status)}`}>{risk.status}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-600">{risk.owner || '-'}</td>
                  <td className="px-4 py-3"><ChevronRight size={16} className="text-gray-400" /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiskTable;
