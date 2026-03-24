"use client"

import { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
// import { Progress } from "@/components/ui/progress"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    User,
    BarChart3,
    CreditCard,
    LogOut,
    Trash2,
    Gift,
    Zap,
    CalendarDays,
    Sparkles,
    FileText,
    ExternalLink,
    Mail,
    Shield,
    Globe,
    Eye,
    Lock,
    Smartphone,
    Building2,
    Check,
    TrendingUp,
    Package,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Tab = "account" | "usage" | "billing"

interface SettingsModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    defaultTab?: Tab
    user: {
        name: string
        email: string
        avatar: string
    }
}

const navItems: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "account", label: "Account", icon: User },
    { id: "billing", label: "Plan & Credits", icon: CreditCard },
    { id: "usage", label: "Usage", icon: BarChart3 },
]

const usageHistory = [
    { name: "Homepage Hero Analysis", date: "Feb 13, 2026", source: "monthly" as const, },
    { name: "Landing Page CTA Test", date: "Feb 10, 2026", source: "monthly" as const, },
    { name: "Email Banner Review", date: "Feb 5, 2026", source: "monthly" as const, },
    { name: "Social Ad Variant A", date: "Jan 28, 2026", source: "bonus" as const, },
    { name: "Product Page Layout", date: "Jan 22, 2026", source: "bonus" as const, },
    { name: "Retargeting Banner", date: "Jan 15, 2026", source: "bonus" as const, },
]

const plans = [
    {
        name: "Free",
        price: "$0",
        period: "one-time",
        description: "3 sign-up bonus credits when you join",
        credits: "3 credits",
        features: [
            "3 content tests included",
            "Heatmap analysis per test",
            "Proprietary rule set execution",
            "20 AI prompts / chats per test",
        ],
        icon: Gift,
        variant: "free" as const,
        current: false,
    },
    {
        name: "Starter Pack",
        price: "$5",
        period: "per month",
        description: "Perfect for individuals and small projects",
        credits: "10 credits / month",
        features: [
            "10 content tests / month",
            "Heatmap analysis per test",
            "Proprietary rule set execution",
            "20 AI prompts / chats per test",
        ],
        icon: Package,
        variant: "starter" as const,
        current: false,
    },
    {
        name: "Standard Pack",
        price: "$15",
        period: "per month",
        description: "For growing content teams",
        credits: "30 credits / month",
        features: [
            "30 content tests / month",
            "Heatmap analysis per test",
            "Proprietary rule set execution",
            "20 AI prompts / chats per test",
        ],
        icon: Zap,
        variant: "standard" as const,
        current: true,
    },
    {
        name: "Growth Pack",
        price: "$50",
        period: "per month",
        description: "For teams scaling content at speed",
        credits: "150 credits / month",
        features: [
            "150 content tests / month",
            "Heatmap analysis per test",
            "Proprietary rule set execution",
            "20 AI prompts / chats per test",
        ],
        icon: TrendingUp,
        variant: "growth" as const,
        current: false,
    },
];

export function SettingsModal({
    open,
    onOpenChange,
    defaultTab = "account",
    user,
}: SettingsModalProps) {
    const [activeTab, setActiveTab] = useState<Tab>(defaultTab)

    useEffect(() => {
        if (open) setActiveTab(defaultTab)
    }, [open, defaultTab])

    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton
                aria-describedby={undefined}
                className="flex h-[540px] max-w-2xl flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl"
            >
                <DialogTitle className="sr-only">Settings</DialogTitle>

                {/* Header */}
                <div className="flex items-center gap-3 border-b px-6 py-4">
                    <Avatar className="size-9 rounded-lg">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="rounded-lg bg-foreground text-background text-xs font-medium">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{user.email}</span>
                        <Badge
                            variant="secondary"
                            className="mt-0.5 w-fit text-[10px] px-1.5 py-0"
                        >
                            Free Plan
                        </Badge>
                    </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Left nav */}
                    <nav className="flex w-44 shrink-0 flex-col gap-0.5 border-r px-3 py-4">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={cn(
                                    "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                    activeTab === item.id
                                        ? "bg-secondary text-foreground"
                                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                                )}
                            >
                                <item.icon className="size-4" />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto px-6 py-5">
                        {activeTab === "account" && <AccountTab user={user} initials={initials} />}
                        {activeTab === "usage" && <UsageTab />}
                        {activeTab === "billing" && <PlansCreditsTab />}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

/* ─── Account Tab ─── */

