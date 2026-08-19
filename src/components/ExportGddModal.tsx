import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText } from 'lucide-react';
import { GDD_METADATA, GDD_SECTIONS_DATA } from '../data/gddContent';

interface ExportGddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportGddModal: React.FC<ExportGddModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const markdownContent = `# GAME DESIGN DOCUMENT: ${GDD_METADATA.projectCodename}
**Engine:** ${GDD_METADATA.engineVersion}
**Platform:** ${GDD_METADATA.targetPlatform}
**Version:** ${GDD_METADATA.version}
**Classification:** ${GDD_METADATA.classification}

---

## 1. CORE GAMEPLAY LOOP (1–4 SPIELER)
### ${GDD_SECTIONS_DATA.coreLoop.title}
**High Concept:** ${GDD_SECTIONS_DATA.coreLoop.highConcept}

### Phasen des Zyklus:
${GDD_SECTIONS_DATA.coreLoop.phases.map((p, idx) => `
#### ${p.phase}
- **Ziel:** ${p.objective}
${p.details.map(d => `- ${d}`).join('\n')}
- **Fehlschlag:** ${p.failureState}
`).join('\n')}

**Permadeath & Downed State:**
${GDD_SECTIONS_DATA.coreLoop.technicalLoopSpecs.permadeathMechanic}

---

## 2. HORROR IM MULTIPLAYER: 3 ANTI-CLOWNING MECHANIKEN
${GDD_SECTIONS_DATA.multiplayerHorror.mechanics.map((m, idx) => `
### ${m.name}
**Konzept:** ${m.concept}
**Gameplay-Ausführung:**
${m.implementation.map(i => `- ${i}`).join('\n')}
**UE5 Implementation:** \`${m.ue5Code}\`
`).join('\n')}

---

## 3. OPEN-WORLD-PROGRESSION & KEINE LEEREN ZONEN
**Philosophie:** ${GDD_SECTIONS_DATA.worldProgression.philosophy}

### Zonen-Struktur (16 km² World Partition):
${GDD_SECTIONS_DATA.worldProgression.zones.map(z => `
- **${z.tier}**
  - Bedrohung: ${z.threat}
  - Dichte: ${z.density}
  - Visuals: ${z.visuals}
`).join('\n')}

### Anti-Leerlauf-Mechaniken:
${GDD_SECTIONS_DATA.worldProgression.antiEmptyWorldMechanics.map(a => `
- **${a.name}:** ${a.desc}
`).join('\n')}

---

## 4. DIEGETISCHES UI & PC-STEUERUNG (100% IN-WORLD)
${GDD_SECTIONS_DATA.diegeticUi.methods.map(m => `
### ${m.aspect}
- **Taste / Belegung:** \`${m.key}\`
- **PC-Steuerung:** ${m.pcMapping}
- **Visuelles & Haptisches Feedback:**
${m.diegeticVisuals.map(v => `  - ${v}`).join('\n')}
`).join('\n')}

---

## 5. ANTI-CLEAN ART & STYLEGUIDE (DX12 / LUMEN / SUBSTRATE)
**Credo:** ${GDD_SECTIONS_DATA.artStyleguide.philosophy}

${GDD_SECTIONS_DATA.artStyleguide.pillars.map(p => `
### ${p.title}
**Zusammenfassung:** ${p.summary}
**Richtlinien:**
${p.guidelines.map(g => `- ${g}`).join('\n')}
**UE5 Console / .ini Parameter:** \`${p.ue5Settings}\`
`).join('\n')}

---

## 6. TECHNISCHE UNREAL ENGINE 5 ARCHITEKTUR & DEVOPS

### Git Repository Setup:
#### .gitignore:
\`\`\`gitignore
${GDD_SECTIONS_DATA.ue5Architecture.gitSetup.gitignore}
\`\`\`

#### .gitattributes (Git LFS):
\`\`\`gitattributes
${GDD_SECTIONS_DATA.ue5Architecture.gitSetup.gitattributes}
\`\`\`

### Server-Struktur & Topologie:
- **Typ:** ${GDD_SECTIONS_DATA.ue5Architecture.serverTopology.type}
- **Empfehlung:** ${GDD_SECTIONS_DATA.ue5Architecture.serverTopology.recommendation}

### Player Controller & Replikations-Matrix:
${GDD_SECTIONS_DATA.ue5Architecture.replicationMatrix.map(r => `
- **${r.parameter}:** \`${r.type}\` (Condition: \`${r.condition}\`)
  - Autorität: ${r.authority}
  - Begründung: ${r.reason}
`).join('\n')}

### Proximity Voice System:
- **Pipeline:** ${GDD_SECTIONS_DATA.ue5Architecture.proximityVoiceSystem.pluginArchitecture}
${GDD_SECTIONS_DATA.ue5Architecture.proximityVoiceSystem.features.map(f => `- ${f}`).join('\n')}

### Replizierte Taschenlampe (C++ Implementation):
#### KB_FlashlightComponent.h
\`\`\`cpp
${GDD_SECTIONS_DATA.ue5Architecture.flashlightCode.header}
\`\`\`

#### KB_FlashlightComponent.cpp
\`\`\`cpp
${GDD_SECTIONS_DATA.ue5Architecture.flashlightCode.source}
\`\`\`

### Weitere UE5 C++ Module:
${GDD_SECTIONS_DATA.ue5Architecture.modules.map(mod => `
#### ${mod.name}
${mod.description}

\`\`\`cpp
${mod.cppSnippet}
\`\`\`
`).join('\n')}
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'PROJECT_KRASNY_BOR_GDD.md';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="bg-[#090d12] border border-[#52251e] w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 bg-[#140c0a] border-b border-[#3b1d17] flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-mono font-bold text-[#f0e3df]">
            <FileText className="w-4 h-4 text-red-500" />
            <span>EXPORT GDD MARKDOWN // PROJECT: KRASNY BOR</span>
          </div>
          <button onClick={onClose} className="p-1 text-[#8b99a8] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Preview */}
        <div className="flex-1 p-4 overflow-y-auto bg-[#05070a] font-mono text-xs text-[#9eb0c0] leading-relaxed">
          <pre className="whitespace-pre-wrap">{markdownContent}</pre>
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-[#0d1218] border-t border-[#261b18] flex items-center justify-between gap-3">
          <div className="text-[11px] font-mono text-[#6c7d8e]">
            Kompatibel mit Obsidian, Notion, GitHub Docs & UE5 Documentation
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
              <span>ALS .MD HERUNTERLADEN</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
