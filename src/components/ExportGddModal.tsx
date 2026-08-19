import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText, Code2, BookOpen, Layers } from 'lucide-react';
import { GDD_METADATA, GDD_SECTIONS_DATA } from '../data/gddContent';

interface ExportGddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportGddModal: React.FC<ExportGddModalProps> = ({ isOpen, onClose }) => {
  const [activeDoc, setActiveDoc] = useState<'readme' | 'techDocs' | 'gdd'>('readme');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const readmeContent = `# 🌲 PROJECT: KRASNY BOR (КРАСНЫЙ БОР)
> **AAA 3D Multiplayer Open-World Survival Horror for Windows PC**  
> *Built with Unreal Engine 5.4.4 • DirectX 12 Ultimate • Lumen Hardware Raytracing • Substrate Shaders*

\`\`\`
   ██████╗ ██████╗  ██████╗      ██╗███████╗ ██████╗████████╗    ██╗  ██╗██████╗  █████╗ ███████╗███╗   ██╗██╗   ██╗    ██████╗  ██████╗ ██████╗ 
   ██╔══██╗██╔══██╗██╔═══██╗     ██║██╔════╝██╔════╝╚══██╔══╝    ██║ ██╔╝██╔══██╗██╔══██╗██╔════╝████╗  ██║╚██╗ ██╔╝    ██╔══██╗██╔═══██╗██╔══██╗
   ██████╔╝██████╔╝██║   ██║     ██║█████╗  ██║        ██║       █████╔╝ ██████╔╝███████║███████╗██╔██╗ ██║ ╚████╔╝     ██████╔╝██║   ██║██████╔╝
   ██╔═══╝ ██╔══██╗██║   ██║██   ██║██╔══╝  ██║        ██║       ██╔═██╗ ██╔══██╗██╔══██║╚════██║██║╚██╗██║  ╚██╔╝      ██╔══██╗██║   ██║██╔══██╗
   ██║     ██║  ██║╚██████╔╝╚█████╔╝███████╗╚██████╗   ██║       ██║  ██╗██║  ██║██║  ██║███████║██║ ╚████║   ██║       ██████╔╝╚██████╔╝██║  ██║
   ╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝       ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝       ╚═════╝  ╚═════╝ ╚═╝  ╚═╝
\`\`\`

[![Engine](https://img.shields.io/badge/Unreal%20Engine-5.4.4%20C%2B%2B-blue?logo=unrealengine)](https://www.unrealengine.com/)
[![Platform](https://img.shields.io/badge/Platform-Windows%2064--bit-darkred?logo=windows)](https://github.com/)
[![Graphics](https://img.shields.io/badge/Rendering-DirectX%2012%20Ultimate%20%7C%20Lumen%20RT-orange)]()
[![Multiplayer](https://img.shields.io/badge/Multiplayer-1--4%20Players%20P2P%20%2F%20EOS-purple)]()
[![Voice](https://img.shields.io/badge/Audio-Proximity%20Voice%20%7C%20MetaSounds-emerald)]()

---

## 📌 SYNOPSIS & HIGH CONCEPT
**Projekt Krasny Bor** ist ein düsteres 1–4 Spieler Open-World Koop-Horrorspiel auf dem Windows PC. 
Oktober 1986: In einem abgeriegelten Waldgebiet im Nordwesten Russlands bricht ein uralter Fluch über ein sowjetisches Militär-Forschungsareal herein. Ihr infiltriert die 16 km² große Sperrzone, trianguliert 3 versiegelte Altäre und müsst vor dem Vorrücken der tödlichen Nekrose-Front exfiltrieren.

---

## 💀 CORE FEATURES
1. **100% Diegetisches UI:** Physischer Rucksack (\`[Tab]\`), manuelle Magazin-Inspektion (\`[R]\` halten), Wund-Inspektion (\`[T]\`), topografische Karte (\`[M]\`) & Marschkompass (\`[C]\`).
2. **Psychologischer Koop (Anti-Clowning):** Stimmen-Mimikry (MetaSounds zeichnet echte Spielerfetzen auf), asymmetrische Sanity-Desynchronisation & erzwungene Isolation.
3. **Sound-basierte Monster-KI:** AIPerception Hearing Sense reagiert auf Bewegung, Barrikaden und das ECHTE Headset-Mikrofon (RMS-Analyse).
4. **Anti-Clean Ästhetik & DX12:** Lumen Hardware Raytracing, Substrate Multi-Layer Shaders und Bodycam Post-Processing.

---

## 🕹️ PC CONTROLS CHEAT SHEET
- \`[W][A][S][D]\`: Bewegung
- \`[Shift]\`: Vollsprint (Loudness 1.2, erhöht Herzschlag)
- \`[Strg]\`: Schleichen (Loudness 0.1)
- \`[F]\`: Taschenlampe an/aus | \`[F]\` halten: Dynamo-Kurbel
- \`[Tab]\`: Physischer Rucksack auf Oberschenkeln
- \`[R]\` halten: Magazin-Inspektion (Patronen visuell zählen)
- \`[M]\` / \`[C]\`: Physische Karte / Marschkompass
- \`[T]\`: Wund-Inspektion & Tourniquets anlegen
- \`[V]\`: Proximity Voice Chat (wird von Monstern gehört!)

---

## 🚀 DOWNLOAD & PLAY (GITHUB RELEASES)
1. Gehe auf die Releases-Seite und lade \`ProjectKrasnyBor_vX.X.X_Win64.zip\` herunter.
2. Entpacke das Archiv und starte \`KrasnyBor.exe\`.
3. Spieler 1 klickt auf „Lobby Hosten“, Spieler 2–4 treten bei (EOS P2P Relay, kein Port-Forwarding nötig).`;

