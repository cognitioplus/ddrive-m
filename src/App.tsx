import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import About from './components/About';
import Chatbot from './components/Chatbot';
import DetectionPhase from './components/phases/DetectionPhase';
import DiagnosisPhase from './components/phases/DiagnosisPhase';
import ResponsePhase from './components/phases/ResponsePhase';
import IntegrationPhase from './components/phases/IntegrationPhase';
import ValidationPhase from './components/phases/ValidationPhase';
import EnhancementPhase from './components/phases/EnhancementPhase';
import MonitoringPhase from './components/phases/MonitoringPhase';
import { Bell, Menu, AlertCircle, X } from 'lucide-react';

const APP_LOGO = "https://appimize.app/assets/apps/user_1097/app_12127/draft/icon/app_logo.png?1767462547";

export type TabType = 'landing' | 'dashboard' | 'detection' | 'diagnosis' | 'response' | 
  'integration' | 'validation' | 'enhancement' | 'monitoring' | 'about';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'critical';
  time: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('landing');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock notifications - in production, these would come from real-time monitoring
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Water Level Alert',
      message: 'Sensor S04 reports rising water levels in Brgy San Roque',
      type: 'warning',
      time: '2m ago'
    },
    {
      id: '2',
      title: 'EOC Activation',
      message: 'Emergency Operations Center elevated to Yellow Alert',
      type: 'info',
      time: '15m ago'
    },
    {
      id: '3',
      title: 'System Update',
      message: 'Integration with PAGASA API completed successfully',
      type: 'info',
      time: '1h ago'
    }
  ]);

  // Update timestamp periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdate(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Handle sidebar responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (showNotifications && !target.closest('.notifications-panel') && !target.closest('.notification-button')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications]);

  const renderContent = () => {
    switch(activeTab) {
      case 'landing': return <LandingPage onEnter={() => setActiveTab('dashboard')} />;
      case 'dashboard': return <Dashboard />;
      case 'detection': return <DetectionPhase />;
      case 'diagnosis': return <DiagnosisPhase />;
      case 'response': return <ResponsePhase />;
      case 'integration': return <IntegrationPhase />;
      case 'validation': return <ValidationPhase />;
      case 'enhancement': return <EnhancementPhase />;
      case 'monitoring': return <MonitoringPhase />;
      case 'about': return <About />;
      default: return <Dashboard />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch(type) {
      case 'critical': return 'border-red-500 bg-red-950/50';
      case 'warning': return 'border-orange-500 bg-orange-950/50';
      default: return 'border-blue-500 bg-blue-950/50';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'critical': return '🔴';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  const criticalCount = notifications.filter(n => n.type === 'critical').length;
  const warningCount = notifications.filter(n => n.type === 'warning').length;

  if (activeTab === 'landing') {
    return <LandingPage onEnter={() => setActiveTab('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      {/* Header */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-40 shadow-lg">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
            title={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center space-x-3">
            <img src={APP_LOGO} alt="DDRiVE-M Logo" className="h-8 w-8 object-contain" />
            <div className="flex flex-col leading-none">
              <h1 className="text-xl font-bold tracking-tight text-white">DDRiVE-M</h1>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">
                Intelligence Lifecycle Platform
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* System Status */}
          <div className="hidden lg:flex items-center bg-slate-800 rounded-full px-4 py-1.5 text-[10px] font-bold border border-emerald-500/20 hover:border-emerald-500/40 transition-colors cursor-help" title="All integrated systems operational">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2"></div> 
            <span className="text-emerald-400">ALL SYSTEMS NOMINAL</span>
          </div>

          {/* Last Update Time */}
          <div className="hidden md:flex items-center text-xs text-slate-500">
            <span className="mr-2">Updated:</span>
            <span className="font-mono">{lastUpdate.toLocaleTimeString()}</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="notification-button p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all relative"
              title="Notifications"
            >
              <Bell size={20} />
              {(criticalCount + warningCount) > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-slate-900">
                  {criticalCount + warningCount}
                </div>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="notifications-panel absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Notifications</h3>
                    <p className="text-xs text-slate-500">{notifications.length} total alerts</p>
                  </div>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="p-1 text-slate-500 hover:text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="max-h-96 overflow-y-auto custom-scrollbar">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div 
                        key={notif.id}
                        className={`p-4 border-b border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer border-l-2 ${getNotificationColor(notif.type)}`}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-lg">{getNotificationIcon(notif.type)}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-xs font-bold text-white truncate">{notif.title}</h4>
                              <span className="text-[10px] text-slate-500 ml-2">{notif.time}</span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">{notif.message}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <AlertCircle size={32} className="mx-auto mb-2 text-slate-600" />
                      <p className="text-sm text-slate-500">No notifications</p>
                    </div>
                  )}
                </div>

                <div className="p-3 border-t border-slate-800 bg-slate-950">
                  <button className="w-full py-2 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
                    View All Alerts →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white cursor-pointer hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 hover:ring-offset-slate-900 transition-all" title="Operator Profile">
            OP
          </div>
        </div>
      </header>
      
      {/* Main Layout */}
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        {/* Sidebar Navigation */}
        <Navigation 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isSidebarOpen={isSidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-grow overflow-y-auto p-4 md:p-8 bg-slate-950 custom-scrollbar">
          <div className="max-w-6xl mx-auto pb-20">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Chatbot */}
      <Chatbot />

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow { 
          from { transform: rotate(0deg); } 
          to { transform: rotate(360deg); } 
        }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        
        .custom-scrollbar::-webkit-scrollbar { 
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: rgba(71, 85, 105, 0.5);
          border-radius: 10px;
          transition: background 0.2s;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { 
          background: rgba(71, 85, 105, 0.8);
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Focus styles for accessibility */
        *:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
      `}} />
    </div>
  );
}
