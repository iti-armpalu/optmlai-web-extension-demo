"use client"

import React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, Pencil, Plus, Trash2, Type, ImageIcon, Stamp, MousePointerClick, Move, CheckCircle2, ArrowRight } from "lucide-react"

// Category types
type CategoryType = "tagline" | "imagery" | "logo" | "button"

// Tagline attribute options
const taglineAttributes = [
  { id: "describes-product", label: "Describes the product" },
  { id: "specifies-benefit", label: "Specifies a benefit" },
  { id: "refers-occasion", label: "Refers to the occasion" },
  { id: "prompts-action", label: "Prompts action" },
  { id: "promotional-offer", label: "Pushes a promotional offer" },
]

// Imagery attribute options
const imageryAttributes = [
  { id: "product-prominent", label: "Product shown prominently" },
  { id: "branded-assets", label: "Includes branded assets" },
  { id: "highlights-benefits", label: "Highlights the benefits" },
  { id: "lifestyle-imagery", label: "Contains lifestyle imagery" },
  { id: "social-repost", label: "Social media repost" },
]

export interface DetectedElement {
  id: string
  category: CategoryType
  label: string
  value: string
  confidence: number
  position?: { top: number; left: number; width: number; height: number }
  attributes?: string[]
}

interface KeyElementsTabProps {
  onConfirm: () => void
  creativeImageUrl?: string
  readOnly?: boolean
  onNext?: () => void;
}

const categoryConfig: Record<CategoryType, { label: string; icon: React.ReactNode; color: string }> = {
  tagline: { label: "Tagline", icon: <Type className="h-4 w-4" />, color: "purple" },
  imagery: { label: "Imagery", icon: <ImageIcon className="h-4 w-4" />, color: "purple" },
  logo: { label: "Logo", icon: <Stamp className="h-4 w-4" />, color: "purple" },
  button: { label: "Button", icon: <MousePointerClick className="h-4 w-4" />, color: "purple" },
}

const defaultElements: DetectedElement[] = [
  { id: "tagline-1", category: "tagline", label: "Main Headline", value: "Give Your Little Superhero a Super Start", confidence: 92, position: { top: 12, left: 5, width: 55, height: 15 }, attributes: ["describes-product", "specifies-benefit"] },
  { id: "tagline-2", category: "tagline", label: "Subheadline", value: "Affordable whole life insurance for children", confidence: 88, position: { top: 28, left: 5, width: 45, height: 8 }, attributes: ["specifies-benefit"] },
  { id: "imagery-1", category: "imagery", label: "Hero Image", value: "Child in superhero cape", confidence: 94, position: { top: 10, left: 55, width: 42, height: 55 }, attributes: ["lifestyle-imagery", "highlights-benefits"] },
  { id: "imagery-2", category: "imagery", label: "Product Visual", value: "Insurance coverage illustration", confidence: 85, position: { top: 42, left: 5, width: 48, height: 20 }, attributes: ["product-prominent", "branded-assets"] },
  { id: "logo-1", category: "logo", label: "Brand Logo", value: "Gerber Life Insurance", confidence: 98, position: { top: 3, left: 3, width: 25, height: 8 } },
  { id: "button-1", category: "button", label: "CTA Button", value: "Get a Free Quote", confidence: 97, position: { top: 72, left: 5, width: 30, height: 10 } },
]

