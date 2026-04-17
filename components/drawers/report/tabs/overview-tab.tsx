'use client'

import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import { dummyOverviewData } from '@/data/dummy-overview'
import { dummyContextData } from '@/data/dummy-contexts'

import type { CreativeFix } from '@/types/overview'
import type { ObservationItem } from '@/types/context-card'
import { HeatmapPanel } from '@/components/report/context/heatmap-panel'
import { LockedSection } from '../locked-report-overlay'

// ─── Signal card ──────────────────────────────────────────────────────────────

const signalColors = {
  high: 'text-signal-green-text',
  medium: 'text-signal-amber-text',
  low: 'text-signal-red-text',
}

const signalLabels = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

function SignalCard({
  label,
  level,
  subtext,
}: {
  label: string
  level: 'high' | 'medium' | 'low'
  subtext: string
}) {
  return (
    <div className="rounded-lg bg-muted/40 p-4 flex-1">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2">
        {label}
      </p>
      <p className={`text-xl font-medium mb-2 ${signalColors[level]}`}>
        {signalLabels[level]}
      </p>
      <p className="text-[13px] text-muted-foreground leading-relaxed">
        {subtext}
      </p>
    </div>
  )
}

// ─── Fix item ─────────────────────────────────────────────────────────────────

function FixItem({
  fix,
  index,
  isSelected,
  dimmed,
  onClick,
}: {
  fix: CreativeFix
  index: number
  isSelected: boolean
  dimmed: boolean
  onClick: () => void
}) {
  const isCritical = fix.severity === 'critical'
  const badgeBg = isCritical ? 'bg-signal-red' : 'bg-signal-amber'
  const titleColor = isCritical ? 'text-signal-red-text' : 'text-signal-amber-text'
  const borderColor = isCritical ? 'border-signal-red-border' : 'border-signal-amber-border'
  const bgColor = isCritical ? 'bg-signal-red-bg' : 'bg-signal-amber-bg'
  const ringColor = isCritical ? 'ring-signal-red-border' : 'ring-signal-amber-border'

  return (
    <button
      onClick={onClick}
      className={`flex w-full items-start gap-3 rounded-md border px-3 py-2.5 text-left transition-all
        ${borderColor} ${bgColor}
        ${isSelected ? `opacity-100 ring-1 ${ringColor}` : dimmed ? 'opacity-50' : 'opacity-100'}
        hover:opacity-100`}
    >
      <span
        className={`mt-px flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white ${badgeBg}`}
      >
        {index + 1}
      </span>
      <div>
        <p className={`text-[13px] font-medium leading-snug ${titleColor}`}>
          {fix.title}
        </p>
        <p className="text-[12px] text-muted-foreground leading-relaxed mt-0.5">
          {fix.actionText}
        </p>
      </div>
    </button>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

interface OverviewTabProps {
  analysisSetupConfirmed: boolean
  onOpenDialog: () => void
  onNavigateToContexts: () => void
}

export function OverviewTab({
  analysisSetupConfirmed,
  onOpenDialog,
  onNavigateToContexts,
}: OverviewTabProps) {
  const { signals, creativeFixes, strengths, creativeSrc } = dummyOverviewData
  const [selectedFixId, setSelectedFixId] = useState<string | null>(null)

  useEffect(() => {
    if (creativeFixes.length > 0) setSelectedFixId(creativeFixes[0].id)
  }, [creativeFixes])

  const readyToRunCount = dummyContextData.filter(
    (c) => c.deploymentState === 'run-it'
  ).length

  const observationsForPanel: ObservationItem[] = creativeFixes.map((fix) => ({
    id: fix.id,
    type: 'issue' as const,
    text: fix.title,
    boundingBox: fix.boundingBox,
  }))

  return (
    <div className="space-y-6">
      <LockedSection
        locked={!analysisSetupConfirmed}
        onUnlock={onOpenDialog}
      >
        {/* Block 1 — Signal cards */}
        <div className="flex gap-4 mb-6">
          <SignalCard
            label="Visual Impact"
            level={signals.visualImpact}
            subtext={signals.visualImpactText}
          />
          <SignalCard
            label="Cognitive Impact"
            level={signals.cognitiveImpact}
            subtext={signals.cognitiveImpactText}
          />
        </div>

        {/* Block 2 — Creative Fixes + Thumbnail */}
        <div className="mb-6">
          <h2 className="text-base font-medium text-foreground mb-1">
            Creative Fixes
          </h2>
          <p className="text-[13px] text-muted-foreground mb-4">
            Structural issues that affect performance everywhere, regardless of placement.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Left — fix list */}
            <div className="space-y-2">
              {creativeFixes.length === 0 ? (
                <p className="text-[13px] text-signal-green-text font-medium">
                  No structural fixes needed. This creative is sound.
                </p>
              ) : (
                creativeFixes.map((fix, idx) => (
                  <FixItem
                    key={fix.id}
                    fix={fix}
                    index={idx}
                    isSelected={selectedFixId === fix.id}
                    dimmed={selectedFixId !== null && selectedFixId !== fix.id}
                    onClick={() => setSelectedFixId(fix.id)}
                  />
                ))
              )}

              {strengths.length > 0 && (
                <>
                  <div className="flex items-center gap-3 py-1">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-[11px] text-muted-foreground/40">working</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <div className="space-y-1.5">
                    {strengths.map((s) => (
                      <div key={s.id} className="flex items-start gap-2 px-3 py-1.5 opacity-45">
                        <Check size={14} className="mt-px shrink-0 text-signal-green" />
                        <span className="text-[12px] text-muted-foreground leading-snug">
                          {s.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Right — raw creative thumbnail */}
            <div>
              <HeatmapPanel
                heatmapSrc={creativeSrc}
                fixationWindow=""
                observations={observationsForPanel}
                selectedId={selectedFixId}
                showOverlayLabel={false}
              />
              <p className="mt-2 text-[11px] italic text-muted-foreground/50">
                Click a fix to highlight on creative
              </p>
            </div>
          </div>
        </div>

        {/* Block 3 — Bottom navigation */}
        <div className="border-t border-border pt-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-base font-medium text-signal-green-text">
              {readyToRunCount} context{readyToRunCount !== 1 ? 's' : ''} ready to run
            </p>
            <p className="text-[13px] text-muted-foreground">
              See full placement breakdown
            </p>
          </div>
          <button
            onClick={onNavigateToContexts}
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/40 shrink-0"
          >
            View contexts →
          </button>
        </div>
      </LockedSection>
    </div>
  )
}