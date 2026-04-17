import type { DeploymentState } from '@/types/context-card';

const borderColor: Record<DeploymentState, string> = {
    'run-it': 'border-l-signal-green',
    'fix-first': 'border-l-signal-amber',
    'wrong-context': 'border-l-signal-red',
};

const bgTint: Record<DeploymentState, string> = {
    'run-it': 'bg-signal-green/[0.06]',
    'fix-first': 'bg-signal-amber/[0.08]',
    'wrong-context': 'bg-signal-red/[0.06]',
};

export const Recommendation = ({
    state,
    text,
}: {
    state: DeploymentState;
    text: string;
}) => (
    <div
        className={`rounded-r-md border-l-[3px] px-4 py-3 text-[13px] font-medium leading-relaxed text-foreground ${borderColor[state]} ${bgTint[state]}`}
    >
        {text}
    </div>
);