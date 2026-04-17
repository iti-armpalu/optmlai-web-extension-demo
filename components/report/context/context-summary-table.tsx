import { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

import type { ContextCardData, DeploymentState } from '@/types/context-card';
import { Skeleton } from '@/components/ui/skeleton';
import { DeploymentBadge } from './deployment-badge';

const stateOrder: Record<DeploymentState, number> = {
    'run-it': 0,
    'fix-first': 1,
    'wrong-context': 2,
};

const channelOrder: Record<string, number> = {
    Retail: 0,
    'E-commerce': 1,
    Social: 2,
};

type SortColumn = 'state' | 'context' | 'channel';
type SortDir = 'asc' | 'desc';

interface Props {
    data: ContextCardData[];
    loading?: boolean;
    onRowClick: (id: string) => void;
}

export const ContextSummaryTable = ({ data, loading, onRowClick }: Props) => {
    const isMobile = useIsMobile();
    const [sortCol, setSortCol] = useState<SortColumn>('state');
    const [sortDir, setSortDir] = useState<SortDir>('asc');

    const toggleSort = (col: SortColumn) => {
        if (sortCol === col) {
            setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortCol(col);
            setSortDir('asc');
        }
    };

    const sorted = [...data].sort((a, b) => {
        const dir = sortDir === 'asc' ? 1 : -1;

        if (sortCol === 'state') {
            const diff = stateOrder[a.deploymentState] - stateOrder[b.deploymentState];
            if (diff !== 0) return diff * dir;
            return (channelOrder[a.channel ?? ''] ?? 9) - (channelOrder[b.channel ?? ''] ?? 9);
        }

        if (sortCol === 'context') {
            return a.name.localeCompare(b.name) * dir;
        }

        if (sortCol === 'channel') {
            const diff =
                (channelOrder[a.channel ?? ''] ?? 9) - (channelOrder[b.channel ?? ''] ?? 9);
            if (diff !== 0) return diff * dir;
            return stateOrder[a.deploymentState] - stateOrder[b.deploymentState];
        }

        return 0;
    });

    const SortArrow = ({ col }: { col: SortColumn }) => (
        <ArrowUpDown
            size={10}
            className={`ml-1 inline-block transition-opacity ${sortCol === col ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
                }`}
        />
    );

    if (loading) {
        return (
            <div className="mb-6 rounded-lg border border-divider bg-card">
                <div className="px-4 py-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 py-3">
                            <Skeleton className="h-4 w-40" />
                            {!isMobile && <Skeleton className="h-4 w-20" />}
                            {!isMobile && <Skeleton className="h-4 w-16" />}
                            <Skeleton className="ml-auto h-5 w-20 rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mb-6 overflow-hidden rounded-lg border border-divider bg-card">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-divider">
                        <th
                            onClick={() => toggleSort('context')}
                            className="group w-[40%] cursor-pointer px-4 py-2.5 text-left"
                        >
                            <span className="section-label">
                                Context
                                <SortArrow col="context" />
                            </span>
                        </th>
                        {!isMobile && (
                            <th
                                onClick={() => toggleSort('channel')}
                                className="group w-[100px] cursor-pointer px-4 py-2.5 text-left"
                            >
                                <span className="section-label">
                                    Channel
                                    <SortArrow col="channel" />
                                </span>
                            </th>
                        )}
                        {!isMobile && (
                            <th className="w-[80px] px-4 py-2.5 text-left">
                                <span className="section-label">Exposure</span>
                            </th>
                        )}
                        <th
                            onClick={() => toggleSort('state')}
                            className="group w-[160px] cursor-pointer px-4 py-2.5 text-right"
                        >
                            <span className="section-label">
                                State
                                <SortArrow col="state" />
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sorted.map((item, idx) => (
                        <tr
                            key={item.id}
                            onClick={() => onRowClick(item.id)}
                            className={`cursor-pointer transition-colors hover:bg-muted/40 ${idx < sorted.length - 1 ? 'border-b border-divider' : ''
                                }`}
                            style={{ height: '46px' }}
                        >
                            <td className="px-4 py-2.5 font-medium text-card-foreground">
                                {item.name}
                            </td>
                            {!isMobile && (
                                <td className="px-4 py-2.5 text-text-secondary">{item.channel}</td>
                            )}
                            {!isMobile && (
                                <td className="px-4 py-2.5 text-text-secondary">
                                    {item.exposureTime}
                                </td>
                            )}
                            <td className="px-4 py-2.5 text-right">
                                <DeploymentBadge state={item.deploymentState} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
