import React from 'react';
import { UserCheck, Shield, AlertTriangle, BarChart3, Users } from 'lucide-react';

export function PersonaOnboarding() {
  const personas = [
    { 
      id: 'emergency-coordinator', 
      name: 'Emergency Coordinator', 
      icon: AlertTriangle, 
      color: 'text-red-600', 
      bgColor: 'bg-red-50',
      description: 'Incident response and emergency management'
    },
    { 
      id: 'field-operator', 
      name: 'Field Operator', 
      icon: Users, 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50',
      description: 'On-ground data collection and reporting'
    },
    { 
      id: 'compliance-officer', 
      name: 'Compliance Officer', 
      icon: Shield, 
      color: 'text-green-600', 
      bgColor: 'bg-green-50',
      description: 'Regulatory compliance and standards'
    },
    { 
      id: 'risk-analyst', 
      name: 'Risk Analyst', 
      icon: BarChart3, 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-50',
      description: 'Data analysis and risk assessment'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Persona-Based Onboarding</h1>
        <p className="text-gray-600">Select your role to customize your DDRIVE-M experience</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <UserCheck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Role</h2>
          <p className="text-gray-600">Your role determines which features and tools you'll see first</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personas.map((persona) => {
            const Icon = persona.icon;
            return (
              <div key={persona.id} className={`p-6 ${persona.bgColor} rounded-xl border-2 border-transparent hover:border-gray-300 cursor-pointer transition-all`}>
