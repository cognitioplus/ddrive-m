import React from 'react';
import { Search, Layers, Filter, Eye, AlertTriangle, Activity } from 'lucide-react';
import PhaseHeader from '../PhaseHeader';

const DetectionPhase: React.FC = () => {
  return (
    <div className="space-y-6">
      <PhaseHeader
        icon={Search}
        title="Phase 1: Detection"
        description="Multi-Source Data Collection & Monitoring"
        colorClass="bg-blue-700"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Interface */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden min-h-[500px] relative">
          <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          {/* Map Controls */}
          <div className="absolute top-4 left-4 z-10 space-y-2">
            <div className="bg-slate-950/80 backdrop-blur p-2 rounded-lg border border-slate-800 flex items-center space-x-2">
              <Search size={14} className="text-slate-500" />
              <input 
                type="text" 
                placeholder="Search coordinates..." 
                className="bg-transparent border-none text-[10px] outline-none w-32 text-white placeholder-slate-500" 
              />
            </div>
            <div className="bg-slate-950/80 backdrop-blur p-2 rounded-lg border border-slate-800 flex flex-col space-y-2">
              <button className="p-1 text-blue-400 hover:bg-slate-800 rounded transition-colors">
                <Layers size={14} />
              </button>
              <button className="p-1 text-slate-400 hover:bg-slate-800 rounded transition-colors">
                <Filter size={14} />
              </button>
              <button className="p-1 text-slate-400 hover:bg-slate-800 rounded transition-colors">
                <Eye size={14} />
              </button>
            </div>
          </div>
          
          {/* Map Visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-64 h-64 border-2 border-blue-500/20 rounded-full animate-pulse flex items-center justify-center">
              <div className="w-48 h-48 border border-blue-500/10 rounded-full"></div>
              <div className="absolute top-10 left-20">
                <AlertTriangle size={20} className="text-red-500 animate-bounce" />
              </div>
              <div className="absolute bottom-20 right-10">
                <Activity size={16} className="text-emerald-400" />
              </div>
            </div>
          </div>
          
          {/* Sensor Feed */}
          <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur p-4 rounded-xl border border-slate-800 max-w-xs">
            <h4 className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest">
              Active Sensor Feed
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-400">PAGASA Doppler</span>
                <span className="text-emerald-400 font-bold">ONLINE</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-400">Water Level S04</span>
                <span className="text-orange-400 font-bold">WARNING</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Signal Health */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white mb-4">Signal Health</h3>
            <div className="space-y-4">
              {['Satellite', 'Radio Link', 'IoT Grid', 'Public Feed'].map((signal) => (
                <div key={signal} className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{signal}</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((bar) => (
                      <div 
                        key={bar} 
                        className={`w-1 h-3 rounded-full ${
                          bar < 4 ? 'bg-blue-500' : 'bg-slate-800'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Detection Logs */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white mb-4">Detection Logs</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="text-[10px] p-2 bg-slate-950 rounded border border-slate-800 text-slate-400"
                >
                  <span className="text-blue-400 mr-2">[10:4{i}]</span> 
                  Sensor ID-998 detected abnormal vibration.
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectionPhase;
