import React, { useState } from 'react';
import { 
  Shield, Users, Award, Book, Globe, Target, Zap, CheckCircle2,
  MapIcon, BarChart3, ClipboardCheck, Swords, FileText, Network,
  ExternalLink, Mail, Phone, MapPin, Github, Linkedin, Twitter,
  ChevronDown, ChevronUp, HelpCircle, MessageSquare, Download
} from 'lucide-react';
import PhaseHeader from './PhaseHeader';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function About() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const faqData: FAQItem[] = [
    {
      id: '1',
      category: 'General',
      question: 'What is DDRiVE-M?',
      answer: 'DDRiVE-M (Disaster & Development Risk Intelligence Vulnerability Explorer - Mindanao) is a comprehensive intelligence lifecycle platform designed to enhance disaster risk reduction and management capabilities. It integrates real-time data, AI-powered analytics, and validated response protocols to empower communities and decision-makers to anticipate, prepare for, and respond to disasters effectively.'
    },
    {
      id: '2',
      category: 'General',
      question: 'Who can use DDRiVE-M?',
      answer: 'DDRiVE-M is designed for Local Government Units (LGUs), national agencies (NDRRMC, OCD, PAGASA, PHIVOLCS), NGOs, community organizations, emergency responders, DRRM officers, and disaster management professionals across the Philippines. The platform supports multi-stakeholder collaboration and coordination.'
    },
    {
      id: '3',
      category: 'Compliance',
      question: 'Is DDRiVE-M compliant with Philippine laws?',
      answer: 'Yes! DDRiVE-M is fully compliant with RA 10121 (Philippine Disaster Risk Reduction and Management Act of 2010) and follows OCD-DILG v.2024 standards. All generated plans and protocols meet official requirements for LGU implementation and OCD inspections.'
    },
    {
      id: '4',
      category: 'Compliance',
      question: 'What international standards does it follow?',
      answer: 'DDRiVE-M implements ISO 31000 (Risk Management), ISO 22301 (Business Continuity), ICS (Incident Command System), and the UNDRR 10 Essentials for Making Cities Resilient. The platform ensures both Philippine compliance and international best practices.'
    },
    {
      id: '5',
      category: 'Features',
      question: 'What are the 7 phases of the intelligence lifecycle?',
      answer: 'The 7 phases are: (1) Detection - Multi-source monitoring, (2) Diagnosis - Risk analysis, (3) Response - Emergency coordination, (4) Integration - System synchronization, (5) Validation - Scenario testing, (6) Enhancement - AI-powered planning, (7) Monitoring - Stakeholder collaboration. Each phase addresses a specific aspect of comprehensive disaster management.'
    },
    {
      id: '6',
      category: 'Features',
      question: 'How does the AI-powered plan generation work?',
      answer: 'The Enhancement Phase uses advanced AI to generate compliance-ready plans (LDRRMP, Contingency, DANA, BCP) based on your specific scenario, location, and requirements. It follows official templates, includes all required sections, and ensures RA 10121 and OCD-DILG v.2024 compliance automatically.'
    },
    {
      id: '7',
      category: 'Features',
      question: 'Can I run disaster simulations?',
      answer: 'Yes! The Validation Phase includes scenario-based simulators for earthquakes (The Big One), super typhoons, tsunamis, and volcanic eruptions. These test your preparedness, identify gaps, generate performance metrics, and help train your team on EOC operations and ICS protocols.'
    },
    {
      id: '8',
      category: 'Technical',
      question: 'What data sources does DDRiVE-M integrate with?',
      answer: 'DDRiVE-M integrates with PAGASA (weather), PHIVOLCS (seismic), NOAH (flood), NDRRMC (coordination), ArcGIS (geospatial), LGU databases, DSWD (social welfare), DOH (health), and IoT sensor networks. The Integration Phase monitors all data pipelines in real-time with 8+ GB/s throughput capacity.'
    },
    {
      id: '9',
      category: 'Technical',
      question: 'How is data security handled?',
      answer: 'DDRiVE-M implements enterprise-grade security with encrypted data transmission, role-based access control, audit logging, secure authentication, and compliance with Data Privacy Act of 2012. All sensitive data is protected and access is tracked for accountability.'
    },
    {
      id: '10',
      category: 'Technical',
      question: 'Can DDRiVE-M work offline?',
      answer: 'Core features require internet connectivity for real-time data integration. However, cached data, generated plans, and certain modules can function in limited connectivity scenarios. Mobile units can sync when connection is restored.'
    },
    {
      id: '11',
      category: 'Usage',
      question: 'How do I interpret the risk heatmap?',
      answer: 'The Diagnosis Phase risk heatmap uses a color-coded 8x8 grid: Red (Critical, 9-10) requires immediate action, Orange (High, 7-8) needs priority treatment, Yellow (Medium, 4-6) planned mitigation, and Green (Low, 1-3) routine monitoring. Click any cell for detailed barangay-level data.'
    },
    {
      id: '12',
      category: 'Usage',
      question: 'What is the EOC Decision Simulator?',
      answer: 'The Validation Phase includes an Emergency Operations Center simulator where you make real-time decisions during disaster scenarios. It scores your choices (max 70 points), checks ICS compliance, tracks response times, and generates performance reports to improve preparedness.'
    },
    {
      id: '13',
      category: 'Usage',
      question: 'How do I generate an LDRRMP?',
      answer: 'Go to Enhancement Phase, select "LDRRMP" as plan type, choose your scenario template (flood, earthquake, etc.), optionally add custom instructions, and click "Generate Plan". The AI creates a comprehensive 7-section plan compliant with RA 10121 in under 60 seconds.'
    },
    {
      id: '14',
      category: 'Support',
      question: 'Is training available?',
      answer: 'Yes! We offer comprehensive training programs including system navigation, DRRM fundamentals, ICS protocols, plan generation workshops, and simulation exercises. Contact your LGU DRRM office or our support team for training schedules and certification programs.'
    },
    {
      id: '15',
      category: 'Support',
      question: 'How do I report issues or request features?',
      answer: 'Use the feedback button in any module, contact our support team via email/phone, or reach out through your LGU coordinator. We continuously improve DDRiVE-M based on user feedback and emerging disaster management needs.'
    }
  ];

  const categories = ['all', 'General', 'Compliance', 'Features', 'Technical', 'Usage', 'Support'];

  const filteredFAQs = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <PhaseHeader title="About DDRiVE-M" description="Platform Information & Knowledge Base" />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 bg-white/20 backdrop-blur rounded-2xl">
              <Shield size={48} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">DDRiVE-M</h1>
              <p className="text-xl text-blue-100 mt-1">Disaster & Development Risk Intelligence Vulnerability Explorer</p>
            </div>
          </div>
          
          <p className="text-lg text-blue-50 leading-relaxed max-w-3xl mb-8">
            A comprehensive intelligence lifecycle platform designed to enhance disaster risk reduction and management 
            capabilities across Mindanao and the Philippines. By integrating real-time data, AI-powered analytics, and 
            validated response protocols, we empower communities and decision-makers to anticipate, prepare for, and 
            respond to disasters effectively.
          </p>

          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-bold flex items-center space-x-2">
              <CheckCircle2 size={16} />
              <span>RA 10121 Compliant</span>
            </div>
            <div className="px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-bold flex items-center space-x-2">
              <CheckCircle2 size={16} />
              <span>ISO 31000 & 22301</span>
            </div>
            <div className="px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-bold flex items-center space-x-2">
              <CheckCircle2 size={16} />
              <span>UNDRR 10 Essentials</span>
            </div>
            <div className="px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-bold flex items-center space-x-2">
              <CheckCircle2 size={16} />
              <span>OCD-DILG v.2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-emerald-900/30 rounded-lg">
              <Users size={24} className="text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Multi-Stakeholder Platform</h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Connects LGUs, NGOs, government agencies (NDRRMC, OCD, PAGASA, PHIVOLCS), and communities 
            in a unified disaster management ecosystem. Real-time collaboration across 28+ active stakeholders.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-900/30 rounded-lg">
              <Award size={24} className="text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Compliance Framework</h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Built on RA 10121 and OCD-DILG v.2024 standards with ISO 31000, ISO 22301, and UNDRR frameworks. 
            Ensures full regulatory compliance and international best practices.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-indigo-900/30 rounded-lg">
              <Book size={24} className="text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Evidence-Based Methodology</h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Integrates proven frameworks including ISO 31000 risk management, ICS emergency protocols, 
            and UNDRR 10 Essentials for comprehensive resilience building.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-orange-900/30 rounded-lg">
              <Shield size={24} className="text-orange-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Validated Response</h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Scenario-based testing with simulations for earthquakes, typhoons, tsunamis, and volcanic eruptions. 
            Ensures readiness for real-world disaster events.
          </p>
        </div>
      </div>

      {/* The 7 Phases */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Zap size={24} className="text-blue-400" />
          <h3 className="text-xl font-bold text-white">The Intelligence Lifecycle (7 Phases)</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { 
              num: 1, 
              name: 'Detection', 
              icon: MapIcon, 
              desc: 'Multi-source data collection and real-time monitoring',
              color: 'bg-blue-600'
            },
            { 
              num: 2, 
              name: 'Diagnosis', 
              icon: BarChart3, 
              desc: 'Risk analysis and vulnerability assessment',
              color: 'bg-orange-600'
            },
            { 
              num: 3, 
              name: 'Response', 
              icon: Zap, 
              desc: 'Coordinated emergency action deployment',
              color: 'bg-red-600'
            },
            { 
              num: 4, 
              name: 'Integration', 
              icon: ClipboardCheck, 
              desc: 'System-wide data synchronization',
              color: 'bg-emerald-600'
            },
            { 
              num: 5, 
              name: 'Validation', 
              icon: Swords, 
              desc: 'Scenario testing and verification',
              color: 'bg-indigo-600'
            },
            { 
              num: 6, 
              name: 'Enhancement', 
              icon: FileText, 
              desc: 'AI-powered plan generation',
              color: 'bg-purple-600'
            },
            { 
              num: 7, 
              name: 'Monitoring', 
              icon: Network, 
              desc: 'Stakeholder collaboration and tracking',
              color: 'bg-slate-600'
            },
          ].map((phase) => {
            const Icon = phase.icon;
            return (
              <div key={phase.num} className="bg-slate-950 border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition-all group">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-8 h-8 rounded-full ${phase.color} text-white text-sm flex items-center justify-center font-bold`}>
                    {phase.num}
                  </div>
                  <div className={`p-2 ${phase.color} bg-opacity-20 rounded-lg`}>
                    <Icon size={20} className="text-white" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{phase.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{phase.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <HelpCircle size={24} className="text-blue-400" />
            <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
          </div>
          <MessageSquare size={20} className="text-slate-500" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {cat === 'all' ? 'All Questions' : cat}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden hover:border-slate-700 transition-all"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/50 transition-colors"
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-[10px] px-2 py-0.5 bg-blue-900/30 text-blue-400 rounded-full font-bold">
                      {faq.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{faq.question}</h4>
                </div>
                {openFAQ === faq.id ? (
                  <ChevronUp size={20} className="text-blue-400 flex-shrink-0" />
                ) : (
                  <ChevronDown size={20} className="text-slate-500 flex-shrink-0" />
                )}
              </button>
              
              {openFAQ === faq.id && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-800">
                  <p className="text-sm text-slate-400 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle size={48} className="mx-auto mb-4 text-slate-700" />
            <p className="text-slate-500">No questions found in this category.</p>
          </div>
        )}
      </div>

      {/* Contact & Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center space-x-2">
            <Mail size={20} className="text-blue-400" />
            <span>Contact & Support</span>
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Mail size={16} className="text-slate-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs text-slate-500 mb-1">Email Support</p>
                <a href="mailto:support@ddrive-m.gov.ph" className="text-sm text-blue-400 hover:text-blue-300">
                  support@ddrive-m.gov.ph
                </a>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Phone size={16} className="text-slate-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs text-slate-500 mb-1">Hotline (24/7)</p>
                <p className="text-sm text-white font-mono">+63 (2) 8888-DRRM (3776)</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <MapPin size={16} className="text-slate-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs text-slate-500 mb-1">Head Office</p>
                <p className="text-sm text-slate-300">
                  NDRRMC Building, Camp Aguinaldo<br />
                  Quezon City, Metro Manila, Philippines
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center space-x-2">
            <Download size={20} className="text-blue-400" />
            <span>Resources & Documentation</span>
          </h3>
          
          <div className="space-y-3">
            <a href="#" className="flex items-center justify-between p-3 bg-slate-950 rounded-lg hover:bg-slate-800 transition-colors group">
              <div className="flex items-center space-x-3">
                <Book size={16} className="text-blue-400" />
                <span className="text-sm text-white">User Manual (PDF)</span>
              </div>
              <ExternalLink size={14} className="text-slate-500 group-hover:text-blue-400" />
            </a>
            
            <a href="#" className="flex items-center justify-between p-3 bg-slate-950 rounded-lg hover:bg-slate-800 transition-colors group">
              <div className="flex items-center space-x-3">
                <FileText size={16} className="text-emerald-400" />
                <span className="text-sm text-white">API Documentation</span>
              </div>
              <ExternalLink size={14} className="text-slate-500 group-hover:text-emerald-400" />
            </a>
            
            <a href="#" className="flex items-center justify-between p-3 bg-slate-950 rounded-lg hover:bg-slate-800 transition-colors group">
              <div className="flex items-center space-x-3">
                <Target size={16} className="text-indigo-400" />
                <span className="text-sm text-white">Training Materials</span>
              </div>
              <ExternalLink size={14} className="text-slate-500 group-hover:text-indigo-400" />
            </a>
            
            <a href="#" className="flex items-center justify-between p-3 bg-slate-950 rounded-lg hover:bg-slate-800 transition-colors group">
              <div className="flex items-center space-x-3">
                <Shield size={16} className="text-orange-400" />
                <span className="text-sm text-white">Compliance Guides</span>
              </div>
              <ExternalLink size={14} className="text-slate-500 group-hover:text-orange-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Version & Credits */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-slate-500 mb-1">Platform Version</p>
            <p className="text-sm font-mono text-white">v2.5.0 (Build 20250104)</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Last Updated</p>
            <p className="text-sm text-slate-300">January 4, 2025</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-2">Connect With Us</p>
            <div className="flex space-x-2">
              <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                <Github size={16} className="text-slate-400" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                <Linkedin size={16} className="text-slate-400" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                <Twitter size={16} className="text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}