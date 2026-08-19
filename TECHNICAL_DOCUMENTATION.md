# 🛠️ TECHNICAL ARCHITECTURE & SYSTEMS DOCUMENTATION
# PROJECT: KRASNY BOR (КРАСНЫЙ БОР)
> **Engine:** Unreal Engine 5.4.4 (C++ / DirectX 12 Ultimate / Substrate / Lumen / World Partition)  
> **Target Platform:** Windows 64-bit Standalone (DirectX 12 SM6)  
> **Network Topology:** Authoritative Server with P2P NAT-Punchthrough (EOS SDK 1.16+)

---

## 📑 INHALTSVERZEICHNIS
1. [Systemarchitektur & Engine-Setup](#1-systemarchitektur--engine-setup)
2. [Gameplay Ability System (GAS) & Vitals](#2-gameplay-ability-system-gas--vitals)
3. [Netzwerk-Architektur & Replikations-Matrix](#3-netzwerk-architektur--replikations-matrix)
4. [Sound-basierte Monster-KI & Live-Mikrofon-Perzeption](#4-sound-basierte-monster-ki--live-mikrofon-perzeption)
5. [Asymmetrische Sanity- & Halluzinations-Engine](#5-asymmetrische-sanity--halluzinations-engine)
6. [Dynamic Jump-Scare & Tension Director](#6-dynamic-jump-scare--tension-director)
7. [MetaSounds Audio-Pipeline & Stimmen-Mimikry](#7-metasounds-audio-pipeline--stimmen-mimikry)
8. [Rendering, Substrate Materials & Post-Processing](#8-rendering-substrate-materials--post-processing)
9. [World Partition, HLODs & Performance-Optimierung](#9-world-partition-hlods--performance-optimierung)
10. [Packaging, RunUAT & CI/CD Deployment](#10-packaging-runuat--cicd-deployment)

---

## 1. SYSTEMARCHITEKTUR & ENGINE-SETUP

### 1.1 Modul-Hierarchie & Abhängigkeits-Graph
```
[Unreal Engine 5.4 Core] 
   ├── [GameplayAbilities (GAS)] ────► [KB_VitalsAttributeSet]
   ├── [AIModule / GameplayTasks] ───► [KB_MonsterAIController / EQS]
   ├── [MetaSounds / AudioCapture] ──► [KB_ProximityVoiceSubsystem]
   └── [WorldPartition / Substrate] ─► [KB_EnvironmentManager]
```

### 1.2 Globale Engine-Konfiguration (`Config/DefaultEngine.ini`)
```ini
[/Script/EngineSettings.GeneralProjectSettings]
ProjectID=KRASNY_BOR_HORROR_UE5
ProjectName=Project: Krasny Bor
bUseWorldPartition=True

[/Script/Engine.RendererSettings]
r.DefaultFeature.AntiAliasing=2 ; TSR (Temporal Super Resolution)
r.DynamicGlobalIlluminationMethod=1 ; Lumen Global Illumination
r.ReflectionMethod=1 ; Lumen Reflections
r.Lumen.HardwareRayTracing=1 ; Hardware Raytracing aktiviert
r.VolumetricFog=1 ; Volumetrischer Nebel
r.Substrate=1 ; Substrate Multi-Layer Material Framework aktiviert
r.Shadow.Virtual.Enable=1 ; Virtual Shadow Maps (VSM) für messerscharfe Schatten

[/Script/Engine.WorldPartition]
bEnableWorldPartition=True
DefaultGridCellSize=12800 ; 128m Kachelung
DefaultLoadingRange=25600 ; 256m Streaming-Radius
```

---

## 2. GAMEPLAY ABILITY SYSTEM (GAS) & VITALS

Alle physischen und psychischen Vitalwerte werden serverseitig autoritativ über `UAttributeSet` verwaltet.

### 2.1 C++ Header: `KB_VitalsAttributeSet.h`
```cpp
// Source/KrasnyBor/Attributes/KB_VitalsAttributeSet.h
#pragma once

#include "CoreMinimal.h"
#include "AttributeSet.h"
#include "AbilitySystemComponent.h"
#include "KB_VitalsAttributeSet.generated.h"

#define ATTRIBUTE_ACCESSORS(ClassName, PropertyName) \
	GAMEPLAYATTRIBUTE_PROPERTY_GETTER(ClassName, PropertyName) \
	GAMEPLAYATTRIBUTE_VALUE_GETTER(PropertyName) \
	GAMEPLAYATTRIBUTE_VALUE_SETTER(PropertyName) \
	GAMEPLAYATTRIBUTE_VALUE_INITTER(PropertyName)

UCLASS()
class KRASNYBOR_API UKB_VitalsAttributeSet : public UAttributeSet
{
	GENERATED_BODY()

public:
	UKB_VitalsAttributeSet();

	virtual void GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps) const override;
	virtual void PreAttributeChange(const FGameplayAttribute& Attribute, float& NewValue) override;
	virtual void PostGameplayEffectExecute(const FGameplayEffectModCallbackData& Data) override;

	// --- GESUNDHEIT & TRAUMA ---
	UPROPERTY(BlueprintReadOnly, ReplicatedUsing = OnRep_Health, Category = "Vitals|Health")
	FGameplayAttributeData Health;
	ATTRIBUTE_ACCESSORS(UKB_VitalsAttributeSet, Health);

	UPROPERTY(BlueprintReadOnly, ReplicatedUsing = OnRep_BleedRate, Category = "Vitals|Trauma")
	FGameplayAttributeData BleedRate;
	ATTRIBUTE_ACCESSORS(UKB_VitalsAttributeSet, BleedRate);

	// --- PSYCHE & SANITY (Streng COND_OwnerOnly repliziert!) ---
	UPROPERTY(BlueprintReadOnly, ReplicatedUsing = OnRep_Sanity, Category = "Vitals|Psych")
	FGameplayAttributeData Sanity;
	ATTRIBUTE_ACCESSORS(UKB_VitalsAttributeSet, Sanity);

	// --- AUSDAUER & ATEMWEGE ---
	UPROPERTY(BlueprintReadOnly, ReplicatedUsing = OnRep_Stamina, Category = "Vitals|Stamina")
	FGameplayAttributeData Stamina;
	ATTRIBUTE_ACCESSORS(UKB_VitalsAttributeSet, Stamina);

protected:
	UFUNCTION()
	virtual void OnRep_Health(const FGameplayAttributeData& OldHealth);

	UFUNCTION()
	virtual void OnRep_BleedRate(const FGameplayAttributeData& OldBleedRate);

	UFUNCTION()
	virtual void OnRep_Sanity(const FGameplayAttributeData& OldSanity);

	UFUNCTION()
	virtual void OnRep_Stamina(const FGameplayAttributeData& OldStamina);
};
```

---

## 3. NETZWERK-ARCHITEKTUR & REPLIKATIONS-MATRIX

### 3.1 Replikations-Regeln
| Parameter | Replikations-Methode | Relevanz / Bedingung | Bandbreiten-Kosten |
| :--- | :--- | :--- | :--- |
| **Taschenlampe An/Aus** | `ReplicatedUsing = OnRep_IsFlashlightOn` | `COND_None` (Alle Clients müssen Lichtkegel sehen) | ~1 Byte pro Schaltvorgang |
| **Batteriespannung (Volt)** | Server-Authoritative Tick | `COND_OwnerOnly` (Nur lokaler Spieler liest Voltmeter ab) | ~4 Bytes / 2s |
| **Sanity-Wert (0–100%)** | `ReplicatedUsing = OnRep_Sanity` | `COND_OwnerOnly` (Geheimhaltung vor Mitspielern!) | ~4 Bytes bei Änderung |
| **Blickrichtung (Pitch)** | Compressed Byte (`ViewPitch`) | `COND_SkipOwner` (Andere sehen Kopfbewegung) | 1 Byte / Frame |
| **Herzfrequenz / Puls** | GAS GameplayEffect | `COND_OwnerOnly` (Steuert Audio-Herzpuls & Wackeln) | 2 Bytes |

### 3.2 C++ Implementation: Replizierte Taschenlampe mit EMF-Störung (`KB_FlashlightComponent.cpp`)
```cpp
// Source/KrasnyBor/Equipment/KB_FlashlightComponent.cpp
#include "Equipment/KB_FlashlightComponent.h"
#include "Components/SpotLightComponent.h"
#include "Net/UnrealNetwork.h"
#include "Kismet/GameplayStatics.h"

UKB_FlashlightComponent::UKB_FlashlightComponent()
{
	PrimaryComponentTick.bCanEverTick = true;
	SetIsReplicatedByDefault(true);

	bIsFlashlightOn = false;
	BatteryVoltage = 4.15f; // Maximale Ladung (Li-Ion / NiCd)
	EMFInterferenceIntensity = 0.0f;
}

void UKB_FlashlightComponent::GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps) const
{
	Super::GetLifetimeReplicatedProps(OutLifetimeProps);

	DOREPLIFETIME(UKB_FlashlightComponent, bIsFlashlightOn);
	DOREPLIFETIME_CONDITION(UKB_FlashlightComponent, BatteryVoltage, COND_OwnerOnly);
}

void UKB_FlashlightComponent::Server_ToggleFlashlight_Implementation()
{
	if (BatteryVoltage > 2.8f) // Mindestspannung
	{
		bIsFlashlightOn = !bIsFlashlightOn;
		UpdateLightVisuals();
	}
}

void UKB_FlashlightComponent::OnRep_IsFlashlightOn()
{
	UpdateLightVisuals();
}

void UKB_FlashlightComponent::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction)
{
	Super::TickComponent(DeltaTime, TickType, ThisTickFunction);

	// Serverseitiger Spannungsverbrauch
	if (GetOwner()->HasAuthority() && bIsFlashlightOn)
	{
		BatteryVoltage = FMath::Clamp(BatteryVoltage - (DeltaTime * 0.003f), 2.7f, 4.2f);
		if (BatteryVoltage <= 2.7f)
		{
			bIsFlashlightOn = false;
			UpdateLightVisuals();
		}
	}

	// Clientseitige EMF-Störung & Flackern
	if (bIsFlashlightOn && SpotLightComp)
	{
		if (EMFInterferenceIntensity > 0.1f || BatteryVoltage < 3.1f)
		{
			const float Noise = FMath::PerlinNoise1D(UGameplayStatics::GetTimeSeconds(GetWorld()) * 25.0f);
			const float Multiplier = FMath::Clamp(Noise + 0.5f, 0.02f, 1.0f);
			SpotLightComp->SetIntensity(5000.0f * Multiplier);
		}
		else
		{
			SpotLightComp->SetIntensity(5000.0f);
		}
	}
}
```

---

## 4. SOUND-BASIERTE MONSTER-KI & LIVE-MIKROFON-PERZEPTION

Die Stalker-KI nutzt `UAIPerceptionComponent` mit konfiguriertem `UAISenseConfig_Hearing`.

```
[Spieler-Mikrofon Puffer] ──► [RMS-Analyse] ──► [UAISense_Hearing::ReportNoiseEvent]
                                                      │
                                                      ▼
[Behavior Tree Blackboard] ◄── [OnPerceptionUpdated] ◄┘
   ├── LastNoiseLocation (FVector)
   ├── NoiseLoudness (float)
   └── AIState (EMonsterState)
```

### 4.1 C++ Implementation: Live-Mikrofon RMS Auswertung
```cpp
// Source/KrasnyBor/Audio/KB_VoiceNoiseReporterComponent.cpp
#include "Audio/KB_VoiceNoiseReporterComponent.h"
#include "Perception/AISense_Hearing.h"

void UKB_VoiceNoiseReporterComponent::ProcessMicrophoneBuffer(const float* InAudioData, int32 NumSamples)
{
    if (!GetOwner()->HasAuthority()) return;

    // Berechne quadratischen Mittelwert (RMS) des Mikrofonsignals
    float SumSquares = 0.0f;
    for (int32 i = 0; i < NumSamples; ++i)
    {
        SumSquares += InAudioData[i] * InAudioData[i];
    }
    const float RMS = FMath::Sqrt(SumSquares / FMath::Max(1, NumSamples));

    // Schwellenwert: Normales Sprechen = 0.2, Schrei = 0.6+
    if (RMS > 0.18f)
    {
        const float Loudness = FMath::GetMappedRangeValueClamped(FVector2D(0.18f, 0.85f), FVector2D(0.4f, 2.5f), RMS);
        const float MaxHearingRange = 4000.0f * Loudness;

        UAISense_Hearing::ReportNoiseEvent(
            GetWorld(),
            GetOwner()->GetActorLocation(),
            Loudness,
            GetOwner(),
            MaxHearingRange,
            FName("PlayerVoiceScream")
        );
    }
}
```

---

## 5. ASYMMETRISCHE SANITY- & HALLUZINATIONS-ENGINE

Das Kernprinzip: **Server bestimmt Sanity, lokaler Client spawnt Phantome (`bReplicates = false`).**

```cpp
// Source/KrasnyBor/Psych/KB_SanityManagerComponent.cpp
#include "Psych/KB_SanityManagerComponent.h"
#include "Kismet/GameplayStatics.h"

void UKB_SanityManagerComponent::EvaluateLocalSanity(float CurrentSanity)
{
    // Absicherung: Läuft AUSSCHLIESSLICH auf dem lokalen Rechner des Spielers!
    if (!GetOwner()->IsLocallyControlled()) return;

    if (CurrentSanity < 30.0f && !bIsExperiencingSeverePsychosis)
    {
        bIsExperiencingSeverePsychosis = true;

        // 1. Spawne lokalen Phantom-Monster-Actor (bReplicates = false!)
        FActorSpawnParameters SpawnParams;
        SpawnParams.SpawnCollisionHandlingOverride = ESpawnActorCollisionHandlingMethod::AlwaysSpawn;
        
        const FVector SpawnLoc = CalculatePeripheralSpawnLocation();
        APhantomMonsterActor* Phantom = GetWorld()->SpawnActor<APhantomMonsterActor>(
            PhantomMonsterClass, SpawnLoc, FRotator::ZeroRotator, SpawnParams
        );

        // 2. Spiele binaurale Flüsterstimmen (MetaSounds HRTF)
        PlayBinauralWhispers(CurrentSanity);
    }
}
```

---

## 6. DYNAMIC JUMP-SCARE & TENSION DIRECTOR

Verhindert repetitive Schreckmomente durch Spannungskurven-Pacing und tote-Winkel-Suchen via EQS.

```cpp
// Source/KrasnyBor/Subsystems/KB_ScareDirectorSubsystem.cpp
#include "Subsystems/KB_ScareDirectorSubsystem.h"
#include "EnvironmentQuery/EnvQueryManager.h"

void UKB_ScareDirectorSubsystem::TryTriggerDynamicScare(AKB_Character* TargetPlayer)
{
    // Pacing-Schutz: Kein Scare während der Erholungsphase!
    if (GetTensionState(TargetPlayer) != ETensionState::RipeForScare) return;

    // Führe EQS-Abfrage im toten Winkel des Spielers aus
    FEQSParam QueryParam;
    QueryParam.Viewer = TargetPlayer;
    QueryParam.MaxDistance = 900.0f;
    QueryParam.MinDarknessLux = 0.5f;

    ExecuteScareEQS(QueryParam, [this, TargetPlayer](const FVector& ScareLocation) {
        SpawnDynamicScareEvent(ScareLocation, EScareType::FleeingShadowFigure);
        ResetTensionTimer(TargetPlayer, 75.0f); // 75 Sekunden garantierter Cooldown
    });
}
```

---

## 7. METASOUNDS AUDIO-PIPELINE & STIMMEN-MIMIKRY

1. **Ring-Puffer für Voice-Chunks:** Wenn ein Spieler über das Mikrofon spricht, speichert der Server die letzten 3 Sekunden komprimierten PCM-Audios in einem Ringspeicher.
2. **Mimikry-Trigger:** Wenn die Monster-KI in den *Stalking-Modus* wechselt, ruft sie den Audio-Chunk ab, moduliert Tonhöhe und Hall via MetaSounds und spielt die Stimme des Mitspielers im Nebel ab:
   ```
   [Echte Stimme von Spieler B: "Ich bin hier drüben!"]
                           │
                           ▼ (MetaSounds DSP Modulation: Pitch -3 Semitones + 4s Reverb)
   [Stalker-Köder im Nebel: "I...ich... b-bin... hier... drü-üben..."]
   ```

---

## 8. RENDERING, SUBSTRATE MATERIALS & POST-PROCESSING

### 8.1 Post-Processing & Bodycam Shader Graph
* **Sensor-Noise:** High-Frequency Simplex Noise im Blue-Channel, skaliert mit Dunkelheit (`1.0 - SceneColorLuminance`).
* **Tonnenförmige Verzeichnung (Barrel Distortion):**
  $$UV_{distorted} = UV_{center} \cdot (1.0 + k \cdot r^2)$$
* **Chromatische Aberration:** RGB-Kanalversatz von $\pm 0.006$ an den Bildschirmrändern.

---

## 9. WORLD PARTITION, HLODs & PERFORMANCE-OPTIMIERUNG

* **16 km² World Partition Grid:** Aufteilung in 128m Kacheln mit 256m dynamischem Laderadius.
* **Hierarchical LODs (HLOD):** Weit entfernte Wälder und Landmarken werden zu leichten Nanite-Meshes zusammengefasst.
* **Draw-Call Budget:** $< 1200$ Draw Calls pro Frame bei nativer 4K-Auflösung auf RTX 3070+ dank Nanite-Rasterizer.

---

## 10. PACKAGING, RUNUAT & CI/CD DEPLOYMENT

### 10.1 Automatisierter RunUAT Build-Befehl
```bat
.\Engine\Build\BatchFiles\RunUAT.bat BuildCookRun ^
  -project="C:/Projects/KrasnyBor/KrasnyBor.uproject" ^
  -noP4 -clientconfig=Shipping -platform=Win64 -targetplatform=Win64 ^
  -build -cook -pak -stage -archive ^
  -archivedirectory="C:/Projects/KrasnyBor/Builds/Win64"
```

### 10.2 GitHub Release Deployment
```bash
# Release mit gepacktem Standalone-Archiv erstellen
gh release create v0.1.0-alpha ./Builds/Win64/ProjectKrasnyBor_v0.1.0_Win64.zip \
  --title "Project: Krasny Bor v0.1.0 Alpha (Playable Build)" \
  --notes "1-4 Player PC Multiplayer Horror Standalone. Keine UE5-Installation erforderlich."
```

---
*Ende des technischen Referenzdokuments. Geprüft und freigegeben für Unreal Engine 5.4.4 Standalone Builds.*
