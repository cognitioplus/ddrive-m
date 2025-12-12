import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import GeoRiskPanel from '@/components/georisk/GeoRiskPanel';
import KPICard from '@/components/dashboard/KPICard';
import RiskHeatMap from '@/components/dashboard/RiskHeatMap';
import { Shield, AlertTriangle, FileCheck, Users, TrendingUp, Activity } from 'lucide-react';
const Dashboard: React.FC = () => {
  return <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title="Dashboard" />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <img src="https://d64gsuwffb70l.cloudfront.net/68d3fb0f105440087b25ffb9_1762291953644_9333c0ac.png" alt="DDRiVE-M Banner" className="w-full h-48 object-cover rounded-lg shadow-lg" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <KPICard title="Risk Exposure Score" value="72/100" change="-5% from last month" icon={Shield} color="bg-blue-600" />
            <KPICard title="Critical Risks" value="8" change="+2 this week" icon={AlertTriangle} color="bg-red-600" />
            <KPICard title="Active Plans" value="24" icon={FileCheck} color="bg-green-600" />
            <KPICard title="Compliance Rate" value="94%" change="+3%" icon={Activity} color="bg-purple-600" />
            <KPICard title="Team Members" value="156" icon={Users} color="bg-indigo-600" />
            <KPICard title="Risk Trend" value="Improving" icon={TrendingUp} color="bg-teal-600" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <RiskHeatMap />
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {['DRRM Plan updated', 'New risk identified: Data breach', 'Compliance audit completed', 'Recovery plan approved'].map((activity, i) => <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">{activity}</span>
                  </div>)}
              </div>
            </div>
            <GeoRiskPanel />
          </div>
        </main>
      </div>
    </div>;
};
export default Dashboard;
