import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Globe, Brain, Users, MapPin, Shield, FileText } from 'lucide-react';

const About = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [faqOpen, setFaqOpen] = useState<{ [key: string]: boolean }>({});

  const methodology = [
    { 
      key: 'D', 
      name: 'Detection', 
      color: '#f59e0b',
      objective: 'Continuously monitor and identify emerging risks through integrated data streams and intelligent sensors.', 
      activities: [
        'Real-time hazard and threat monitoring',
        'Critical asset and infrastructure surveillance',
        'Community vulnerability and exposure mapping',
        'Early warning system integration'
      ],
      tools: [
        'Multi-source Data Fusion Engine',
        'Automated Alerting System',
        'Geospatial Risk Dashboard',
        'Community Reporting Mobile App'
      ]
    },
    { 
      key: 'D', 
      name: 'Diagnosis', 
      color: '#10b981',
      objective: 'Analyze and contextualize risks using advanced analytics to understand impacts, dependencies, and cascading effects.', 
      activities: [
        'Multi-sectoral vulnerability assessment',
        'Impact and consequence modeling',
        'Dependency and interconnectivity analysis',
        'Risk prioritization and scoring'
      ],
      tools: [
        'Risk Intelligence Engine',
        'Cascading Impact Simulator',
        'Resilience Scoring Framework',
        'Dependency Mapping Toolkit'
      ]
    },
    { 
      key: 'R', 
      name: 'Response', 
      color: '#ef4444',
      objective: 'Coordinate immediate actions using real-time data and pre-established protocols to minimize disruption.', 
      activities: [
        'Situational awareness enhancement',
        'Resource mobilization and deployment',
        'Inter-agency coordination activation',
        'Critical service continuity implementation'
      ],
      tools: [
        'Collaborative Response Hub',
        'Resource Tracking System',
        'Communication Protocol Generator',
        'Critical Function Continuity Tracker'
      ]
    },
    { 
      key: 'i', 
      name: 'Integration', 
      color: '#6366f1',
      objective: 'Embed risk intelligence into organizational decision-making and strategic planning processes.', 
      activities: [
        'Risk-informed strategic planning',
        'Stakeholder collaboration and consultation',
        'Policy and regulatory alignment',
        'Cross-sectoral data sharing agreements'
      ],
      tools: [
        'Strategic Risk Integration Platform',
        'Stakeholder Collaboration Workspace',
        'Regulatory Compliance Checker',
        'Secure Data Exchange Framework'
      ]
    },
    { 
      key: 'V', 
      name: 'Validation', 
      color: '#0ea5e9',
      objective: 'Test and verify resilience capabilities through scenario-based exercises and performance measurement.', 
      activities: [
        'Simulation-based scenario testing',
        'Performance metric tracking',
        'Gap analysis and remediation planning',
        'Capacity building and training'
      ],
      tools: [
        'Digital Twin Simulation Environment',
        'Performance Dashboard',
        'Gap Remediation Planner',
        'Competency-Based Training System'
      ]
    },
    { 
      key: 'E', 
      name: 'Enhancement', 
      color: '#f97316',
      objective: 'Strengthen resilience through adaptive learning, innovation, and continuous improvement.', 
      activities: [
        'Lessons learned documentation',
        'Best practice sharing and adoption',
        'Innovation in risk adaptation',
        'Resilience investment planning'
      ],
      tools: [
        'Knowledge Management System',
        'Innovation Repository',
        'Adaptive Learning Platform',
        'Resilience Investment Calculator'
      ]
    },
    { 
      key: 'M', 
      name: 'Monitoring', 
      color: '#3b82f6',
      objective: 'Continuously track, evaluate, and update risk intelligence using feedback loops and adaptive analytics.', 
      activities: [
        'Real-time performance monitoring',
        'Adaptive risk forecasting',
        'Resilience progress benchmarking',
        'Annual review and adaptation cycle'
      ],
      tools: [
        'Adaptive Analytics Engine',
        'Resilience Progress Tracker',
        'Benchmarking Dashboard',
        'Continuous Improvement Cycle Manager'
      ]
    }
  ];

  const faqData = [
    { 
      category: "General Overview", 
      questions: [
        { 
          q: "What is DDRiVE-M?", 
          a: "DDRiVE-M (Data-Driven Risk & Vulnerability Evaluation and Management) is an advanced risk intelligence platform that provides real-time monitoring, predictive analytics, and collaborative tools to strengthen resilience against multi-sectoral risks." 
        },
        { 
          q: "Who uses DDRiVE-M?", 
          a: "DDRiVE-M is designed for local government units (LGUs), civil society organizations (CSOs), small and medium enterprises (SMEs), and public institutions that need to manage complex risk environments." 
        }
      ]
    },
    { 
      category: "Platform Capabilities", 
      questions: [
        { 
          q: "What types of risks does DDRiVE-M monitor?", 
          a: "DDRiVE-M tracks vulnerabilities across five key categories: Strategic Risk (governance, policy), Operational Risk (processes, systems), Financial Risk (resources, funding), External & Environmental Risk (natural hazards, climate), and Reputation & Stakeholder Risk (public trust, partnerships)." 
        },
        { 
          q: "How does DDRiVE-M calculate the Resilience Score?", 
          a: "The Resilience Score (0-100) is generated using ISO 31000-aligned methodologies that assess an organization's risk exposure, adaptive capacity, and recovery preparedness across all risk categories." 
        },
        { 
          q: "Does DDRiVE-M support GIS mapping?", 
          a: "Yes, DDRiVE-M integrates advanced GIS capabilities for spatial risk visualization, asset tracking, exposure analysis, and impact modeling." 
        },
        { 
          q: "Can DDRiVE-M generate risk reports?", 
          a: "Yes, the platform automatically generates comprehensive risk intelligence reports, vulnerability assessments, and resilience progress updates." 
        }
      ]
    },
    { 
      category: "Alerts & Notifications", 
      questions: [
        { 
          q: "What kind of alerts does DDRiVE-M provide?", 
          a: "DDRiVE-M issues real-time alerts for seismic activity, flood risks, infrastructure failures, operational disruptions, and other critical thresholds based on your customized risk profile." 
        },
        { 
          q: "How are alerts prioritized?", 
          a: "Alerts are prioritized using a multi-dimensional scoring system that considers severity, urgency, impact scope, and organizational vulnerability." 
        }
      ]
    },
    { 
      category: "Collaboration & Integration", 
      questions: [
        { 
          q: "How does DDRiVE-M support collaboration?", 
          a: "DDRiVE-M features a secure Collaboration Hub where agencies, partners, and stakeholders can share situational awareness, coordinate responses, and manage joint operations." 
        },
        { 
          q: "Can DDRiVE-M integrate with existing systems?", 
          a: "Yes, DDRiVE-M offers API-based integration with existing emergency management systems, GIS platforms, and organizational databases." 
        }
      ]
    },
    { 
      category: "Technical & Security", 
      questions: [
        { 
          q: "How does DDRiVE-M ensure data security?", 
          a: "DDRiVE-M employs enterprise-grade security including end-to-end encryption, role-based access controls, regular security audits, and compliance with international data protection standards." 
        },
        { 
          q: "Is DDRiVE-M compliant with international standards?", 
          a: "Yes, DDRiVE-M aligns with ISO 31000 risk management guidelines and integrates with global resilience frameworks including the UNDRR Resilience Scorecard." 
        }
      ]
    }
  ];

  const capabilities = [
    { icon: Globe, title: "Real-time Monitoring", desc: "Continuous surveillance of multiple risk indicators with automated alerting for critical thresholds." },
    { icon: MapPin, title: "Geospatial Intelligence", desc: "GIS-based risk mapping with asset tracking, exposure analysis, and impact visualization." },
    { icon: Brain, title: "Predictive Analytics", desc: "AI-driven forecasting models that anticipate cascading impacts and secondary effects." },
    { icon: FileText, title: "Multi-sectoral Assessment", desc: "Comprehensive risk scoring across strategic, operational, financial, environmental, and reputational domains." },
    { icon: Users, title: "Collaborative Hub", desc: "Secure platform for inter-agency coordination, resource sharing, and joint response planning." },
    { icon: BarChart3, title: "Resilience Benchmarking", desc: "ISO 31000-aligned scoring system to measure, track, and improve organizational resilience over time." }
  ];

  const toggleFaq = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setFaqOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex-grow w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden min-h-[90vh] border border-slate-200">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 md:p-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 text-white">DDRiVE-M</h1>
            <p className="text-blue-100 text-sm md:text-base font-semibold mb-2">
              Data-Driven Risk & Vulnerability Evaluation and Management
            </p>
            <p className="text-white text-lg md:text-xl font-extrabold">Empowering Resilience Through Intelligence</p>
            <div className="mt-4 max-w-3xl text-blue-100 text-sm md:text-base">
              DDRiVE-M is an advanced risk intelligence platform that provides LGUs, CSOs, SMEs, and institutions with real-time monitoring, predictive analytics, and collaborative tools to strengthen resilience against multi-sectoral risks.
            </div>
          </div>
        </header>

        {/* Pillars */}
        <section className="p-6 md:p-10 border-b border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">The DDRiVE-M Difference</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 rounded-lg shadow-sm text-center">
              <span className="text-4xl block mb-3">📊</span>
              <h3 className="font-semibold text-lg mb-2">Predictive Intelligence</h3>
              <p className="text-sm text-slate-600">Advanced analytics and machine learning models forecast risks before they materialize, enabling proactive decision-making.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg shadow-sm text-center">
              <span className="text-4xl block mb-3">🌐</span>
              <h3 className="font-semibold text-lg mb-2">Holistic Risk Mapping</h3>
              <p className="text-sm text-slate-600">Comprehensive vulnerability assessment across strategic, operational, financial, environmental, and reputational risk categories.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg shadow-sm text-center">
              <span className="text-4xl block mb-3">🤝</span>
              <h3 className="font-semibold text-lg mb-2">Collaborative Resilience</h3>
              <p className="text-sm text-slate-600">Shared situational awareness and coordinated response mechanisms across agencies, sectors, and communities.</p>
            </div>
          </div>
        </section>

        {/* Capabilities Banner */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 md:p-6 border-b border-slate-200">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Core Capabilities</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Real-time Risk Monitoring",
                "Multi-sectoral Vulnerability Assessment",
                "Predictive Analytics",
                "Collaborative Response Hub",
                "Resilience Scoring",
                "GIS-based Risk Mapping"
              ].map((cap, i) => (
                <span 
                  key={i}
                  className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Methodology Explorer */}
        <section className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">The DDRiVE-M Intelligence Cycle</h2>
            <p className="text-sm text-slate-600 mb-6">
              DDRiVE-M operationalizes a continuous intelligence cycle that transforms data into actionable insights for resilience management. Click on each step to explore how we turn information into preparedness.
            </p>
            
            <div className="space-y-2">
              {methodology.map((step, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg cursor-pointer flex items-center gap-4 border border-slate-200 shadow-sm transition-all duration-300 ${
                    activeStep === index 
                      ? 'border-l-4 border-l-sky-500 bg-sky-50' 
                      : 'bg-white hover:bg-slate-50 hover:shadow-md'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <span className="text-3xl font-bold" style={{ color: step.color }}>{step.key}</span>
                  <div>
                    <div className="font-semibold text-slate-800">{step.name}</div>
                    <div className="text-xs text-slate-500">{step.objective.substring(0, 60)}...</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-sky-300/50 min-h-[400px]">
              <span 
                className="text-5xl font-extrabold block mb-4" 
                style={{ color: methodology[activeStep].color }}
              >
                {methodology[activeStep].key}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{methodology[activeStep].name} Phase</h3>
              <p className="text-lg text-slate-700 mb-6 border-b pb-4">{methodology[activeStep].objective}</p>
              
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">Key Activities</h4>
              <ul className="space-y-3 mb-6">
                {methodology[activeStep].activities.map((activity, idx) => (
                  <li key={idx} className="flex items-start text-sm text-slate-600 pl-5 relative">
                    <span className="absolute left-0 top-1 w-2 h-2 bg-emerald-500 rounded-full mt-0.5"></span>
                    {activity}
                  </li>
                ))}
              </ul>

              <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2 border-t pt-4">Integrated Tools</h4>
              <ul className="space-y-3">
                {methodology[activeStep].tools.map((tool, idx) => (
                  <li key={idx} className="flex items-start text-sm text-slate-600 pl-5 relative">
                    <span className="absolute left-0 top-1 w-2 h-2 bg-violet-500 rounded-full mt-0.5"></span>
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Platform Capabilities */}
        <section className="p-6 md:p-10 border-t border-slate-100 bg-slate-50/50">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Integrated Platform Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="font-bold text-lg mb-3 text-slate-800 flex items-center">
                  <cap.icon className="text-xl mr-2" />
                  {cap.title}
                </h3>
                <p className="text-sm text-slate-600">{cap.desc}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="p-6 md:p-10 border-t border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">📘 DDRiVE-M Platform FAQ</h2>
          <div className="max-w-4xl mx-auto">
            {faqData.map((category, catIdx) => (
              <div key={catIdx} className="mb-8">
                <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b">{category.category}</h3>
                {category.questions.map((q, qIdx) => {
                  const isOpen = faqOpen[`${catIdx}-${qIdx}`];
                  return (
                    <div key={qIdx} className="mb-3 rounded-lg border border-slate-200 overflow-hidden">
                      <div 
                        className="bg-slate-50 p-4 flex justify-between items-center cursor-pointer"
                        onClick={() => toggleFaq(catIdx, qIdx)}
                      >
                        <span className="font-medium">{q.q}</span>
                        <span className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </div>
                      <div 
                        className={`bg-white transition-all duration-300 overflow-hidden ${
                          isOpen ? 'max-h-96 py-4' : 'max-h-0'
                        }`}
                      >
                        <div className="px-4 text-slate-600">{q.a}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-800 border-t border-slate-700 p-6 text-center text-sm text-slate-300">
          <p className="mb-2">
            For detailed information on data handling, please refer to our{' '}
            <a 
              href="https://ddrive-erm.appimize.app/privacy-policy" 
              className="text-blue-300 hover:text-blue-100 underline font-medium"
            >
              Privacy Policy
            </a>.
          </p>
          <p>© 2025 DDRiVE-M Platform. Built for Resilience.</p>
        </footer>
      </div>
    </div>
  );
};

export default About;
