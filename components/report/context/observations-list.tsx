import { Check } from 'lucide-react';
import type { ObservationItem } from '@/types/context-card';

interface Props {
    observations: ObservationItem[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export const ObservationList = ({ observations, selectedId, onSelect }: Props) => {
    const issues = observations.filter((o) => o.type === 'issue');
    const strengths = observations.filter((o) => o.type === 'strength');

    return (
        <div>
            <p className="section-label mb-1">In this context</p>
            <p className="hint-text mb-3">Click to highlight on creative</p>

            <div className="space-y-1.5">
                {issues.map((item, idx) => {
                    const isSelected = selectedId === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onSelect(item.id)}
                            className={`flex w-full items-start gap-2 rounded-md border px-3 py-2 text-left text-[13px] transition-all
                border-signal-amber-border bg-signal-amber-bg text-signal-amber-text
                ${isSelected
                                    ? 'opacity-100 ring-1 ring-signal-amber-border'
                                    : selectedId
                                        ? 'opacity-60'
                                        : 'opacity-100'}
                hover:opacity-100`}
                        >
                            <span className="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-signal-amber text-[11px] font-semibold text-white">
                                {idx + 1}
                            </span>
                            <span className="leading-snug">{item.text}</span>
                        </button>
                    );
                })}
            </div>

            {strengths.length > 0 && (
                <>
                    <div className="my-3 flex items-center gap-3">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-[11px] text-muted-foreground/40">working</span>
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <div className="space-y-1.5">
                        {strengths.map((item) => {
                            const isSelected = selectedId === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => onSelect(item.id)}
                                    className={`flex w-full items-start gap-2 rounded-md border border-transparent px-3 py-2 text-left text-xs text-muted-foreground transition-all
                    ${isSelected
                                            ? 'opacity-100 border-signal-green-border bg-signal-green-bg ring-1 ring-signal-green-border'
                                            : 'opacity-45'}
                    hover:opacity-100`}
                                >
                                    <Check size={14} className="mt-px shrink-0 text-signal-green" />
                                    <span className="leading-snug">{item.text}</span>
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};