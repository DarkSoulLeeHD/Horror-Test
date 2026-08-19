import React, { useState, useEffect } from 'react';
import { GDD_SECTIONS_DATA } from '../data/gddContent';
import { ShieldAlert, Mic, EyeOff, Brain, Radio, Zap, Activity, Volume2, Copy, Check, Play, AlertTriangle, Ghost } from 'lucide-react';
import { horrorAudio } from '../utils/horrorAudio';

interface AiSanitySectionProps {
  audioEnabled: boolean;
}

export const AiSanitySection: React.FC<AiSanitySectionProps> = ({ audioEnabled }) => {
  const data = GDD_SECTIONS_DATA.aiSanitySystems;
  const [selectedSubTab, setSelectedSubTab] = useState<'soundAi' | 'sanity' | 'scareDirector'>('soundAi');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // 1. Interactive Sound AI Simulator State
  const [noiseLoudness, setNoiseLoudness] = useState<number>(0);
  const [aiSuspicion, setAiSuspicion] = useState<number>(15); // 0-100%
  const [aiState, setAiState] = useState<'IDLE_PATROL' | 'INVESTIGATING' | 'STALKING' | 'BLOODLUST_HUNT'>('IDLE_PATROL');
  const [lastSoundTrigger, setLastSoundTrigger] = useState<string>('Kein Geräusch');

  // 2. Interactive Asymmetrical Sanity State
  const [playerSanity, setPlayerSanity] = useState<number>(28); // 0-100%

  // 3. Dynamic Scare Director State
  const [tensionLevel, setTensionLevel] = useState<number>(65); // 0-100%
  const [scareCooldown, setScareCooldown] = useState<number>(0);
  const [activeScareEvent, setActiveScareEvent] = useState<string | null>(null);

  // AI Suspicion decay & state machine loop
  useEffect(() => {
    const timer = setInterval(() => {
      setAiSuspicion((prev) => {
        const decayed = Math.max(5, prev - 1.5);
        if (decayed >= 85) setAiState('BLOODLUST_HUNT');
        else if (decayed >= 50) setAiState('STALKING');
        else if (decayed >= 25) setAiState('INVESTIGATING');
        else setAiState('IDLE_PATROL');
        return decayed;
      });

      if (scareCooldown > 0) {
        setScareCooldown((c) => Math.max(0, c - 1));
      }
    }, 400);

    return () => clearInterval(timer);
  }, [scareCooldown]);

  const triggerNoiseEvent = (label: string, loudnessValue: number) => {
    setLastSoundTrigger(label);
    setNoiseLoudness(loudnessValue);
    setAiSuspicion((prev) => Math.min(100, prev + loudnessValue * 30));

    if (audioEnabled) {
      if (loudnessValue > 1.5) {
        horrorAudio.playEntityMimicryVoice('PANIC_SCREAM');
      } else {
        horrorAudio.playRadioClick('crackle');
      }
    }
  };

  const triggerDirectorScare = () => {
    if (scareCooldown > 0) return;

    setActiveScareEvent('Schattenfigur im toten Winkel zuckt vorbei & Krähenschwarm bricht aus!');
    setTensionLevel(100);
    setScareCooldown(20); // 20s simulated cooldown

    if (audioEnabled) {
      horrorAudio.playEntityMimicryVoice('STALKER_SCARE');
    }

    setTimeout(() => {
      setActiveScareEvent(null);
      setTensionLevel(25);
    }, 4000);
  };

  const copyCode = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="p-5 bg-[#0e1218] border border-[#3d1d17] relative">
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-1">
          <Brain className="w-4 h-4" />
          <span>AI PERCEPTION & PSYCHOLOGICAL HORROR SYSTEMS</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-mono text-[#f3e8e2]">{data.title}</h2>
        <p className="text-xs sm:text-sm text-[#b89f98] font-mono mt-1">{data.subtitle}</p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {[
          { id: 'soundAi', label: '1. Sound-KI & Live-Mic', icon: <Mic className="w-4 h-4 text-emerald-400" /> },
          { id: 'sanity', label: '2. Asymmetrische Sanity', icon: <EyeOff className="w-4 h-4 text-purple-400" /> },
          { id: 'scareDirector', label: '3. Dynamic Scare Director', icon: <Ghost className="w-4 h-4 text-red-400" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedSubTab(tab.id as unknown as typeof selectedSubTab)}
            className={`p-3.5 text-left border transition-all text-xs font-mono flex items-center gap-2.5 ${
              selectedSubTab === tab.id
                ? 'bg-[#201015] border-purple-600 text-purple-300 font-bold shadow-[0_0_12px_rgba(168,85,247,0.25)]'
                : 'bg-[#0c1016] border-[#221614] text-[#8e9dae] hover:border-[#4d231c]'
            }`}
          >
            {tab.icon}
            <span className="truncate">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 1. SOUND AI & MIC PERCEPTION */}
      {selectedSubTab === 'soundAi' && (
        <div className="space-y-6">
          <div className="p-5 bg-[#090d13] border border-[#321c18] space-y-4">
            <div className="flex items-center justify-between border-b border-[#241715] pb-2">
              <h3 className="text-sm font-bold font-mono text-emerald-400 flex items-center gap-2">
                <Mic className="w-4 h-4" />
                <span>{data.soundAi.title}</span>
              </h3>
              <span className="text-[10px] font-mono text-emerald-500">UAIPerception & AudioCapture</span>
            </div>
            <p className="text-xs font-mono text-[#cbd5e1] leading-relaxed">
              {data.soundAi.concept}
            </p>
            <ul className="space-y-2">
              {data.soundAi.mechanisms.map((m, idx) => (
                <li key={idx} className="p-2.5 bg-[#06080c] border border-[#1f1513] text-xs font-mono text-[#a1b0c0] flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">›</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* INTERACTIVE SOUND & MIC SIMULATOR */}
          <div className="p-5 bg-[#080c10] border-2 border-emerald-950/80 space-y-5">
            <div className="flex items-center justify-between border-b border-[#1b251d] pb-2">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-emerald-400">
                <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                <span>ECHTZEIT-SIMULATION: SOUND-AUSLÖSUNG & MONSTER-PERZEPTION</span>
              </div>
              <span className="text-[10px] font-mono text-[#7d8c9a]">Live Threat State</span>
            </div>

            {/* Action Trigger Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
              <button
                onClick={() => triggerNoiseEvent('Schleichen / Ducken', 0.1)}
                className="p-2.5 bg-[#060d09] hover:bg-[#0c1c13] border border-emerald-900/60 text-emerald-400 text-left"
              >
                <div className="text-[9px] text-[#6d7e8e]">LEISE (0.1)</div>
                <div className="font-bold mt-0.5">Schleichen</div>
              </button>

              <button
                onClick={() => triggerNoiseEvent('Normales Gehen', 0.4)}
                className="p-2.5 bg-[#0d120a] hover:bg-[#182413] border border-emerald-900/60 text-emerald-300 text-left"
              >
                <div className="text-[9px] text-[#6d7e8e]">NORMAL (0.4)</div>
                <div className="font-bold mt-0.5">Schritte</div>
              </button>

              <button
                onClick={() => triggerNoiseEvent('Sprint durch Geäst', 1.2)}
                className="p-2.5 bg-[#171308] hover:bg-[#2b220d] border border-amber-900/60 text-amber-400 text-left"
              >
                <div className="text-[9px] text-[#6d7e8e]">LAUT (1.2)</div>
                <div className="font-bold mt-0.5">Vollsprint</div>
              </button>

              <button
                onClick={() => triggerNoiseEvent('Flasche werfen / Tür knallt', 1.8)}
                className="p-2.5 bg-[#1c0e08] hover:bg-[#33180d] border border-orange-900/60 text-orange-400 text-left"
              >
                <div className="text-[9px] text-[#6d7e8e]">KLIRREN (1.8)</div>
                <div className="font-bold mt-0.5">Wurf / Barrikade</div>
              </button>

              <button
                onClick={() => triggerNoiseEvent('VOICE-CHAT SCHREI IM MIKROFON!', 2.5)}
                className="p-2.5 bg-[#25090a] hover:bg-[#3d0f11] border border-red-800 text-red-400 font-bold text-left animate-pulse"
              >
                <div className="text-[9px] text-red-300">MIKROFON (2.5)</div>
                <div className="mt-0.5">Panik-Schrei</div>
              </button>
            </div>

            {/* Visual Suspicion & Threat Meter */}
            <div className="p-4 bg-[#05070a] border border-[#212920] space-y-3 font-mono">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#a1b0c0]">Letztes Geräusch: <strong className="text-white">{lastSoundTrigger}</strong></span>
                <span className={`px-2 py-0.5 text-[11px] font-bold border ${
                  aiState === 'BLOODLUST_HUNT'
                    ? 'bg-red-950 border-red-600 text-red-400 animate-ping'
                    : aiState === 'STALKING'
                    ? 'bg-amber-950 border-amber-600 text-amber-400'
                    : aiState === 'INVESTIGATING'
                    ? 'bg-blue-950 border-blue-600 text-blue-400'
                    : 'bg-emerald-950 border-emerald-600 text-emerald-400'
                }`}>
                  AI STATE: {aiState}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-[#7d8c9a]">
                  <span>AI Suspicion Meter:</span>
                  <span className="font-bold text-emerald-400">{aiSuspicion.toFixed(0)}%</span>
                </div>
                <div className="w-full h-3 bg-[#0a100c] border border-emerald-950 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      aiSuspicion > 80 ? 'bg-red-600' : aiSuspicion > 45 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${aiSuspicion}%` }}
                  />
                </div>
              </div>
            </div>

            {/* C++ Code Snippet Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                <span>KB_MonsterAIController.cpp (AIPerception Hearing Event)</span>
                <button
                  onClick={() => copyCode(data.soundAi.aiCodeSnippet, 'ai_code')}
                  className="px-2 py-0.5 bg-[#0a140e] border border-emerald-900 text-[10px] text-emerald-300"
                >
                  {copiedKey === 'ai_code' ? 'KOPIERT' : 'Code kopieren'}
                </button>
              </div>
              <pre className="p-3 bg-[#040608] border border-[#1a2b1e] text-[11px] font-mono text-emerald-400/90 overflow-x-auto leading-relaxed">
                {data.soundAi.aiCodeSnippet}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* 2. ASYMMETRICAL SANITY & PHANTOMS */}
      {selectedSubTab === 'sanity' && (
        <div className="space-y-6">
          <div className="p-5 bg-[#090d13] border border-[#321c18] space-y-4">
            <div className="flex items-center justify-between border-b border-[#241715] pb-2">
              <h3 className="text-sm font-bold font-mono text-purple-400 flex items-center gap-2">
                <EyeOff className="w-4 h-4" />
                <span>{data.sanitySystem.title}</span>
              </h3>
              <span className="text-[10px] font-mono text-purple-500">Client-Side Phantom Actors</span>
            </div>
            <p className="text-xs font-mono text-[#cbd5e1] leading-relaxed">
              {data.sanitySystem.concept}
            </p>
            <ul className="space-y-2">
              {data.sanitySystem.mechanisms.map((m, idx) => (
                <li key={idx} className="p-2.5 bg-[#06080c] border border-[#1f1513] text-xs font-mono text-[#a1b0c0] flex items-start gap-2">
                  <span className="text-purple-400 font-bold">›</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* DUAL-VIEW ASYMMETRIC PERSPECTIVE SIMULATOR */}
          <div className="p-5 bg-[#0b080f] border-2 border-purple-950 space-y-5">
            <div className="flex items-center justify-between border-b border-[#251b2e] pb-2">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-purple-400">
                <Brain className="w-4 h-4 text-purple-500" />
                <span>ASYMMETRISCHER DUAL-VIEW SIMULATOR (SPALTUNG DER WAHRNEHMUNG)</span>
              </div>
              <span className="text-[10px] font-mono text-[#8d7c9a]">Sanity: {playerSanity}%</span>
            </div>

            {/* Slider */}
            <div className="p-3 bg-[#060408] border border-[#26162f] space-y-2 font-mono text-xs">
              <div className="flex justify-between text-[11px] text-[#a798b3]">
                <span>Sanity-Wert von Spieler A (Lokaler Geisteszustand):</span>
                <span className={playerSanity < 35 ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {playerSanity}% {playerSanity < 35 ? '(SCHWERE PSYCHOSE)' : '(STABIL)'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={playerSanity}
                onChange={(e) => setPlayerSanity(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>

            {/* Side-by-Side Dual View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {/* Perspective Player A (Affected Client) */}
              <div className={`p-4 border transition-all duration-300 ${
                playerSanity < 35
                  ? 'bg-[#18080f] border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                  : 'bg-[#0a070e] border-[#381b47]'
              }`}>
                <div className="flex justify-between items-center text-[11px] font-bold border-b border-[#3b172a] pb-1.5 mb-2">
                  <span className="text-red-400">PERSPEKTIVE SPIELER A (Sanity {playerSanity}%)</span>
                  <span className="text-[9px] bg-red-950 text-red-300 px-1 border border-red-800">CLIENT-ONLY</span>
                </div>

                <div className="space-y-2 text-[11px]">
                  {playerSanity < 35 ? (
                    <>
                      <div className="p-2 bg-red-950/40 border border-red-800 text-red-300 animate-pulse">
                        ⚠️ <strong>Phantom-Stalker stürmt auf dich zu!</strong> (Kollidiert nicht, löst sich 1m vor Gesicht auf)
                      </div>
                      <p className="text-[#d8b4c0]">Türen wirken mit blutigen Balken vernagelt.</p>
                      <p className="text-[#d8b4c0]">Geflüster über MetaSounds direkt hinter dem linken Ohr.</p>
                      <p className="text-amber-400 font-bold mt-2">"HILFE! DA IST ETWAS AN DER WAND!" (Schießt panisch ins Leere)</p>
                    </>
                  ) : (
                    <>
                      <p className="text-[#a1b0c0]">Raum ist ruhig und dunkel.</p>
                      <p className="text-[#a1b0c0]">Normale Holztür begehbar.</p>
                      <p className="text-[#6d7e8e]">Keine visuellen Verzerrungen.</p>
                    </>
                  )}
                </div>
              </div>

              {/* Perspective Player B (Observer Client) */}
              <div className="p-4 bg-[#080a0f] border border-blue-900/60 text-[11px]">
                <div className="flex justify-between items-center font-bold border-b border-[#1b253b] pb-1.5 mb-2">
                  <span className="text-blue-400">PERSPEKTIVE SPIELER B (Sanity 85% - ZUSCHAUER)</span>
                  <span className="text-[9px] bg-blue-950 text-blue-300 px-1 border border-blue-800">SERVER-SYNC</span>
                </div>

                <div className="space-y-2 text-[#a1b0c0]">
                  <p>Sieht einen völlig leeren, verstaubten Bunkerflur.</p>
                  <p>Die Tür steht offen.</p>
                  <div className="p-2 bg-[#0d1624] border border-blue-900/40 text-blue-200">
                    Beobachtet Spieler A, der zittert, plötzlich ins Leere feuert und in Panik gegen eine leere Wand schlägt.
                  </div>
                  <p className="text-amber-300 font-bold mt-2">"Wovon redest du? Da ist absolut nichts!"</p>
                </div>
              </div>
            </div>

            {/* C++ Code Snippet Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-purple-400">
                <span>KB_SanityManagerComponent.cpp (Client-Only Phantom Spawner)</span>
                <button
                  onClick={() => copyCode(data.sanitySystem.sanityCodeSnippet, 'sanity_code')}
                  className="px-2 py-0.5 bg-[#160a1f] border border-purple-900 text-[10px] text-purple-300"
                >
                  {copiedKey === 'sanity_code' ? 'KOPIERT' : 'Code kopieren'}
                </button>
              </div>
              <pre className="p-3 bg-[#040608] border border-[#2b1738] text-[11px] font-mono text-purple-300/90 overflow-x-auto leading-relaxed">
                {data.sanitySystem.sanityCodeSnippet}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* 3. DYNAMIC SCARE & TENSION DIRECTOR */}
      {selectedSubTab === 'scareDirector' && (
        <div className="space-y-6">
          <div className="p-5 bg-[#090d13] border border-[#321c18] space-y-4">
            <div className="flex items-center justify-between border-b border-[#241715] pb-2">
              <h3 className="text-sm font-bold font-mono text-red-400 flex items-center gap-2">
                <Ghost className="w-4 h-4" />
                <span>{data.dynamicScareDirector.title}</span>
              </h3>
              <span className="text-[10px] font-mono text-red-500">Tension Curve Subsystem & EQS</span>
            </div>
            <p className="text-xs font-mono text-[#cbd5e1] leading-relaxed">
              {data.dynamicScareDirector.concept}
            </p>
            <ul className="space-y-2">
              {data.dynamicScareDirector.mechanisms.map((m, idx) => (
                <li key={idx} className="p-2.5 bg-[#06080c] border border-[#1f1513] text-xs font-mono text-[#a1b0c0] flex items-start gap-2">
                  <span className="text-red-400 font-bold">›</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* DYNAMIC DIRECTOR SIMULATOR */}
          <div className="p-5 bg-[#100808] border-2 border-red-950 space-y-5">
            <div className="flex items-center justify-between border-b border-[#311616] pb-2">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-red-400">
                <Zap className="w-4 h-4 text-red-500" />
                <span>DYNAMIC SCARE DIRECTOR SANDBOX</span>
              </div>
              <span className="text-[10px] font-mono text-[#8d7c7a]">
                Cooldown: {scareCooldown > 0 ? `${scareCooldown}s aktiv` : 'Bereit'}
              </span>
            </div>

            <div className="p-4 bg-[#060404] border border-[#2b1212] space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">Spannungskurve (Tension Level): {tensionLevel}%</div>
                  <div className="text-[11px] text-[#8e9dae] mt-0.5">
                    {scareCooldown > 0
                      ? 'Ruhephase: Director blockiert Scares zur Vermeidung von Abstumpfung.'
                      : 'Hohe Spannung: Director sucht per EQS nach dunklen toten Winkeln.'}
                  </div>
                </div>

                <button
                  onClick={triggerDirectorScare}
                  disabled={scareCooldown > 0}
                  className={`px-4 py-2 border font-bold text-xs flex items-center gap-2 transition-all ${
                    scareCooldown > 0
                      ? 'bg-[#150a0a] border-[#381616] text-[#6d5e5e] cursor-not-allowed'
                      : 'bg-red-950 hover:bg-red-900 border-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.4)]'
                  }`}
                >
                  <Ghost className="w-4 h-4" />
                  <span>{scareCooldown > 0 ? `Cooldown (${scareCooldown}s)` : 'Dynamischen Schreckmoment testen'}</span>
                </button>
              </div>

              {activeScareEvent && (
                <div className="p-3 bg-red-950/80 border border-red-500 text-white font-bold text-center animate-bounce shadow-2xl">
                  ⚠️ {activeScareEvent}
                </div>
              )}
            </div>

            {/* C++ Code Snippet Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-red-400">
                <span>KB_ScareDirectorSubsystem.cpp (EQS & Tension Curve)</span>
                <button
                  onClick={() => copyCode(data.dynamicScareDirector.directorCodeSnippet, 'director_code')}
                  className="px-2 py-0.5 bg-[#1a0c0c] border border-red-900 text-[10px] text-red-300"
                >
                  {copiedKey === 'director_code' ? 'KOPIERT' : 'Code kopieren'}
                </button>
              </div>
              <pre className="p-3 bg-[#040608] border border-[#331515] text-[11px] font-mono text-red-300/90 overflow-x-auto leading-relaxed">
                {data.dynamicScareDirector.directorCodeSnippet}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