function AccountTab({
    user,
    initials,
}: {
    user: { name: string; email: string; avatar: string }
    initials: string
}) {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-lg font-semibold text-foreground">Account</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Your personal account details and preferences.</p>
            </div>

            {/* Details grid */}
            <div className="grid gap-5">
                <InfoRow icon={User} label="Full name" value="Jane Doe" />
                <InfoRow icon={Mail} label="Email address" value="jane.doe@example.com" />
                <InfoRow icon={Globe} label="Timezone" value="UTC−5 (Eastern Time)" />
            </div>

            <Separator />

            {/* Security */}
            <section className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Security</h3>
                <SettingRow
                    icon={Lock}
                    title="Password"
                    description="Last changed 3 months ago"
                    action="Change password"
                />
                <SettingRow
                    icon={Smartphone}
                    title="Two-factor authentication"
                    description="Add an extra layer of security to your account"
                    action="Enable"
                    actionVariant="primary"
                />
                <SettingRow
                    icon={Eye}
                    title="Active sessions"
                    description="2 active sessions across devices"
                    action="View all"
                />
            </section>

            <Separator />

            {/* Notifications */}
            <section className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Notifications</h3>
                <div className="rounded-lg border border-border bg-card p-4 space-y-4">
                    <ToggleRow label="Email notifications" description="Receive updates about your reports via email" defaultOn />
                    <div className="h-px bg-border" />
                    <ToggleRow label="Credit alerts" description="Get notified when your credit balance is low" defaultOn />

                </div>
            </section>

            <div className="h-px bg-border" />

            {/* Danger zone */}
            <div>
                <h3 className="text-sm font-semibold text-destructive mb-3">Danger zone</h3>
                <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-foreground">Delete account</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Permanently delete your account and all of your data.
                        </p>
                    </div>
                    <button className="text-sm font-medium text-destructive border border-destructive/30 rounded-md px-3 py-1.5 hover:bg-destructive/10 transition-colors">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}


function InfoRow({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-medium text-foreground">{value}</p>
                </div>
            </div>
            <button className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity font-medium hover:underline">
                Edit
            </button>
        </div>
    );
}

function SettingRow({
    icon: Icon,
    title,
    description,
    action,
    actionVariant = "default",
}: {
    icon: React.ElementType;
    title: string;
    description: string;
    action: string;
    actionVariant?: "default" | "primary";
}) {
    return (
        <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                    <p className="text-sm font-medium text-foreground">{title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                </div>
            </div>
            <button
                className={
                    actionVariant === "primary"
                        ? "text-xs font-semibold bg-primary text-primary-foreground rounded-md px-3 py-1.5 hover:bg-primary/90 transition-colors"
                        : "text-xs font-medium text-primary border border-border rounded-md px-3 py-1.5 hover:bg-muted transition-colors"
                }
            >
                {action}
            </button>
        </div>
    );
}

function ToggleRow({
    label,
    description,
    defaultOn,
}: {
    label: string;
    description: string;
    defaultOn: boolean;
}) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            </div>
            <button
                role="switch"
                aria-checked={defaultOn}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${defaultOn ? "bg-primary" : "bg-muted"
                    }`}
            >
                <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${defaultOn ? "translate-x-4.5" : "translate-x-1"
                        }`}
                />
            </button>
        </div>
    );
}


/* ─── Usage Tab ─── */

