import type { BoundingBox } from './context-card'

export type SignalLevel = 'high' | 'medium' | 'low'

export interface CreativeFix {
  id: string
  title: string
  actionText: string
  severity: 'critical' | 'moderate'
  boundingBox: BoundingBox
}

export interface CreativeStrength {
  id: string
  text: string
}

export interface OverviewData {
  signals: {
    visualImpact: SignalLevel
    visualImpactText: string
    cognitiveImpact: SignalLevel
    cognitiveImpactText: string
  }
  creativeFixes: CreativeFix[]
  strengths: CreativeStrength[]
  creativeSrc: string
}