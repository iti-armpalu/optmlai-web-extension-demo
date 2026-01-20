"use client"

interface EmptyStateProps {
  onUpload?: () => void
}

export function EmptyState({ onUpload }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h3 className="text-lg font-semibold mb-2">No captures yet</h3>
      <p className="text-muted-foreground mb-4 max-w-sm">
        Capture a screen or upload an image to start understanding how users experience your content.
      </p>
    </div>
  )
}
