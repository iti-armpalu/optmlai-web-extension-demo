"use client"

import Link from "next/link"
import { Expand } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { useParams } from "next/navigation"

export function FullPageButton() {
  const { id } = useParams()

  return (
    <div className="absolute top-2 left-2 z-50">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="secondary"
            asChild
            className="rounded-md hover:scale-105 transition"
          >
            <Link
              href={`https://optml.ai/report/${id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Expand className="h-5 w-5" />
              <span className="sr-only">Open full-page report</span>
            </Link>
          </Button>
        </TooltipTrigger>

        <TooltipContent side="right">
          <p>Open full-page report</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
