import React, { useState } from 'react';
import { GddHeader } from './components/GddHeader';
import { OverviewDossier } from './components/OverviewDossier';
import { CoreLoopSection } from './components/CoreLoopSection';
import { MultiplayerHorrorSection } from './components/MultiplayerHorrorSection';
import { WorldProgressionSection } from './components/WorldProgressionSection';
import { DiegeticUiSection } from './components/DiegeticUiSection';
import { ArtStyleguideSection } from './components/ArtStyleguideSection';
import { Ue5TechArchitectureSection } from './components/Ue5TechArchitectureSection';
import { InteractiveSandbox } from './components/InteractiveSandbox';
import { ExportGddModal } from './components/ExportGddModal';
import { GddSectionId } from './types/gdd';
import { horrorAudio } from './utils/horrorAudio';

export default function App() {
  const [activeSection, setActiveSection] = useState<GddSectionId>('overview');
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const handleSelectSection = (section: GddSectionId) => {
    setActiveSection(section);
    if (audioEnabled) {
      horrorAudio.playRadioClick('open');
    }
  };

  const handleToggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  return (
    <div className="min-h-screen bg-[#07090c] text-[#c7d1dc] relative selection:bg-red-900 selection:text-white pb-16 font-mono">
      {/* Scanline & CRT Grain Overlay */}
      <div className="fixed inset-0 scanline-overlay z-40 pointer-events-none opacity-40" />
      <div className="fixed inset-0 vignette-radial z-30 pointer-events-none" />

      {/* Diegetic Top Navigation Bar */}
      <GddHeader
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        audioEnabled={audioEnabled}
        onToggleAudio={handleToggleAudio}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 relative z-10">
        {activeSection === 'overview' && (
          <OverviewDossier onNavigate={handleSelectSection} />
        )}

        {activeSection === 'core_loop' && (
          <CoreLoopSection audioEnabled={audioEnabled} />
        )}

        {activeSection === 'multiplayer_horror' && (
          <MultiplayerHorrorSection audioEnabled={audioEnabled} />
        )}

        {activeSection === 'world_progression' && (
          <WorldProgressionSection audioEnabled={audioEnabled} />
        )}

        {activeSection === 'diegetic_ui' && (
          <DiegeticUiSection audioEnabled={audioEnabled} />
        )}

        {activeSection === 'art_styleguide' && (
          <ArtStyleguideSection audioEnabled={audioEnabled} />
        )}

        {activeSection === 'ue5_tech_stack' && (
          <Ue5TechArchitectureSection />
        )}

        {activeSection === 'interactive_sandbox' && (
          <InteractiveSandbox audioEnabled={audioEnabled} />
        )}
      </main>

      {/* Export GDD Modal */}
      <ExportGddModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      {/* Diegetic Terminal Status Bar Footer */}
      <footer className="fixed bottom-0 inset-x-0 bg-[#05070a]/95 border-t border-[#2a1714] py-1.5 px-4 text-[10px] text-[#6d7e8f] z-30 flex items-center justify-between font-mono backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            ENGINE TARGET: UE 5.4.4 WIN64 D3D12
          </span>
          <span className="hidden md:inline text-[#4a5866]">|</span>
          <span className="hidden md:inline text-[#8a99a8]">REPLICATION: GAS ATTRIBUTES & METASOUNDS</span>
        </div>
        <div className="flex items-center gap-3 text-red-400">
          <span>CLASSIFIED // FIELD TERMINAL 09</span>
        </div>
      </footer>
    </div>
  );
}
