/*
  # DDRiVE-M Intelligence Cycle System Schema

  1. New Tables
    - `hazards` - Detection phase hazard inventory
      - `id` (uuid, primary key)
      - `title` (text)
      - `agency` (text) - PAGASA, PHIVOLCS, NOAH, NDRRMC
      - `severity` (text) - Critical, High, Medium, Low
      - `latitude` (numeric)
      - `longitude` (numeric)
      - `description` (text)
      - `status` (text) - Active, Monitoring, Resolved
      - `detected_at` (timestamptz)
      - `created_at` (timestamptz)

    - `risk_assessments` - Diagnosis phase risk analysis
      - `id` (uuid, primary key)
      - `hazard_id` (uuid, foreign key)
      - `likelihood` (integer) - 1-5 scale
      - `impact` (integer) - 1-5 scale
      - `risk_score` (integer) - calculated
      - `classification` (text) - Critical, High, Medium, Low
      - `ai_summary` (text)
      - `predictive_data` (jsonb)
      - `created_at` (timestamptz)

    - `response_actions` - Response phase mitigation strategies
      - `id` (uuid, primary key)
      - `risk_id` (uuid, foreign key)
      - `action_type` (text)
      - `description` (text)
      - `local_controls` (text)
      - `assigned_agency` (text)
      - `status` (text) - Planned, In Progress, Completed
      - `priority` (text)
      - `created_at` (timestamptz)

    - `resilience_scores` - Integration phase UNDRR tracking
      - `id` (uuid, primary key)
      - `essential_number` (integer) - 1-10
      - `essential_name` (text)
      - `score` (numeric) - 0-100
      - `year` (integer)
      - `notes` (text)
      - `updated_at` (timestamptz)

    - `simulations` - Validation phase scenario testing
      - `id` (uuid, primary key)
      - `scenario_type` (text) - Typhoon, Earthquake, Flood
      - `name` (text)
      - `parameters` (jsonb)
      - `status` (text) - Running, Completed, Failed
      - `results` (jsonb)
      - `stakeholder_feedback` (text)
      - `created_at` (timestamptz)
      - `completed_at` (timestamptz)

    - `plans` - Enhancement phase document management
      - `id` (uuid, primary key)
      - `plan_type` (text) - DRRM, Continuity, Recovery
      - `title` (text)
      - `organization_type` (text)
      - `region` (text)
      - `content` (text)
      - `compliance_standards` (text[])
      - `status` (text) - Draft, Active, Archived
      - `created_at` (timestamptz)

    - `monitoring_events` - Monitoring phase live tracking
      - `id` (uuid, primary key)
      - `event_type` (text)
      - `severity` (text)
      - `message` (text)
      - `source` (text)
      - `metadata` (jsonb)
      - `created_at` (timestamptz)

    - `chat_messages` - DDRiVER AI chatbot interactions
      - `id` (uuid, primary key)
      - `user_message` (text)
      - `ai_response` (text)
      - `context` (jsonb)
      - `created_at` (timestamptz)

    - `organizations` - User organization profiles
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text)
      - `region` (text)
      - `contact_info` (jsonb)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (demonstration purposes)
    - Add policies for authenticated write access
*/

-- Hazards table
CREATE TABLE IF NOT EXISTS hazards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  agency text NOT NULL,
  severity text NOT NULL,
  latitude numeric,
  longitude numeric,
  description text,
  status text DEFAULT 'Active',
  detected_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE hazards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view hazards"
  ON hazards FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert hazards"
  ON hazards FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Risk assessments table
CREATE TABLE IF NOT EXISTS risk_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hazard_id uuid REFERENCES hazards(id) ON DELETE CASCADE,
  likelihood integer CHECK (likelihood >= 1 AND likelihood <= 5),
  impact integer CHECK (impact >= 1 AND impact <= 5),
  risk_score integer,
  classification text,
  ai_summary text,
  predictive_data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE risk_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view risk assessments"
  ON risk_assessments FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage risk assessments"
  ON risk_assessments FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Response actions table