function UsageTab() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold text-foreground">Usage</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                    One credit is deducted per content optimization test.
                </p>
            </div>

            {/* Usage history */}

            <div className="rounded-lg border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Report</TableHead>
                            <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Date</TableHead>
                            <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Credits</TableHead>
                            <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Source</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {usageHistory.map((row, i) => (
                            <TableRow key={i}
                                className={cn(
                                    row.source === "bonus"
                                        ? "bg-emerald-50/60 hover:bg-emerald-50"
                                        : "hover:bg-muted/30"
                                )}>
                                <TableCell className="py-2.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm truncate max-w-[180px]">{row.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-2.5 text-xs text-muted-foreground">
                                    {row.date}
                                </TableCell>
                                <TableCell className="py-2.5">
                                    {row.source === "bonus" ? (
                                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full px-2 py-0.5 whitespace-nowrap">
                                            Sign-up bonus
                                        </span>
                                    ) : (
                                        <span className="text-xs text-muted-foreground whitespace-nowrap">Monthly</span>
                                    )}
                                </TableCell>
                                <TableCell className="py-2.5 text-sm text-center tabular-nums">1</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

/* ─── Plan & Credits Tab ─── */

function PlansCreditsTab() {
    const currentPlan = plans.find((p) => p.current)!;


    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-lg font-semibold text-foreground">Plans & Credits</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Manage your subscription and credit balance.</p>
            </div>

            {/* Current plan banner */}
            <div className="rounded-xl border border-primary/20 bg-accent p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                        <currentPlan.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="font-semibold text-foreground">{currentPlan.name}</p>
                            <span className="text-xs font-semibold bg-primary/10 text-primary rounded-full px-2 py-0.5">
                                Current
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">Renews on March 19, 2026 · {currentPlan.price}/month</p>
                    </div>
                </div>
                <button className="flex items-center gap-1.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg px-4 py-2 hover:bg-primary/90 transition-colors shadow-sm">
                    <CreditCard className="h-4 w-4" />
                    Manage
                </button>
            </div>

            {/* Credit balance */}
            <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold text-foreground">Credit Balance</p>
                    <span className="text-xs font-medium text-[hsl(var(--credit-text))] bg-[hsl(var(--credit-bg))] rounded-full px-2.5 py-1">
                        Resets in 12 days
                    </span>
                </div>
                <div className="flex items-end gap-2">
                    <p className="text-4xl font-bold text-foreground tabular-nums">21</p>
                    <p className="text-sm text-muted-foreground mb-1">/ 30 credits remaining</p>
                </div>
                <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: "70%" }}
                    />
                </div>
                <p className="text-xs text-muted-foreground mt-2">9 credits used this month</p>
            </div>

            {/* Credit includes callout */}
            <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 flex items-start gap-3">
                <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Each credit = 1 test</span> — includes heatmap analysis, proprietary rule set execution, and 20 AI prompts / chats with the assistant.
                </p>
            </div>

            <div className="h-px bg-border" />

            {/* All plans */}
            <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">All Plans</h3>
                <div className="grid gap-3">
                    {plans.map((plan) => (
                        <PlanCard key={plan.name} {...plan} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function PlanCard({
    name,
    price,
    period,
    description,
    features,
    icon: Icon,
    variant,
    current,
}: (typeof plans)[0]) {
    const isGrowth = variant === "growth";
    const isStandard = variant === "standard";
    const isFree = variant === "free";

    return (
        <div
            className={`rounded-xl border p-5 transition-all ${isGrowth
                ? "border-foreground/20 bg-foreground"
                : isStandard
                    ? "border-primary/30 bg-accent"
                    : "border-border bg-card"
                }`}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div
                        className={`h-9 w-9 rounded-lg flex items-center justify-center ${isStandard
                            ? "bg-primary"
                            : isGrowth
                                ? "bg-background/10"
                                : "bg-muted"
                            }`}
                    >
                        <Icon
                            className={`h-4 w-4 ${isStandard
                                ? "text-primary-foreground"
                                : isGrowth
                                    ? "text-background"
                                    : "text-muted-foreground"
                                }`}
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <p className={`font-semibold text-sm ${isGrowth ? "text-background" : "text-foreground"}`}>
                                {name}
                            </p>
                            {current && (
                                <span className="text-xs font-semibold bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                                    Active
                                </span>
                            )}
                            {isFree && (
                                <span className="text-xs font-semibold bg-muted text-muted-foreground rounded-full px-2 py-0.5">
                                    Sign-up
                                </span>
                            )}
                        </div>
                        <p className={`text-xs mt-0.5 ${isGrowth ? "text-background/60" : "text-muted-foreground"}`}>
                            {description}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p className={`font-bold text-lg ${isGrowth ? "text-background" : "text-foreground"}`}>{price}</p>
                    <p className={`text-xs ${isGrowth ? "text-background/60" : "text-muted-foreground"}`}>{period}</p>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-y-1.5 gap-x-4">
                {features.map((f) => (
                    <div key={f} className="flex items-center gap-1.5">
                        <Check className={`h-3.5 w-3.5 flex-shrink-0 ${isStandard ? "text-primary" : isGrowth ? "text-background/70" : "text-muted-foreground"}`} />
                        <span className={`text-xs ${isGrowth ? "text-background/70" : "text-muted-foreground"}`}>{f}</span>
                    </div>
                ))}
            </div>

            {!current && !isFree && (
                <button
                    className={`mt-4 w-full text-sm font-semibold rounded-lg py-2 transition-colors ${isGrowth
                        ? "bg-background/10 text-background hover:bg-background/20"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }`}
                >
                    Upgrade to {name}
                </button>
            )}
        </div>
    );
}


