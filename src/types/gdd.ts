/**
 * Project PHANTASM - UE5 AAA Multiplayer Horror Game Design Types
 */

export type GddSectionId = 
  | 'overview'
  | 'core_loop'
  | 'multiplayer_horror'
  | 'world_progression'
  | 'diegetic_ui'
  | 'art_styleguide'
  | 'ue5_tech_stack'
  | 'interactive_sandbox'
  | 'export';

export interface GddCoreMechanic {
  id: string;
  title: string;
  category: 'Loop' | 'Horror-Coop' | 'Progression' | 'Diegetic-UI' | 'UE5-Tech';
  summary: string;
  gameplayExecution: string[];
  ue5TechnicalBlueprint: string;
  coopImpact: string;
  pcControlMapping?: {
    key: string;
    action: string;
    diegeticFeedback: string;
  }[];
}

export interface ZoneNode {
  id: string;
  name: string;
  tier: 1 | 2 | 3;
  type: 'Forest' | 'Industrial' | 'Catacombs' | 'Bunker' | 'Epicenter' | 'Extraction';
  corruptionLevel: number; // 0 - 100%
  environmentalHazards: string[];
  keyPOIs: string[];
  threatProfiles: string[];
  worldPartitionCellSize: string;
  fogDensity: string;
  x: number;
  y: number;
}

export interface DesyncEvent {
  id: string;
  title: string;
  victimPerspective: string;
  spectatorPerspective: string;
  psychologicalImpact: string;
  ue5NetImplementation: string;
}
