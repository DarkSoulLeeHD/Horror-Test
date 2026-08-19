import React, { useState } from 'react';
import { ShieldAlert, Volume2, Radio, Heart, Activity, Wind, EyeOff, Play, Zap, Compass, Map } from 'lucide-react';
import { horrorAudio } from '../utils/horrorAudio';

interface InteractiveSandboxProps {
  audioEnabled: boolean;
}

export const InteractiveSandbox: React.FC<InteractiveSandboxProps> = ({ audioEnabled }) => {
  const [radioMode, setRadioMode] = useState<boolean>(false);
  const [geigerIntensity, setGeigerIntensity] = useState<number>(0.5);
  const [heartBpm, setHeartBpm] = useState<number>(90);
  const [testPhrase, setTestPhrase] = useState<string>("Bleibt zusammen... ich sehe etwas im Nebel...");
  const [isPlayingMimic, setIsPlayingMimic] = useState<boolean>(false);

  const handleTriggerRadio = () => {
    if (!audioEnabled) return;
    horrorAudio.playRadioClick(radioMode ? 'close' : 'open');
    setRadioMode(!radioMode);
  };

  const handleTriggerGeiger = () => {
    if (!audioEnabled) return;
    horrorAudio.playGeigerBurst(geigerIntensity);
  };

  const handleTriggerHeartbeat = () => {
    if (!audioEnabled) return;
    horrorAudio.playHeartbeat(heartBpm);
  };

  const handleTriggerBreath = () => {
    if (!audioEnabled) return;
    horrorAudio.playBreathSound(0.85);
  };

  const handleTriggerMimic = () => {
    if (!audioEnabled) return;
    setIsPlayingMimic(true);
    horrorAudio.playRadioClick('open');
    setTimeout(() => {
      horrorAudio.playEntityMimicryVoice(testPhrase);
      setTimeout(() => {
        horrorAudio.playRadioClick('close');
        setIsPlayingMimic(false);
      }, 2500);
    }, 150);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="p-5 bg-[#0e1218] border border-[#3d1d17] relative">
        <div className="flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest mb-1">
          <ShieldAlert className="w-4 h-4" />
          <span>UE5 TECHNICAL SIMULATION LAB & AUDIO BENCHMARK</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-mono text-[#f3e8e2]">
          Interaktive Mechaniken-Teststation
        </h2>
        <p className="text-xs sm:text-sm text-[#b89f98] font-mono mt-1">
          Hier kannst du die Kernsysteme (Audio-Synthese, Mimikry-Filter, Diegetische Sensorik) in Echtzeit austesten.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panel 1: Walkie-Talkie & MetaSounds Proximity Audio */}
        <div className="p-5 bg-[#090d12] border border-[#361e1a] space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold font-mono text-amber-400 border-b border-[#211513] pb-2">
            <Radio className="w-4 h-4 text-amber-500" />
            <span>1. DIEGETISCHER FUNK & SQUELCH-FILTER</span>
          </div>

          <p className="text-xs text-[#9eb0c0] font-mono leading-relaxed">
            Testet den analogen 300Hz-3.4kHz Bandpassfilter und das mechanische Mic-Click-Rauschen:
          </p>

          <button
            onClick={handleTriggerRadio}
            className={`w-full py-3 px-4 font-mono text-xs font-bold border flex items-center justify-center gap-2 transition-all ${
              radioMode
                ? 'bg-amber-950/80 border-amber-600 text-amber-300 shadow-[0_0_15px_rgba(217,119,6,0.3)]'
                : 'bg-[#150f0e] border-[#441f19] text-[#d6c4c0] hover:bg-[#251512]'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>{radioMode ? 'FUNK KANAL OFFEN [V AKTIV]' : 'FUNKTASTE DRÜCKEN [V]'}</span>
          </button>
        </div>

        {/* Panel 2: Geiger / RF Anomaly Detector */}
        <div className="p-5 bg-[#090d12] border border-[#361e1a] space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold font-mono text-red-400 border-b border-[#211513] pb-2">
            <Zap className="w-4 h-4 text-red-500" />
            <span>2. HF-ANOMALIE & GEIGER-IMPULSE</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-[#a5b4c3]">
              <span>Strahlungs-/Fluchintensität:</span>
              <span className="text-red-400 font-bold">{Math.round(geigerIntensity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={geigerIntensity}
              onChange={(e) => setGeigerIntensity(Number(e.target.value))}
              className="w-full accent-red-600 cursor-pointer"
            />
          </div>

          <button
            onClick={handleTriggerGeiger}
            className="w-full py-2.5 px-4 bg-[#1b0d0b] hover:bg-[#2a130f] border border-red-800 text-red-300 font-mono text-xs font-bold flex items-center justify-center gap-2"
          >
            <span>GEIGER-BURST ABFEUERN</span>
          </button>
        </div>

        {/* Panel 3: Heartbeat & Hyperventilation (Stamina & Fear) */}
        <div className="p-5 bg-[#090d12] border border-[#361e1a] space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold font-mono text-emerald-400 border-b border-[#211513] pb-2">
            <Heart className="w-4 h-4 text-emerald-500" />
            <span>3. DREIDIMENSIONALER HERZSCHLAG & KEUCHEN</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-[#a5b4c3]">
              <span>Pulsfrequenz (BPM):</span>
              <span className="text-emerald-400 font-bold">{heartBpm} BPM</span>
            </div>
            <input
              type="range"
              min="60"
              max="160"
              value={heartBpm}
              onChange={(e) => setHeartBpm(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleTriggerHeartbeat}
              className="py-2 px-3 bg-[#0d1712] hover:bg-[#15241c] border border-emerald-800 text-emerald-300 font-mono text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Herzschlag</span>
            </button>
            <button
              onClick={handleTriggerBreath}
              className="py-2 px-3 bg-[#0d141c] hover:bg-[#14202e] border border-blue-800 text-blue-300 font-mono text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Keuchen / Atem</span>
            </button>
          </div>
        </div>

        {/* Panel 4: Entity Mimicry Speech Synthesizer */}
        <div className="p-5 bg-[#090d12] border border-[#361e1a] space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold font-mono text-purple-400 border-b border-[#211513] pb-2">
            <EyeOff className="w-4 h-4 text-purple-500" />
            <span>4. DAS 'WIDERHALL'-MIMIKRY MONSTER</span>
          </div>

          <input
            type="text"
            value={testPhrase}
            onChange={(e) => setTestPhrase(e.target.value)}
            className="w-full bg-[#040608] border border-[#381c17] px-3 py-2 text-xs font-mono text-[#ecdcd7] focus:outline-none focus:border-purple-500"
            placeholder="Aufgezeichnete Spieler-Stimme..."
          />

          <button
            onClick={handleTriggerMimic}
            disabled={isPlayingMimic}
            className="w-full py-2.5 px-4 bg-[#230d2a] hover:bg-[#34123f] border border-purple-800 text-purple-300 font-mono text-xs font-bold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 ${isPlayingMimic ? 'animate-spin' : ''}`} />
            <span>{isPlayingMimic ? 'AUDIO LÄUFT...' : 'VERZERRTEN KÖDER ABSPIELEN'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
