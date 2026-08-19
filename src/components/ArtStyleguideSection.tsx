import React, { useState } from 'react';
import { GDD_SECTIONS_DATA } from '../data/gddContent';
import { Sparkles, Eye, Sun, Camera, Layers, Box, Cpu, AlertTriangle, Play, Sliders, Droplets } from 'lucide-react';
import { horrorAudio } from '../utils/horrorAudio';

interface ArtStyleguideSectionProps {
  audioEnabled: boolean;
}

export const ArtStyleguideSection: React.FC<ArtStyleguideSectionProps> = ({ audioEnabled }) => {
  const data = GDD_SECTIONS_DATA.artStyleguide;
  const [selectedPillar, setSelectedPillar] = useState<number>(0);

  // Interactive Shader & Camera Simulation Controls
  const [lutPreset, setLutPreset] = useState<'soviet' | 'bodycam' | 'bleached' | 'monolith'>('bodycam');
  const [grainIntensity, setGrainIntensity] = useState<number>(65); // 0-100%
  const [chromaAberration, setChromaAberration] = useState<number>(50); // 0-100%
  const [lensDirtEnabled, setLensDirtEnabled] = useState<boolean>(true);
  const [fogDensity, setFogDensity] = useState<number>(75); // 0-100%

  // Interactive Diegetic Inventory State
  const [backpackOpen, setBackpackOpen] = useState<boolean>(false);
  const [magInspecting, setMagInspecting] = useState<boolean>(false);
  const [batteryVolts, setBatteryVolts] = useState<number>(3.7); // 0-4.2V
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const inventoryItems = [
    { id: 'ammo', name: '7.62x39mm Pappschachtel (20 Schuss)', condition: 'Verstaubt, angerissen', weight: '0.45 kg' },
    { id: 'tourniquet', name: 'Militär-Tourniquet CAT-7', condition: 'Steril verpackt', weight: '0.12 kg' },
    { id: 'oil', name: 'Fläschchen Weihöl (Sperrzone-Altar)', condition: 'Pechschwarze Emulsion', weight: '0.30 kg' },
    { id: 'battery', name: '9V Alkali-Block (Für HF-Peiler)', condition: '78% Ladung', weight: '0.05 kg' },
  ];

  const handleToggleBackpack = () => {
    setBackpackOpen(!backpackOpen);
    if (audioEnabled) {
      horrorAudio.playRadioClick(backpackOpen ? 'close' : 'open');
    }
  };

  const handleInspectMag = () => {
    setMagInspecting(true);
    if (audioEnabled) horrorAudio.playRadioClick('crackle');
    setTimeout(() => {
      setMagInspecting(false);
    }, 3000);
  };

  const getLutStyles = () => {
    switch (lutPreset) {
      case 'soviet':
        return {
          filter: 'contrast(125%) saturate(75%) sepia(25%) hue-rotate(-15deg)',
          label: '1986 Soviet Kodachrome (Drückendes Ocker, verblasstes Rot)',
          bg: '#0c0f0a'
        };
      case 'bodycam':
        return {
          filter: 'contrast(140%) saturate(60%) brightness(85%) hue-rotate(5deg)',
          label: 'Found-Footage Bodycam (Kalte Schatten, CMOS Sensor Noise, harter Kontrast)',
          bg: '#06080b'
        };
      case 'bleached':
        return {
          filter: 'contrast(150%) saturate(30%) brightness(95%)',
          label: 'Bleached Agfacolor (Ausgewaschen, kreidige Lichter, giftiges Grün)',
          bg: '#0a0d0d'
        };
      case 'monolith':
        return {
          filter: 'contrast(160%) saturate(15%) brightness(70%)',
          label: 'Deep Subterranean Monolith (Fast Monochrom, pechschwarze Schatten)',
          bg: '#040406'
        };
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="p-5 bg-[#0e1218] border border-[#3d1d17] relative">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-widest mb-1">
          <Camera className="w-4 h-4" />
          <span>DIRECTOR'S ART DIRECTIVE // ANTI-CLEAN ESTHETICS</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-mono text-[#f3e8e2]">{data.title}</h2>
        <p className="text-xs sm:text-sm text-[#b89f98] font-mono mt-1">{data.subtitle}</p>

        <div className="mt-4 p-3 bg-[#080c10] border-l-2 border-amber-600 text-xs text-[#d1dbe5] leading-relaxed font-mono">
          <strong className="text-amber-400">Anti-Clean Credo: </strong>
          {data.philosophy}
        </div>
      </div>

      {/* 4 Pillars Tab Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {data.pillars.map((pillar, idx) => (
          <button
            key={pillar.id}
            onClick={() => setSelectedPillar(idx)}
            className={`p-3.5 text-left border transition-all ${
              selectedPillar === idx
                ? 'bg-[#20100d] border-red-600 shadow-[0_0_12px_rgba(220,38,38,0.25)]'
                : 'bg-[#0c1016] border-[#221614] hover:border-[#4d231c]'
            }`}
          >
            <div className="text-[10px] font-mono text-amber-500 font-bold mb-1">
              SÄULE 0{idx + 1}
            </div>
            <h3 className="text-xs font-bold font-mono text-[#f0ebe7] line-clamp-1">
              {pillar.title.split(':')[0]}
            </h3>
            <p className="text-[11px] text-[#8e9dae] font-mono mt-1 line-clamp-2">
              {pillar.summary}
            </p>
          </button>
        ))}
      </div>

      {/* Pillar Detail Block */}
      <div className="p-5 bg-[#0a0f15] border border-[#381e19] space-y-4">
        <div className="flex items-center justify-between border-b border-[#291715] pb-2">
          <h3 className="text-sm font-bold font-mono text-red-400">
            {data.pillars[selectedPillar].title}
          </h3>
          <span className="text-[11px] font-mono text-amber-400">
            DX12 High-End Directives
          </span>
        </div>

        <ul className="space-y-2.5">
          {data.pillars[selectedPillar].guidelines.map((guide, gIdx) => (
            <li key={gIdx} className="p-3 bg-[#06080c] border border-[#1f1513] text-xs font-mono text-[#c6d0dc] flex items-start gap-2.5 leading-relaxed">
              <span className="text-red-500 font-bold mt-0.5">›</span>
              <span>{guide}</span>
            </li>
          ))}
        </ul>

        {/* UE5 .ini Config Settings */}
        <div className="p-3 bg-[#040608] border border-[#441c16] font-mono text-[11px]">
          <span className="text-red-400 font-bold block mb-1">
            UE5 CONSOLE CONFIG & SHADER PARAMS:
          </span>
          <code className="text-emerald-400 block overflow-x-auto whitespace-pre">
            {data.pillars[selectedPillar].ue5Settings}
          </code>
        </div>
      </div>

      {/* INTERACTIVE ART & SHADER SIMULATOR */}
      <div className="p-5 bg-[#080b0f] border border-[#401f19] space-y-6">
        <div className="flex items-center justify-between border-b border-[#2d1815] pb-2">
          <div className="flex items-center gap-2 text-sm font-bold font-mono text-amber-400">
            <Sliders className="w-4 h-4 text-amber-500" />
            <span>INTERAKTIVES POST-PROCESSING & DIEGETIK-LABOR</span>
          </div>
          <span className="text-[10px] text-[#6d7e8e] font-mono">
            Echtzeit-Shader & Inventar-Simulation
          </span>
        </div>

        {/* Top Control Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          {/* LUT Preset */}
          <div className="space-y-1.5">
            <span className="text-[#a1b0c0] text-[11px] block">Color Grading (LUT):</span>
            <select
              value={lutPreset}
              onChange={(e) => setLutPreset(e.target.value as unknown as typeof lutPreset)}
              className="w-full bg-[#05070a] border border-[#3b1c18] px-2 py-1.5 text-xs text-amber-300 focus:outline-none"
            >
              <option value="bodycam">Bodycam Found-Footage</option>
              <option value="soviet">1986 Soviet Kodachrome</option>
              <option value="bleached">Bleached Agfacolor</option>
              <option value="monolith">Deep Subterranean Monolith</option>
            </select>
          </div>

          {/* Sensor Grain */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-[#a1b0c0]">
              <span>Sensor-Rauschen (ISO):</span>
              <span className="text-red-400 font-bold">{grainIntensity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={grainIntensity}
              onChange={(e) => setGrainIntensity(Number(e.target.value))}
              className="w-full accent-red-600 cursor-pointer"
            />
          </div>

          {/* Chromatic Aberration */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-[#a1b0c0]">
              <span>Chromatic Aberration:</span>
              <span className="text-purple-400 font-bold">{chromaAberration}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={chromaAberration}
              onChange={(e) => setChromaAberration(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          {/* Fog Density */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-[#a1b0c0]">
              <span>Volumetrischer Nebel:</span>
              <span className="text-emerald-400 font-bold">{fogDensity}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={fogDensity}
              onChange={(e) => setFogDensity(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Diegetic First-Person Viewport & Backpack Rig Canvas */}
        <div
          className="relative w-full min-h-[380px] border-2 border-[#2b1815] overflow-hidden p-5 flex flex-col justify-between transition-all duration-300"
          style={{
            backgroundColor: getLutStyles().bg,
            filter: getLutStyles().filter,
          }}
        >
          {/* Dynamic Film Grain Layer Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen"
            style={{
              backgroundImage: `radial-gradient(rgba(255,255,255,${grainIntensity * 0.003}) 1px, transparent 0)`,
              backgroundSize: '3px 3px',
            }}
          />

          {/* Dynamic Volumetric Fog / Dirt Vignette */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at 50% 50%, transparent 20%, rgba(5,8,12,${fogDensity * 0.009}) 80%, rgba(0,0,0,0.95) 100%)`,
              boxShadow: lensDirtEnabled ? 'inset 0 0 80px rgba(45,20,15,0.7)' : 'none',
            }}
          />

          {/* Chromatic Aberration Edge Simulation */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: `inset 0 0 ${chromaAberration * 0.8}px rgba(255,0,50,0.25), inset 0 0 ${chromaAberration * 0.6}px rgba(0,255,255,0.25)`,
            }}
          />

          {/* Bodycam HUD Overlay (Diegetic Timestamp & Battery) */}
          <div className="z-20 flex justify-between items-start text-[10px] font-mono text-emerald-400/80">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                <span className="font-bold text-white tracking-widest">BODYCAM REC [CH-04]</span>
              </div>
              <div className="text-[9px] text-[#8e9ea7] mt-0.5">
                1986-10-24 03:41:19 UTC // SEKTOR-09
              </div>
            </div>
            <div className="text-right">
              <div className="text-amber-400">VOLT: {batteryVolts}V (ANALOG GAUGE)</div>
              <div className="text-[9px] text-[#8e9ea7]">ISO: {grainIntensity * 128} // SHUTTER: 1/50</div>
            </div>
          </div>

          {/* Center Stage: Physical Backpack or Magazine Inspection */}
          <div className="z-20 my-auto flex flex-col items-center justify-center">
            {/* 1. Mag Inspection State */}
            {magInspecting ? (
              <div className="p-4 bg-[#140e0b] border-2 border-amber-800 text-amber-300 font-mono text-xs w-72 shadow-2xl animate-pulse">
                <div className="text-[10px] border-b border-amber-900 pb-1 mb-2 font-bold flex justify-between">
                  <span>MAGAZIN-INSPEKTION [R]</span>
                  <span>7.62x39mm</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-24 bg-[#2b1e15] border border-amber-700 flex flex-col justify-end p-1">
                    {/* Simulated brass bullets */}
                    <div className="h-16 bg-amber-600/80 border border-amber-400 flex items-center justify-center text-[9px] text-black font-bold rotate-90">
                      BRASS
                    </div>
                  </div>
                  <div className="text-xs space-y-1">
                    <p className="text-amber-200 font-bold">"Magazin fühlt sich schwer an."</p>
                    <p className="text-[10px] text-[#a7b5c2]">Sichtbare Patronen: ca. 22 / 30 Schuss</p>
                    <p className="text-[9px] text-red-400 mt-1">Kein HUD-Zähler vorhanden!</p>
                  </div>
                </div>
              </div>
            ) : backpackOpen ? (
              /* 2. Physical Tactical Backpack on Knees */
              <div className="p-5 bg-[#17120e] border-2 border-[#5c3a2a] text-[#ded2cb] font-mono text-xs w-full max-w-lg shadow-2xl relative rotate-[-0.5deg]">
                <div className="flex justify-between items-center border-b border-[#4d2f21] pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Box className="w-4 h-4 text-amber-500" />
                    <span className="font-bold text-amber-300">MILITÄR-RUCKSACK RD-54 (AUF KNIEN)</span>
                  </div>
                  <span className="text-[10px] bg-red-950 text-red-300 px-1.5 py-0.5 border border-red-800 animate-pulse">
                    ⚠️ SPIEL LÄUFT IN ECHTZEIT WEITER
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {inventoryItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItem(item.name)}
                      className={`p-2.5 bg-[#0d0a08] border transition-all cursor-pointer ${
                        selectedItem === item.name
                          ? 'border-amber-500 bg-[#251710]'
                          : 'border-[#332018] hover:border-[#523023]'
                      }`}
                    >
                      <div className="text-xs font-bold text-amber-200 line-clamp-1">{item.name}</div>
                      <div className="text-[10px] text-[#93a2b0] mt-0.5">{item.condition}</div>
                      <div className="text-[9px] text-amber-500/80 text-right">{item.weight}</div>
                    </div>
                  ))}
                </div>

                {selectedItem && (
                  <div className="mt-3 p-2 bg-[#080605] border border-amber-900/50 text-[11px] text-[#c0cdd9] flex justify-between items-center">
                    <span>Ausgewählt: <strong className="text-amber-300">{selectedItem}</strong></span>
                    <button
                      onClick={() => {
                        if (audioEnabled) horrorAudio.playRadioClick('crackle');
                        setSelectedItem(null);
                      }}
                      className="px-2 py-0.5 bg-amber-900 hover:bg-amber-800 text-white text-[10px]"
                    >
                      In Hand nehmen
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Normal First-Person Stance */
              <div className="text-center text-xs font-mono text-[#8b99a8] space-y-2">
                <p>Kamera fokussiert auf feuchten Nadelwald & korrodierte Bunkertür.</p>
                <div className="text-[11px] text-amber-400">
                  Drücke unten auf <strong>[Tab]</strong> oder <strong>[R]</strong>, um die Diegetik zu testen.
                </div>
              </div>
            )}
          </div>

          {/* Bottom Interactive Trigger Bar */}
          <div className="z-20 flex flex-wrap items-center justify-between gap-2 border-t border-[#311d18] pt-2 text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleBackpack}
                className={`px-3 py-1.5 border font-bold flex items-center gap-1.5 transition-all ${
                  backpackOpen
                    ? 'bg-amber-900/80 border-amber-500 text-white'
                    : 'bg-[#120e0d] border-[#44231b] text-amber-300 hover:bg-[#251512]'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>[TAB] Rucksack {backpackOpen ? 'schließen' : 'auf Knien öffnen'}</span>
              </button>

              <button
                onClick={handleInspectMag}
                disabled={magInspecting}
                className="px-3 py-1.5 bg-[#120e0d] hover:bg-[#251512] border border-[#44231b] text-amber-300 font-bold flex items-center gap-1.5"
              >
                <span>[R] Magazin prüfen</span>
              </button>
            </div>

            <div className="flex items-center gap-3 text-[#9aa8b5]">
              <span>LUT: {getLutStyles().label.split('(')[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
