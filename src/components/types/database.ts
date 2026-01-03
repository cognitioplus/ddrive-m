/**
 * Hazard Interface
 * Represents detected hazards from various Philippine agencies
 */
export interface Hazard {
  id: string;
  title: string;
  agency: 
    | 'PAGASA'      // Philippine Atmospheric, Geophysical and Astronomical Services Administration
    | 'PHIVOLCS'    // Philippine Institute of Volcanology and Seismology  
    | 'NOAH'        // Nationwide Operational Assessment of Hazards
    | 'NDRRMC'      // National Disaster Risk Reduction and Management Council
    | 'OCD'         // Office of Civil Defense
    | 'PNP'         // Philippine National Police
    | 'AFP'         // Armed Forces of the Philippines
    | 'DPWH'        // Department of Public Works and Highways
    | 'DILG'        // Department of Interior and Local Government
    | 'DOH'         // Department of Health
    | 'DSWD'        // Department of Social Welfare and Development
    | 'MMDA'        // Metropolitan Manila Development Authority
    | 'LGU'         // Local Government Unit
    | 'DENR'        // Department of Environment and Natural Resources
    | 'DOTr';       // Department of Transportation
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  latitude?: number;
  longitude?: number;
  description?: string;
  status: 'Active' | 'Monitoring' | 'Resolved' | 'Archived';
  detected_at: string; // ISO 8601 timestamp
  created_at: string;  // ISO 8601 timestamp
  affected_areas?: string[]; // e.g., ["Cagayan", "Isabela", "Aurora"]
  alert_level?: string;      // e.g., "Signal No. 4", "Alert Level 1"
}

/**
 * RiskAssessment Interface
 * Comprehensive risk analysis following ISO 31000 standards
 */
export interface RiskAssessment {
  id: string;
  hazard_id?: string;
  title: string;             // Descriptive risk title
  category: string;          // Risk category (Natural Disaster, Safety, Cybersecurity, etc.)
  likelihood: number;        // Scale 1-5 (1=Rare, 5=Almost Certain)
  impact: number;            // Scale 1-5 (1=Insignificant, 5=Catastrophic)
  risk_score: number;        // Calculated as likelihood * impact (1-25)
  classification: 'Critical' | 'High' | 'Medium' | 'Low';
  ai_summary?: string;       // AI-generated executive summary
  predictive_data?: Record<string, unknown>; // Future trend predictions
  created_at: string;        // ISO 8601 timestamp
  description?: string;      // Additional risk description
}

/**
 * ResponseAction Interface
 * Risk treatment and mitigation actions
 */
export interface ResponseAction {
  id: string;
  risk_id?: string;
  action_type: string;               // Treatment strategy name
  description?: string;              // Detailed action description
  local_controls?: string;           // Philippine-specific controls and regulations
  assigned_agency?: string;          // Responsible agency
  status: 'Planned' | 'In Progress' | 'Completed' | 'On Hold';
  priority?: 'Critical' | 'High' | 'Medium' | 'Low';
  created_at: string;                // ISO 8601 timestamp
  timeline?: string;                 // Implementation timeline (e.g., "2 weeks", "3 months")
  resources_needed?: string;         // Required resources and materials
  responsible_team?: string;         // Team or department responsible
  risk_category?: string;            // Associated risk category
  treatment_strategies?: string[];   // Array of specific treatment strategies
}

/**
 * ResilienceScore Interface
 * UNDRR 10 Essentials for Making Cities Resilient scoring
 */
export interface ResilienceScore {
  id: string;
  essential_number: number;          // 1-10 (UNDRR Essentials numbering)
  essential_name: string;            // Full essential name
  score: number;                     // Percentage score (0-100)
  year: number;                      // Assessment year
  notes?: string;                    // Additional assessment notes
  updated_at: string;                // ISO 8601 timestamp
  indicators?: Array<{               // Key indicator assessments
    rating: number;                  // 1-5 scale rating
    evidence: string;                // Supporting evidence
    indicator: string;               // Indicator description
  }>;
  comments?: string;                 // Overall assessment comments
}

/**
 * Simulation Interface
 * Scenario-based validation and testing
 */
export interface Simulation {
  id: string;
  scenario_type: 'Typhoon' | 'Earthquake' | 'Flood' | 'Cybersecurity';
  name: string;                      // Simulation name/title
  parameters?: Record<string, unknown>; // Simulation parameters and variables
  status: 'Running' | 'Completed' | 'Failed';
  results?: {
    response_time: number;           // Response time in minutes
    evacuation_success: number;      // Success percentage (0-100)
    resource_utilization: number;    // Resource utilization percentage (0-100)
    communication_effectiveness: number; // Communication effectiveness percentage (0-100)
    overall_score: number;           // Overall simulation score (0-100)
  };
  stakeholder_feedback?: string;     // Feedback from participants
  created_at: string;                // ISO 8601 timestamp
  completed_at?: string;             // ISO 8601 timestamp (when completed)
}

