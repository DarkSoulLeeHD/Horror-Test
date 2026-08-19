import React from 'react';
import { ShieldAlert, Terminal, Volume2, VolumeX, Download, BookOpen, Layers, Cpu, EyeOff, Radio, Camera, Brain } from 'lucide-react';
import { GddSectionId } from '../types/gdd';

interface GddHeaderProps {
  activeSection: GddSectionId;
  onSelectSection: (id: GddSectionId) => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  onOpenExport: () => void;
}

export const GddHeader: React.FC<GddHeaderProps> = ({
  activeSection,
  onSelectSection,
  audioEnabled,
  onToggleAudio,
  onOpenExport
}) => {
  const navItems: { id: GddSectionId; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Dossier', icon: <Terminal className="w-4 h-4" /> },
    { id: 'core_loop', label: '1. Loop', icon: <Layers className="w-4 h-4" /> },
    { id: 'multiplayer_horror', label: '2. Coop', icon: <EyeOff className="w-4 h-4" /> },
    { id: 'world_progression', label: '3. World', icon: <Radio className="w-4 h-4" /> },
    { id: 'diegetic_ui', label: '4. Diegetik', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'ai_sanity_systems', label: 'KI & Sanity', icon: <Brain className="w-4 h-4 text-purple-400" /> },
    { id: 'art_styleguide', label: 'Art Styleguide', icon: <Camera className="w-4 h-4 text-amber-400" /> },
    { id: 'ue5_tech_stack', label: 'UE5 Tech', icon: <Cpu className="w-4 h-4" /> },
    { id: 'level_release_pipeline', label: 'Release & Build', icon: <Download className="w-4 h-4 text-emerald-400" /> },
    { id: 'interactive_sandbox', label: 'Lab', icon: <ShieldAlert className="w-4 h-4 text-red-400" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#070a0e]/95 backdrop-blur-md border-b border-[#3b221d] px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-sm bg-[#1c0e0b] border border-[#7a2f23] flex items-center justify-center text-red-500 font-black text-sm">
            Ж9
          </div>
          <div>
            <div className="text-sm font-bold tracking-wider text-[#e6dbd8] flex items-center gap-2">
              <span>PROJECT: KRASNY BOR</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-[#421612] text-red-300 border border-[#7f261b] rounded-none font-mono">
                UE5.4 GDD
              </span>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={`px-3 py-1.5 text-xs font-mono tracking-tight rounded-none flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#3b1713] text-[#ffb0a0] border border-[#8a3328] shadow-[0_0_10px_rgba(185,28,28,0.25)]'
                    : 'text-[#9ca8b4] hover:text-[#e2e8f0] hover:bg-[#151c24]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleAudio}
            title={audioEnabled ? "Diegetisches Audio aktiv" : "Audio stummschalten"}
            className={`p-2 rounded-none border text-xs font-mono flex items-center gap-1.5 transition-colors ${
              audioEnabled
                ? 'bg-[#1e1411] border-[#8a382c] text-amber-400 shadow-[0_0_8px_rgba(217,119,6,0.3)]'
                : 'bg-[#11161d] border-[#252f3d] text-slate-400 hover:text-slate-200'
            }`}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline text-[11px]">{audioEnabled ? 'SFX ON' : 'SFX MUTED'}</span>
          </button>

          <button
            onClick={onOpenExport}
            className="px-3 py-1.5 rounded-none bg-[#7f1d1d] hover:bg-[#991b1b] text-white border border-[#b91c1c] text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(185,28,28,0.4)]"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">EXPORT GDD</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto pt-2 pb-1 border-t border-[#231513] mt-2 no-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectSection(item.id)}
            className={`px-2.5 py-1 text-[11px] font-mono tracking-tight whitespace-nowrap rounded-none ${
              activeSection === item.id
                ? 'bg-[#3b1713] text-[#ffb0a0] border border-[#8a3328]'
                : 'text-[#8b99a7] bg-[#0d131a]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
