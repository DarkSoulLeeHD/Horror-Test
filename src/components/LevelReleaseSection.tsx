import React, { useState } from 'react';
import { GDD_SECTIONS_DATA } from '../data/gddContent';
import { Globe, Volume2, Package, GitPullRequest, Copy, Check, Terminal, Play, Server, Radio, ShieldCheck, Download } from 'lucide-react';
import { horrorAudio } from '../utils/horrorAudio';

interface LevelReleaseSectionProps {
  audioEnabled: boolean;
}

export const LevelReleaseSection: React.FC<LevelReleaseSectionProps> = ({ audioEnabled }) => {
  const data = GDD_SECTIONS_DATA.levelReleasePipeline;
  const [activeTab, setActiveTab] = useState<'worldPartition' | 'soundscapes' | 'packaging' | 'github'>('worldPartition');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Soundscape interactive player
  const [activeBiome, setActiveBiome] = useState<number>(0);

  // Packaging interactive generator
  const [projectPath, setProjectPath] = useState<string>('C:/Projects/KrasnyBor');
  const [targetBuildConfig, setTargetBuildConfig] = useState<'Shipping' | 'Development'>('Shipping');

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleTestBiomeAudio = (idx: number) => {
    setActiveBiome(idx);
    if (!audioEnabled) return;

    if (idx === 0) {
      // Forest
      horrorAudio.playRadioClick('crackle');
    } else if (idx === 1) {
      // Bunker
      horrorAudio.playHeartbeat(95);
    } else {
      // Swamp
      horrorAudio.playGeigerBurst(0.7);
    }
  };

  const generatedRunUat = `.\\Engine\\Build\\BatchFiles\\RunUAT.bat BuildCookRun ^
  -project="${projectPath}/KrasnyBor.uproject" ^
  -noP4 -clientconfig=${targetBuildConfig} -platform=Win64 -targetplatform=Win64 ^
  -build -cook -pak -stage -archive ^
  -archivedirectory="${projectPath}/Builds/Win64"`;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="p-5 bg-[#0e1218] border border-[#3d1d17] relative">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1">
          <Globe className="w-4 h-4" />
          <span>LEVEL DESIGN, AUDIO VOLUMES & GITHUB STANDALONE PIPELINE</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-mono text-[#f3e8e2]">{data.title}</h2>
        <p className="text-xs sm:text-sm text-[#b89f98] font-mono mt-1">{data.subtitle}</p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { id: 'worldPartition', label: '1. World Partition', icon: <Globe className="w-4 h-4" /> },
          { id: 'soundscapes', label: '2. Audio Volumes', icon: <Volume2 className="w-4 h-4 text-amber-400" /> },
          { id: 'packaging', label: '3. Windows .exe Build', icon: <Package className="w-4 h-4 text-blue-400" /> },
          { id: 'github', label: '4. GitHub Release', icon: <GitPullRequest className="w-4 h-4 text-emerald-400" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as unknown as typeof activeTab)}
            className={`p-3 text-left border transition-all text-xs font-mono flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-[#1b1712] border-amber-600 text-amber-300 font-bold shadow-[0_0_12px_rgba(217,119,6,0.25)]'
                : 'bg-[#0c1016] border-[#221614] text-[#8e9dae] hover:border-[#4d231c]'
            }`}
          >
            {tab.icon}
            <span className="truncate">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: World Partition & 60+ FPS */}
      {activeTab === 'worldPartition' && (
        <div className="space-y-6">
          <div className="p-5 bg-[#090d13] border border-[#321c18] space-y-4">
            <div className="flex items-center justify-between border-b border-[#241715] pb-2">
              <h3 className="text-sm font-bold font-mono text-amber-400">
                {data.worldPartition.title}
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">16 km² World Partition Grid</span>
            </div>
            <p className="text-xs font-mono text-[#cbd5e1] leading-relaxed">
              {data.worldPartition.summary}
            </p>

            <ul className="space-y-2.5">
              {data.worldPartition.parameters.map((param, idx) => (
                <li key={idx} className="p-3 bg-[#06080c] border border-[#1f1513] text-xs font-mono text-[#c0cbd6] flex items-start gap-2.5">
                  <span className="text-amber-500 font-bold">›</span>
                  <span>{param}</span>
                </li>
              ))}
            </ul>

            {/* .ini Config */}
            <div className="p-3 bg-[#040608] border border-[#221614] space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400">Config/DefaultEngine.ini</span>
              <pre className="text-xs font-mono text-emerald-400/90 overflow-x-auto leading-relaxed">
                {data.worldPartition.iniConfig}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Soundscapes & Audio Volumes */}
      {activeTab === 'soundscapes' && (
        <div className="space-y-6">
          <div className="p-5 bg-[#090d13] border border-[#321c18] space-y-4">
            <div className="flex items-center justify-between border-b border-[#241715] pb-2">
              <h3 className="text-sm font-bold font-mono text-amber-400 flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                <span>{data.soundscapes.title}</span>
              </h3>
              <span className="text-[10px] font-mono text-[#8e9dae]">{data.soundscapes.summary}</span>
            </div>

            {/* Biomes Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {data.soundscapes.biomes.map((biome, idx) => (
                <div
                  key={idx}
                  onClick={() => handleTestBiomeAudio(idx)}
                  className={`p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                    activeBiome === idx
                      ? 'bg-[#1e150f] border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                      : 'bg-[#06080c] border-[#221614] hover:border-[#44231b]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold font-mono text-amber-300">{biome.name}</h4>
                      <Play className={`w-3.5 h-3.5 ${activeBiome === idx ? 'text-amber-400 fill-amber-400' : 'text-[#6d7e8e]'}`} />
                    </div>
                    <div className="text-[11px] font-mono text-emerald-400">
                      <strong>Reverb:</strong> {biome.reverb}
                    </div>
                    <p className="text-[11px] font-mono text-[#9eb0c0] leading-relaxed">
                      {biome.sounds}
                    </p>
                  </div>
                  <div className="mt-3 p-2 bg-[#040608] border border-red-950 text-[10px] font-mono text-red-300">
                    <strong>Horror-Effekt:</strong> {biome.fearFactor}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Windows PC Packaging (.exe) */}
      {activeTab === 'packaging' && (
        <div className="space-y-6">
          <div className="p-5 bg-[#090d13] border border-[#321c18] space-y-4">
            <div className="flex items-center justify-between border-b border-[#241715] pb-2">
              <h3 className="text-sm font-bold font-mono text-blue-400 flex items-center gap-2">
                <Package className="w-4 h-4" />
                <span>{data.packagingGuide.title}</span>
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">Standalone Win64 Shipping</span>
            </div>

            <div className="space-y-3">
              {data.packagingGuide.steps.map((st, idx) => (
                <div key={idx} className="p-3.5 bg-[#06080c] border border-[#1f1513] space-y-1.5 font-mono text-xs">
                  <div className="font-bold text-amber-300">{st.step}</div>
                  <pre className="text-[#a1b0c0] whitespace-pre-wrap text-[11px] leading-relaxed">
                    {st.desc}
                  </pre>
                </div>
              ))}
            </div>

            {/* RunUAT Command Generator */}
            <div className="p-4 bg-[#05080c] border border-blue-900/60 space-y-3 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400">RunUAT CLI Build Command Generator:</span>
                <button
                  onClick={() => copyText(generatedRunUat, 'runuat')}
                  className="px-2.5 py-1 bg-[#101824] hover:bg-[#1a273b] border border-blue-800 text-xs text-blue-300 flex items-center gap-1.5"
                >
                  {copiedKey === 'runuat' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'runuat' ? 'KOPIERT' : 'CLI Befehl kopieren'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[11px] text-[#7d8c9a] block mb-1">Projekt-Pfad auf PC:</label>
                  <input
                    type="text"
                    value={projectPath}
                    onChange={(e) => setProjectPath(e.target.value)}
                    className="w-full bg-[#030406] border border-[#2b3a4f] px-2.5 py-1 text-xs text-amber-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#7d8c9a] block mb-1">Build Configuration:</label>
                  <select
                    value={targetBuildConfig}
                    onChange={(e) => setTargetBuildConfig(e.target.value as unknown as typeof targetBuildConfig)}
                    className="w-full bg-[#030406] border border-[#2b3a4f] px-2.5 py-1 text-xs text-amber-300 focus:outline-none"
                  >
                    <option value="Shipping">Shipping (Finaler optimierter Release)</option>
                    <option value="Development">Development (Mit Debug-Konsole)</option>
                  </select>
                </div>
              </div>

              <pre className="p-3 bg-[#030406] border border-[#1b2535] text-[11px] text-emerald-400 overflow-x-auto leading-relaxed">
                {generatedRunUat}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GitHub Release Deployment */}
      {activeTab === 'github' && (
        <div className="space-y-6">
          <div className="p-5 bg-[#090d13] border border-[#321c18] space-y-4">
            <div className="flex items-center justify-between border-b border-[#241715] pb-2">
              <h3 className="text-sm font-bold font-mono text-emerald-400 flex items-center gap-2">
                <GitPullRequest className="w-4 h-4" />
                <span>{data.githubReleaseGuide.title}</span>
              </h3>
              <span className="text-[10px] font-mono text-amber-400">Playable .zip Release</span>
            </div>

            <div className="space-y-3">
              {data.githubReleaseGuide.steps.map((st, idx) => (
                <div key={idx} className="p-3.5 bg-[#06080c] border border-[#1f1513] space-y-1.5 font-mono text-xs">
                  <div className="font-bold text-emerald-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>{st.step}</span>
                  </div>
                  <pre className="text-[#cbd5e1] whitespace-pre-wrap text-[11px] leading-relaxed pl-6">
                    {st.desc}
                  </pre>
                </div>
              ))}
            </div>

            {/* Quick Summary Callout */}
            <div className="p-4 bg-[#08120c] border border-emerald-800/60 font-mono text-xs space-y-2 text-[#d1dfd6]">
              <div className="text-emerald-400 font-bold flex items-center gap-2">
                <Download className="w-4 h-4 text-emerald-400" />
                <span>ERGEBNIS: DIREKTER LINK FÜR DEIN TEAM</span>
              </div>
              <p className="text-[11px] text-[#9eb0a5]">
                Nach dem Hochladen lautet dein permanenter Download-Link:  
                <code className="text-amber-300 ml-1">https://github.com/DEIN_USERNAME/DEIN_REPO/releases/latest</code>.  
                Deine Freunde entpacken das Archiv, starten <strong>KrasnyBor.exe</strong>, und ihr seid in 2 Minuten ohne Serverkosten im Spiel!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
