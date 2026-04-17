import { PlayCircle, AlertTriangle, XCircle } from 'lucide-react';
import type { DeploymentState } from '@/types/context-card';

const config: Record<DeploymentState, {
    label: string;
    icon: typeof PlayCircle;
    classes: string;
}> = {
    'run-it': {
        label: 'Run it',
        icon: PlayCircle,
        classes: 'bg-signal-green-bg text-signal-green-text border-signal-green-border',
    },
    'fix-first': {
        label: 'Fix first',
        icon: AlertTriangle,
        classes: 'bg-signal-amber-bg text-signal-amber-text border-signal-amber-border',
    },
    'wrong-context': {
        label: 'Wrong context',
        icon: XCircle,
        classes: 'bg-signal-red-bg text-signal-red-text border-signal-red-border',
    },
};

export const DeploymentBadge = ({ state }: { state: DeploymentState }) => {
    const { label, icon: Icon, classes } = config[state];
    return (
        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${classes}`}>
            <Icon size={12} />
            {label}
        </span>
    );
};