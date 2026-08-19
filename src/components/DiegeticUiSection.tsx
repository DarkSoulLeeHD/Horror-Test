import React, { useState, useEffect } from 'react';
import { GDD_SECTIONS_DATA } from '../data/gddContent';
import { Eye, Heart, Activity, Compass, Map, Radio, Zap, Wind, ShieldAlert, Cpu, AlertTriangle } from 'lucide-react';
import { horrorAudio } from '../utils/horrorAudio';

interface DiegeticUiSectionProps {
  audioEnabled: boolean;
}

export const DiegeticUiSection: React.FC<DiegeticUiSectionProps> = ({ audioEnabled }) => {
  const data = GDD_SECTIONS_DATA.diegeticUi;
  const [activeSubTab, setActiveSubTab] = useState<number>(0);

  // Live Interactive State for Sandbox Demonstration
  const [armRaised, setArmRaised] = useState<boolean>(false); // [T]
  const [mapHeld, setMapHeld] = useState<boolean>(false); // [M]
  const [compassHeld, setCompassHeld] = useState<boolean>(false); // [C]
  const [rfMeterHeld, setRfMeterHeld] = useState<boolean>(false); // [G]
  const [anomalyNear, setAnomalyNear] = useState<boolean>(false);
  const [stamina, setStamina] = useState<number>(85); // 0-100%
  const [flashlightBattery, setFlashlightBattery] = useState<number>(60);
  const [healthStatus, setHealthStatus] = useState<'healthy' | 'bleeding' | 'critical'>('healthy');
  const [bpm, setBpm] = useState<number>(76);

  // Dynamic BPM calculation based on stamina and trauma
  useEffect(() => {
    let targetBpm = 75;
    if (healthStatus === 'bleeding') targetBpm += 35;
    if (healthStatus === 'critical') targetBpm += 65;
    targetBpm += Math.floor((100 - stamina) * 0.8);
    setBpm(targetBpm);
  }, [stamina, healthStatus]);

  // Keyboard shortcut listener for diegetic immersion
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (key === 'T') {
        setArmRaised((prev) => {
          const next = !prev;
          if (audioEnabled) horrorAudio.playRadioClick(next ? 'open' : 'close');
          return next;
        });
      } else if (key === 'M') {
        setMapHeld((prev) => {
          const next = !prev;
          if (audioEnabled) horrorAudio.playRadioClick(next ? 'open' : 'close');
          return next;
        });
      } else if (key === 'C') {
        setCompassHeld((prev) => !prev);
      } else if (key === 'G') {
        setRfMeterHeld((prev) => {
          const next = !prev;
          if (audioEnabled && next) horrorAudio.playGeigerBurst(0.5);
          return next;
        });
      } else if (key === 'F') {
        // Crank Dynamo
        setFlashlightBattery((prev) => Math.min(100, prev + 15));
        if (audioEnabled) horrorAudio.playRadioClick('crackle');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [audioEnabled]);

  const triggerHeartbeatPulse = () => {
    if (audioEnabled) {
      horrorAudio.playHeartbeat(bpm);
    }
  };

  const triggerHeavySprint = () => {
    setStamina((prev) => Math.max(10, prev - 30));
    if (audioEnabled) {
      horrorAudio.playBreathSound(0.8);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="p-5 bg-[#0e1218] border border-[#3d1d17] relative">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 uppercase tracking-widest mb-1">
          <Eye className="w-4 h-4" />
          <span>100% DIEGETISCHES HUD // ZERO ARTIFACT OVERLAYS</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-mono text-[#f3e8e2]">{data.title}</h2>
        <p className="text-xs sm:text-sm text-[#b89f98] font-mono mt-1">{data.subtitle}</p>
      </div>

      {/* 3 Diegetic Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {data.methods.map((method, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSubTab(idx)}
            className={`p-4 text-left border transition-all ${
              activeSubTab === idx
                ? 'bg-[#1e110e] border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.2)]'
                : 'bg-[#0d1217] border-[#221715] hover:border-[#4d231c]'
            }`}
          >
            <div className="text-[10px] font-mono text-amber-500 font-bold mb-1">PILAR 0{idx + 1}</div>
            <h3 className="text-xs font-bold font-mono text-[#f1edea] mb-2">{method.aspect.split('(')[0]}</h3>
            <div className="text-[11px] font-mono text-red-400 bg-black/50 px-2 py-1 border border-[#331c18]">
              {method.key}
            </div>
          </button>
        ))}
      </div>

      {/* Deep Technical Explanations for Selected Pillar */}
      <div className="p-5 bg-[#0a0f14] border border-[#381e19] space-y-4">
        <div className="flex items-center justify-between border-b border-[#2b1916] pb-2">
          <h3 className="text-sm font-bold font-mono text-red-400">
            {data.methods[activeSubTab].aspect}
          </h3>
          <span className="text-[11px] text-amber-400 font-mono">
            PC Steuerung: {data.methods[activeSubTab].pcMapping}
          </span>
        </div>

        <ul className="space-y-2.5">
          {data.methods[activeSubTab].diegeticVisuals.map((vis, vIdx) => (
            <li key={vIdx} className="p-3 bg-[#06090d] border border-[#1f1513] text-xs font-mono text-[#c6d0dc] flex items-start gap-2.5 leading-relaxed">
              <span className="text-red-500 font-bold mt-0.5">›</span>
              <span>{vis}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* DIEGETIC COCKPIT & LIVE IN-GAME SIMULATION */}
      <div className="p-5 bg-[#080b0f] border border-[#401f19] space-y-5">
        <div className="flex items-center justify-between border-b border-[#2d1815] pb-2">
          <div className="flex items-center gap-2 text-sm font-bold font-mono text-amber-400">
            <Activity className="w-4 h-4 text-amber-500" />
            <span>INTERAKTIVER FIRST-PERSON COCKPIT TESTER</span>
          </div>
          <span className="text-[10px] text-[#6d7e8e] font-mono">
            Tastatur-Tasten [T], [M], [C], [G], [F] drücken
          </span>
        </div>

        {/* Quick Trigger Buttons for Browser / Mobile */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setArmRaised(!armRaised);
              if (audioEnabled) horrorAudio.playRadioClick(armRaised ? 'close' : 'open');
            }}
            className={`px-3 py-1.5 text-xs font-mono border transition-all ${
              armRaised ? 'bg-red-900/60 border-red-500 text-white' : 'bg-[#111720] border-[#2c3746] text-[#8fa0b2]'
            }`}
          >
            [T] Arm heben / EKG Uhr ({armRaised ? 'OBEN' : 'UNTEN'})
          </button>

          <button
            onClick={() => {
              setMapHeld(!mapHeld);
              if (audioEnabled) horrorAudio.playRadioClick(mapHeld ? 'close' : 'open');
            }}
            className={`px-3 py-1.5 text-xs font-mono border transition-all ${
              mapHeld ? 'bg-amber-900/60 border-amber-500 text-white' : 'bg-[#111720] border-[#2c3746] text-[#8fa0b2]'
            }`}
          >
            [M] Physische Karte ({mapHeld ? 'IN HAND' : 'VERSTAUT'})
          </button>

          <button
            onClick={() => setCompassHeld(!compassHeld)}
            className={`px-3 py-1.5 text-xs font-mono border transition-all ${
              compassHeld ? 'bg-emerald-900/60 border-emerald-500 text-white' : 'bg-[#111720] border-[#2c3746] text-[#8fa0b2]'
            }`}
          >
            [C] Marschkompass ({compassHeld ? 'AKTIV' : 'AUS'})
          </button>

          <button
            onClick={() => {
              setRfMeterHeld(!rfMeterHeld);
              if (audioEnabled && !rfMeterHeld) horrorAudio.playGeigerBurst(0.7);
            }}
            className={`px-3 py-1.5 text-xs font-mono border transition-all ${
              rfMeterHeld ? 'bg-purple-900/60 border-purple-500 text-white' : 'bg-[#111720] border-[#2c3746] text-[#8fa0b2]'
            }`}
          >
            [G] HF / Geiger-Peiler ({rfMeterHeld ? 'AN' : 'AUS'})
          </button>

          <button
            onClick={() => {
              setFlashlightBattery((prev) => Math.min(100, prev + 15));
              if (audioEnabled) horrorAudio.playRadioClick('crackle');
            }}
            className="px-3 py-1.5 text-xs font-mono bg-[#1a140f] border border-amber-700/60 text-amber-300 hover:bg-[#2e1d13]"
          >
            [F] Dynamo Kurbeln (+15% Akku)
          </button>
        </div>

        {/* First Person Viewport Diegetic Canvas */}
        <div className="relative w-full min-h-[320px] bg-[#040608] border border-[#2e1916] overflow-hidden p-4 flex flex-col justify-between">
          {/* Vignette / Blood / Low Stamina Post-Process overlay */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              boxShadow:
                healthStatus === 'critical'
                  ? 'inset 0 0 100px rgba(220, 38, 38, 0.9), inset 0 0 40px rgba(0,0,0,1)'
                  : healthStatus === 'bleeding'
                  ? 'inset 0 0 60px rgba(185, 28, 28, 0.5)'
                  : stamina < 30
                  ? 'inset 0 0 70px rgba(0, 0, 0, 0.95)'
                  : 'inset 0 0 30px rgba(0,0,0,0.7)',
            }}
          />

          {/* Top Info Bar */}
          <div className="flex justify-between items-center z-10 text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <span className="text-[#64748b]">FIRST-PERSON DIEGETIC VIEWPORT</span>
              {healthStatus !== 'healthy' && (
                <span className="px-2 py-0.5 bg-red-950 border border-red-700 text-red-300 font-bold animate-pulse">
                  ARTERIELLE BLUTUNG (BEIN LINKS)
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-amber-400">Dynamo: {flashlightBattery}%</span>
              <span className="text-[#8898a8]">Ausdauer: {stamina}%</span>
            </div>
          </div>

          {/* Center Visuals: In-World Props depending on active keys */}
          <div className="flex-1 flex items-center justify-center my-4 z-10 relative">
            {/* 1. Arm EKG Watch [T] */}
            {armRaised && (
              <div className="p-4 bg-[#0a0f12] border-2 border-emerald-800/80 shadow-[0_0_20px_rgba(16,185,129,0.3)] text-emerald-400 font-mono text-xs w-64 animate-bounce-short">
                <div className="flex justify-between text-[10px] border-b border-emerald-900 pb-1 mb-2">
                  <span>SOVIET-EKG MOD-74</span>
                  <span className="animate-pulse">● LIVE</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold font-mono tracking-widest text-emerald-300">
                    {bpm} <span className="text-[11px]">BPM</span>
                  </div>
                  <Heart className={`w-6 h-6 text-red-500 ${bpm > 100 ? 'animate-ping' : 'animate-pulse'}`} />
                </div>
                <div className="mt-2 text-[10px] text-emerald-500/80">
                  SPO2: {healthStatus === 'critical' ? '82%' : '98%'} | TRAUMA: {healthStatus.toUpperCase()}
                </div>
                <button
                  onClick={triggerHeartbeatPulse}
                  className="mt-2 w-full py-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 text-[10px]"
                >
                  PULS AKUSTISCH ABHÖREN
                </button>
              </div>
            )}

            {/* 2. Topographical Physical Map [M] */}
            {mapHeld && (
              <div className="p-4 bg-[#2b241c] border-2 border-[#634e38] text-[#1c130d] font-mono text-xs w-80 shadow-2xl relative rotate-[-1deg]">
                <div className="text-[10px] font-bold tracking-wider border-b border-[#634e38] pb-1 mb-2 text-[#3b2b1e]">
                  MILITÄRKARTE // SEKTOR KRASNY BOR 1:25.000
                </div>
                <div className="h-28 bg-[#d8ccb8] border border-[#8a7258] p-2 relative overflow-hidden flex flex-col justify-between text-[9px] text-[#4a3928]">
                  <div className="flex justify-between">
                    <span>▲ KOPPE 412m</span>
                    <span>⚡ SENDETURM</span>
                  </div>
                  <div className="text-center font-bold text-red-800">
                    ⚠️ FLUCH-SIEGEL 03 (ALTES SILO)
                  </div>
                  <div className="flex justify-between">
                    <span>~ SUMPFGRUND</span>
                    <span>⛔ MINENFELD</span>
                  </div>
                  {/* Spotlight flashlight beam simulation */}
                  <div className="absolute inset-0 bg-radial from-amber-200/40 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="mt-1 text-[9px] text-[#4a3928] text-right">
                  [Rechtsklick: Taschenlampe fokussieren | Linksklick: Bleistift-Notiz]
                </div>
              </div>
            )}

            {/* 3. Magnetic Compass [C] */}
            {compassHeld && (
              <div className="absolute bottom-4 left-4 p-3 bg-[#0d1014] border border-[#384656] text-xs font-mono text-amber-300 w-44">
                <div className="text-[10px] text-[#718292] mb-1">MARSCHKOMPASS</div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">
                    {anomalyNear ? 'ERRATIC 340°' : 'N 014°'}
                  </span>
                  <Compass className={`w-6 h-6 text-amber-400 ${anomalyNear ? 'animate-spin' : ''}`} />
                </div>
                {anomalyNear && (
                  <div className="text-[9px] text-red-400 mt-1 animate-pulse">
                    ⚠️ ANOMALE MAGNETFELDER
                  </div>
                )}
              </div>
            )}

            {/* 4. RF / Geiger Meter [G] */}
            {rfMeterHeld && (
              <div className="absolute bottom-4 right-4 p-3 bg-[#170e0b] border border-red-800 text-xs font-mono text-red-300 w-48">
                <div className="text-[10px] text-red-400/80 mb-1">HF-ANOMALIE-PEILER</div>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-red-500">
                    {anomalyNear ? '3.84 μSv/h' : '0.12 μSv/h'}
                  </div>
                  <Radio className="w-5 h-5 text-red-500 animate-pulse" />
                </div>
                <div className="w-full bg-red-950 h-2 mt-2 border border-red-800 overflow-hidden">
                  <div
                    className="bg-red-600 h-full transition-all duration-300"
                    style={{ width: anomalyNear ? '85%' : '12%' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Bottom Status Modifiers */}
          <div className="z-10 flex flex-wrap items-center justify-between gap-2 border-t border-[#1d1210] pt-2 text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setHealthStatus(healthStatus === 'healthy' ? 'bleeding' : healthStatus === 'bleeding' ? 'critical' : 'healthy')}
                className="px-2 py-0.5 bg-[#170e0d] hover:bg-red-950 text-red-300 border border-red-900"
              >
                Verletzung togglen: {healthStatus.toUpperCase()}
              </button>
              <button
                onClick={() => setAnomalyNear(!anomalyNear)}
                className="px-2 py-0.5 bg-[#141208] hover:bg-amber-950 text-amber-300 border border-amber-800"
              >
                Anomalie-Feld: {anomalyNear ? 'NAH' : 'FERN'}
              </button>
            </div>
            <button
              onClick={triggerHeavySprint}
              className="px-2 py-0.5 bg-[#0e1620] hover:bg-blue-950 text-blue-300 border border-blue-900 flex items-center gap-1"
            >
              <Wind className="w-3 h-3" />
              <span>Sprinten / Ausdauer verbrauchen</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
