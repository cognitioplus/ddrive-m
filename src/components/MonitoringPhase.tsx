import { useState, useEffect } from 'react';
import { 
  Monitor, Video, MessageCircle, AlertTriangle, Activity, 
  Users, Plus, Save, X, User, Calendar, CheckCircle, 
  Target, Shield, Zap, FileText, Bell, Clock, AlertCircle 
} from 'lucide-react';
import { PhaseHeader } from '../PhaseHeader';

// Mock initial data
const mockEvents = [
  {
    id: 1,
    event_type: "Typhoon Alert",
    severity: "Critical",
    message: "Super typhoon approaching Eastern Luzon with sustained winds of 185 km/h",
    source: "PAGASA",
    created_at: "2025-12-29T08:00:00Z",
    assigned_to: "NDRRMC Team",
    status: "Active"
  },
  {
    id: 2,
    event_type: "Earthquake Alert",
    severity: "High",
    message: "Magnitude 5.2 earthquake detected in southwestern Luzon",
    source: "PHIVOLCS",
    created_at: "2025-12-29T07:45:00Z",
    assigned_to: "OCD Emergency Response",
    status: "Monitoring"
  },
  {
    id: 3,
    event_type: "Flooding Warning",
    severity: "Medium",
    message: "Coastal flooding due to high tide and storm surge in Manila Bay area",
    source: "NOAH",
    created_at: "2025-12-29T07:30:00Z",
    assigned_to: "MMDA Operations",
    status: "Active"
  }
];

const mockTeamMembers = [
  {
    id: 1,
    name: "Maria Santos",
    role: "Incident Commander",
    agency: "NDRRMC",
    status: "Active",
    contact: "maria.santos@ndrrmc.gov.ph",
    expertise: "Disaster Management, Emergency Response"
  },
  {
    id: 2,
    name: "Juan Dela Cruz",
    role: "Operations Chief",
    agency: "OCD",
    status: "Active",
    contact: "juan.delacruz@ocd.gov.ph",
    expertise: "Field Operations, Resource Management"
  },
  {
    id: 3,
    name: "Ana Reyes",
    role: "Logistics Coordinator",
    agency: "DPWH",
    status: "Active",
    contact: "ana.reyes@dpwh.gov.ph",
    expertise: "Supply Chain, Equipment Deployment"
  },
  {
    id: 4,
    name: "Carlos Lim",
    role: "Communications Officer",
    agency: "DILG",
    status: "Active",
    contact: "carlos.lim@dilg.gov.ph",
    expertise: "Public Information, Media Relations"
  }
];

const mockTasks = [
  {
    id: 1,
    title: "Coordinate evacuation protocols",
    description: "Establish and manage evacuation procedures for typhoon scenarios",
    assigned_to: "Juan Dela Cruz",
    priority: "Critical",
    status: "In Progress",
    due_date: "2025-12-29T18:00:00Z",
    created_by: "Maria Santos",
    agency: "OCD",
    progress: 65
  },
  {
    id: 2,
    title: "Deploy emergency supplies",
    description: "Distribute food packs, water, and medical supplies to evacuation centers",
    assigned_to: "Ana Reyes",
    priority: "High",
    status: "Not Started",
    due_date: "2025-12-30T12:00:00Z",
    created_by: "Maria Santos",
    agency: "DPWH",
    progress: 0
  },
  {
    id: 3,
    title: "Issue public advisory",
    description: "Coordinate with media for public information dissemination",
    assigned_to: "Carlos Lim",
    priority: "High",
    status: "Completed",
    due_date: "2025-12-29T14:00:00Z",
    created_by: "Maria Santos",
    agency: "DILG",
    progress: 100
  }
];

const mockAgencies = [
  "NDRRMC", "PAGASA", "PHIVOLCS", "NOAH", "OCD", "PNP", "AFP", 
  "DPWH", "DILG", "DOH", "DSWD", "MMDA", "LGU", "DENR", "DOTr"
];

const mockRoles = [
  "Incident Commander", "Operations Chief", "Logistics Coordinator", 
  "Communications Officer", "Safety Officer", "Liaison Officer", 
  "Planning Chief", "Finance/Admin Chief", "Technical Specialist",
  "Medical Officer", "Evacuation Manager", "Resource Manager"
];

