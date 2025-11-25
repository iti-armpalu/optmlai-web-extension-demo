export type ResizeHandle = 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w' | null

export interface AreaBox {
  x: number
  y: number
  width: number
  height: number
}

export function calculateResizedArea(
  handle: ResizeHandle,
  originalArea: AreaBox,
  deltaX: number,
  deltaY: number
): AreaBox {
  const newArea = { ...originalArea }

  switch (handle) {
    case 'nw':
      newArea.x = originalArea.x + deltaX
      newArea.y = originalArea.y + deltaY
      newArea.width = originalArea.width - deltaX
      newArea.height = originalArea.height - deltaY
      break
    case 'ne':
      newArea.y = originalArea.y + deltaY
      newArea.width = originalArea.width + deltaX
      newArea.height = originalArea.height - deltaY
      break
    case 'sw':
      newArea.x = originalArea.x + deltaX
      newArea.width = originalArea.width - deltaX
      newArea.height = originalArea.height + deltaY
      break
    case 'se':
      newArea.width = originalArea.width + deltaX
      newArea.height = originalArea.height + deltaY
      break
    case 'n':
      newArea.y = originalArea.y + deltaY
      newArea.height = originalArea.height - deltaY
      break
    case 's':
      newArea.height = originalArea.height + deltaY
      break
    case 'e':
      newArea.width = originalArea.width + deltaX
      break
    case 'w':
      newArea.x = originalArea.x + deltaX
      newArea.width = originalArea.width - deltaX
      break
  }

  return newArea
}

export function createSelectionBox(
  startPos: { x: number; y: number },
  currentPos: { x: number; y: number }
): AreaBox {
  return {
    x: Math.min(startPos.x, currentPos.x),
    y: Math.min(startPos.y, currentPos.y),
    width: Math.abs(currentPos.x - startPos.x),
    height: Math.abs(currentPos.y - startPos.y),
  }
}

export function isValidSelection(area: AreaBox, minSize = 10): boolean {
  return area.width > minSize && area.height > minSize
}
