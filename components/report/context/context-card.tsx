'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ContextCardData, DeploymentState } from '@/types/context-card';
import { DeploymentBadge } from './deployment-badge';
import { ExposureBadge } from './exposure-badge';
import { Recommendation } from './recommendation';
import { ObservationList } from './observations-list';
import { HeatmapPanel } from './heatmap-panel';


const borderTintMap: Record<DeploymentState, string> = {
    'run-it': 'border-signal-green-border/40',
    'fix-first': 'border-signal-amber-border/40',
    'wrong-context': 'border-signal-red-border/40',
};

const borderActiveMap: Record<DeploymentState, string> = {
    'run-it': 'border-signal-green-border/70',
    'fix-first': 'border-signal-amber-border/70',
    'wrong-context': 'border-signal-red-border/70',
};

export const ContextCard = ({
    data,
    isOpen,
    onToggle,
    anotherOpen,
}: {
    data: ContextCardData;
    isOpen: boolean;
    onToggle: () => void;
    anotherOpen: boolean;
}) => {
    const [selectedObservation, setSelectedObservation] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            const firstIssue = data.observations.find((o) => o.type === 'issue');
            setSelectedObservation(firstIssue?.id ?? data.observations[0]?.id ?? null);
        }
    }, [isOpen, data.observations]);

    const dimmed = !isOpen && anotherOpen;

    return (
        <div
            className={`rounded-lg border bg-card transition-all duration-200
        ${isOpen ? borderActiveMap[data.deploymentState] : borderTintMap[data.deploymentState]}
        ${dimmed ? 'opacity-70' : 'opacity-100'}`}
        >
            <button
                onClick={onToggle}
                className="flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors hover:bg-muted/40"
            >
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2.5">
                        <span className="text-sm font-medium text-card-foreground">{data.name}</span>
                        <DeploymentBadge state={data.deploymentState} />
                    </div>
                    <p className="mt-0.5 text-[13px] text-muted-foreground">
                        {data.environmentDescription}
                    </p>
                </div>
                <div className="ml-3 flex shrink-0 items-center gap-2">
                    <ExposureBadge time={data.exposureTime} />
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={16} className="text-muted-foreground/40" />
                    </motion.div>
                </div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="border-t border-border/30 px-4 pb-5 pt-4">
                            <Recommendation state={data.deploymentState} text={data.recommendation} />

                            <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="space-y-5">
                                    <div>
                                        <p className="section-label mb-2">What people are doing</p>
                                        <p className="text-[13px] leading-relaxed text-muted-foreground">
                                            {data.behavioralContext}
                                        </p>
                                    </div>
                                    <ObservationList
                                        observations={data.observations}
                                        selectedId={selectedObservation}
                                        onSelect={setSelectedObservation}
                                    />
                                </div>

                                <HeatmapPanel
                                    heatmapSrc={data.heatmapSrc}
                                    fixationWindow={data.fixationWindow}
                                    observations={data.observations}
                                    selectedId={selectedObservation}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};