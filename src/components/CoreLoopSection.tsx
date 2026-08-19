import React, { useState } from 'react';
import { GDD_SECTIONS_DATA } from '../data/gddContent';
import { Compass, Flame, Skull, ChevronRight, AlertTriangle, ShieldCheck, Users, Activity, Clock } from 'lucide-react';
import { horrorAudio } from '../utils/horrorAudio';

interface CoreLoopSectionProps {
  audioEnabled: boolean;
}

export const CoreLoopSection: React.FC<CoreLoopSectionProps> = ({ audioEnabled }) => {
  const [selectedPhase, setSelectedPhase] = useState<number>(0);
  const data = GDD_SECTIONS_DATA.coreLoop;

  const handlePhaseClick = (index: number) => {
    setSelectedPhase(index);
    if (audioEnabled) {
      horrorAudio.playRadioClick('open');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title Block */}
      <div className="p-5 bg-[#0e1218] border border-[#3d1d17] relative overflow-hidden">
        <div className="absolute top-0 right-0 px-3 py-1 bg-[#4a120e] text-[10px] text-red-200 font-mono tracking-widest border-b border-l border-[#8b2319]">
          UE5 GAMEPLAY ABILITY SYSTEM (GAS) - LOOP
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-mono text-[#f3e8e2] flex items-center gap-3">
          <Flame className="w-6 h-6 text-red-600 animate-pulse" />
          <span>{data.title}</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#b89f98] font-mono mt-1">{data.subtitle}</p>

        <div className="mt-4 p-3.5 bg-[#090d12] border-l-2 border-red-600 text-xs leading-relaxed text-[#d1d5db]">
          <strong className="text-red-400 font-mono">High Concept: </strong>
          {data.highConcept}
        </div>
      </div>

      {/* 3-Phases Interactive Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {data.phases.map((phase, idx) => {
          const isSelected = selectedPhase === idx;
          const icons = [
            <Compass key="1" className="w-5 h-5 text-amber-500" />,
            <Flame key="2" className="w-5 h-5 text-red-500" />,
            <Skull key="3" className="w-5 h-5 text-purple-400" />
          ];

          return (
            <div
              key={idx}
              onClick={() => handlePhaseClick(idx)}
              className={`p-4 cursor-pointer transition-all duration-200 border relative ${
                isSelected
                  ? 'bg-[#181110] border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.2)]'
                  : 'bg-[#0d1117] border-[#261816] hover:border-[#522922] opacity-80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {icons[idx]}
                  <span className="text-[11px] font-mono text-amber-400/90 font-bold uppercase tracking-wider">
                    Phase 0{idx + 1}
                  </span>
                </div>
                {isSelected && (
                  <span className="text-[10px] bg-red-950/80 text-red-300 px-1.5 py-0.5 border border-red-800 font-mono">
                    AKTIV
                  </span>
                )}
              </div>

              <h3 className="text-sm font-bold font-mono text-[#f1edea] mb-1">{phase.phase.split(':')[1]}</h3>
              <p className="text-xs text-[#a0aab5] font-mono mb-3">{phase.objective}</p>

              <div className="text-[11px] text-red-400/90 border-t border-[#331c18] pt-2 flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-red-500 mt-0.5" />
                <span>{phase.failureState}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Phase Deep-Dive Details */}
      <div className="p-5 bg-[#0a0e14] border border-[#3b1f1a]">
        <div className="flex items-center justify-between border-b border-[#2d1b18] pb-3 mb-4">
          <div className="flex items-center gap-2 text-sm font-bold font-mono text-red-400">
            <ChevronRight className="w-4 h-4 text-red-500" />
            <span>Detail-Spezifikation: {data.phases[selectedPhase].phase}</span>
          </div>
          <span className="text-[11px] text-[#7d8c9a] font-mono">1–4 Spieler Synchronisation</span>
        </div>

        <ul className="space-y-2.5">
          {data.phases[selectedPhase].details.map((detail, dIdx) => (
            <li key={dIdx} className="flex items-start gap-2.5 text-xs text-[#cdd5de] font-mono leading-relaxed">
              <span className="text-red-500 font-bold mt-0.5">›</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>

        {/* Phase Failure State */}
        <div className="mt-4 p-3 bg-[#170a08] border border-red-900/50 flex items-center justify-between text-xs text-red-300">
          <div className="flex items-center gap-2">
            <Skull className="w-4 h-4 text-red-500" />
            <span><strong>Fehlschlag-Bedingung:</strong> {data.phases[selectedPhase].failureState}</span>
          </div>
        </div>
      </div>

      {/* Permadeath & Session Dynamics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-[#0c1016] border border-[#2a1c1a]">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold mb-2">
            <Activity className="w-4 h-4 text-amber-500" />
            <span>DOWNED STATE & PERMADEATH REINCARNATION</span>
          </div>
          <p className="text-xs text-[#a7b4c2] font-mono leading-relaxed">
            {data.technicalLoopSpecs.permadeathMechanic}
          </p>
        </div>

        <div className="p-4 bg-[#0c1016] border border-[#2a1c1a]">
          <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold mb-2">
            <Clock className="w-4 h-4 text-red-500" />
            <span>SESSION LENGTH & HARDCORE META-PROGRESSION</span>
          </div>
          <p className="text-xs text-[#a7b4c2] font-mono leading-relaxed">
            {data.technicalLoopSpecs.metaProgression}
          </p>
        </div>
      </div>
    </div>
  );
};
