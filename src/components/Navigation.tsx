import React, { useState } from 'react';
import { 
  Globe, MapIcon, BarChart3, Zap, ClipboardCheck, 
  Swords, FileText, Network, Info, ChevronRight, Home
} from 'lucide-react';
import { TabType } from '../App';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isSidebarOpen: boolean;
}

interface MenuItem {
  id: TabType;
  icon: any;
  label: string;
  description?: string;
  badge?: string;
  badgeColor?: string;
}

export default function Navigation({ activeTab, setActiveTab, isSidebarOpen }: NavigationProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const mainMenuItems: MenuItem[] = [
    { 
      id: 'dashboard', 
      icon: Globe, 
      label: 'Dashboard',
      description: 'Intelligence overview'
    },
  ];

  const moduleItems: MenuItem[] = [
    { 
      id: 'detection', 
      icon: MapIcon, 
      label: 'Detection',
      description: 'Multi-source monitoring',
      badge: '12',
      badgeColor: 'bg-blue-500'
    },
    { 
      id: 'diagnosis', 
      icon: BarChart3, 
      label: 'Diagnosis',
      description: 'Risk analysis',
      badge: '8',
      badgeColor: 'bg-orange-500'
    },
    { 
      id: 'response', 
      icon: Zap, 
      label: 'Response',
      description: 'Emergency coordination',
      badge: '3',
      badgeColor: 'bg-red-500'
    },
    { 
      id: 'integration', 
      icon: ClipboardCheck, 
      label: 'Integration',
      description: 'System sync',
      badge: '98%',
      badgeColor: 'bg-emerald-500'
    },
    { 
      id: 'validation', 
      icon: Swords, 
      label: 'Validation',
      description: 'Scenario testing',
      badge: '2',
      badgeColor: 'bg-indigo-500'
    },
    { 
      id: 'enhancement', 
      icon: FileText, 
      label: 'Enhancement',
      description: 'AI-powered plans',
      badge: 'NEW',
      badgeColor: 'bg-purple-500'
    },
    { 
      id: 'monitoring', 
      icon: Network, 
      label: 'Monitoring',
      description: 'Command center',
      badge: '28',
      badgeColor: 'bg-slate-500'
    },
  ];

  const bottomMenuItems: MenuItem[] = [
    { 
      id: 'about', 
      icon: Info, 
      label: 'About',
      description: 'Platform information'
    },
  ];

  const renderMenuItem = (item: MenuItem, section: 'main' | 'module' | 'bottom' = 'module') => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;
    const isHovered = hoveredItem === item.id;

    return (
      <button
        key={item.id}
        onClick={() => setActiveTab(item.id)}
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
        className={`w-full flex items-center px-4 py-3 rounded-xl transition-all group relative ${
          isActive
            ? section === 'main' 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
              : 'bg-slate-800 text-blue-400'
            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
        }`}
        title={!isSidebarOpen ? item.label : ''}
      >
        {/* Icon */}
        <div className={`flex-shrink-0 transition-transform ${isActive || isHovered ? 'scale-110' : ''}`}>
          <Icon size={20} />
        </div>

        {/* Label and Description */}
        {isSidebarOpen && (
          <div className="flex-1 ml-3 text-left min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium truncate">{item.label}</span>
              {item.badge && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${item.badgeColor} flex-shrink-0`}>
                  {item.badge}
                </span>
              )}
            </div>
            {item.description && (
              <span className="text-[10px] text-slate-500 truncate block">{item.description}</span>
            )}
          </div>
        )}

        {/* Active Indicator */}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-r-full"></div>
        )}

        {/* Hover Chevron */}
        {!isSidebarOpen && isHovered && (
          <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap z-50 border border-slate-700">
            {item.label}
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-r-4 border-r-slate-800 border-b-4 border-b-transparent"></div>
          </div>
        )}
      </button>
    );
  };

  return (
    <aside className={`${
      isSidebarOpen ? 'w-64' : 'w-20'
    } bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 transition-all duration-300 flex flex-col z-30 shadow-xl`}>
      
      {/* Navigation Header */}
      {isSidebarOpen && (
        <div className="px-4 py-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <Home size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-white truncate">Navigation</h3>
              <p className="text-xs text-slate-500 truncate">7 Phase Lifecycle</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="flex-grow py-6 px-4 space-y-6 overflow-y-auto custom-scrollbar">
        {/* Dashboard Section */}
        <div className="space-y-1">
          {mainMenuItems.map((item) => renderMenuItem(item, 'main'))}
        </div>

        {/* Modules Section */}
        <div className="space-y-1">
          {isSidebarOpen && (
            <div className="px-4 pb-2">
              <div className="flex items-center space-x-2">
                <div className="flex-1 h-px bg-gradient-to-r from-slate-800 to-transparent"></div>
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                  Modules
                </span>
                <div className="flex-1 h-px bg-gradient-to-l from-slate-800 to-transparent"></div>
              </div>
            </div>
          )}
          {moduleItems.map((item) => renderMenuItem(item, 'module'))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="px-4 py-4 border-t border-slate-800 space-y-1">
        {isSidebarOpen && (
          <div className="px-4 pb-2">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
          </div>
        )}
        {bottomMenuItems.map((item) => renderMenuItem(item, 'bottom'))}
        
        {/* Compliance Badges */}
        {isSidebarOpen && (
          <div className="mt-4 px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg">
            <h4 className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-2">
              Compliance
            </h4>
            <div className="flex flex-wrap gap-1">
              <span className="text-[9px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full font-medium">
                RA 10121
              </span>
              <span className="text-[9px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full font-medium">
                ISO 31000
              </span>
              <span className="text-[9px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full font-medium">
                OCD-DILG
              </span>
              <span className="text-[9px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full font-medium">
                UNDRR
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Collapse Button Indicator */}
      {!isSidebarOpen && (
        <div className="px-4 py-3 border-t border-slate-800">
          <div className="flex justify-center">
            <div className="w-8 h-1 bg-slate-700 rounded-full"></div>
          </div>
        </div>
      )}
    </aside>
  );
}