import React from 'react';

interface PhaseHeaderProps {
  title: string;
  description?: string;
}

export default function PhaseHeader({ title, description }: PhaseHeaderProps) {
  return (
    <div className="mb-8">
      <h2 className="text-4xl font-extrabold text-white capitalize tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-slate-500 text-sm mt-1">{description}</p>
      )}
    </div>
  );
}