CREATE TABLE IF NOT EXISTS response_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  risk_id uuid REFERENCES risk_assessments(id) ON DELETE CASCADE,
  action_type text NOT NULL,
  description text,
  local_controls text,
  assigned_agency text,
  status text DEFAULT 'Planned',
  priority text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE response_actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view response actions"
  ON response_actions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage response actions"
  ON response_actions FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Resilience scores table
CREATE TABLE IF NOT EXISTS resilience_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  essential_number integer CHECK (essential_number >= 1 AND essential_number <= 10),
  essential_name text NOT NULL,
  score numeric CHECK (score >= 0 AND score <= 100),
  year integer,
  notes text,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE resilience_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view resilience scores"
  ON resilience_scores FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage resilience scores"
  ON resilience_scores FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Simulations table
CREATE TABLE IF NOT EXISTS simulations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_type text NOT NULL,
  name text NOT NULL,
  parameters jsonb DEFAULT '{}',
  status text DEFAULT 'Running',
  results jsonb DEFAULT '{}',
  stakeholder_feedback text,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE simulations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view simulations"
  ON simulations FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage simulations"
  ON simulations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Plans table
CREATE TABLE IF NOT EXISTS plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_type text NOT NULL,
  title text NOT NULL,
  organization_type text,
  region text,
  content text,
  compliance_standards text[],
  status text DEFAULT 'Draft',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view plans"
  ON plans FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage plans"
  ON plans FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Monitoring events table
CREATE TABLE IF NOT EXISTS monitoring_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  severity text NOT NULL,
  message text NOT NULL,
  source text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE monitoring_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view monitoring events"
  ON monitoring_events FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert monitoring events"
  ON monitoring_events FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_message text NOT NULL,
  ai_response text,
  context jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view chat messages"
  ON chat_messages FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage chat messages"
  ON chat_messages FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text,
  region text,
  contact_info jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view organizations"
  ON organizations FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage organizations"
  ON organizations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample UNDRR 10 Essentials
INSERT INTO resilience_scores (essential_number, essential_name, score, year) VALUES
  (1, 'Organize for Disaster Resilience', 45, 2024),
  (2, 'Identify, Understand, and Use Current and Future Risk Scenarios', 52, 2024),
  (3, 'Strengthen Financial Capacity for Resilience', 38, 2024),
  (4, 'Pursue Resilient Urban Development and Design', 41, 2024),
  (5, 'Safeguard Natural Buffers to Enhance Protective Functions', 35, 2024),
  (6, 'Strengthen Institutional Capacity for Resilience', 48, 2024),
  (7, 'Understand and Strengthen Societal Capacity for Resilience', 50, 2024),
  (8, 'Increase Infrastructure Resilience', 44, 2024),
  (9, 'Ensure Effective Preparedness and Disaster Response', 58, 2024),
  (10, 'Expedite Recovery and Build Back Better', 40, 2024)
ON CONFLICT DO NOTHING;

-- Insert sample hazards
INSERT INTO hazards (title, agency, severity, latitude, longitude, description, status) VALUES
  ('Tropical Depression Approaching', 'PAGASA', 'High', 14.5995, 120.9842, 'Tropical depression with winds of 55 km/h moving towards Metro Manila', 'Active'),
  ('Earthquake Alert - Marikina Valley Fault', 'PHIVOLCS', 'Critical', 14.6507, 121.1029, 'Increased seismic activity detected along Marikina Valley Fault line', 'Monitoring'),
  ('Flood Risk - Pasig River Basin', 'NOAH', 'Medium', 14.5764, 121.0851, 'Heavy rainfall forecast may cause flooding in low-lying areas', 'Active'),
  ('Landslide Warning - Benguet Province', 'NDRRMC', 'High', 16.4023, 120.5960, 'Soil saturation reaching critical levels in mountainous areas', 'Active')
ON CONFLICT DO NOTHING;