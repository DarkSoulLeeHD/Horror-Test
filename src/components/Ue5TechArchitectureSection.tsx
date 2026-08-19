import React, { useState, useEffect } from 'react';
import { GDD_SECTIONS_DATA } from '../data/gddContent';
import { Cpu, Terminal, GitBranch, Shield, Zap, Box, Server, Radio, Database, Copy, Check, Flashlight, Users } from 'lucide-react';
import { horrorAudio } from '../utils/horrorAudio';

export const Ue5TechArchitectureSection: React.FC = () => {
  const data = GDD_SECTIONS_DATA.ue5Architecture;
  const [activeTab, setActiveTab] = useState<'git' | 'server' | 'replication' | 'voice' | 'flashlight'>('git');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Live Flashlight Network Replication Simulator State
  const [simFlashlightOn, setSimFlashlightOn] = useState<boolean>(true);
  const [simBattery, setSimBattery] = useState<number>(3.85); // 2.7V - 4.2V
  const [simMonsterDist, setSimMonsterDist] = useState<number>(15); // Meters
  const [simFlicker, setSimFlicker] = useState<boolean>(false);

  // Simulation loop for battery drain & EMF jitter
  useEffect(() => {
    const interval = setInterval(() => {
      if (simFlashlightOn) {
        setSimBattery((prev) => {
          const next = Math.max(2.7, prev - 0.01);
          if (next <= 2.7) setSimFlashlightOn(false);
          return next;
        });

        // Trigger flicker if close to monster or low battery
        if (simMonsterDist < 8 || simBattery < 3.0) {
          setSimFlicker((f) => !f);
        } else {
          setSimFlicker(false);
        }
      } else {
        setSimFlicker(false);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [simFlashlightOn, simMonsterDist, simBattery]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="p-5 bg-[#0e1218] border border-[#3d1d17] relative">
        <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest mb-1">
          <Cpu className="w-4 h-4" />
          <span>UNREAL ENGINE 5.4.4 C++ // DEVOPS & NETWORKING ARCHITECTURE</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-mono text-[#f3e8e2]">{data.title}</h2>
        <p className="text-xs sm:text-sm text-[#b89f98] font-mono mt-1">{data.subtitle}</p>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {[
          { id: 'git', label: '1. Git & LFS Setup', icon: <GitBranch className="w-4 h-4" /> },
          { id: 'server', label: '2. Server-Topologie', icon: <Server className="w-4 h-4" /> },
          { id: 'replication', label: '3. Replikation', icon: <Database className="w-4 h-4" /> },
          { id: 'voice', label: '4. Proximity Voice', icon: <Radio className="w-4 h-4" /> },
          { id: 'flashlight', label: '5. Flashlight C++', icon: <Flashlight className="w-4 h-4 text-amber-400" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as unknown as typeof activeTab)}
            className={`p-3 text-left border transition-all text-xs font-mono flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-[#1f1412] border-red-600 text-red-300 font-bold shadow-[0_0_12px_rgba(220,38,38,0.2)]'
                : 'bg-[#0c1016] border-[#221614] text-[#8e9dae] hover:border-[#4d231c]'
            }`}
          >
            {tab.icon}
            <span className="truncate">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: Git & LFS Setup */}
      {activeTab === 'git' && (
        <div className="space-y-6">
          <div className="p-5 bg-[#090d13] border border-[#321c18] space-y-4">
            <div className="flex items-center justify-between border-b border-[#241715] pb-2">
              <div className="flex items-center gap-2 text-sm font-bold font-mono text-red-400">
                <GitBranch className="w-4 h-4 text-red-500" />
                <span>1. .gitignore für Unreal Engine 5.4+</span>
              </div>
              <button
                onClick={() => copyToClipboard(data.gitSetup.gitignore, 'gitignore')}
                className="px-2.5 py-1 bg-[#1a110f] hover:bg-[#2e1814] text-xs font-mono text-amber-300 border border-amber-900/60 flex items-center gap-1.5"
              >
                {copiedKey === 'gitignore' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'gitignore' ? 'KOPIERT' : '.gitignore kopieren'}</span>
              </button>
            </div>
            <pre className="p-3 bg-[#040608] border border-[#221614] text-xs font-mono text-emerald-400/90 overflow-x-auto leading-relaxed">
              {data.gitSetup.gitignore}
            </pre>
          </div>

          <div className="p-5 bg-[#090d13] border border-[#321c18] space-y-4">
            <div className="flex items-center justify-between border-b border-[#241715] pb-2">
              <div className="flex items-center gap-2 text-sm font-bold font-mono text-amber-400">
                <Box className="w-4 h-4 text-amber-500" />
                <span>2. .gitattributes (Git LFS für Binär- & 3D-Assets mit Locking)</span>
              </div>
              <button
                onClick={() => copyToClipboard(data.gitSetup.gitattributes, 'gitattributes')}
                className="px-2.5 py-1 bg-[#1a110f] hover:bg-[#2e1814] text-xs font-mono text-amber-300 border border-amber-900/60 flex items-center gap-1.5"
              >
                {copiedKey === 'gitattributes' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'gitattributes' ? 'KOPIERT' : '.gitattributes kopieren'}</span>
              </button>
            </div>
            <pre className="p-3 bg-[#040608] border border-[#221614] text-xs font-mono text-amber-300/90 overflow-x-auto leading-relaxed">
              {data.gitSetup.gitattributes}
            </pre>
            <p className="text-[11px] text-[#8e9dae] font-mono">
              💡 <strong>Hinweis zu <code>lockable</code>:</strong> Verhindert Merge-Konflikte bei uassets/umaps im Team durch <code>git lfs lock Content/Maps/MainMap.umap</code>.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: Server-Struktur & Topologie */}
      {activeTab === 'server' && (
        <div className="p-5 bg-[#090d13] border border-[#321c18] space-y-5">
          <div className="flex items-center gap-2 text-sm font-bold font-mono text-red-400 border-b border-[#241715] pb-2">
            <Server className="w-4 h-4 text-red-500" />
            <span>SERVER-STRUKTUR: LISTEN SERVER VS. DEDICATED SERVER</span>
          </div>

          <div className="p-3.5 bg-[#140e0c] border border-amber-900/50 text-xs font-mono text-[#dcd1cd] leading-relaxed">
            <strong className="text-amber-400">Architektur-Empfehlung: </strong>
            {data.serverTopology.recommendation}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {data.serverTopology.advantages.map((adv, aIdx) => (
              <div key={aIdx} className="p-3 bg-[#06080c] border border-[#1f1513] text-xs font-mono text-[#c0cbd6]">
                <span className="text-red-500 font-bold block mb-1">VORTEIL 0{aIdx + 1}:</span>
                <span>{adv}</span>
              </div>
            ))}
          </div>

          {/* Flow Diagram */}
          <div className="p-4 bg-[#040608] border border-[#221614] text-xs font-mono space-y-2">
            <div className="text-emerald-400 font-bold">SESSION & NETWORKING FLOW:</div>
            <div className="text-[#8e9ea7] leading-relaxed text-[11px]">
              Host startet Lobby (EOS P2P Relay) ➔ Spieler 2–4 treten über Steam/EOS Session ID bei (kein Port-Forwarding) ➔ Host Actor fungiert als Network Authority ➔ Clients fungieren als Autonomous / Simulated Proxies.
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Replikations-Matrix */}
      {activeTab === 'replication' && (
        <div className="p-5 bg-[#090d13] border border-[#321c18] space-y-5">
          <div className="flex items-center gap-2 text-sm font-bold font-mono text-purple-400 border-b border-[#241715] pb-2">
            <Database className="w-4 h-4 text-purple-500" />
            <span>PLAYER CONTROLLER & REPLIKATIONS-MATRIX</span>
          </div>

          <div className="space-y-3">
            {data.replicationMatrix.map((item, idx) => (
              <div key={idx} className="p-3.5 bg-[#06080c] border border-[#221614] text-xs font-mono space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1b1210] pb-1">
                  <span className="font-bold text-red-400">{item.parameter}</span>
                  <span className="px-2 py-0.5 bg-[#170e0d] text-amber-300 border border-amber-900/60 text-[10px]">
                    Condition: {item.condition}
                  </span>
                </div>
                <div className="text-[#9eb0c0] text-[11px]">
                  <strong>Typ & Setup:</strong> {item.type}
                </div>
                <div className="text-[#9eb0c0] text-[11px]">
                  <strong>Autorität:</strong> {item.authority}
                </div>
                <div className="text-[#7d8c9a] text-[10px]">
                  <strong>Begründung:</strong> {item.reason}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Proximity Voice System */}
      {activeTab === 'voice' && (
        <div className="p-5 bg-[#090d13] border border-[#321c18] space-y-5">
          <div className="flex items-center gap-2 text-sm font-bold font-mono text-emerald-400 border-b border-[#241715] pb-2">
            <Radio className="w-4 h-4 text-emerald-500" />
            <span>{data.proximityVoiceSystem.title}</span>
          </div>

          <div className="p-3 bg-[#0a140f] border border-emerald-900/50 text-xs font-mono text-emerald-300">
            <strong>Plugin & Audio Pipeline: </strong>
            {data.proximityVoiceSystem.pluginArchitecture}
          </div>

          <div className="space-y-2">
            {data.proximityVoiceSystem.features.map((feat, fIdx) => (
              <div key={fIdx} className="p-3 bg-[#06080c] border border-[#1f1513] text-xs font-mono text-[#c0cbd6] flex items-start gap-2">
                <span className="text-emerald-500 font-bold">›</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Replicated Flashlight C++ Logic & Live Simulator */}
      {activeTab === 'flashlight' && (
        <div className="space-y-6">
          {/* Live Flashlight Net-Simulator Sandbox */}
          <div className="p-5 bg-[#0a0f15] border border-[#381e19] space-y-4">
            <div className="flex items-center justify-between border-b border-[#291715] pb-2">
              <div className="flex items-center gap-2 text-sm font-bold font-mono text-amber-400">
                <Flashlight className="w-4 h-4 text-amber-500" />
                <span>INTERAKTIVER C++ REPLIKATIONS-SIMULATOR (FLASHLIGHT)</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">Server & Client State Live</span>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <button
                onClick={() => setSimFlashlightOn(!simFlashlightOn)}
                className={`py-2 px-3 border font-bold flex items-center justify-center gap-2 ${
                  simFlashlightOn
                    ? 'bg-amber-900/80 border-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'bg-[#150f0e] border-[#441f19] text-[#c0cbd6]'
                }`}
              >
                <Flashlight className="w-4 h-4" />
                <span>[F] Flashlight {simFlashlightOn ? 'AUSSCHALTEN' : 'EINSCHALTEN'}</span>
              </button>

              <div className="p-2 bg-[#06080c] border border-[#221614] flex flex-col justify-between">
                <div className="flex justify-between text-[11px] text-[#8e9dae]">
                  <span>Distanz zum Monster:</span>
                  <span className={simMonsterDist < 8 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                    {simMonsterDist} Meter
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="30"
                  value={simMonsterDist}
                  onChange={(e) => setSimMonsterDist(Number(e.target.value))}
                  className="accent-red-600 cursor-pointer"
                />
              </div>

              <div className="p-2 bg-[#06080c] border border-[#221614] flex flex-col justify-between">
                <div className="flex justify-between text-[11px] text-[#8e9dae]">
                  <span>Batterie-Spannung:</span>
                  <span className={simBattery < 3.0 ? 'text-red-400 font-bold' : 'text-amber-400'}>
                    {simBattery.toFixed(2)}V
                  </span>
                </div>
                <button
                  onClick={() => setSimBattery(4.2)}
                  className="text-[10px] bg-amber-950 hover:bg-amber-900 text-amber-300 py-0.5 border border-amber-800"
                >
                  Neue Batterie einlegen (4.2V)
                </button>
              </div>
            </div>

            {/* Simulated 3-Peer Viewport (Host vs Autonomous vs Simulated Proxy) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Host (Server Authority) */}
              <div className="p-3 bg-[#06080b] border border-blue-900/60 text-xs font-mono space-y-1.5">
                <div className="text-blue-400 font-bold text-[11px] flex justify-between">
                  <span>HOST (SERVER AUTHORITY)</span>
                  <span>HasAuthority() = true</span>
                </div>
                <div className={`p-3 border text-center transition-all ${
                  simFlashlightOn
                    ? simFlicker
                      ? 'bg-amber-950/40 border-amber-500 text-amber-400 animate-pulse'
                      : 'bg-amber-950/70 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                    : 'bg-black/60 border-[#221614] text-[#6d7e8e]'
                }`}>
                  {simFlashlightOn ? (simFlicker ? '⚡ EMF FLICKERING' : '🔦 BEAM ON (5000 lm)') : '⚫ DARKNESS'}
                </div>
                <div className="text-[10px] text-[#7d8c9a]">
                  Tick: Entlädt BatteryVoltage ({simBattery.toFixed(2)}V)
                </div>
              </div>

              {/* Autonomous Proxy (Player 1) */}
              <div className="p-3 bg-[#06080b] border border-emerald-900/60 text-xs font-mono space-y-1.5">
                <div className="text-emerald-400 font-bold text-[11px] flex justify-between">
                  <span>AUTONOMOUS PROXY (PLAYER 1)</span>
                  <span>IsLocallyControlled() = true</span>
                </div>
                <div className={`p-3 border text-center transition-all ${
                  simFlashlightOn
                    ? simFlicker
                      ? 'bg-amber-950/40 border-amber-500 text-amber-400 animate-pulse'
                      : 'bg-amber-950/70 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                    : 'bg-black/60 border-[#221614] text-[#6d7e8e]'
                }`}>
                  {simFlashlightOn ? (simFlicker ? '⚡ EMF FLICKERING' : '🔦 BEAM ON (First-Person)') : '⚫ DARKNESS'}
                </div>
                <div className="text-[10px] text-[#7d8c9a]">
                  Input [F] ➔ Server_ToggleFlashlight() RPC
                </div>
              </div>

              {/* Simulated Proxy (Player 2 watching Player 1) */}
              <div className="p-3 bg-[#06080b] border border-purple-900/60 text-xs font-mono space-y-1.5">
                <div className="text-purple-400 font-bold text-[11px] flex justify-between">
                  <span>SIMULATED PROXY (PLAYER 2)</span>
                  <span>Remote Client</span>
                </div>
                <div className={`p-3 border text-center transition-all ${
                  simFlashlightOn
                    ? simFlicker
                      ? 'bg-amber-950/40 border-amber-500 text-amber-400 animate-pulse'
                      : 'bg-amber-950/70 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                    : 'bg-black/60 border-[#221614] text-[#6d7e8e]'
                }`}>
                  {simFlashlightOn ? (simFlicker ? '⚡ EMF FLICKERING' : '🔦 3D CONE VISIBLE') : '⚫ DARKNESS'}
                </div>
                <div className="text-[10px] text-[#7d8c9a]">
                  Replikation via <code>OnRep_IsFlashlightOn()</code>
                </div>
              </div>
            </div>
          </div>

          {/* C++ Code Viewer (Header & Source) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Header .h */}
            <div className="p-4 bg-[#090d13] border border-[#321c18] space-y-3">
              <div className="flex items-center justify-between border-b border-[#241715] pb-2">
                <span className="text-xs font-mono font-bold text-red-400">
                  KB_FlashlightComponent.h
                </span>
                <button
                  onClick={() => copyToClipboard(data.flashlightCode.header, 'h_code')}
                  className="px-2 py-0.5 bg-[#170e0d] text-[10px] font-mono text-amber-300 border border-amber-900/60"
                >
                  {copiedKey === 'h_code' ? 'KOPIERT' : 'Kopieren'}
                </button>
              </div>
              <pre className="p-3 bg-[#040608] border border-[#221614] text-[11px] font-mono text-emerald-400/90 overflow-x-auto max-h-96 leading-normal">
                {data.flashlightCode.header}
              </pre>
            </div>

            {/* Source .cpp */}
            <div className="p-4 bg-[#090d13] border border-[#321c18] space-y-3">
              <div className="flex items-center justify-between border-b border-[#241715] pb-2">
                <span className="text-xs font-mono font-bold text-amber-400">
                  KB_FlashlightComponent.cpp
                </span>
                <button
                  onClick={() => copyToClipboard(data.flashlightCode.source, 'cpp_code')}
                  className="px-2 py-0.5 bg-[#170e0d] text-[10px] font-mono text-amber-300 border border-amber-900/60"
                >
                  {copiedKey === 'cpp_code' ? 'KOPIERT' : 'Kopieren'}
                </button>
              </div>
              <pre className="p-3 bg-[#040608] border border-[#221614] text-[11px] font-mono text-amber-300/90 overflow-x-auto max-h-96 leading-normal">
                {data.flashlightCode.source}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
