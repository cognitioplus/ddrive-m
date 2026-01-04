import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface PhaseHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  colorClass?: string;
}

const PhaseHeader: React.FC<PhaseHeaderProps> = ({
  title,
  description,
  icon: Icon,
  colorClass = 'bg-gray-700',
}) => {
  return (
    <div className="mb-8">
      <div className={`${colorClass} p-4 rounded-lg flex items-center`}>
        {Icon && <Icon className="w-8 h-8 text-white mr-3 flex-shrink-0" />}
        <h2 className="text-3xl md:text-4xl font-extrabold text-white capitalize tracking-tight">
          {title}
        </h2>
      </div>
      {description && <p className="text-slate-500 text-sm mt-2">{description}</p>}
    </div>
  );
};

export default PhaseHeader;
