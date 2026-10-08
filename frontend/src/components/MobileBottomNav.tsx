import React from 'react';
import { Layers, Mic, LayoutGrid, Award, ShieldCheck } from 'lucide-react';
import type { ActiveModule } from './Sidebar';

interface MobileBottomNavProps {
  activeModule: ActiveModule;
  onModuleChange: (mod: ActiveModule) => void;
  onOpenVoiceAssistant: () => void;
  onOpenCelebrationModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeModule,
  onModuleChange,
  onOpenVoiceAssistant,
  onOpenCelebrationModal,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 p-2 z-40 flex items-center justify-around shadow-2xl">
      {/* Module 1/2 Quick Target */}
      <button
        onClick={() => onModuleChange('module1')}
        className={`flex flex-col items-center justify-center min-h-[48px] px-3 rounded-xl transition ${
          activeModule === 'module1' || activeModule === 'module2' ? 'text-indigo-400 font-bold' : 'text-slate-400'
        }`}
      >
        <LayoutGrid className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">ERP & Attendance</span>
      </button>

      {/* Module 3/4 Quick Target */}
      <button
        onClick={() => onModuleChange('module3')}
        className={`flex flex-col items-center justify-center min-h-[48px] px-3 rounded-xl transition ${
          activeModule === 'module3' || activeModule === 'module4' ? 'text-indigo-400 font-bold' : 'text-slate-400'
        }`}
      >
        <Award className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">LMS & Credentials</span>
      </button>

      {/* Central Voice FAB */}
      <button
        onClick={onOpenVoiceAssistant}
        className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/40 -mt-5 border-2 border-slate-950"
      >
        <Mic className="w-5 h-5" />
      </button>

      {/* Module 5/6 Quick Target */}
      <button
        onClick={() => onModuleChange('module6')}
        className={`flex flex-col items-center justify-center min-h-[48px] px-3 rounded-xl transition ${
          activeModule === 'module5' || activeModule === 'module6' ? 'text-indigo-400 font-bold' : 'text-slate-400'
        }`}
      >
        <Layers className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Jobs & Chatbot</span>
      </button>

      {/* Module 7 / Celebration Target */}
      <button
        onClick={onOpenCelebrationModal}
        className="flex flex-col items-center justify-center min-h-[48px] px-3 rounded-xl text-amber-400 font-bold"
      >
        <ShieldCheck className="w-5 h-5 text-amber-400" />
        <span className="text-[10px] mt-0.5">Verified Badges</span>
      </button>
    </div>
  );
};
