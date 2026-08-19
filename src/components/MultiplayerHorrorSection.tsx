import React, { useState } from 'react';
import { GDD_SECTIONS_DATA } from '../data/gddContent';
import { EyeOff, Radio, Users, Skull, Play, Volume2, Split, ShieldAlert, Cpu } from 'lucide-react';
import { horrorAudio } from '../utils/horrorAudio';

interface MultiplayerHorrorSectionProps {
  audioEnabled: boolean;
}

export const MultiplayerHorrorSection: React.FC<MultiplayerHorrorSectionProps> = ({ audioEnabled }) => {
  const data = GDD_SECTIONS_DATA.multiplayerHorror;
  const [activeTab, setActiveTab] = useState<string>('mimicry_voice');
  const [sanityLevel, setSanityLevel] = useState<number>(25); // 0-100%
  const [mimicPhrase, setMimicPhrase] = useState<string>("Hier drüben... ich hab Munition gefunden... hilf mir!");
  const [isMimicPlaying, setIsMimicPlaying] = useState<boolean>(false);

  const handleTestMimic = () => {
    if (!audioEnabled) return;
    setIsMimicPlaying(true);
    horrorAudio.playRadioClick('open');
    setTimeout(() => {
      horrorAudio.playEntityMimicryVoice(mimicPhrase);
      setTimeout(() => {
        horrorAudio.playRadioClick('close');
        setIsMimicPlaying(false);
      }, 2600);
    }, 150);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-5 bg-[#0e1218] border border-[#3d1d17] relative">
        <div className="flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest mb-1">
          <ShieldAlert className="w-4 h-4" />
          <span>PSYCHOLOGISCHE COOP-DESTRUKTION // ANTI-CLOWNING</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-mono text-[#f3e8e2]">{data.title}</h2>
        <p className="text-xs sm:text-sm text-[#b89f98] font-mono mt-1">{data.subtitle}</p>
      </div>

      {/* 3 Mechanics Selection Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {data.mechanics.map((mech) => {
          const isSelected = activeTab === mech.id;
          return (
            <button
              key={mech.id}
              onClick={() => {
                setActiveTab(mech.id);
                if (audioEnabled) horrorAudio.playRadioClick('crackle');
              }}
              className={`p-3.5 text-left border transition-all ${
                isSelected
                  ? 'bg-[#20100d] border-red-600 shadow-[0_0_12px_rgba(220,38,38,0.25)]'
                  : 'bg-[#0d1217] border-[#221614] hover:border-[#4d231c]'
              }`}
            >
              <div className="text-[11px] font-mono text-amber-500 font-bold mb-1">MECHANIK 0{mech.id === 'mimicry_voice' ? '1' : mech.id === 'client_desync' ? '2' : '3'}</div>
              <h3 className="text-xs font-bold font-mono text-[#f1edea] line-clamp-1">{mech.name}</h3>
            </button>
          );
        })}
      </div>

      {/* Detail Block for Selected Mechanic */}
      {data.mechanics
        .filter((m) => m.id === activeTab)
        .map((mech) => (
          <div key={mech.id} className="p-5 bg-[#0a0f14] border border-[#381e19] space-y-5">
            <div>
              <h3 className="text-lg font-bold font-mono text-red-400 mb-1">{mech.name}</h3>
              <p className="text-xs text-[#cad3dd] font-mono leading-relaxed">{mech.concept}</p>
            </div>

            {/* Implementation Points */}
            <div className="space-y-2">
              <span className="text-[11px] text-amber-400 font-mono font-bold uppercase tracking-wider block">
                Gameplay-Ausführung:
              </span>
              <div className="grid grid-cols-1 gap-2">
                {mech.implementation.map((point, pIdx) => (
                  <div key={pIdx} className="p-2.5 bg-[#080c10] border border-[#211715] flex items-start gap-2 text-xs text-[#c1cbd6] font-mono">
                    <span className="text-red-500 font-bold">›</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* UE5 Technical Blueprint Snippet */}
            <div className="p-3 bg-[#05070a] border border-[#4a1c14] font-mono text-xs">
              <div className="flex items-center gap-2 text-red-400 font-bold mb-1">
                <Cpu className="w-3.5 h-3.5" />
                <span>UE5 IMPLEMENTATION LAYER</span>
              </div>
              <p className="text-[#99a6b5] text-[11px]">{mech.ue5Code}</p>
            </div>
          </div>
        ))}

      {/* Interactive Labs for the 3 Mechanics */}
      <div className="p-5 bg-[#090d12] border border-[#401f19] space-y-6">
        <div className="flex items-center justify-between border-b border-[#2e1815] pb-2">
          <div className="flex items-center gap-2 text-sm font-bold font-mono text-amber-400">
            <Volume2 className="w-4 h-4 text-amber-500" />
            <span>INTERAKTIVER TEST-REPLIKATOR (PROTOTYP)</span>
          </div>
          <span className="text-[10px] text-[#6d7e8e] font-mono">Live WebAudio / Logic Preview</span>
        </div>

        {/* 1. Mimicry Voice Test Bench */}
        {activeTab === 'mimicry_voice' && (
          <div className="space-y-4">
            <p className="text-xs text-[#9eb0c0] font-mono">
              Simuliere, wie das MetaSounds-Subsystem ein Audio-Sample eines Mitspielers abgreift, verarbeitet und als akustischen Köder mit metallischem Doppler-Effekt abspielt:
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={mimicPhrase}
                onChange={(e) => setMimicPhrase(e.target.value)}
                className="flex-1 bg-[#05070a] border border-[#3b1c18] px-3 py-2 text-xs font-mono text-[#f3edea] focus:outline-none focus:border-red-500"
                placeholder="Sprach-Sample des Mitspielers..."
              />
              <button
                onClick={handleTestMimic}
                disabled={isMimicPlaying}
                className="px-4 py-2 bg-[#781814] hover:bg-[#96201b] text-white border border-[#b32720] text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <Play className={`w-3.5 h-3.5 ${isMimicPlaying ? 'animate-spin' : ''}`} />
                <span>{isMimicPlaying ? 'AUDIO SENDET...' : 'MIMIKRY ABFEUERN'}</span>
              </button>
            </div>

            <div className="p-3 bg-[#0d0706] border border-red-950 text-[11px] font-mono text-red-300/80 flex items-center gap-2">
              <Radio className="w-4 h-4 text-red-500 shrink-0" />
              <span>
                <strong>MetaSounds Flow:</strong> Audio In → Buffer Ring (3.0s) → Random Pitch Modulator (0.78x) → Convolution Reverb (Bunker Catacomb IR) → Proximity Spatialization (HRTF).
              </span>
            </div>
          </div>
        )}

        {/* 2. Asymmetrical Sanity Split-Screen */}
        {activeTab === 'client_desync' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-[#cad5df] flex items-center gap-2">
                <span>Sanity-Wert von Spieler A:</span>
                <span className={`font-bold ${sanityLevel < 30 ? 'text-red-500' : sanityLevel < 70 ? 'text-amber-500' : 'text-emerald-500'}`}>
                  {sanityLevel}%
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={sanityLevel}
                onChange={(e) => setSanityLevel(Number(e.target.value))}
                className="w-48 accent-red-600 cursor-pointer"
              />
            </div>

            {/* Split Screen Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Player A Perspective */}
              <div className={`p-4 border relative overflow-hidden transition-all ${
                sanityLevel < 40 ? 'bg-[#1a0808] border-red-700' : 'bg-[#080d12] border-[#222b37]'
              }`}>
                <div className="text-[11px] font-mono text-red-400 font-bold mb-2 flex items-center justify-between">
                  <span>SPIELER A (Sanity: {sanityLevel}%)</span>
                  {sanityLevel < 40 && <span className="px-1 bg-red-900 text-[10px] text-white">PSYCHOSE</span>}
                </div>
                <div className="p-3 bg-black/70 border border-red-900/40 text-xs font-mono space-y-2">
                  <p className="text-red-300">
                    {sanityLevel < 30
                      ? '👁️ "Spieler B nähert sich mit einer erhobenen Feuerwehraxt und blutüberströmtem Gesicht. Die Ausgangstür ist zugemauert. Flüsterstimmen befehlen, ihn zu erschießen."'
                      : sanityLevel < 60
                      ? '⚠️ "Schritte hinter dir im Dunkeln. Das Flackern der Lampe zeigt für 0.2s eine Fratze. Spieler B wirkt verzerrt."'
                      : '✅ "Korridor ist ruhig. Spieler B leuchtet mit der Taschenlampe nach vorn."'}
                  </p>
                </div>
              </div>

              {/* Player B Perspective */}
              <div className="p-4 bg-[#080d12] border border-[#222b37] relative">
                <div className="text-[11px] font-mono text-emerald-400 font-bold mb-2 flex items-center justify-between">
                  <span>SPIELER B (Sanity: 95% - Nüchtern)</span>
                  <span className="px-1 bg-emerald-950 text-emerald-300 text-[10px]">STABIL</span>
                </div>
                <div className="p-3 bg-black/70 border border-emerald-900/40 text-xs font-mono space-y-2">
                  <p className="text-emerald-300/90">
                    "Ich stehe friedlich mit der Taschenlampe im Raum und frage Spieler A, ob er noch Verbandszeug hat. Spieler A zielt plötzlich panisch mit der Schrotflinte auf mich und schreit ins Headset."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Forced Isolation Traps */}
        {activeTab === 'forced_isolation' && (
          <div className="space-y-3 text-xs font-mono text-[#c5cfdb]">
            <p className="leading-relaxed">
              <strong>Dynamische Chaos-Physics Einstürze:</strong> Wenn sich 3 oder 4 Spieler auf denselben Holz-/Gitterboden stellen (z.B. in der alten Getreidemühle), triggert das Chaos-Volume einen strukturellen Bruch. 
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#070b0f] border border-[#2d1a17]">
                <div className="text-red-400 font-bold mb-1">Der Kriecher ('Snatcher')</div>
                <p className="text-[11px] text-[#93a2b0]">
                  Nutzt Lüftungsschächte und Baumkronen. Greift isolierte Spieler (Distanz &gt; 15m zum Team) lautlos mit Haken/Zunge. Unterdrückt den Proximity-Voice-Kanal des Opfers auf 5% Lautstärke.
                </p>
              </div>
              <div className="p-3 bg-[#070b0f] border border-[#2d1a17]">
                <div className="text-amber-400 font-bold mb-1">Volumetrische Nebelwände</div>
                <p className="text-[11px] text-[#93a2b0]">
                  Dichte, lokale Schwefelnebel-Taschen verschlucken Lichtkegel nach 2 Metern. Selbst das Rufen über Funk wird durch elektrostatische Interferenzen im Nebel unbrauchbar.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
