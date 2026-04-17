import { Clock } from 'lucide-react';

export const ExposureBadge = ({ time }: { time: string }) => (
    <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
        <Clock size={12} />
        {time} exposure
    </span>
);