'use client'

import { useCallback, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
    ImageUp, SquareDashedMousePointer, X,
    Maximize2, FolderOpen, MousePointerClick,
} from 'lucide-react'
import { useUIStore } from '@/store/ui-store'
import { useCaptureStore } from '@/store/capture-store'
import { AppSidebar } from '@/components/layout/app-sidebar'

import { processCapturedImage } from '@/lib/report-pipeline'
import { ProcessingPopover } from '../capture/processing-popover'
import { AreaCaptureOverlay } from '../capture-tool/area-capture-overlay'
import { CapturePreviewPopupHost } from '../capture-tool/capture-preview-popup-host'

type QuickAction = {
    icon: React.ComponentType<{ className?: string }>
    label: string
    onClick: () => void
}

export function FloatingToggle() {
    const {
        isCapturing,
        startCapture,
        stopCapture,
        isProcessing,
        startProcessing,
        stopProcessing,
        finishProcessing,
    } = useUIStore()

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [buttonHovered, setButtonHovered] = useState(false)

    const handleCapture = useCallback(
        async (imageData: string) => {
            if (isProcessing) return
            startProcessing()
            try {
                const report = await processCapturedImage(imageData)
                finishProcessing(report.id)
            } catch (err) {
                console.error(err)
                stopProcessing()
            }
        },
        [isProcessing, startProcessing, stopProcessing, finishProcessing]
    )

    const quickActions: QuickAction[] = useMemo(
        () => [
            { icon: SquareDashedMousePointer, label: 'Capture Area', onClick: startCapture },
            {
                icon: ImageUp, label: 'Upload Image', onClick: () => {
                    const input = document.createElement('input')
                    input.type = 'file'
                    input.accept = 'image/*'
                    input.onchange = async (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0]
                        if (!file) return
                        const reader = new FileReader()
                        reader.onload = () => {
                            const imageData = reader.result as string
                            useCaptureStore.getState().setDraftCapture({
                                image: imageData,
                                source: 'upload',
                                metadata: { width: 0, height: 0 },
                            })
                            useUIStore.getState().openCapturePreview()
                        }
                        reader.readAsDataURL(file)
                    }
                    input.click()
                }
            },
            { icon: MousePointerClick, label: 'Select', onClick: () => console.log('Select') },
            { icon: FolderOpen, label: 'From Captures', onClick: () => console.log('From captures') },
        ],
        [startCapture]
    )

    return (
        <>
            {isCapturing && (
                <AreaCaptureOverlay
                    onCapture={handleCapture}
                    onCancel={stopCapture}
                />
            )}

            <div
                className="fixed top-0 right-0 z-50 flex flex-row items-center gap-3"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Sidebar region */}
                <div
                    className={`transition-all duration-300 ${sidebarOpen
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-[400px] pointer-events-none'
                        }`}
                >
                    <div className="fixed top-0 right-0">
                        <div className="relative h-dvh">
                            <AppSidebar side="right" variant="floating" collapsible="icon" />
                            <div className="absolute bottom-2 right-full mr-2 z-60">
                                <CapturePreviewPopupHost onGenerate={handleCapture} />
                                {isProcessing && <ProcessingPopover isOpen />}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating controls */}
                <div className="fixed bottom-6 right-3 flex flex-col items-center gap-3">
                    {/* Quick actions — visible on hover when sidebar is closed */}
                    <div
                        className={`flex flex-col gap-2 transition-all duration-300 ${isHovered && !sidebarOpen
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-4 pointer-events-none'
                            }`}
                    >
                        {quickActions.map((action, index) => (
                            <Tooltip key={index} delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        onClick={action.onClick}
                                        className="h-10 w-10 rounded-full shadow-md transition-transform hover:scale-110"
                                        style={{ transitionDelay: `${index * 50}ms` }}
                                    >
                                        <action.icon className="h-4 w-4" />
                                        <span className="sr-only">{action.label}</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="left">
                                    <p>{action.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </div>

                    {/* Toggle button */}
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Button
                                size="icon"
                                onClick={() => setSidebarOpen((v) => !v)}
                                onMouseEnter={() => setButtonHovered(true)}
                                onMouseLeave={() => setButtonHovered(false)}
                                className="h-8 w-8 rounded-lg bg-purple-500 shadow-lg transition-transform hover:scale-110 hover:bg-purple-600"
                            >
                                {sidebarOpen ? (
                                    <X className="h-5 w-5" />
                                ) : buttonHovered ? (
                                    <Maximize2 className="h-5 w-5" />
                                ) : (
                                    <span className="text-lg">O</span>
                                )}
                                <span className="sr-only">Toolbar</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>{sidebarOpen ? 'Close toolbar' : 'Open toolbar'}</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </>
    )
}