  const techDocsContent = `# 🛠️ TECHNICAL ARCHITECTURE & SYSTEMS DOCUMENTATION
# PROJECT: KRASNY BOR (КРАСНЫЙ БОР)
> **Engine:** Unreal Engine 5.4.4 (C++ / DirectX 12 Ultimate / Substrate / Lumen / World Partition)  
> **Target Platform:** Windows 64-bit Standalone (DirectX 12 SM6)  
> **Network Topology:** Authoritative Server with P2P NAT-Punchthrough (EOS SDK 1.16+)

---

## 1. GAMEPLAY ABILITY SYSTEM (GAS) & VITALS
Alle Vitals laufen serverseitig autoritativ über \`UKB_VitalsAttributeSet\`:
- Health & BleedRate (\`COND_None\` bzw. \`COND_OwnerOnly\`)
- Sanity (Streng \`COND_OwnerOnly\` repliziert, damit Mitspieler keine Ahnung vom Wahnsinn haben!)
- Stamina & Batteriespannung

\`\`\`cpp
${GDD_SECTIONS_DATA.ue5Architecture.modules[0]?.cppSnippet || ''}
\`\`\`

---

## 2. REPLIKATIONS-MATRIX & C++ FLASHLIGHT
\`\`\`cpp
${GDD_SECTIONS_DATA.ue5Architecture.flashlightCode.source}
\`\`\`

---

## 3. SOUND-BASIERTE MONSTER-KI & LIVE-MIKROFON PERZEPTION
Die Monster-KI analysiert den PCM-Puffer des Headset-Mikrofons in Echtzeit (RMS-Pegel) und sendet \`UAISense_Hearing::ReportNoiseEvent\`.
\`\`\`cpp
${GDD_SECTIONS_DATA.aiSanitySystems.soundAi.aiCodeSnippet}
\`\`\`

---

## 4. ASYMMETRISCHE SANITY & CLIENT-SIDE PHANTOMS
Der lokale Client spawnt Halluzinationen mit \`bReplicates = false\`.
\`\`\`cpp
${GDD_SECTIONS_DATA.aiSanitySystems.sanitySystem.sanityCodeSnippet}
\`\`\`

---

## 5. DYNAMIC JUMP-SCARE & TENSION DIRECTOR
Verhindert Gewöhnung durch 75s Cooldown-Pacing und EQS-Suchen in dunklen toten Winkeln.
\`\`\`cpp
${GDD_SECTIONS_DATA.aiSanitySystems.dynamicScareDirector.directorCodeSnippet}
\`\`\`

---

## 6. WORLD PARTITION & PACKAGING PIPELINE
\`\`\`ini
${GDD_SECTIONS_DATA.levelReleasePipeline.worldPartition.iniConfig}
\`\`\`

\`\`\`bat
${GDD_SECTIONS_DATA.levelReleasePipeline.packagingGuide.runUatCommand}
\`\`\``;