export function KeyElementsTab({
  onConfirm,
  creativeImageUrl = "https://images.squarespace-cdn.com/content/v1/5ef0ef1b02a1d05e6faff7ac/1593379290858-GI2TYZN1I701KK95J8W2/Ad_page_01.jpg",
  readOnly = false,
  onNext
}: KeyElementsTabProps) {
  const [editingElement, setEditingElement] = useState<string | null>(null)
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [detectedElements, setDetectedElements] = useState<DetectedElement[]>(defaultElements)
  const [editValue, setEditValue] = useState("")
  const [editAttributes, setEditAttributes] = useState<string[]>([])
  const [isAddingElement, setIsAddingElement] = useState(false)
  const [newElementCategory, setNewElementCategory] = useState<CategoryType>("tagline")
  const [newElementLabel, setNewElementLabel] = useState("")
  const [newElementValue, setNewElementValue] = useState("")
  const [newElementAttributes, setNewElementAttributes] = useState<string[]>([])

  // Resizing state
  const [isResizing, setIsResizing] = useState(false)
  const [resizeHandle, setResizeHandle] = useState<string | null>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const startPosRef = useRef({ x: 0, y: 0 })
  const startSizeRef = useRef({ top: 0, left: 0, width: 0, height: 0 })

  const handleEdit = (id: string, element: DetectedElement) => {
    setEditingElement(id)
    setEditValue(element.value)
    setEditAttributes(element.attributes || [])
    setSelectedElement(id)
  }

  const handleSave = (id: string) => {
    setDetectedElements(prev =>
      prev.map(el => el.id === id ? { ...el, value: editValue, confidence: 100, attributes: editAttributes } : el)
    )
    setEditingElement(null)
    setEditValue("")
    setEditAttributes([])
  }

  const handleCancel = () => {
    setEditingElement(null)
    setEditValue("")
    setEditAttributes([])
  }

  const handleConfirm = () => {
    onConfirm()
  }

  const handleAddElement = () => {
    if (newElementLabel.trim() && newElementValue.trim()) {
      const newId = `${newElementCategory}-${Date.now()}`
      setDetectedElements(prev => [
        ...prev,
        {
          id: newId,
          category: newElementCategory,
          label: newElementLabel.trim(),
          value: newElementValue.trim(),
          confidence: 100,
          attributes: newElementAttributes,
        }
      ])
      setNewElementLabel("")
      setNewElementValue("")
      setNewElementAttributes([])
      setIsAddingElement(false)
    }
  }

  const handleDeleteElement = (id: string) => {
    setDetectedElements(prev => prev.filter(el => el.id !== id))
    if (selectedElement === id) setSelectedElement(null)
    if (editingElement === id) {
      setEditingElement(null)
      setEditValue("")
      setEditAttributes([])
    }
  }

  const toggleAttribute = (attrId: string, isEditing: boolean) => {
    if (isEditing) {
      setEditAttributes(prev =>
        prev.includes(attrId) ? prev.filter(a => a !== attrId) : [...prev, attrId]
      )
    } else {
      setNewElementAttributes(prev =>
        prev.includes(attrId) ? prev.filter(a => a !== attrId) : [...prev, attrId]
      )
    }
  }

  // Resize handlers
  const handleResizeStart = useCallback((e: React.MouseEvent, handle: string, element: DetectedElement) => {
    e.preventDefault()
    e.stopPropagation()
    if (!element.position) return

    setIsResizing(true)
    setResizeHandle(handle)
    startPosRef.current = { x: e.clientX, y: e.clientY }
    startSizeRef.current = { ...element.position }
  }, [])

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !resizeHandle || !selectedElement || !imageRef.current) return

    const element = detectedElements.find(el => el.id === selectedElement)
    if (!element?.position) return

    const rect = imageRef.current.getBoundingClientRect()
    const deltaX = ((e.clientX - startPosRef.current.x) / rect.width) * 100
    const deltaY = ((e.clientY - startPosRef.current.y) / rect.height) * 100

    let newPosition = { ...startSizeRef.current }

    switch (resizeHandle) {
      case 'nw':
        newPosition.top = Math.max(0, startSizeRef.current.top + deltaY)
        newPosition.left = Math.max(0, startSizeRef.current.left + deltaX)
        newPosition.width = Math.max(5, startSizeRef.current.width - deltaX)
        newPosition.height = Math.max(5, startSizeRef.current.height - deltaY)
        break
      case 'ne':
        newPosition.top = Math.max(0, startSizeRef.current.top + deltaY)
        newPosition.width = Math.max(5, startSizeRef.current.width + deltaX)
        newPosition.height = Math.max(5, startSizeRef.current.height - deltaY)
        break
      case 'sw':
        newPosition.left = Math.max(0, startSizeRef.current.left + deltaX)
        newPosition.width = Math.max(5, startSizeRef.current.width - deltaX)
        newPosition.height = Math.max(5, startSizeRef.current.height + deltaY)
        break
      case 'se':
        newPosition.width = Math.max(5, startSizeRef.current.width + deltaX)
        newPosition.height = Math.max(5, startSizeRef.current.height + deltaY)
        break
      case 'move':
        newPosition.top = Math.max(0, Math.min(100 - startSizeRef.current.height, startSizeRef.current.top + deltaY))
        newPosition.left = Math.max(0, Math.min(100 - startSizeRef.current.width, startSizeRef.current.left + deltaX))
        break
    }

    setDetectedElements(prev =>
      prev.map(el => el.id === selectedElement ? { ...el, position: newPosition } : el)
    )
  }, [isResizing, resizeHandle, selectedElement, detectedElements])

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false)
    setResizeHandle(null)
  }, [])

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResizeMove)
      window.addEventListener('mouseup', handleResizeEnd)
      return () => {
        window.removeEventListener('mousemove', handleResizeMove)
        window.removeEventListener('mouseup', handleResizeEnd)
      }
    }
  }, [isResizing, handleResizeMove, handleResizeEnd])

  const groupedElements = {
    tagline: detectedElements.filter(el => el.category === "tagline"),
    imagery: detectedElements.filter(el => el.category === "imagery"),
    logo: detectedElements.filter(el => el.category === "logo"),
    button: detectedElements.filter(el => el.category === "button"),
  }

  const getAttributeOptions = (category: CategoryType) => {
    if (category === "tagline") return taglineAttributes
    if (category === "imagery") return imageryAttributes
    return []
  }

  const selectedElementData = selectedElement ? detectedElements.find(el => el.id === selectedElement) : null
  const isInEditMode = editingElement !== null

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2 p-6 flex-1 overflow-hidden">
        {/* Creative Preview with Element Boxes */}
        <div className="space-y-3 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Creative Preview</h3>
            {isInEditMode && selectedElementData?.position && (
              <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-500/10 px-3 py-1.5 rounded-full">
                <Move className="h-3.5 w-3.5" />
                Drag corners to resize frame
              </div>
            )}
          </div>
          <div ref={imageRef} className="relative rounded-xl overflow-hidden border-2 bg-muted/30 shadow-inner flex-1">
            <img
              src={creativeImageUrl || "/placeholder.svg"}
              alt="Creative preview"
              className="w-full h-auto"
              crossOrigin="anonymous"
            />
            {/* Element highlight boxes - GREEN color */}
            {detectedElements.map((element) => element.position && (
              <div
                key={`box-${element.id}`}
                className={`absolute rounded-md transition-all duration-200 ${selectedElement === element.id
                  ? 'border-[3px] border-emerald-500 bg-emerald-500/20 shadow-lg ring-2 ring-emerald-500/30'
                  : 'border-2 border-dashed border-emerald-500/40 hover:border-emerald-500/70'
                  } ${isInEditMode && selectedElement === element.id ? 'cursor-move' : 'cursor-pointer'}`}
                style={{
                  top: `${element.position.top}%`,
                  left: `${element.position.left}%`,
                  width: `${element.position.width}%`,
                  height: `${element.position.height}%`,
                }}
                onClick={() => !isResizing && setSelectedElement(selectedElement === element.id ? null : element.id)}
                onMouseDown={(e) => {
                  if (isInEditMode && selectedElement === element.id) {
                    handleResizeStart(e, 'move', element)
                  }
                }}
              >
                {/* Label */}
                <div className={`absolute -top-6 left-0 px-2 py-0.5 text-[10px] font-semibold rounded whitespace-nowrap shadow-md ${selectedElement === element.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-emerald-500/80 text-white'
                  }`}>
                  {element.label}
                </div>

                {/* Resize handles - only show when editing this element */}
                {isInEditMode && selectedElement === element.id && (
                  <>
                    <div
                      className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-emerald-500 rounded-full cursor-nw-resize border-2 border-white shadow-md"
                      onMouseDown={(e) => handleResizeStart(e, 'nw', element)}
                    />
                    <div
                      className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-emerald-500 rounded-full cursor-ne-resize border-2 border-white shadow-md"
                      onMouseDown={(e) => handleResizeStart(e, 'ne', element)}
                    />
                    <div
                      className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-emerald-500 rounded-full cursor-sw-resize border-2 border-white shadow-md"
                      onMouseDown={(e) => handleResizeStart(e, 'sw', element)}
                    />
                    <div
                      className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-emerald-500 rounded-full cursor-se-resize border-2 border-white shadow-md"
                      onMouseDown={(e) => handleResizeStart(e, 'se', element)}
                    />
                  </>
                )}
              </div>
            ))}
            {!readOnly && (
              <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-background/95 rounded-lg text-xs text-muted-foreground border shadow-sm">
                Click to select • Edit mode enables frame resize
              </div>
            )}
          </div>
        </div>

        {/* Elements List by Category */}
        <div className="space-y-4 overflow-y-auto pr-2">
          <div className="flex items-center justify-between sticky top-0 bg-background pb-2 z-10">

            <div className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              {detectedElements.length} elements detected
            </div>
            {!readOnly && (
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 h-8 bg-transparent"
                onClick={() => setIsAddingElement(true)}
              >
                <Plus className="h-3.5 w-3.5" />
                Add Element
              </Button>
            )}
          </div>

          {/* Add New Element Form */}
          {isAddingElement && !readOnly && (
            <Card className="border-2 border-dashed border-primary/50 bg-primary/5">
              <CardContent className="py-4 space-y-4">
                <div className="grid grid-cols-4 gap-2">
                  {(Object.keys(categoryConfig) as CategoryType[]).map((cat) => (
                    <Button
                      key={cat}
                      size="sm"
                      variant={newElementCategory === cat ? "default" : "outline"}
                      className="gap-1.5 text-xs"
                      onClick={() => {
                        setNewElementCategory(cat)
                        setNewElementAttributes([])
                      }}
                    >
                      {categoryConfig[cat].icon}
                      {categoryConfig[cat].label}
                    </Button>
                  ))}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Label</label>
                    <Input
                      value={newElementLabel}
                      onChange={(e) => setNewElementLabel(e.target.value)}
                      placeholder="e.g., Main Headline"
                      className="h-9"
                      autoFocus
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Value</label>
                    <Input
                      value={newElementValue}
                      onChange={(e) => setNewElementValue(e.target.value)}
                      placeholder="e.g., The actual text"
                      className="h-9"
                    />
                  </div>
                </div>
                {getAttributeOptions(newElementCategory).length > 0 && (
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Attributes</label>
                    <div className="flex flex-wrap gap-2">
                      {getAttributeOptions(newElementCategory).map((attr) => (
                        <label key={attr.id} className="flex items-center gap-1.5 text-xs cursor-pointer">
                          <Checkbox
                            checked={newElementAttributes.includes(attr.id)}
                            onCheckedChange={() => toggleAttribute(attr.id, false)}
                          />
                          {attr.label}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-2 pt-1">
                  <Button size="sm" onClick={handleAddElement} className="gap-1.5" disabled={!newElementLabel.trim() || !newElementValue.trim()}>
                    <Check className="h-3.5 w-3.5" />
                    Add
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => {
                    setIsAddingElement(false)
                    setNewElementLabel("")
                    setNewElementValue("")
                    setNewElementAttributes([])
                  }}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Category Groups */}
          {(Object.keys(categoryConfig) as CategoryType[]).map((category) => (
            <Card key={category} className="overflow-hidden gap-2 py-0">

              <CardHeader className="border-b bg-muted/30 [.border-b]:pb-1 py-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  {categoryConfig[category].icon}
                  {categoryConfig[category].label}
                  <span className="text-xs font-normal text-muted-foreground">
                    ({groupedElements[category].length})
                  </span>
                </CardTitle>
              </CardHeader>


              <CardContent className="p-0 divide-y">
                {groupedElements[category].length === 0 ? (
                  <p className="text-xs text-muted-foreground p-4 text-center">No {categoryConfig[category].label.toLowerCase()} elements detected</p>
                ) : (
                  groupedElements[category].map((element) => (
                    <div
                      key={element.id}
                      className={`p-3 transition-all duration-200 cursor-pointer ${selectedElement === element.id
                        ? 'bg-emerald-500/10'
                        : 'hover:bg-muted/50'
                        }`}
                      onClick={() => setSelectedElement(selectedElement === element.id ? null : element.id)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold">{element.label}</span>
                            {element.position && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                                mapped
                              </span>
                            )}
                          </div>

                          {editingElement === element.id ? (
                            <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
                              <Input
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="h-8 text-sm"
                                autoFocus
                              />
                              {getAttributeOptions(element.category).length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {getAttributeOptions(element.category).map((attr) => (
                                    <label key={attr.id} className="flex items-center gap-1.5 text-xs cursor-pointer">
                                      <Checkbox
                                        checked={editAttributes.includes(attr.id)}
                                        onCheckedChange={() => toggleAttribute(attr.id, true)}
                                      />
                                      {attr.label}
                                    </label>
                                  ))}
                                </div>
                              )}
                              <div className="flex gap-2">
                                <Button size="sm" variant="default" className="h-7 text-xs gap-1" onClick={() => handleSave(element.id)}>
                                  <Check className="h-3 w-3" /> Save
                                </Button>
                                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={handleCancel}>
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <p className="text-sm text-muted-foreground">{element.value}</p>
                              {element.attributes && element.attributes.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1.5">
                                  {element.attributes.map((attrId) => {
                                    const attrLabel = [...taglineAttributes, ...imageryAttributes].find(a => a.id === attrId)?.label
                                    return attrLabel ? (
                                      <span key={attrId} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                                        {attrLabel}
                                      </span>
                                    ) : null
                                  })}
                                </div>
                              )}
                            </>
                          )}
                        </div>

                        {editingElement !== element.id && !readOnly && (
                          <div className="flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 hover:bg-muted"
                              onClick={() => handleEdit(element.id, element)}
                            >
                              <Pencil className="h-3 w-3 text-muted-foreground" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 hover:bg-destructive/10"
                              onClick={() => handleDeleteElement(element.id)}
                            >
                              <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          ))}


        </div>
      </div>


      {/* Sticky bottom CTA */}
      <div className="shrink-0 border-t border-border bg-muted/40 p-6">
        <div
          className="flex items-start justify-end gap-4"
          role="group"
          aria-label="Dialog actions"
        >
          {readOnly ? (
            onNext ? (
              <Button
                type="button"
                variant="ghost"
                onClick={onNext}
                className="h-9 gap-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                View confirmed channel and purpose
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            ) : null
          ) : (
            <Button
              type="button"
              className="h-9 gap-2 px-5"
              onClick={onConfirm}
            >
              Confirm key elements
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>


    </>
  )
}
