/**
 * Fundamental Game Design Document (GDD)
 * Project: PROTOCOL: KRASNY BOR (Working Title)
 * Target Engine: Unreal Engine 5.4+ (PC / Windows x64 Standalone)
 * Focus: Hardcore Diegetic 1-4 Player Psychological Co-op Horror
 */

export const GDD_METADATA = {
  projectCodename: "PROJECT: KRASNY BOR",
  version: "1.4.2-STABLE",
  targetPlatform: "Windows PC (x86_64 Direct3D 12 Ultimate / Lumen / Nanite)",
  engineVersion: "Unreal Engine 5.4.4 Native C++ & Blueprint GAS Architecture",
  author: "Senior Technical Game Designer (UE5 Systems & Multiplayer)",
  classification: "CLASSIFIED // DESIGN DIRECTIVE // ANTI-CASUAL HORROR",
};

export const GDD_SECTIONS_DATA = {
  coreLoop: {
    title: "1. Core Gameplay Loop: Das 'Ritual der Schwelle' (1–4 Spieler)",
    subtitle: "Systematischer Kreislauf: Bergen, Verankern, Reinigen, Exfiltrieren",
    highConcept: "1 bis 4 Spieler infiltrieren die 16 km² große Sperrzone 'Krasny Bor'. Ziel ist es, in unvorhersehbaren, prozedural verseuchten Sektoren arkane Relikte (die 'Siegel der Schwelle') zu lokalisieren, sie in instabilen Knotenpunkten zu weihen und vor dem Erreichen der tödlichen 'Nekrose-Front' (Schwarzer Nebel) zu exfiltrieren.",
    phases: [
      {
        phase: "Phase I: Infiltration & Triangulation (Minuten 0–12)",
        objective: "Sektor-Orientierung & Ausrüstungs-Logistik",
        details: [
          "Spieler starten getrennt oder an zufälligen Randpositionen (100–300m auseinander).",
          "Kein globales GPS: Nur physische Militärkarte [M] und analoger Peiler [G].",
          "Aufsuchen von Funktürmen oder Generatoren, um Sektor-Relais zu aktivieren und Siegel-Frequenzen zu triangulieren.",
          "Verwaltung knapper Ressourcen: Batterien (Taschenlampe/Peiler), Tourniquets, Weihöl, Adrenalin."
        ],
        failureState: "Zu viel Lärm (Rennen, Funkgerät auf voller Lautstärke) alarmiert die 'Stalker'-Klasse."
      },
      {
        phase: "Phase II: Das Siegel-Ritual & Hostile Convergence (Minuten 12–25)",
        objective: "Verankerung der Relikte an korrumpierten Altären",
        details: [
          "Ein Altar verlangt simultane Spieler-Aktionen: z.B. Kurbeln eines Generators (Physische Interaktion mit Mausbewegung), Halten der Schutzkreise mit Weihöl, Abwehren von Schatten-Anomalien.",
          "Das Ritual erzeugt massive akustische und elektromagnetische Resonanz: Alle Stalker im Umkreis von 800m konvergieren.",
          "Chaos-Physics Zerstörung: Türen und Barrikaden werden von Entitäten zerschlagen; Spieler müssen Fluchtwege planen."
        ],
        failureState: "Bruch des Schutzkreises führt zu sofortiger Halluzinationswelle oder direktem Erfassen eines Spielers."
      },
      {
        phase: "Phase III: Die Nekrose-Front & Dynamische Exfiltration (Minuten 25–35+)",
        objective: "Flucht vor der expandierenden Umweltkatastrophe",
        details: [
          "Nach Abschluss der Siegel bricht die 'Nekrose-Front' ein: Ein volumetrischer, toxischer Schwarzer Nebel schluckt die Map von außen nach innen.",
          "Extraktionspunkte sind dynamisch: z.B. alter Schienen-Draisine-Wagen (muss repariert werden), Militär-Fluchttunnel (Notstrom-Code nötig) oder Boot am fauligen Fluss.",
          "Gewicht und Verletzungen (Humpeln) verlangsamen das Team – Spieler müssen entscheiden: Verwundete stützen oder opfern."
        ],
        failureState: "Tod im Schwarzen Nebel oder Verpassen des Exfiltrations-Zeitfensters."
      }
    ],
    technicalLoopSpecs: {
      sessionLength: "25–40 Minuten pro Durchlauf",
      permadeathMechanic: "Downed State ('Incapacitated') verlangt 15-sekündiges medizinisches Abbinden mit Tastatur/Maus-Mini-QTE (Adern abklemmen). Nach Tod wird der Spieler zu einer geisterhaften Entität (kann nur flüstern oder Funksprüche manipulieren).",
      metaProgression: "Permanente Tagebucheinträge, Entschlüsselungscodes für Tresore in der Welt, freischaltbare Start-Loadouts (z.B. schwerer Geigerzähler vs. Schalldämpfer-Pistole) – KEINE Level-Ups oder Arcade-Perks."
    }
  },

  multiplayerHorror: {
    title: "2. Horror im Multiplayer: 3 Anti-Coop-Clowning Mechaniken",
    subtitle: "Wie das Spiel im Koop zermürbend und beklemmend bleibt",
    mechanics: [
      {
        id: "mimicry_voice",
        name: "1. Diegetischer MetaSounds-Funk & Entitäten-Stimmen-Mimikry",
        concept: "Räumlicher Voice-Chat mit echter Funk-Physik und KI-gestützter akustischer Täuschung.",
        implementation: [
          "Räumlicher Proximity-Chat (Default): 0–5m kristallklar, 5–15m gedämpft/hallend in geschlossenen Räumen (MetaSounds Reverb Submixes).",
          "Funkgeräte [V]: Verbrauchen Batterie, erzeugen bei Tastendruck lautes analoges Knacken (Click-Noise), das Gegner in der Nähe hören.",
          "Stimmen-Sampling & Mimikry (Das 'Widerhall'-Monster): Das UE5 Audio-System zeichnet kurze Sprachfetzen (1–3 Sekunden) der Spieler auf (z.B. 'Hier drüben!', 'Hilf mir!').",
          "Wenn ein Spieler außer Sichtweite gerät, spielt die Entität diese Sprachsamples mit leicht metallischem, verzerrtem Pitch aus finsteren Korridoren ab, um Mitspieler in Hinterhalte zu locken."
        ],
        ue5Code: "MetaSounds Graph mit Audio Capture Component, Ring Modulator, Convolution Reverb & Dynamic Delay Filter."
      },
      {
        id: "client_desync",
        name: "2. Asymmetrische Sanity & Clientseitige Wahrnehmungs-Desynchronisation",
        concept: "Jeder Spieler sieht eine andere Realität – gegenseitiges Misstrauen statt 'Lachkrampf'.",
        implementation: [
          "Sanity (Geistige Stabilität) sinkt bei Dunkelheit, Zeuge von Gewalt oder Flüstern.",
          "Client-Side Rendering via Actor Hidden In Game (Replication Logic):",
          "Spieler A (Niedrige Sanity) sieht: Spieler B läuft mit blutüberströmtem Gesicht auf ihn zu und hebt eine Axt; Türen sind zugemauert; Schattenfiguren stehen hinter Möbeln.",
          "Spieler B (Hohe Sanity) sieht: Er selbst hält nur eine Taschenlampe und versucht, mit Spieler A zu reden.",
          "Auditive Phantom-Ereignisse: Falsche Schüsse, gefälschte Discord/Funk-Geräusche, Phantom-Schritte direkt hinter dem Spieler-Kopf (Binaural HRTF)."
        ],
        ue5Code: "NetMulticast RPC mit Auswertung des lokalen Sanity-Attributes im Gameplay Ability System (GAS); lokale Spawns von 'PhantomActors'."
      },
      {
        id: "forced_isolation",
        name: "3. 'The Snatcher' & Dynamische Chaos-Trennungs-Ereignisse",
        concept: "Erzwungene physische Isolation durch Umwelt-Kollaps und Entführungs-Mechaniken.",
        implementation: [
          "Der Sicherheits-Reflex von Spielern ist 'Geklumptes Laufen' (Deathballing). Dies wird aktiv bestraft.",
          "Chaos Destruction Traps: Böden brechen bei kumuliertem Gewicht (≥3 Spieler) lokal ein, trennt die Gruppe vertikal in Kellergeschosse.",
          "Der 'Kriecher' (Snatcher): Zieht einen isolierten Spieler lautlos per Zungen-/Tentakel-Grapple in Lüftungsschächte oder Dickicht. Der Gepackte kann nur stöhnen (Voice wird gedämpft), während die anderen erst merken, dass er fehlt, wenn sie sich umdrehen.",
          "Nebel-Wände (Volumetric Fog Cells): Dichter Nebel isoliert Sichtlinie auf 1,5 Meter. Spieler verlieren nach 3 Sekunden den Sichtkontakt zu ihren Partnern."
        ],
        ue5Code: "Chaos Destruction Physics Volumes + Environment Query System (EQS) für Flanken- und Isolations-Angriffs-Nodes."
      }
    ]
  },

  worldProgression: {
    title: "3. Open-World-Progression: Zone-Tiering & Keine 'Leeren Räume'",
    subtitle: "16 km² World Partition ohne Leerlauf durch 'Atmosphärische Dichte'",
    philosophy: "Horror-Open-Worlds scheitern, wenn sie sterile Wälder bieten, in denen 5 Minuten lang nichts passiert. 'Krasny Bor' nutzt konzentrische Zonen-Ebenen und dynamische Audio-Baken.",
    zones: [
      {
        tier: "Tier 1: Die Randzone (Taiga & Verlassene Kontrollpunkte)",
        threat: "Niedrig – Vereinzelte Kadaver-Hunde, Minenfelder, Orientierungslosigkeit.",
        density: "Mikro-Points-of-Interest (Schützengräben, verrostete LKWs, Jägerhütten).",
        visuals: "Grauer Nadelwald, leichter Bodennebel, Dämmerlicht."
      },
      {
        tier: "Tier 2: Die Kolchose & Industrie-Trasse (Verfall & Sumpf)",
        threat: "Mittel – Patrouillierende 'Blinde Wächter', Umwelttoxine, Einsturzgefahren.",
        density: "Verflochtene Gebäude-Komplexe, Silos, überflutete Traktor-Stationen mit vertikalen Wegen.",
        visuals: "Rostende Stahlträger, modriges Wasser bis zu den Knien (verlangsamt Bewegung), pulsierende Bio-Masse."
      },
      {
        tier: "Tier 3: Das Epizentrum (Der Riss & Der Tiefenbunker)",
        threat: "Extrem – Gravitationsanomalien, Zeit-Echoes, aktive Entitäten-Schwärme.",
        density: "Dichte, klaustrophobische Bunker-Labyrinthe, schwebende Betontrümmer, surreale Geometrie.",
        visuals: "Schwarzer Regen, invertierter Himmel, Nanite-Mesh-Verzerrungen durch Realitäts-Bruch."
      }
    ],
    antiEmptyWorldMechanics: [
      {
        name: "Audio-Visuelle Orientierungs-Baken (Landmark Guidance)",
        desc: "Kein GPS-Kompassbalken oben am Bildschirm. Stattdessen dienen Landmarken als Leitsterne: Ein brennender Funkturm in der Ferne, das rhythmische Wummern eines defekten Transformators, die Leuchtraketen, die tote KI-Späher vor Stunden abgefeuert haben."
      },
      {
        name: "Mikro-Umwelt-Storytelling & Schlupfwinkel alle 60–90 Sekunden",
        desc: "Alle 100 Meter stößt der Spieler auf einen interaktiven Mikropunkt: Ein verlassenes Zelt mit blutiger Notiz, ein Auto mit funktionierendem Scheinwerfer (Batterie kann ausgebaut werden), ein Baum mit eingeritzten Warnzeichen."
      },
      {
        name: "UE5 World Partition & Hierarchical HLOD Streaming",
        desc: "Die 4x4 km Map ist in 128m World Partition Grids unterteilt. Data Layers laden für jede Tier-Stufe dynamisch veränderte Beleuchtung, Nebel und KI-Spawns nach, ohne dass Ruckler auftreten."
      }
    ]
  },

  diegeticUi: {
    title: "4. Diegetisches UI & PC-Steuerung: 100% In-World Interface",
    subtitle: "Health, Ausdauer und Orientierung ohne HUD-Bars – Optimiert für Maus & Tastatur",
    methods: [
      {
        aspect: "1. Gesundheit & Verletzungs-Inspektion (Health & Trauma)",
        key: "[T] - Körper-Inspektion / Arm anheben",
        pcMapping: "Mausklick Links auf Körperzone zum Abbinden / Nähen",
        diegeticVisuals: [
          "Substrate Dynamic Wound Shaders: Einschusslöcher, Fleischwunden und Bissspuren erscheinen physisch am 3D-Körpermodell der Spielfigur.",
          "Militärische EKG-Armbanduhr am linken Handgelenk: Zeigt Herzfrequenz (BPM) und arterielle Sättigung in grünem/rotem Phosphor-Glimmen. [T] hebt den Arm vors Gesicht.",
          "Kamera-Kinematik & Humpeln: Bei Beintreffern verzieht die First-Person-Kamera asymmetrisch bei jedem Schritt. Bei starkem Blutverlust verblasst die Farbsättigung (Desaturation Post-Process) und der Ton wird dumpf (Low-Pass Filter)."
        ]
      },
      {
        aspect: "2. Ausdauer & Physische Belastung (Stamina & Breath)",
        key: "[Shift] - Sprinten / [Leertaste] - Klettern / [F] Dynamo-Lampe",
        pcMapping: "Mausrad oder [F] halten + Maus auf/ab bewegen zum Kurbeln des Dynamos",
        diegeticVisuals: [
          "Akustisches Feedback (Keuchen): Je geringer die Ausdauer, desto lauter und panischer atmet der Charakter. Das Keuchen übertönt feine Umgebungsgeräusche (Monster-Schritte) und erzeugt Panik beim Spieler.",
          "Brustkorb-Hebung (Weapon Sway): Beim Zielen mit Waffen/Werkzeugen [Rechtsklick] zittert das Fadenkreuz extrem, wenn der Charakter außer Atem ist. Man muss [L-Alt] drücken, um die Luft anzuhalten (kostet Rest-Ausdauer).",
          "Kondensstreifen & Helm-Beschlagen: Bei Kälte oder Erschöpfung beschlägt die Gasmaske/das Sichtfeld von den Rändern her mit Feuchtigkeit (Rain/Fog Post-Process)."
        ]
      },
      {
        aspect: "3. Orientierung & Erkennung (Map & Analog Tools)",
        key: "[M] - Physische Karte / [C] - Marschkompass / [G] - HF-Peiler",
        pcMapping: "[M] hält die Papierkarte mit beiden Händen ins Sichtfeld; mit [Rechtsklick] kann die Taschenlampe punktgenau auf die Karte gerichtet werden.",
        diegeticVisuals: [
          "Physische Militär-Papierkarte [M]: Kein magischer Pfeil für Spielerposition! Spieler müssen Geländemerkmale (Flüsse, Hügel, Strommasten) mit der Karte abgleichen. Mit [Linksklick] kann man mit einem Bleistift Markierungen auf die Karte zeichnen.",
          "Magnetischer Marschkompass [C]: Echte Nadel-Physik im 3D-Modell. Achtung: In der Nähe von elektromagnetischen Anomalien dreht sich die Kompassnadel wild im Kreis.",
          "Analoger HF-Frequenz- und Geiger-Peiler [G]: Physisches Zeiger-Messgerät. Die Nadel schlägt mechanisch aus, begleitet von knisterndem Lautsprecher-Rauschen und tickendem Geiger-Zähler, wenn man sich Relikten oder getarnten Entitäten nähert."
        ]
      }
    ]
  },

  artStyleguide: {
    title: "Anti-Clean Art & Styleguide: Visueller Verfall & Bodycam-Dread",
    subtitle: "High-End PC DX12 / Lumen / Substrate / Diegetisches Inventar",
    philosophy: "Verbot aller sterilen, sauberen und 'arcade-haften' Looks. Gebot von Schmutz, Nässe, toxischem Volumetric Fog, sensorischem Film-Rauschen und 100% in der Welt greifbarem Equipment.",
    pillars: [
      {
        id: "lighting_atmosphere",
        title: "1. Lighting & Atmosphere (High-End PC DX12)",
        summary: "Dunkelheit als feindliche Entität – Lumen Hardware Raytracing & Heterogeneous Volumes.",
        guidelines: [
          "Lumen Hardware Raytracing (DX12 SM6): Maximale Diffuse Indirect Bounces, aber aggressives Absenken der Skylight-Leuchtdichte auf 0.02 Lux in der Nacht. Dunkelheit ist nicht bloß 'schwarz', sondern schluckt Konturen.",
          "Volumetric Fog & Mie-Scattering: Globaler volumetrischer Nebel mit heterogenen Dichte-Gittern. Lichtkegel der Taschenlampe erzeugen greifbare Lichtstreuung (Forward Scattering Phase 0.65), wodurch Partikel (Staub, Asche, Schimmelsporen) im Strahl sichtbar tanzen.",
          "Dynamische Schattenkanten & Raytraced Contact Shadows: Jede Lichtquelle (Dynamo-Lampe, brennende Leuchtstäbe, Altarfeuer) wirft scharfe, physikalisch korrekte Schatten, die bei Entitäten unnatürlich lang über Wände kriechen.",
          "Extinction Distance & Light Falloff: Lichtquellen haben keine linearen Arcade-Radien, sondern physikalische inverse quadratische Dämpfung mit schneller Dunst-Absorption."
        ],
        ue5Settings: "r.Lumen.HardwareRayTracing=1, r.VolumetricFog.GridPixelSize=4, r.VolumetricFog.GridSizeZ=128, r.Shadow.Virtual.Enable=1"
      },
      {
        id: "post_processing_camera",
        title: "2. Post-Processing & Bodycam / Analog-Decay Kamera",
        summary: "Kamerabild wie aus einer rauen, militärischen Helmkamera (Bodycam/Found-Footage).",
        guidelines: [
          "Sensor Noise & Dynamisches Film Grain: Bei Low-Light verstärkt sich das Bildrauschen drastisch (Simulation von hohem Sensor-ISO 12800). Dunkle Bereiche rauschen grobkörnig statt flach schwarz zu sein.",
          "Anamorphic Lens Distortion & Chromatic Aberration: Leichte tonnenförmige Linsenwölbung an den Bildrändern (Barrel Distortion ~0.08) mit radialer Farbverschiebung (Rot/Cyan-Spaltung bei schnellen Kopfbewegungen).",
          "Lens Condensation & Wet Dirt: Nässe, Atemkondensat und Blutspritzer legen sich als physikalische Maske auf die virtuelle Linse/Gasmaske, sichtbar nur wenn Lichtquellen direkt hineinstrahlen.",
          "Color Grading ('1986 Soviet Decay'): Entsättigte Mitten, drückende Schlammgrün- und Ockertöne, kalte bläuliche Tiefen, harter Highlight-Rolloff und 'Crushed Blacks' ohne künstliche Aufhellung."
        ],
        ue5Settings: "PostProcessVolume: FilmGrainIntensity=0.45, ChromaticAberration=1.2, LensFlares=0, AutoExposure=Manual (Physical ISO/Shutter)"
      },
      {
        id: "environment_textures",
        title: "3. Environment & World Textures (Material Verfall & Nässe)",
        summary: "Substrate Multi-Layer Shaders für tri-planaren Schimmel, abblätternde Farbe und Pfützen.",
        guidelines: [
          "Substrate Multi-Layer Shading: Materialien besitzen getrennte Ebenen (z.B. Rostiges Gusseisen -> Abblätternder weißer Lack -> Nassschlamm-Schicht -> Grüner Schimmelpelz).",
          "RVT (Runtime Virtual Texturing) Wetness & Mud: Dynamische Boden-Nässe; wenn Spieler oder Entitäten durch Morast waten, hinterlassen sie tiefe Pfützen und Matschspuren mit glänzender Roughness (<0.08).",
          "Nanite Micro-Displacement: Brutale Geometriedetails auf verfaultem Holz, korrodiertem Bewehrungsstahl und pilzartiger Biomasse ohne Texturverzerrungen.",
          "Tri-Planar Peeling & Dirt Masks: Keine sich wiederholenden Kachel-Texturen; prozedurale Vertex-Paint-Schmutzmasken überziehen Wände mit Kalkausblühungen, Ruß und Blutschlieren."
        ],
        ue5Settings: "bEnableSubstrate=True, RVT World Height & Material Layers, Tri-Planar World Aligned Blends"
      },
      {
        id: "diegetic_inventory",
        title: "4. Diegetisches Inventar-System (100% In-World)",
        summary: "Physisches Aufklappen des Rucksacks auf den Knien – keine Pausen, absolute Verwundbarkeit.",
        guidelines: [
          "Physischer Rucksack auf Knien (`[Tab]`): Die Figur kniet sich leicht ab und legt den geöffneten Militär-Rucksack ins Sichtfeld. Items (Munitionskisten, Weihöl, Relikte, Verbände) liegen mit echten 3D-Kollisionen in Fächern.",
          "Manuelle Magazin-Inspektion (`[R]` halten): Kein digitaler Munitionszähler! Das Halten von [R] zieht das Magazin aus der Waffe; die Kamera zoomt auf die Patronen, damit der Spieler per Blick schätzt: 'Fast voll (~25)', 'Halb (~15)' oder 'Fast leer (~3)'.",
          "Akku-Spannungsmesser am Handgelenk: Der Zustand der Taschenlampenbatterie wird über eine analoge Volt-Nadel an der Ausrüstungskoppel oder der Uhr abgelesen.",
          "Verwundbarkeit beim Wühlen: Das Öffnen des Rucksacks pausiert das Spiel NICHT. Die Tiefenschärfe fokussiert auf den Rucksack, während der Hintergrund bedrohlich verschwimmt. Feinde können sich lautlos anschleichen."
        ],
        ue5Settings: "FirstPerson Skeletal Mesh Socket Attachment, Physical Item Drag via Mouse Raycast, DoF Focus Shift"
      }
    ]
  },

  ue5Architecture: {
    title: "5. Technische Unreal Engine 5 Architektur, DevOps & Networking",
    subtitle: "Git LFS, Server-Struktur, Replikations-Matrix, Proximity Voice & C++ Flashlight",
    gitSetup: {
      gitignore: `# Unreal Engine 5.4+ Git Ignore
Binaries/*
DerivedDataCache/*
Intermediate/*
Saved/*
Build/*
.vs/*
.idea/*
*.VC.db
*.opendb
*.sln
!*.Target.cs
Plugins/*/Binaries/*
Plugins/*/Intermediate/*
Content/Developers/*
Content/Collections/*`,
      gitattributes: `# Git LFS (Large File Storage) for UE5 Binary Assets
*.uasset filter=lfs diff=lfs merge=lfs -text lockable
*.umap filter=lfs diff=lfs merge=lfs -text lockable
*.fbx filter=lfs diff=lfs merge=lfs -text
*.obj filter=lfs diff=lfs merge=lfs -text
*.png filter=lfs diff=lfs merge=lfs -text
*.tga filter=lfs diff=lfs merge=lfs -text
*.exr filter=lfs diff=lfs merge=lfs -text
*.hdr filter=lfs diff=lfs merge=lfs -text
*.wav filter=lfs diff=lfs merge=lfs -text
*.mp4 filter=lfs diff=lfs merge=lfs -text
*.blend filter=lfs diff=lfs merge=lfs -text
*.psd filter=lfs diff=lfs merge=lfs -text
*.zip filter=lfs diff=lfs merge=lfs -text`
    },
    serverTopology: {
      type: "Hybrid Listen Server mit P2P Relay (EOS / Steam Session Subsystem) + Optional Headless Dedicated Server",
      recommendation: "Für 1-4 Spieler Open-World Koop auf PC ist ein 'Listen Server' (Host & Play) mit Epic Online Services (EOS) P2P NAT-Punchthrough optimal: Keine laufenden Server-Kosten für die Entwickler, kein Port-Forwarding nötig. Für dedizierte Hardcore-Communitys wird parallel ein 'ServerTarget.cs' kompiliert (Headless Linux/Windows Dedicated Server).",
      advantages: [
        "Keine laufenden Cloud-Server-Kosten bei Veröffentlichung über GitHub / Itch / Steam.",
        "Direkte Einladungen über EOS Lobbies / Steam Friends ohne IP-Eingabe.",
        "Host besitzt volle Server-Authorität gegen Cheater (GAS AttributeSet läuft auf Host-Maschine)."
      ]
    },
    replicationMatrix: [
      {
        parameter: "Flashlight State (bIsOn)",
        type: "bool (ReplicatedUsing = OnRep_IsFlashlightOn)",
        condition: "COND_None",
        authority: "Server autoritativ (Client fordert Toggle via Server_ToggleFlashlight RPC an).",
        reason: "Alle Mitspieler (Simulated Proxies) müssen sofort sehen, ob das Licht an ist, um Schatten & Volumetric Beam zu rendern."
      },
      {
        parameter: "Sanity (Geistige Stabilität)",
        type: "FGameplayAttributeData (GAS)",
        condition: "COND_OwnerOnly",
        authority: "Server autoritativ; niemals an andere Clients repliziert!",
        reason: "Verhindert Cheating & sorgt für asymmetrischen Horror: Spieler B darf den Sanity-Wert von Spieler A nicht kennen."
      },
      {
        parameter: "Stamina & Arterielle Blutung",
        type: "FGameplayAttributeData (GAS)",
        condition: "COND_OwnerOnly",
        authority: "Server autoritativ.",
        reason: "Steuert Sprinten, Waffenunruhe und lokales Keuchen. Nur Humpel-Animationen werden über den Pose-Graph an andere repliziert."
      },
      {
        parameter: "RemoteViewPitch & Head Aim",
        type: "uint8 / Compressed Pitch",
        condition: "COND_SkipOwner",
        authority: "Client -> Server -> Simulated Proxies.",
        reason: "Damit Mitspieler sehen, wohin die Taschenlampe und der Blick des Spielers im Dunkeln exakt gerichtet sind."
      },
      {
        parameter: "Downed / Incapacitated State",
        type: "ECharacterInjuryState (Enum with OnRep)",
        condition: "COND_None",
        authority: "Server autoritativ.",
        reason: "Triggert 3D-Körperanimation am Boden, Hilferufe und Interaktions-Prompt für Kameraden."
      }
    ],
    proximityVoiceSystem: {
      title: "Diegetischer Proximity Voice Chat: EOS Voice + Steam Audio / MetaSounds",
      pluginArchitecture: "Epic Online Services (EOS) Voice RTC Room + UE5 Source Submix mit Steam Audio Dynamic Occlusion",
      features: [
        "Physical LineTrace Occlusion: Wenn Wände/Türen zwischen Spielern liegen, filtert das Submix-System die Frequenzen (LowPass 350Hz, -18dB Dämpfung).",
        "Convolution Reverb Submix: In feuchten Bunkerhallen oder Katakomben wird die Stimme der Spieler dynamisch durch einen Convolution Reverb geschleift.",
        "Audio Buffer Capture: PCM-Sprachdaten werden für 3 Sekunden im RAM gepuffert, damit die Monster-KI die Stimmen für Köder-Mimikry imitieren kann."
      ]
    },
    flashlightCode: {
      header: `// Source/KrasnyBor/Equipment/KB_FlashlightComponent.h
#pragma once

#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "Components/SpotLightComponent.h"
#include "KB_FlashlightComponent.generated.h"

DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnFlashlightToggled, bool, bNewState);

UCLASS(ClassGroup=(Custom), meta=(BlueprintSpawnableComponent))
class KRASNYBOR_API UKB_FlashlightComponent : public UActorComponent
{
	GENERATED_BODY()

public:
	UKB_FlashlightComponent();

	virtual void GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps) const override;
	virtual void TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction) override;

	/** Toggle light input (called on Local Autonomous Client) */
	UFUNCTION(BlueprintCallable, Category = "Flashlight")
	void ToggleFlashlight();

	/** Server RPC to change state */
	UFUNCTION(Server, Reliable, WithValidation)
	void Server_ToggleFlashlight(bool bNewState);

	/** Replicated OnRep function for Simulated Proxies */
	UFUNCTION()
	void OnRep_IsFlashlightOn();

	UFUNCTION(BlueprintPure, Category = "Flashlight")
	float GetBatteryVoltage() const { return BatteryVoltage; }

protected:
	virtual void BeginPlay() override;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components")
	USpotLightComponent* SpotLightComp;

	UPROPERTY(ReplicatedUsing = OnRep_IsFlashlightOn, BlueprintReadOnly, Category = "Flashlight|Net")
	bool bIsFlashlightOn = false;

	/** Battery in Volts (4.2V = 100%, 2.7V = Dead) */
	UPROPERTY(Replicated, BlueprintReadOnly, Category = "Flashlight|Power")
	float BatteryVoltage = 3.9f;

	/** Proximity to anomalies/monsters triggers electromagnetic jitter */
	UPROPERTY(Replicated, BlueprintReadOnly, Category = "Flashlight|EMF")
	float EMFInterferenceIntensity = 0.0f;

private:
	void UpdateLightVisuals();
	void ProcessEMFFlicker(float DeltaTime);
};`,
      source: `// Source/KrasnyBor/Equipment/KB_FlashlightComponent.cpp
#include "Equipment/KB_FlashlightComponent.h"
#include "Net/UnrealNetwork.h"
#include "Kismet/GameplayStatics.h"

UKB_FlashlightComponent::UKB_FlashlightComponent()
{
	PrimaryComponentTick.bCanEverTick = true;
	SetIsReplicatedByDefault(true);
}

void UKB_FlashlightComponent::BeginPlay()
{
	Super::BeginPlay();
	SpotLightComp = GetOwner()->FindComponentByClass<USpotLightComponent>();
	UpdateLightVisuals();
}

void UKB_FlashlightComponent::GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps) const
{
	Super::GetLifetimeReplicatedProps(OutLifetimeProps);

	DOREPLIFETIME(UKB_FlashlightComponent, bIsFlashlightOn);
	DOREPLIFETIME_CONDITION(UKB_FlashlightComponent, BatteryVoltage, COND_OwnerOnly);
	DOREPLIFETIME(UKB_FlashlightComponent, EMFInterferenceIntensity);
}

void UKB_FlashlightComponent::ToggleFlashlight()
{
	// Client prediction
	const bool bTargetState = !bIsFlashlightOn;
	if (BatteryVoltage > 2.7f)
	{
		Server_ToggleFlashlight(bTargetState);
	}
}

bool UKB_FlashlightComponent::Server_ToggleFlashlight_Validate(bool bNewState)
{
	return true; // Additional anticheat checks can be added here
}

void UKB_FlashlightComponent::Server_ToggleFlashlight_Implementation(bool bNewState)
{
	if (bNewState && BatteryVoltage <= 2.7f)
	{
		bIsFlashlightOn = false;
	}
	else
	{
		bIsFlashlightOn = bNewState;
	}

	// Trigger on Listen Server Host directly
	UpdateLightVisuals();
}

void UKB_FlashlightComponent::OnRep_IsFlashlightOn()
{
	UpdateLightVisuals();
}

void UKB_FlashlightComponent::UpdateLightVisuals()
{
	if (SpotLightComp)
	{
		SpotLightComp->SetVisibility(bIsFlashlightOn);
	}
}

void UKB_FlashlightComponent::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction)
{
	Super::TickComponent(DeltaTime, TickType, ThisTickFunction);

	// Server-side battery drain
	if (GetOwner()->HasAuthority() && bIsFlashlightOn)
	{
		BatteryVoltage = FMath::Clamp(BatteryVoltage - (DeltaTime * 0.003f), 2.7f, 4.2f);
		if (BatteryVoltage <= 2.7f)
		{
			bIsFlashlightOn = false;
			UpdateLightVisuals();
		}
	}

	// Dynamic EMF Flickering (runs on all clients when active)
	if (bIsFlashlightOn && SpotLightComp)
	{
		ProcessEMFFlicker(DeltaTime);
	}
}

void UKB_FlashlightComponent::ProcessEMFFlicker(float DeltaTime)
{
	if (EMFInterferenceIntensity > 0.1f || BatteryVoltage < 3.0f)
	{
		const float Noise = FMath::PerlinNoise1D(UGameplayStatics::GetTimeSeconds(GetWorld()) * 25.0f);
		const float Multiplier = FMath::Clamp(Noise + 0.5f, 0.05f, 1.0f);
		SpotLightComp->SetIntensity(5000.0f * Multiplier);
	}
	else
	{
		SpotLightComp->SetIntensity(5000.0f);
	}
}`
    },
    modules: [
      {
        name: "Gameplay Ability System (GAS) Attributes",
        description: "Alle Vitals (UAttributeSet) laufen serverseitig autoritativ: Health, ArterialBleedRate, Stamina, LungCapacity, Sanity, BodyTemperature, FlashlightBattery.",
        cppSnippet: `// Source/KrasnyBor/Attributes/KB_VitalsAttributeSet.h
UPROPERTY(BlueprintReadOnly, ReplicatedUsing = OnRep_Sanity, Category = "Vitals|Psych")
FGameplayAttributeData Sanity;
ATTRIBUTE_ACCESSORS(UKB_VitalsAttributeSet, Sanity);

UPROPERTY(BlueprintReadOnly, ReplicatedUsing = OnRep_BleedRate, Category = "Vitals|Trauma")
FGameplayAttributeData BleedRate;
ATTRIBUTE_ACCESSORS(UKB_VitalsAttributeSet, BleedRate);`
      },
      {
        name: "MetaSounds Audio Pipeline & Proximity Graph",
        description: "Dynamische akustische Okklusion via LineTraces durch Geometrie. Sprachübertragung mit Low-Bitrate-Bandpassfilter (300Hz-3.4kHz Walkie-Talkie Simulation).",
        cppSnippet: `// Source/KrasnyBor/Audio/KB_ProximityVoiceSubsystem.cpp
void UKB_ProximityVoiceSubsystem::ProcessVoiceBuffer(const TArray<uint8>& InPCM, float DistanceToListener)
{
    ApplyRadioNoiseProfile(InPCM);
    BufferVoiceForEntityMimicry(InPCM); // Feeds the Stalker mimicry engine
}`
      },
      {
        name: "World Partition, HLOD & Standalone GitHub Release",
        description: "Verpackung als Non-Steam Native Standalone Build. P2P Matchmaking über Epic Online Services (EOS) oder Direct IP/Session Host. Git LFS Konfiguration für uassets/fbx.",
        cppSnippet: `// DefaultEngine.ini
[/Script/EngineSettings.GeneralProjectSettings]
ProjectID=KRASNY_BOR_HORROR_UE5
bUseWorldPartition=True
bEnableLumenGI=True
bEnableSubstrate=True`
      }
    ]
  }
};
