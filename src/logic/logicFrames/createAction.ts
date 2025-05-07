export const createAction = (
  XOffset: number,
  YOffset: number,
  marginOffset: number,
  graphicFirstSize: number,
  ctx: CanvasRenderingContext2D,
  action: string,
  argX: number,
  argY: number,
  text?: string,
  width?: number,
  height?: number
) => {
  let marginXY: number = graphicFirstSize / marginOffset
  const offsetY: number = graphicFirstSize
  let copyY: number = argY
  argX += marginXY + XOffset
  argY = offsetY - (argY + marginXY) + YOffset
  switch (action) {
    case 'moveTo':
      ctx.moveTo(argX, argY)
      break
    case 'lineTo':
      ctx.lineTo(argX, argY)
      break
    case 'fillText':
      if (text) {
        ctx.fillText(text, argX, argY)
      }
      break
    case 'fillRect':
      if (width && height) {
        ctx.fillRect(argX, argY, width, height)
      }
      break
  }
}

export const createGraphicAction = (
  XOffset: number,
  YOffset: number,
  marginOffset: number,
  graphicFirstSize: number,
  ctx: CanvasRenderingContext2D,
  action: string,
  argX: number,
  argY: number,
  offsetTics: number,
  rangeOffsetX: number,
  rangeOffsetY: number,
  scaleX: number,
  scaleY: number
) => {
  let marginXY: number = graphicFirstSize / marginOffset
  const offsetY: number = graphicFirstSize
  let copyY: number = argY
  argX += marginXY + XOffset
  argY = offsetY - (argY + marginXY) + YOffset
  switch (action) {
    case 'graphicLineTo':
      ctx.lineTo(
        argX - (rangeOffsetX / scaleX) * (offsetTics + 1),
        argY + (rangeOffsetY / scaleY) * (offsetTics + 1)
      )
      break
    case 'graphicMoveTo':
      ctx.moveTo(
        argX - (rangeOffsetX / scaleX) * (offsetTics + 1),
        argY + (rangeOffsetY / scaleY) * (offsetTics + 1)
      )
      break
  }
}

export const createRangeAction = (
  XOffset: number,
  YOffset: number,
  marginOffset: number,
  graphicFirstSize: number,
  ctx: CanvasRenderingContext2D,
  action: string,
  argX: number,
  argY: number,
  offsetTics: number,
  rangeOffsetX: number,
  rangeOffsetY: number,
  scaleX: number,
  scaleY: number
) => {
  let marginXY: number = graphicFirstSize / marginOffset
  const offsetY: number = graphicFirstSize
  let copyY: number = argY
  argX += marginXY + XOffset
  argY = offsetY - (argY + marginXY) + YOffset
  switch (action) {
    case 'graphicLineTo':
      ctx.lineTo(argX, argY)
      break
    case 'graphicMoveTo':
      ctx.moveTo(argX, argY)
      break
  }
}