  const gddContent = `# GAME DESIGN DOCUMENT: ${GDD_METADATA.projectCodename}
**Engine:** ${GDD_METADATA.engineVersion}
**Platform:** ${GDD_METADATA.targetPlatform}
**Version:** ${GDD_METADATA.version}
**Classification:** ${GDD_METADATA.classification}

---

## 1. CORE GAMEPLAY LOOP (1–4 SPIELER)
${GDD_SECTIONS_DATA.coreLoop.highConcept}

${GDD_SECTIONS_DATA.coreLoop.phases.map(p => `### ${p.phase}\n- Ziel: ${p.objective}\n${p.details.map(d => `- ${d}`).join('\n')}`).join('\n\n')}

---

## 2. HORROR IM MULTIPLAYER (ANTI-CLOWNING)
${GDD_SECTIONS_DATA.multiplayerHorror.mechanics.map(m => `### ${m.name}\n${m.concept}\n${m.implementation.map(i => `- ${i}`).join('\n')}`).join('\n\n')}

---

## 3. OPEN-WORLD-PROGRESSION (16 KM²)
${GDD_SECTIONS_DATA.worldProgression.zones.map(z => `- **${z.tier}:** ${z.threat} (${z.visuals})`).join('\n')}

---

## 4. DIEGETISCHES INVENTAR & STEUERUNG
${GDD_SECTIONS_DATA.diegeticUi.methods.map(m => `### ${m.aspect} [${m.key}]\n${m.pcMapping}`).join('\n\n')}

---

## 5. ART & STYLEGUIDE
${GDD_SECTIONS_DATA.artStyleguide.pillars.map(p => `### ${p.title}\n${p.summary}\n${p.guidelines.map(g => `- ${g}`).join('\n')}`).join('\n\n')}
`;

  const activeContent = activeDoc === 'readme' ? readmeContent : activeDoc === 'techDocs' ? techDocsContent : gddContent;
  const activeFileName = activeDoc === 'readme' ? 'README.md' : activeDoc === 'techDocs' ? 'TECHNICAL_DOCUMENTATION.md' : 'PROJECT_KRASNY_BOR_GDD.md';

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeFileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="bg-[#090d12] border border-[#52251e] w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 bg-[#140c0a] border-b border-[#3b1d17] flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-mono font-bold text-[#f0e3df]">
            <FileText className="w-4 h-4 text-red-500" />
            <span>EXPORT & DOCUMENTATION CENTER // PROJECT: KRASNY BOR</span>
          </div>
          <button onClick={onClose} className="p-1 text-[#8b99a8] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Doc Switcher Tabs */}
        <div className="flex border-b border-[#2b1916] bg-[#0c0807] px-4 pt-2 gap-2 text-xs font-mono">
          <button
            onClick={() => setActiveDoc('readme')}
            className={`px-3 py-2 border-t-2 flex items-center gap-2 ${
              activeDoc === 'readme'
                ? 'bg-[#180e0c] border-amber-500 text-amber-300 font-bold'
                : 'border-transparent text-[#8e9dae] hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>README.md (GitHub Repo)</span>
          </button>

          <button
            onClick={() => setActiveDoc('techDocs')}
            className={`px-3 py-2 border-t-2 flex items-center gap-2 ${
              activeDoc === 'techDocs'
                ? 'bg-[#180e0c] border-blue-500 text-blue-300 font-bold'
                : 'border-transparent text-[#8e9dae] hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-blue-400" />
            <span>TECHNICAL_DOCUMENTATION.md</span>
          </button>

          <button
            onClick={() => setActiveDoc('gdd')}
            className={`px-3 py-2 border-t-2 flex items-center gap-2 ${
              activeDoc === 'gdd'
                ? 'bg-[#180e0c] border-red-500 text-red-300 font-bold'
                : 'border-transparent text-[#8e9dae] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-red-400" />
            <span>PROJECT_GDD.md</span>
          </button>
        </div>

        {/* Content Preview */}
        <div className="flex-1 p-4 overflow-y-auto bg-[#05070a] font-mono text-xs text-[#9eb0c0] leading-relaxed">
          <pre className="whitespace-pre-wrap">{activeContent}</pre>
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-[#0d1218] border-t border-[#261b18] flex items-center justify-between gap-3">
          <div className="text-[11px] font-mono text-[#6c7d8e]">
            Aktive Datei: <strong className="text-amber-300">{activeFileName}</strong>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-[#1f1614] hover:bg-[#331c17] text-[#f1e6e2] border border-[#5a2e25] text-xs font-mono font-bold flex items-center gap-1.5"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'KOPIERT!' : 'IN ZWISCHENABLAGE'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-1.5 bg-[#7f1d1d] hover:bg-[#991b1b] text-white border border-[#b91c1c] text-xs font-mono font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(185,28,28,0.4)]"
            >
              <Download className="w-4 h-4" />
              <span>{activeFileName} HERUNTERLADEN</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
