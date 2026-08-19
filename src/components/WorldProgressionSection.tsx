import React, { useState } from 'react';
import { GDD_SECTIONS_DATA } from '../data/gddContent';
import { Map, Layers, Radio, Compass, AlertOctagon, Eye, Cpu, Flame, Skull } from 'lucide-react';
import { horrorAudio } from '../utils/horrorAudio';

interface WorldProgressionSectionProps {
  audioEnabled: boolean;
}

export const WorldProgressionSection: React.FC<WorldProgressionSectionProps> = ({ audioEnabled }) => {
  const data = GDD_SECTIONS_DATA.worldProgression;
  const [selectedZone, setSelectedZone] = useState<number>(0);
  const [showCorruptionTide, setShowCorruptionTide] = useState<boolean>(true);

  const zones = [
    {
      id: "tier1",
      name: "Tier 1: Die Taiga-Randzone",
      threat: "Niedrig-Mittel",
      color: "border-emerald-700/60 bg-emerald-950/20 text-emerald-300",
      points: ["Checkpoint Alpha", "Verlassene Jägerhütte", "Militär-Konvoi Wreckage", "Schützengräben"],
      description: "Dünne Baumkronen, zerrissene Stacheldrähte, vereinzelte Kadaver-Hunde. Keine direkte Realitätsverzerrung, aber extreme Desorientierung bei Nacht."
    },
    {
      id: "tier2",
      name: "Tier 2: Kolchose 'Roter Oktober' & Sumpf",
      threat: "Hoch",
      color: "border-amber-700/60 bg-amber-950/20 text-amber-300",
      points: ["Getreidesilo (Chaos Collapse)", "Überfluteter Traktor-Park", "Pumpstation 04", "Altes Krematorium"],
      description: "Wasser bis zu den Knien (halbiert Sprint-Geschwindigkeit), verrostete Mähdrescher, Patrouillen der 'Blinden Wächter'. Erfordert Teamarbeit für Generatoren."
    },
    {
      id: "tier3",
      name: "Tier 3: Das Epizentrum (Der Tiefenbunker)",
      threat: "Tödlich / Anomal",
      color: "border-red-700/60 bg-red-950/30 text-red-400",
      points: ["Der Fleisch-Riss", "Reaktor-Kaverne 09", "Anomaler Sendemast", "Evakuierungs-Schienenwagen"],
      description: "Schwebende Trümmer, Nanite-Mesh-Zersetzung, toxischer Schwarzer Nebel. Hier befinden sich die finalen Siegel der Schwelle."
    }
  ];

  const handleZoneSelect = (index: number) => {
    setSelectedZone(index);
    if (audioEnabled) {
      horrorAudio.playGeigerBurst(index === 0 ? 0.2 : index === 1 ? 0.6 : 1.0);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="p-5 bg-[#0e1218] border border-[#3d1d17] relative">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-widest mb-1">
          <Layers className="w-4 h-4" />
          <span>UE5 WORLD PARTITION & SPATIAL AUDIO ARCHITECTURE</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-mono text-[#f3e8e2]">{data.title}</h2>
        <p className="text-xs sm:text-sm text-[#b89f98] font-mono mt-1">{data.subtitle}</p>

        <p className="text-xs text-[#cad5df] font-mono mt-3 leading-relaxed border-l-2 border-amber-600 pl-3">
          <strong>Design-Philosophie:</strong> {data.philosophy}
        </p>
      </div>

      {/* Interactive Exclusion Zone Map & Tier Overlay */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tactical Map Grid Visualizer */}
        <div className="lg:col-span-7 p-4 bg-[#080c10] border border-[#361e1a] relative">
          <div className="flex items-center justify-between mb-3 border-b border-[#241715] pb-2">
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-bold">
              <Map className="w-4 h-4" />
              <span>SPERRZONE KRASNY BOR (16 KM² TOPOGRAPHIE)</span>
            </div>
            <button
              onClick={() => setShowCorruptionTide(!showCorruptionTide)}
              className="text-[10px] font-mono px-2 py-0.5 border border-red-800 bg-red-950/60 text-red-300 hover:bg-red-900"
            >
              {showCorruptionTide ? 'NEKROSE-FRONT: AN' : 'NEKROSE-FRONT: AUS'}
            </button>
          </div>

          {/* Tactical 2D Topographical Map Canvas Box */}
          <div className="relative w-full aspect-square bg-[#05080c] border border-[#231513] overflow-hidden p-3 flex flex-col justify-between">
            {/* Grid Coordinates */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20 pointer-events-none">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="border border-red-900/40 text-[8px] p-0.5 text-red-500 font-mono">
                  {String.fromCharCode(65 + Math.floor(i / 6))}:{i % 6}
                </div>
              ))}
            </div>

            {/* Concentric Zones */}
            {/* Tier 1 - Outer Ring */}
            <div
              onClick={() => handleZoneSelect(0)}
              className={`absolute inset-4 rounded-full border-2 border-dashed transition-all cursor-pointer flex items-center justify-center ${
                selectedZone === 0
                  ? 'border-emerald-500 bg-emerald-950/20 shadow-[inset_0_0_20px_rgba(16,185,129,0.2)]'
                  : 'border-emerald-900/40 hover:border-emerald-700'
              }`}
            >
              {/* Tier 2 - Middle Ring */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoneSelect(1);
                }}
                className={`w-3/4 h-3/4 rounded-full border-2 border-dashed transition-all cursor-pointer flex items-center justify-center ${
                  selectedZone === 1
                    ? 'border-amber-500 bg-amber-950/30 shadow-[inset_0_0_20px_rgba(245,158,11,0.2)]'
                    : 'border-amber-900/50 hover:border-amber-700'
                }`}
              >
                {/* Tier 3 - Epicenter */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoneSelect(2);
                  }}
                  className={`w-1/2 h-1/2 rounded-full border-2 border-solid transition-all cursor-pointer flex flex-col items-center justify-center ${
                    selectedZone === 2
                      ? 'border-red-600 bg-red-950/50 shadow-[0_0_25px_rgba(220,38,38,0.5)] animate-pulse'
                      : 'border-red-900/60 bg-red-950/20 hover:border-red-700'
                  }`}
                >
                  <Skull className="w-5 h-5 text-red-500 mb-1" />
                  <span className="text-[9px] font-mono font-bold text-red-300">EPIZENTRUM</span>
                </div>
              </div>
            </div>

            {/* Dynamic Corruption Tide Overlay */}
            {showCorruptionTide && (
              <div className="absolute inset-0 bg-radial from-transparent via-red-950/20 to-black/90 pointer-events-none border-4 border-red-900/50 flex items-center justify-center">
                <div className="text-[9px] text-red-500/70 font-mono tracking-widest uppercase bg-black/80 px-2 py-0.5 border border-red-900">
                  ⚠️ NEKROSE-FRONT SCHLIESST SICH
                </div>
              </div>
            )}
          </div>

          <div className="text-[10px] text-[#6d7e8e] font-mono mt-2 flex justify-between">
            <span>World Partition Grid: 128m x 128m Cells</span>
            <span>Hierarchical LOD: HLOD3 Distance Culling</span>
          </div>
        </div>

        {/* Selected Zone Deep Details */}
        <div className="lg:col-span-5 space-y-4">
          <div className={`p-4 border ${zones[selectedZone].color} space-y-3`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase">{zones[selectedZone].name}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 bg-black/60 border border-current">
                Gefahr: {zones[selectedZone].threat}
              </span>
            </div>

            <p className="text-xs font-mono text-[#d6e0ea] leading-relaxed">
              {zones[selectedZone].description}
            </p>

            <div>
              <span className="text-[11px] font-mono font-bold text-amber-400 block mb-1">
                Kernelemente & Points-of-Interest:
              </span>
              <ul className="space-y-1 text-xs font-mono text-[#abb8c7]">
                {zones[selectedZone].points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-center gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Anti-Empty-Space Architectural Mechanics */}
          <div className="p-4 bg-[#0a0e14] border border-[#2b1b18] space-y-3">
            <div className="text-xs font-mono font-bold text-red-400 flex items-center gap-2">
              <Flame className="w-4 h-4 text-red-500" />
              <span>3 METHODEN GEGEN 'LEERE RÄUME'</span>
            </div>

            {data.antiEmptyWorldMechanics.map((mech, mIdx) => (
              <div key={mIdx} className="p-2.5 bg-[#06080c] border border-[#201513] text-xs font-mono">
                <div className="text-amber-400 font-bold mb-0.5 text-[11px]">{mech.name}</div>
                <div className="text-[#9cb0c2] text-[11px] leading-relaxed">{mech.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
