import React from "react"

export function renderBold(text: string) {
  // supports **bold** only (simple + safe)
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean)

  return parts.map((part, i) => {
    const isBold = part.startsWith("**") && part.endsWith("**")
    if (!isBold) return <React.Fragment key={i}>{part}</React.Fragment>
    return (
      <strong key={i} className="text-foreground">
        {part.slice(2, -2)}
      </strong>
    )
  })
}
