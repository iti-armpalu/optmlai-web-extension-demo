import type { ObservationItem } from '@/types/context-card';

interface Props {
    heatmapSrc: string;
    fixationWindow: string;
    observations: ObservationItem[];
    selectedId: string | null;
    showOverlayLabel?: boolean
}

export const HeatmapPanel = ({ heatmapSrc, fixationWindow, observations, selectedId, showOverlayLabel = true, }: Props) => {
    const selected = observations.find((o) => o.id === selectedId);

    return (
        <div>
            <div className="relative overflow-hidden rounded-lg border border-border">
                <div className="relative">
                    <img
                        // src={heatmapSrc} 
                        src="./bose-heatmap-overlay.jpeg"
                        alt="Attention heatmap"
                        className="w-full h-auto object-contain"
                        loading="lazy"
                    />
                    {showOverlayLabel && (
                        <span className="absolute right-2 top-2 rounded-full bg-foreground/80 px-2 py-0.5 text-[10px] font-medium text-background">
                            Heatmap overlay
                        </span>
                    )}

                    {/* Bounding boxes */}
                    {observations.map((obs) => {
                        const isVisible = selectedId === obs.id;
                        if (!isVisible) return null;

                        const isIssue = obs.type === 'issue';
                        const borderClass = isIssue ? 'border-signal-red' : 'border-signal-green';
                        const shadowClass = isIssue
                            ? 'shadow-[0_0_12px_rgba(239,68,68,0.35)]'
                            : 'shadow-[0_0_12px_rgba(34,197,94,0.35)]';
                        const labelBg = isIssue ? 'bg-signal-red' : 'bg-signal-green';

                        const { x, y, width, height } = obs.boundingBox;
                        // Flip label below if too close to top
                        const labelTop = y < 8;

                        return (
                            <div
                                key={obs.id}
                                className={`absolute border-2 rounded transition-all ${borderClass} ${shadowClass}`}
                                style={{
                                    left: `${x}%`,
                                    top: `${y}%`,
                                    width: `${width}%`,
                                    height: `${height}%`,
                                }}
                            >
                                <span
                                    className={`absolute ${labelTop ? 'top-full mt-1' : '-top-5'} left-0 rounded px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground ${labelBg}`}
                                >
                                    {obs.boundingBox.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <p className="mt-2 text-[11px] text-text-tertiary">
                Predicted fixation · {fixationWindow} window
            </p>
        </div>
    );
};
