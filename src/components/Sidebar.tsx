import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Shield,
  FileText,
  Library,
  CheckSquare,
  Users,
  Zap,
  Bot,
  Info,
} from "lucide-react"; // Icons for navigation items

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/risk-assessment", icon: Shield, label: "Risk Assessment" },
    { path: "/plan-generator", icon: FileText, label: "Plan Generator" },
    { path: "/plan-library", icon: Library, label: "Plan Library" },
    { path: "/compliance", icon: CheckSquare, label: "Compliance" },
    { path: "/collaboration", icon: Users, label: "Collaboration" },

    // Newly added items
    { path: "/sparc", icon: Zap, label: "SPARC" },
    { path: "/ddriver", icon: Bot, label: "DDRiVER" },
    { path: "/about", icon: Info, label: "About" },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      {/* Logo and title */}
      <div className="p-4 border-b border-slate-700">
        <img
          src="https://img1.wsimg.com/isteam/ip/58ed6e8f-da3e-442a-9a56-be3eddf67a9d/DDRiVE-M%20icon%20and%20logo.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:200,h:200,cg:true"
          alt="DDRiVE-M"
          className="h-12 w-auto mb-2"
        />
        <h1 className="text-sm font-semibold">DDRiVE-M</h1>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