/**
 * Plan Interface
 * Comprehensive risk management and treatment plans
 */
export interface Plan {
  id: string;
  plan_type: 
    | 'DRRM'         // Disaster Risk Reduction & Management
    | 'Continuity'   // Business Continuity
    | 'Recovery'     // Disaster Recovery  
    | 'Mitigation'   // Risk Mitigation
    | 'Preparedness'; // Emergency Preparedness
  title: string;                     // Plan title
  organization_type?: string;        // Organization type (LGU, Private Sector, etc.)
  region?: string;                   // Philippine region (NCR, Region I, etc.)
  content?: string;                  // Plan content/documentation
  compliance_standards?: string[];   // Applicable standards (RA 10121, ISO 22301, etc.)
  status: 'Draft' | 'Active' | 'Archived';
  created_at: string;                // ISO 8601 timestamp
  phases_data?: {                    // Integration data from all phases
    detection?: {
      hazard_id: number;
      hazard_title: string;
    };
    diagnosis?: {
      risk_id: number;
      risk_title: string;
    };
    response?: {
      action_id: number;
      action_title: string;
    };
    integration?: {
      control_id: number;
      control_title: string;
    };
    validation?: {
      metric_id: number;
      kpi: string;
    };
  };
}

/**
 * MonitoringEvent Interface
 * Real-time monitoring and alerting system
 */
export interface MonitoringEvent {
  id: string;
  event_type: string;                // Type of monitoring event
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  message: string;                   // Event description/message
  source?: string;                   // Data source/agency
  metadata?: Record<string, unknown>; // Additional event metadata
  created_at: string;                // ISO 8601 timestamp
  assigned_to?: string;              // Assigned team/individual
  status?: 'Active' | 'Monitoring' | 'Resolved';
}

/**
 * ChatMessage Interface
 * Multi-agency communication system
 */
export interface ChatMessage {
  id: string;
  user_message: string;              // Message content
  ai_response?: string;              // AI-generated response (if applicable)
  context?: Record<string, unknown>; // Message context and metadata
  created_at: string;                // ISO 8601 timestamp
  agency: string;                    // Sending agency
  timestamp: string;                 // Display timestamp (e.g., "2 min ago")
}

/**
 * Organization Interface
 * Organization profile and information
 */
export interface Organization {
  id: string;
  name: string;                      // Organization name
  type?: string;                     // Organization type
  region?: string;                   // Geographic region
  contact_info?: Record<string, unknown>; // Contact information
  created_at: string;                // ISO 8601 timestamp
}

/**
 * TeamMember Interface
 * Command center team management
 */
export interface TeamMember {
  id: string;
  name: string;                      // Full name
  role: string;                      // Role/title in command center
  agency: string;                    // Associated agency
  status: 'Active' | 'Inactive';     // Current status
  contact?: string;                  // Contact information (email/phone)
  expertise?: string;                // Area of expertise/specialization
  tasks?: string[];                  // Assigned task IDs
}

/**
 * Task Interface
 * Task management and assignment system
 */
export interface Task {
  id: string;
  title: string;                     // Task title
  description?: string;              // Task description
  assigned_to: string;               // Assigned team member name
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Not Started' | 'In Progress' | 'On Hold' | 'Completed';
  due_date: string;                  // ISO 8601 timestamp
  created_by: string;                // Task creator name
  agency: string;                    // Responsible agency
  progress: number;                  // Completion percentage (0-100)
}

/**
 * RiskCategory Interface
 * Risk categorization and treatment strategies
 */
export interface RiskCategory {
  id: string;
  name: string;                      // Category name
  description?: string;              // Category description
  treatment_strategies?: string[];   // Recommended treatment strategies
}

/**
 * ReportConfig Interface
 * Risk assessment report generation configuration
 */
export interface ReportConfig {
  template: 
    | 'comprehensive'     // Full detailed report
    | 'executive'         // Executive summary
    | 'compliance'        // Compliance-focused report
    | 'sector-specific';  // Industry/sector specific
  organization_name: string;         // Organization name for report
  organization_type: string;         // Organization type
  location: string;                  // Geographic location
  assessment_date: string;           // ISO 8601 date (report date)
  prepared_by: string;               // Report preparer name
  reviewed_by?: string;              // Report reviewer name (optional)
  include_heatmap: boolean;          // Include risk heatmap
  include_recommendations: boolean;  // Include treatment recommendations
  include_compliance: boolean;       // Include compliance assessment
}
