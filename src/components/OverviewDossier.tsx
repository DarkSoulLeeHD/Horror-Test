import React from 'react';
import { GDD_METADATA } from '../data/gddContent';
import { FileText, ShieldAlert, Cpu, Users, EyeOff, Radio, BookOpen, Layers, Terminal, Brain } from 'lucide-react';
import { GddSectionId } from '../types/gdd';

interface OverviewDossierProps {
  onNavigate: (id: GddSectionId) => void;
}

export const OverviewDossier: React.FC<OverviewDossierProps> = ({ onNavigate }) => {
  const cards = [
    {
      id: 'core_loop' as GddSectionId,
      title: '1. Core Gameplay Loop',
      desc: 'Ritual der Schwelle: Infiltration, Triangulation, Altar-Versiegelung, Nekrose-Front & dynamische Exfiltration.',
      icon: <Layers className="w-5 h-5 text-red-500" />,
      accent: 'border-red-900/60'
    },
    {
      id: 'multiplayer_horror' as GddSectionId,
      title: '2. Coop-Horror & Anti-Clowning',
      desc: 'Stimmen-Mimikry via MetaSounds, Asymmetrische Sanity-Desynchronisation & erzwungene Chaos-Isolation.',
      icon: <EyeOff className="w-5 h-5 text-purple-500" />,
      accent: 'border-purple-900/60'
    },
    {
      id: 'world_progression' as GddSectionId,
      title: '3. Open-World & Zone-Tiering',
      desc: '16 km² World Partition, Tier 1-3 Gefahrenzonen, Landmarken-Baken & Vermeidung von Leerlauf.',
      icon: <Radio className="w-5 h-5 text-amber-500" />,
      accent: 'border-amber-900/60'
    },
    {
      id: 'diegetic_ui' as GddSectionId,
      title: '4. Diegetisches UI & PC-Steuerung',
      desc: 'Substrate Wund-Shaders [T], Physische Karte [M], Marschkompass [C] & Dynamo-Kurbellampe [F].',
      icon: <BookOpen className="w-5 h-5 text-emerald-500" />,
      accent: 'border-emerald-900/60'
    },
    {
      id: 'ai_sanity_systems' as GddSectionId,
      title: 'Horror-Systeme & KI',
      desc: 'Sound-AIPerception (Live-Mic Tracking), Asymmetrische Sanity-Phantome & Dynamic Scare Director.',
      icon: <Brain className="w-5 h-5 text-purple-500" />,
      accent: 'border-purple-900/60'
    },
    {
      id: 'art_styleguide' as GddSectionId,
      title: 'Anti-Clean Art & Styleguide',
      desc: 'Lumen DX12 High-End Lighting, Volumetric Fog, Bodycam-Rauschen & Physisches Inventar [Tab].',
      icon: <Layers className="w-5 h-5 text-amber-500" />,
      accent: 'border-amber-900/60'
    },
    {
      id: 'ue5_tech_stack' as GddSectionId,
      title: '5. UE5 C++ & GAS Architektur',
      desc: 'Gameplay Ability System, Replication Graph, Standalone Packaging & GitHub Distribution.',
      icon: <Cpu className="w-5 h-5 text-blue-500" />,
      accent: 'border-blue-900/60'
    },
    {
      id: 'level_release_pipeline' as GddSectionId,
      title: '6. Level Design & GitHub Release',
      desc: 'World Partition 16km², MetaSounds Biome-Volumes, Windows Shipping .exe & GitHub Releases Deployment.',
      icon: <Layers className="w-5 h-5 text-emerald-500" />,
      accent: 'border-emerald-900/60'
    },
    {
      id: 'interactive_sandbox' as GddSectionId,
      title: 'Simulation & Audio Lab',
      desc: 'Live WebAudio Generator für Funk, Geigerzähler, EKG-Puls und Stalker-Sprachsynthese.',
      icon: <ShieldAlert className="w-5 h-5 text-red-400" />,
      accent: 'border-red-700/80'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Classified Header Banner */}
      <div className="p-6 bg-[#0c1016] border border-[#421f18] relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2a1714] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-red-500" />
            <span className="text-xs font-mono font-bold tracking-widest text-red-400">
              {GDD_METADATA.classification}
            </span>
          </div>
          <div className="text-[11px] font-mono text-[#8b99a8]">
            DOKUMENT-VERSION: {GDD_METADATA.version}
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-[#f5eee9] mb-2">
          {GDD_METADATA.projectCodename}
        </h1>
        <p className="text-xs sm:text-sm text-[#b89f98] font-mono mb-4">
          Technisches Game Design Document (GDD) für AAA Multiplayer-Horror in Unreal Engine 5.4+ (Windows PC Native Standalone).
        </p>

        {/* Specs Pill Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-2 text-[11px] font-mono">
          <div className="p-2 bg-[#06080c] border border-[#201513] text-[#c0cbd6]">
            <span className="text-[#6d7e8e] block">Zielplattform:</span>
            <span className="text-red-400 font-bold">Windows PC (D3D12/Lumen)</span>
          </div>
          <div className="p-2 bg-[#06080c] border border-[#201513] text-[#c0cbd6]">
            <span className="text-[#6d7e8e] block">Multiplayer:</span>
            <span className="text-amber-400 font-bold">1–4 Spieler P2P / Host</span>
          </div>
          <div className="p-2 bg-[#06080c] border border-[#201513] text-[#c0cbd6]">
            <span className="text-[#6d7e8e] block">Rendering Pipeline:</span>
            <span className="text-emerald-400 font-bold">Nanite + Substrate Materials</span>
          </div>
          <div className="p-2 bg-[#06080c] border border-[#201513] text-[#c0cbd6]">
            <span className="text-[#6d7e8e] block">Vertrieb / Release:</span>
            <span className="text-blue-400 font-bold">GitHub Standalone .exe / LFS</span>
          </div>
        </div>
      </div>

      {/* Chapter Index Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => onNavigate(card.id)}
            className={`p-5 bg-[#090d13] border ${card.accent} hover:border-red-500 cursor-pointer transition-all duration-200 group flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                {card.icon}
                <span className="text-[10px] font-mono text-[#6c7d8e] group-hover:text-red-400 transition-colors">
                  ÖFFNEN →
                </span>
              </div>
              <h2 className="text-sm font-bold font-mono text-[#f3ece8] mb-1.5 group-hover:text-red-300">
                {card.title}
              </h2>
              <p className="text-xs text-[#9eb0c0] font-mono leading-relaxed">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Core Design Commandments Callout */}
      <div className="p-5 bg-[#120a08] border border-red-900/60 font-mono text-xs text-[#d6c4c0] space-y-2">
        <div className="text-red-400 font-bold flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-500" />
          <span>DIE DREI UNUMSTÖSSLICHEN DESIGN-LEITSÄTZE:</span>
        </div>
        <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-[#bcaaa5] pl-1">
          <li><strong>Kein Arcade-UI:</strong> Keine Floating-Marker, keine roten Umrisse durch Wände, keine Lebensbalken. Alle Information existiert physisch in der Welt.</li>
          <li><strong>Anti-Coop-Clowning:</strong> Koop senkt nicht die Angst, sondern verstärkt das Misstrauen durch Stimmen-Mimikry, Halluzinationen und Isolations-Fallen.</li>
          <li><strong>Kein Leerlauf in der Open World:</strong> Konzentrische Zonen mit akustischen Leitbaken und prozedural wandernden Bedrohungen halten die Spannung permanent aufrecht.</li>
        </ol>
      </div>
    </div>
  );
};
