import { createAction, createGraphicAction } from '../logicFrames/createAction'
export const testFunctions = (
  XOffset: number,
  YOffset: number,
  marginOffset: number,
  graphicFirstSize: number,
  ctx: CanvasRenderingContext2D,
  graphicSize: number,
  offsetTics: number,
  ticsNumber: number,
  rangeOffsetX: number,
  rangeOffsetY: number,
  scaleX: number
) => {
  let lineColor: string = '#7E00CC'
  let dataY: number[] = []
  let dataX: number[] = []
  for (let r = 0 + rangeOffsetX; r < ticsNumber * scaleX + rangeOffsetX; r++) {
    dataY.push(Math.sqrt(6 * r) * (offsetTics + 1))
    dataX.push(r * (offsetTics + 1))
  }

  ctx.closePath()

  let beginPoint: number = 0
  let isStarted: boolean = false
  ctx.beginPath()
  for (let r = 0; r < ticsNumber * scaleX; r++) {
    if (
      dataY[r] / (offsetTics + 1) >= 0 + rangeOffsetY &&
      dataY[r] / (offsetTics + 1) <= ticsNumber + rangeOffsetY
    ) {
      beginPoint = r
      isStarted = true
      break
    }
  }
  if (isStarted) {
    ctx.strokeStyle = lineColor

    for (let r = beginPoint; r < ticsNumber * scaleX; r++) {
      if (
        dataY[r] / (offsetTics + 1) >= 0 + rangeOffsetY &&
        dataY[r] / (offsetTics + 1) <= ticsNumber + rangeOffsetY
      ) {
      }
    }
    ctx.stroke()
    ctx.closePath()
  }
  return {
    color: lineColor,
    width: 2,
    formula: 'p(r) = \u{0394}\u{03B8} * sqrt(6 * r)',
  }
}
