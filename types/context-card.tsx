export type DeploymentState = 'run-it' | 'fix-first' | 'wrong-context'

export interface BoundingBox {
    x: number
    y: number
    width: number
    height: number
    label: string
}

export interface ObservationItem {
    id: string
    type: 'issue' | 'strength'
    text: string
    boundingBox: BoundingBox
}

export interface ContextCardData {
    id: string
    name: string
    channel: 'Retail' | 'E-commerce' | 'Social'
    environmentDescription: string
    exposureTime: string
    fixationWindow: string
    deploymentState: DeploymentState
    recommendation: string
    behavioralContext: string
    observations: ObservationItem[]
    heatmapSrc: string
}