const mockChatMessages = [
  {
    id: 1,
    agency: "NDRRMC",
    message: "All stations, situation update: Tropical depression has intensified. Prepare evacuation protocols.",
    timestamp: "2 min ago",
    color: "bg-blue-50 border-blue-500 text-blue-900"
  },
  {
    id: 2,
    agency: "PAGASA",
    message: "Wind speed now at 75 km/h. Expected landfall in 6 hours. Metro Manila on Signal No. 2.",
    timestamp: "5 min ago",
    color: "bg-orange-50 border-orange-500 text-orange-900"
  },
  {
    id: 3,
    agency: "OCD",
    message: "Evacuation centers in NCR are ready. Capacity at 75%. Food packs and supplies distributed.",
    timestamp: "8 min ago",
    color: "bg-green-50 border-green-500 text-green-900"
  },
  {
    id: 4,
    agency: "PNP",
    message: "Traffic management teams deployed. Main evacuation routes secured and clear.",
    timestamp: "12 min ago",
    color: "bg-purple-50 border-purple-500 text-purple-900"
  },
  {
    id: 5,
    agency: "AFP",
    message: "Military assets on standby. Helicopters ready for SAR operations if needed.",
    timestamp: "15 min ago",
    color: "bg-red-50 border-red-500 text-red-900"
  }
];

