import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<string>('dashboard');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      addWelcomeMessage();
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Detect current phase from URL or context
    const path = window.location.pathname;
    const phase = path.split('/').pop() || 'dashboard';
    setCurrentPhase(phase);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addWelcomeMessage = () => {
    const welcomeMsg: Message = {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm **DDRiVER**, your AI assistant for the DDRiVE-M Intelligence Lifecycle Platform.

I'm context-aware and can help you with:

🎯 **Current Phase Guidance** - Tips specific to where you are in the system
📊 **Data Analysis** - Interpret your risk assessments and metrics  
📋 **Compliance** - RA 10121, ISO 31000, OCD-DILG v.2024, UNDRR
🚨 **Emergency Response** - ICS protocols and best practices
📝 **Plan Generation** - LDRRMP, Contingency, BCP guidance
🔍 **System Navigation** - How to use specific features

Ask me anything about disaster risk management!`,
      timestamp: new Date().toISOString()
    };
    setMessages([welcomeMsg]);
  };

  const getContextualResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Context-aware responses based on current phase
    const phaseContexts: Record<string, string> = {
      detection: "Since you're in the Detection Phase, I can help you understand the multi-source monitoring system, sensor health indicators, detection logs, and how to interpret hazard alerts from PAGASA, PHIVOLCS, and other agencies.",
      diagnosis: "I see you're working in the Diagnosis Phase. I can assist with risk heatmap interpretation, vulnerability assessment methodology, impact analysis, and ISO 31000-compliant risk scoring.",
      response: "You're in the Response Phase. I can guide you through EOC operations, ICS protocols, resource deployment, dispatch coordination, and evacuation center management.",
      integration: "Currently in Integration Phase. I can explain data pipeline health, system connections, data quality metrics, and how to troubleshoot integration issues.",
      validation: "In the Validation Phase, I can help you understand scenario simulations, EOC decision testing, performance benchmarking, and compliance verification processes.",
      enhancement: "You're using the Enhancement Phase. I can assist with AI-powered plan generation, template selection, compliance frameworks, and statutory requirements.",
      monitoring: "In the Monitoring Phase, I can guide you through stakeholder coordination, alert systems, collaboration tools, and real-time command center operations."
    };

    // Check for phase-specific questions
    if (lowerMessage.includes('current phase') || lowerMessage.includes('where am i') || lowerMessage.includes('this phase')) {
      const phaseNames: Record<string, string> = {
        detection: 'Detection - Multi-Source Data Collection & Monitoring',
        diagnosis: 'Diagnosis - Risk Analysis & Vulnerability Assessment',
        response: 'Response - Coordinated Emergency Action & ICS Deployment',
        integration: 'Integration - Multi-System Data Synchronization',
        validation: 'Validation - Scenario Testing & Capacity Verification',
        enhancement: 'Enhancement - AI-Powered Plan Generation',
        monitoring: 'Monitoring - Stakeholder Collaboration & Tracking',
        dashboard: 'Dashboard - Intelligence Lifecycle Overview'
      };
      
      return `You are currently in the **${phaseNames[currentPhase] || 'Dashboard'}**.

${phaseContexts[currentPhase] || 'From the Dashboard, you can monitor all seven phases of the intelligence lifecycle and track overall system performance.'}

Would you like specific guidance on this phase's features?`;
    }

    // RA 10121 and Philippine Standards
    if (lowerMessage.includes('ra 10121') || lowerMessage.includes('philippine disaster')) {
      return `**RA 10121: Philippine Disaster Risk Reduction and Management Act of 2010**

This law establishes the National DRRM Framework with four thematic areas:

1. **Prevention & Mitigation** - Reduce vulnerability to hazards
2. **Preparedness** - Capacity building and planning
3. **Response** - Emergency relief and assistance
4. **Rehabilitation & Recovery** - Post-disaster restoration

**Key Requirements:**
- Local DRRM councils at all levels
- DRRM Plans (LDRRMP) updated every 5 years
- 5% Local DRRM Fund allocation
- Community-based DRRM programs

**In DDRiVE-M:** Our Enhancement Phase generates RA 10121-compliant LDRRMPs automatically. The Diagnosis Phase helps identify vulnerabilities, and the Response Phase follows mandated protocols.

Need help with LDRRMP generation or compliance verification?`;
    }

    // ISO 31000
    if (lowerMessage.includes('iso 31000') || lowerMessage.includes('risk management standard')) {
      return `**ISO 31000: Risk Management Standard**

The international framework for risk management with key principles:

📋 **Risk Management Process:**
1. Establishing context
2. Risk identification
3. Risk analysis (likelihood × impact)
4. Risk evaluation
5. Risk treatment
6. Monitoring and review

**In DDRiVE-M:**
- **Diagnosis Phase** implements ISO 31000 methodology
- Risk scores: Critical (8-10), High (6-7), Medium (4-5), Low (1-3)
- Likelihood vs Impact heatmaps
- Continuous monitoring and reassessment

The system calculates risk = Likelihood × Impact with scoring from 1-10 on each axis.

Want to know how to interpret your risk heatmap?`;
    }

    // OCD-DILG Standards
    if (lowerMessage.includes('ocd') || lowerMessage.includes('dilg') || lowerMessage.includes('v.2024')) {
      return `**OCD-DILG v.2024 Standards**

The Office of Civil Defense and Department of Interior & Local Government guidelines for LGU implementation:

✅ **Compliance Requirements:**
- Updated LDRRMP (5-year cycle)
- Functional Local DRRM Office
- Regular training and drills
- Early warning systems
- Evacuation plans and centers
- ICS implementation

**DDRiVE-M Compliance Features:**
- All generated plans follow OCD-DILG templates
- Built-in compliance checkers
- Drill scheduling and tracking
- ICS command structure tools

Our Enhancement Phase ensures all generated documents meet current OCD-DILG v.2024 standards.

Need help preparing for an OCD inspection?`;
    }

    // UNDRR 10 Essentials
    if (lowerMessage.includes('undrr') || lowerMessage.includes('10 essentials') || lowerMessage.includes('resilience score')) {
      return `**UNDRR 10 Essentials for Making Cities Resilient**

Framework for building disaster-resilient communities:

1. **Organize for Resilience** - Governance & coordination (25% weight)
2. **Identify Risk** - Assessment & monitoring (20%)
3. **Financial Capacity** - Budget & resources (15%)
4. **Resilient Development** - Planning integration (10%)
5. **Natural Buffers** - Ecosystem protection (5%)
6. **Institutional Capacity** - Training & systems (10%)
7. **Societal Capacity** - Community engagement (5%)
8. **Infrastructure Resilience** - Critical facilities (20%)
9. **Effective Preparedness** - Response readiness (10%)
10. **Expedite Recovery** - Build back better (5%)

**Your Current Resilience Score:** Check the Dashboard for your weighted composite score.

**In DDRiVE-M:** The Integration Phase tracks all 10 Essentials with progress bars and year-over-year improvement metrics.

Want detailed guidance on improving a specific essential?`;
    }

    // ICS (Incident Command System)
    if (lowerMessage.includes('ics') || lowerMessage.includes('incident command')) {
      return `**Incident Command System (ICS)**

Standardized emergency management structure used in the Response Phase:

**Command Structure:**
- Incident Commander (IC)
- Operations Section Chief
- Planning Section Chief
- Logistics Section Chief
- Finance/Admin Section Chief

**Key Features in DDRiVE-M:**
- EOC alert levels (Blue → Yellow → Orange → Red)
- Resource tracking and deployment
- Real-time dispatch logging
- Multi-agency coordination tools
- Situational reports (SITREP) generation

**Response Phase Tools:**
- Active unit monitoring (15/18 units example)
- Priority-tagged dispatch logs
- Evacuation center capacity tracking
- Quick action buttons for broadcasts

Currently, you can activate EOC protocols directly from the Response Phase interface.

Need help setting up an EOC or understanding alert levels?`;
    }

    // Detection Phase specific
    if ((lowerMessage.includes('detection') || lowerMessage.includes('monitoring') || lowerMessage.includes('sensor')) && !lowerMessage.includes('phase 7')) {
      return `**Detection Phase - Real-Time Hazard Monitoring**

Multi-source data integration from Philippine agencies:

📡 **Data Sources:**
- **PAGASA** - Weather, typhoons, rainfall
- **PHIVOLCS** - Earthquakes, volcanic activity
- **NOAH** - Flood forecasting and monitoring
- **LGU Sensors** - Local IoT networks

🎯 **Key Features:**
- Interactive spatial risk map
- Signal health monitoring
- Detection logs with timestamps
- Layer controls and filters

**Current Status:** ${currentPhase === 'detection' ? 'You can view active hazards and sensor feeds now.' : 'Navigate to Detection Phase to see real-time monitoring.'}

The system aggregates data every 2-5 minutes and triggers alerts for critical conditions.

Want to know how to interpret sensor readings?`;
    }

    // Diagnosis Phase specific
    if (lowerMessage.includes('diagnosis') || lowerMessage.includes('vulnerability') || lowerMessage.includes('heatmap')) {
      return `**Diagnosis Phase - Risk Analysis & Assessment**

ISO 31000-compliant vulnerability assessment:

📊 **Three Views:**
1. **Risk Heatmap** - 8×8 spatial grid with color-coded severity
2. **Vulnerability Matrix** - Detailed barangay-level data
3. **Impact Analysis** - Multi-sectoral projections

**Risk Classification:**
- 🔴 Critical (9-10): Immediate action required
- 🟠 High (7-8): Priority treatment needed
- 🟡 Medium (4-6): Planned mitigation
- 🟢 Low (1-3): Routine monitoring

**Cascading Effects:** The system tracks primary → secondary → tertiary impacts.

${currentPhase === 'diagnosis' ? 'Use the tabs to switch between views and click barangays for detailed analysis.' : 'Navigate to Diagnosis to perform risk assessments.'}

Need help interpreting your risk scores?`;
    }

    // Enhancement Phase specific
    if (lowerMessage.includes('enhancement') || lowerMessage.includes('plan generation') || lowerMessage.includes('ldrrmp')) {
      return `**Enhancement Phase - AI-Powered Plan Generation**

Generate compliance-ready statutory plans:

📝 **Plan Types Available:**
1. **LDRRMP** - Local DRRM Plan (RA 10121)
2. **Contingency** - Hazard-specific protocols
3. **DANA** - Disaster Needs Assessment
4. **BCP** - Business Continuity Plan

**Generation Process:**
1. Select plan type
2. Choose scenario template (flood, earthquake, typhoon, etc.)
3. Add custom instructions (optional)
4. Click "Generate Plan"
5. AI creates 7-section comprehensive plan

**Compliance Standards:**
- RA 10121 compliant
- OCD-DILG v.2024 templates
- Climate-adaptive frameworks
- UNDRR Sendai alignment

${currentPhase === 'enhancement' ? 'You can generate a plan right now - just select your options above!' : 'Navigate to Enhancement to create plans.'}

Want me to suggest which plan type fits your needs?`;
    }

    // Validation Phase specific
    if (lowerMessage.includes('validation') || lowerMessage.includes('simulation') || lowerMessage.includes('drill')) {
      return `**Validation Phase - Scenario Testing & Drills**

Test your preparedness through realistic simulations:

🎯 **Available Scenarios:**
- The Big One (Mag 7.2 Earthquake)
- Super Typhoon (Cat 5 with storm surge)
- Tsunami Event (Mag 8.0 offshore)
- Volcanic Eruption (Phreatic to Plinian)

**Simulation Features:**
- 6-phase progressive timeline
- Decision point scoring (70 max)
- Performance benchmarking
- ICS compliance checking

**Results Include:**
- Casualty estimates
- Infrastructure damage %
- Economic loss projections
- Evacuee numbers
- Response time metrics

**EOC Decision Simulator:** Test command decisions and earn readiness scores.

${currentPhase === 'validation' ? 'Click any scenario card to launch a simulation!' : 'Navigate to Validation to run drills.'}

Want tips on improving your simulation scores?`;
    }

    // Help and navigation
    if (lowerMessage.includes('help') || lowerMessage.includes('how to') || lowerMessage.includes('guide')) {
      return `**How can I help you?**

I can assist with:

🎯 **Phase-Specific Guidance**
- Detection, Diagnosis, Response, Integration, Validation, Enhancement, Monitoring

📋 **Compliance & Standards**
- RA 10121, ISO 31000, ISO 22301, OCD-DILG v.2024, UNDRR, ICS

📊 **Data Interpretation**
- Risk scores, resilience metrics, heatmaps, performance indicators

🚨 **Emergency Operations**
- EOC setup, ICS protocols, resource deployment, evacuation management

📝 **Plan Generation**
- LDRRMP, Contingency, DANA, BCP with AI assistance

🔧 **System Features**
- Navigation, tools, integrations, troubleshooting

**Pro Tip:** I'm context-aware! Ask me about "this phase" or "current screen" for specific guidance on where you are right now.

What would you like to explore?`;
    }

    // Default contextual response
    return `I'm here to help with the DDRiVE-M platform! 

${phaseContexts[currentPhase] ? `\n**Current Context:** ${phaseContexts[currentPhase]}\n` : ''}

I can answer questions about:
- Philippine disaster management (RA 10121, OCD-DILG)
- International standards (ISO 31000, UNDRR)
- Any of the 7 intelligence lifecycle phases
- System features and how to use them
- Compliance requirements
- Emergency response procedures

Could you please provide more details about what you'd like to know? For example:
- "Explain RA 10121"
- "How do I use the current phase?"
- "What's my resilience score?"
- "Generate a contingency plan"`;
  };

  const handleSend = () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();
    setMessage('');
    setLoading(true);

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMsg]);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = getContextualResponse(userMessage);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMsg]);
      setLoading(false);
    }, 800);
  };

  const quickQuestions = [
    "What is this phase?",
    "Explain RA 10121",
    "How do I generate plans?",
    "What's ICS?"
  ];

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 p-4 bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full shadow-2xl z-50 transition-all transform hover:scale-110 group"
        title="Open DDRiVER AI Assistant"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <div className="relative">
            <Bot size={24} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse border-2 border-white"></div>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed left-6 bg-slate-900 border-2 border-slate-800 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all ${
          isMinimized ? 'bottom-24 w-80 h-16' : 'bottom-24 w-96 h-[600px]'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <span>DDRiVER</span>
                  <Sparkles size={14} className="text-yellow-300" />
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-blue-100">Context-Aware AI</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                title={isMinimized ? 'Maximize' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 size={16} className="text-white" /> : <Minimize2 size={16} className="text-white" />}
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-950 custom-scrollbar">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-xl px-4 py-3 ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                    }`}>
                      {msg.role === 'assistant' && (
                        <div className="flex items-center space-x-2 mb-2 pb-2 border-b border-slate-700">
                          <Bot size={14} className="text-blue-400" />
                          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">DDRiVER</span>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl rounded-bl-none px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Bot size={14} className="text-blue-400" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              {messages.length <= 1 && (
                <div className="px-4 py-3 border-t border-slate-800 bg-slate-900">
                  <p className="text-xs text-slate-500 mb-2 font-medium">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => setMessage(q)}
                        className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-700 hover:border-blue-500 transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-slate-800 bg-slate-900">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about this phase, compliance, or anything..."
                    className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    disabled={loading}
                  />
                  <button
                    onClick={handleSend}
                    disabled={loading || !message.trim()}
                    className="p-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                    title="Send message"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}