export function MonitoringPhase() {
  const [events, setEvents] = useState(mockEvents);
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers);
  const [tasks, setTasks] = useState(mockTasks);
  const [chatMessages, setChatMessages] = useState(mockChatMessages);
  const [loading, setLoading] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showAddMessageModal, setShowAddMessageModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    agency: '',
    status: 'Active',
    contact: '',
    expertise: ''
  });
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assigned_to: '',
    priority: 'Medium',
    due_date: '',
    agency: ''
  });
  const [newEvent, setNewEvent] = useState({
    event_type: '',
    severity: 'Medium',
    message: '',
    source: '',
    assigned_to: ''
  });
  const [newMessage, setNewMessage] = useState({
    agency: 'NDRRMC',
    message: ''
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSeverityDot = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-600 text-white';
      case 'High': return 'bg-orange-600 text-white';
      case 'Medium': return 'bg-yellow-600 text-gray-900';
      case 'Low': return 'bg-blue-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-300';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Not Started': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Active': return 'bg-green-100 text-green-800 border-green-300';
      case 'Monitoring': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'On Hold': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getAgencyColor = (agency) => {
    const colors = {
      'NDRRMC': 'bg-blue-50 border-blue-500 text-blue-900',
      'PAGASA': 'bg-orange-50 border-orange-500 text-orange-900',
      'PHIVOLCS': 'bg-red-50 border-red-500 text-red-900',
      'NOAH': 'bg-teal-50 border-teal-500 text-teal-900',
      'OCD': 'bg-green-50 border-green-500 text-green-900',
      'PNP': 'bg-purple-50 border-purple-500 text-purple-900',
      'AFP': 'bg-red-50 border-red-500 text-red-900',
      'DPWH': 'bg-yellow-50 border-yellow-500 text-yellow-900',
      'DILG': 'bg-indigo-50 border-indigo-500 text-indigo-900'
    };
    return colors[agency] || 'bg-gray-50 border-gray-500 text-gray-900';
  };

  const criticalCount = events.filter(e => e.severity === 'Critical').length;
  const highCount = events.filter(e => e.severity === 'High').length;
  const recentEvents = events.slice(0, 10);
  const activeMembers = teamMembers.filter(m => m.status === 'Active').length;
  const pendingTasks = tasks.filter(t => t.status !== 'Completed').length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const onTimeTasks = tasks.filter(t => {
    const dueDate = new Date(t.due_date);
    const now = new Date();
    return t.status === 'Completed' && dueDate >= now;
  }).length;

  const handleAddMember = () => {
    if (!newMember.name || !newMember.role || !newMember.agency) return;
    
    const newMemberObj = {
      id: teamMembers.length + 1,
      name: newMember.name,
      role: newMember.role,
      agency: newMember.agency,
      status: newMember.status,
      contact: newMember.contact,
      expertise: newMember.expertise
    };
    
    setTeamMembers([...teamMembers, newMemberObj]);
    setNewMember({ 
      name: '', 
      role: '', 
      agency: '', 
      status: 'Active', 
      contact: '', 
      expertise: '' 
    });
    setShowAddMemberModal(false);
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.assigned_to || !newTask.due_date) return;
    
    const newTaskObj = {
      id: tasks.length + 1,
      title: newTask.title,
      description: newTask.description,
      assigned_to: newTask.assigned_to,
      priority: newTask.priority,
      status: 'Not Started',
      due_date: newTask.due_date,
      created_by: teamMembers[0]?.name || 'System',
      agency: newTask.agency,
      progress: 0
    };
    
    setTasks([...tasks, newTaskObj]);
    setNewTask({ 
      title: '', 
      description: '', 
      assigned_to: '', 
      priority: 'Medium', 
      due_date: '', 
      agency: '' 
    });
    setShowAddTaskModal(false);
  };

  const handleAddEvent = () => {
    if (!newEvent.event_type || !newEvent.message || !newEvent.source) return;
    
    const newEventObj = {
      id: events.length + 1,
      event_type: newEvent.event_type,
      severity: newEvent.severity,
      message: newEvent.message,
      source: newEvent.source,
      assigned_to: newEvent.assigned_to || 'Unassigned',
      status: 'Active',
      created_at: new Date().toISOString()
    };
    
    setEvents([newEventObj, ...events]);
    setNewEvent({ 
      event_type: '', 
      severity: 'Medium', 
      message: '', 
      source: '', 
      assigned_to: '' 
    });
    setShowAddEventModal(false);
  };

  const handleAddMessage = () => {
    if (!newMessage.message.trim()) return;
    
    const newMessageObj = {
      id: chatMessages.length + 1,
      agency: newMessage.agency,
      message: newMessage.message,
      timestamp: 'Just now',
      color: getAgencyColor(newMessage.agency)
    };
    
    setChatMessages([newMessageObj, ...chatMessages]);
    setNewMessage({ 
      agency: 'NDRRMC', 
      message: '' 
    });
    setShowAddMessageModal(false);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const updateTaskProgress = (taskId, progress) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, progress: Math.min(100, Math.max(0, progress)) } : task
    ));
  };

  const removeMember = (memberId) => {
    setTeamMembers(teamMembers.filter(member => member.id !== memberId));
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const removeEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <div>
      <PhaseHeader
        icon={Monitor}
        title="Phase 7: Monitoring"
        description="Live collaborative command center with real-time tracking and team management"
        colorClass="bg-stone-700"
      />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical Alerts</p>
              <p className="text-3xl font-bold text-gray-900">{criticalCount}</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Priority</p>
              <p className="text-3xl font-bold text-gray-900">{highCount}</p>
            </div>
            <Activity className="w-10 h-10 text-orange-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Members</p>
              <p className="text-3xl font-bold text-gray-900">{activeMembers}</p>
            </div>
            <Users className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Tasks</p>
              <p className="text-3xl font-bold text-gray-900">{pendingTasks}</p>
            </div>
            <Target className="w-10 h-10 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed Tasks</p>
              <p className="text-3xl font-bold text-gray-900">{completedTasks}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setShowAddMemberModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Team Member
        </button>
        <button
          onClick={() => setShowAddTaskModal(true)}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </button>
        <button
          onClick={() => setShowAddEventModal(true)}
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Alert
        </button>
        <button
          onClick={() => setShowAddMessageModal(true)}
          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Send Message
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Video className="w-5 h-5 mr-2 text-red-600" />
                Live Command Center
              </h3>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-gray-700">LIVE</span>
              </div>
            </div>
            <div className="p-4">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg aspect-video flex items-center justify-center relative">
                <div className="text-center text-white z-10">
                  <Video className="w-16 h-16 mx-auto mb-3 opacity-50" />
                  <p className="text-lg font-semibold mb-1">Multi-Agency Video Conference</p>
                  <p className="text-sm opacity-75">Collaborative command center simulation</p>
                  <button className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                    Join Conference
                  </button>
                </div>
                {/* Live status indicators */}
                <div className="absolute top-4 right-4 bg-black/50 rounded-lg p-2">
                  <div className="flex items-center space-x-2 text-white text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Live Stream Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Team Members ({activeMembers})</h3>
            <button
              onClick={() => setShowAddMemberModal(true)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 max-h-96 overflow-y-auto">
            {teamMembers.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                <Users className="w-8 h-8 mx-auto mb-2" />
                <p>No team members added yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg group">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        member.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{member.name}</div>
                        <div className="text-xs text-gray-600">{member.role}</div>
                        <div className="text-xs text-gray-500">{member.agency}</div>
                      </div>
                    </div>
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => removeMember(member.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Remove member"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Multi-Agency Chat Stream
            </h3>
            <button
              onClick={() => setShowAddMessageModal(true)}
              className="text-purple-600 hover:text-purple-800"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 h-96 overflow-y-auto">
            {chatMessages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`rounded-lg p-3 border-l-4 ${msg.color}`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <span className="font-semibold text-sm">{msg.agency}</span>
                      <span className="text-xs opacity-70">{msg.timestamp}</span>
                    </div>
                    <p className="text-sm opacity-90">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <select
                value={newMessage.agency}
                onChange={(e) => setNewMessage({...newMessage, agency: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-700"
              >
                {mockAgencies.slice(0, 7).map(agency => (
                  <option key={agency} value={agency}>{agency}</option>
                ))}
              </select>
              <input
                type="text"
                value={newMessage.message}
                onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                placeholder="Type message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-700"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newMessage.message.trim()) {
                    handleAddMessage();
                  }
                }}
              />
              <button 
                onClick={handleAddMessage}
                disabled={!newMessage.message.trim()}
                className="bg-stone-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-stone-800 transition-colors disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
              Critical Alert Monitor
            </h3>
            <button
              onClick={() => setShowAddEventModal(true)}
              className="text-red-600 hover:text-red-800"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 max-h-96 overflow-y-auto">
            {events.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <AlertTriangle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>No alerts currently active</p>
              </div>
            ) : (
              <div className="space-y-2">
                {recentEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`border-2 rounded-lg p-3 transition-all mb-2 ${getSeverityColor(event.severity)} relative group`}
                  >
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => removeEvent(event.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Remove alert"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${getSeverityDot(event.severity)}`}></span>
                        <span className="font-semibold text-sm">{event.event_type}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                      </div>
                      <span className="text-xs opacity-70">
                        {new Date(event.created_at).toLocaleTimeString('en-PH')}
                      </span>
                    </div>
                    <p className="text-sm opacity-90 ml-4">{event.message}</p>
                    <div className="flex justify-between items-center mt-2 ml-4 text-xs">
                      <span className="opacity-70">Source: {event.source}</span>
                      <span className="opacity-70">Assigned: {event.assigned_to}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Task Management Section */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Target className="w-5 h-5 mr-2 text-green-600" />
            Task Management Dashboard
          </h3>
          <button
            onClick={() => setShowAddTaskModal(true)}
            className="text-green-600 hover:text-green-800"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4">
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Target className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p>No tasks assigned yet. Add your first task!</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`border-2 rounded-lg p-4 transition-all hover:shadow-md ${getStatusColor(task.status)} relative group`}
                >
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => removeTask(task.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Remove task"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-lg">{task.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      {task.description && (
                        <p className="text-sm text-gray-700 mb-2">{task.description}</p>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm mb-2">
                        <div>
                          <span className="text-gray-600">Assigned to:</span>
                          <span className="ml-1 font-medium">{task.assigned_to}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Due:</span>
                          <span className="ml-1 font-medium">
                            {new Date(task.due_date).toLocaleDateString('en-PH')}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Agency:</span>
                          <span className="ml-1 font-medium">{task.agency}</span>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{task.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              task.progress >= 100 ? 'bg-green-500' :
                              task.progress >= 50 ? 'bg-blue-500' : 'bg-yellow-500'
                            }`}
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1 ml-4">
                      <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                        className={`px-3 py-1 rounded text-xs font-semibold min-w-24 ${
                          task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          task.status === 'On Hold' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={task.progress}
                        onChange={(e) => updateTaskProgress(task.id, parseInt(e.target.value))}
                        className="w-16"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-Time Resilience Dashboard</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-2 border-blue-200">
            <p className="text-sm text-blue-700 mb-1">System Status</p>
            <p className="text-2xl font-bold text-blue-900">Operational</p>
            <div className="mt-2 flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-xs text-blue-700">All systems online</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border-2 border-green-200">
            <p className="text-sm text-green-700 mb-1">Response Time</p>
            <p className="text-2xl font-bold text-green-900">2.3 min</p>
            <p className="text-xs text-green-700 mt-2">Average response</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border-2 border-purple-200">
            <p className="text-sm text-purple-700 mb-1">Team Coordination</p>
            <p className="text-2xl font-bold text-purple-900">{teamMembers.length}</p>
            <p className="text-xs text-purple-700 mt-2">Active members</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border-2 border-orange-200">
            <p className="text-sm text-orange-700 mb-1">Task Performance</p>
            <p className="text-2xl font-bold text-orange-900">
              {tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0}%
            </p>
            <p className="text-xs text-orange-700 mt-2">On-time completion</p>
          </div>
        </div>
        
        {/* Team Status Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-gray-600" />
              <div>
                <p className="text-sm text-gray-700">Team Status</p>
                <p className="text-lg font-bold text-gray-900">
                  {activeMembers} active / {teamMembers.length} total
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6 text-yellow-600" />
              <div>
                <p className="text-sm text-yellow-700">Pending Tasks</p>
                <p className="text-lg font-bold text-yellow-900">{pendingTasks}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <div>
                <p className="text-sm text-red-700">Active Alerts</p>
                <p className="text-lg font-bold text-red-900">{events.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Team Member</h3>
              <button onClick={() => setShowAddMemberModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter member name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                <select
                  value={newMember.role}
                  onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select role</option>
                  {mockRoles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Agency *</label>
                <select
                  value={newMember.agency}
                  onChange={(e) => setNewMember({...newMember, agency: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select agency</option>
                  {mockAgencies.map(agency => (
                    <option key={agency} value={agency}>{agency}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Information</label>
                <input
                  type="email"
                  value={newMember.contact}
                  onChange={(e) => setNewMember({...newMember, contact: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email or phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Area of Expertise</label>
                <input
                  type="text"
                  value={newMember.expertise}
                  onChange={(e) => setNewMember({...newMember, expertise: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Emergency Response, Logistics"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newMember.status}
                  onChange={(e) => setNewMember({...newMember, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowAddMemberModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMember}
                  disabled={!newMember.name || !newMember.role || !newMember.agency}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4 mr-2 inline" />
                  Add Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Task</h3>
              <button onClick={() => setShowAddTaskModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Title *</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter task title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="3"
                  placeholder="Enter task description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign To *</label>
                <select
                  value={newTask.assigned_to}
                  onChange={(e) => setNewTask({...newTask, assigned_to: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select team member</option>
                  {teamMembers.map(member => (
                    <option key={member.id} value={member.name}>
                      {member.name} - {member.role}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date *</label>
                  <input
                    type="datetime-local"
                    value={newTask.due_date}
                    onChange={(e) => setNewTask({...newTask, due_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Agency</label>
                <select
                  value={newTask.agency}
                  onChange={(e) => setNewTask({...newTask, agency: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select agency</option>
                  {mockAgencies.map(agency => (
                    <option key={agency} value={agency}>{agency}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowAddTaskModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  disabled={!newTask.title || !newTask.assigned_to || !newTask.due_date}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4 mr-2 inline" />
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Alert</h3>
              <button onClick={() => setShowAddEventModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Type *</label>
                <input
                  type="text"
                  value={newEvent.event_type}
                  onChange={(e) => setNewEvent({...newEvent, event_type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="e.g., Typhoon Alert, Earthquake Warning"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Severity *</label>
                <select
                  value={newEvent.severity}
                  onChange={(e) => setNewEvent({...newEvent, severity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alert Message *</label>
                <textarea
                  value={newEvent.message}
                  onChange={(e) => setNewEvent({...newEvent, message: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows="3"
                  placeholder="Enter detailed alert message"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source *</label>
                  <select
                    value={newEvent.source}
                    onChange={(e) => setNewEvent({...newEvent, source: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select source</option>
                    {mockAgencies.slice(0, 7).map(agency => (
                      <option key={agency} value={agency}>{agency}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                  <select
                    value={newEvent.assigned_to}
                    onChange={(e) => setNewEvent({...newEvent, assigned_to: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Unassigned</option>
                    {teamMembers.map(member => (
                      <option key={member.id} value={member.name}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowAddEventModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEvent}
                  disabled={!newEvent.event_type || !newEvent.message || !newEvent.source}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Bell className="w-4 h-4 mr-2 inline" />
                  Add Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Message Modal */}
      {showAddMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Send Message</h3>
              <button onClick={() => setShowAddMessageModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Agency *</label>
                <select
                  value={newMessage.agency}
                  onChange={(e) => setNewMessage({...newMessage, agency: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {mockAgencies.slice(0, 7).map(agency => (
                    <option key={agency} value={agency}>{agency}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea
                  value={newMessage.message}
                  onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows="4"
                  placeholder="Enter your message"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowAddMessageModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMessage}
                  disabled={!newMessage.message.trim()}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MessageCircle className="w-4 h-4 mr-2 inline" />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}