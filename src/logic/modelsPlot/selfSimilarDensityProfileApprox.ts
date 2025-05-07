import { createAction, createGraphicAction } from '../logicFrames/createAction'

export const selfSimilarDensityProfileApprox = (
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
  scaleX: number,
  scaleY: number
) => {
  let lineColor: string = '#00FF47'
  let dataY: number[] = []
  let dataX: number[] = []

  let stepX = (ticsNumber * scaleX) / 100

  for (
    let r = 0 + rangeOffsetX;
    r < ticsNumber * scaleX + rangeOffsetX;
    r += stepX
  ) {
    let y = (r * 2 - 5) * scaleY

    dataY.push(y * (offsetTics + 1))
    dataX.push(r * (offsetTics + 1))
  }

  ctx.closePath()
  ctx.beginPath()

  let beginPoint = 0
  let isStarted = false

  for (let i = 0; i < dataX.length; i++) {
    let x = dataX[i] / (offsetTics + 1)
    let y = dataY[i] / ((offsetTics + 1) * scaleY)

    if (y >= 0 + rangeOffsetY && y <= ticsNumber + rangeOffsetY) {
      beginPoint = i
      isStarted = true
      break
    }
  }

  if (isStarted) {
    createGraphicAction(
      XOffset,
      YOffset,
      marginOffset,
      graphicFirstSize,
      ctx,
      'graphicMoveTo',
      dataX[beginPoint] / scaleX,
      dataY[beginPoint] / scaleY,
      offsetTics,
      rangeOffsetX,
      rangeOffsetY,
      scaleX,
      scaleY
    )

    ctx.strokeStyle = lineColor

    for (let i = beginPoint; i < dataX.length; i++) {
      let x = dataX[i] / (offsetTics + 1)
      let y = dataY[i] / ((offsetTics + 1) * scaleY)

      if (y >= 0 + rangeOffsetY && y <= ticsNumber + rangeOffsetY) {
        createGraphicAction(
          XOffset,
          YOffset,
          marginOffset,
          graphicFirstSize,
          ctx,
          'graphicLineTo',
          dataX[i] / scaleX,
          dataY[i] / scaleY,
          offsetTics,
          rangeOffsetX,
          rangeOffsetY,
          scaleX,
          scaleY
        )
      }
    }

    ctx.stroke()
    ctx.closePath()
  }

  return { color: lineColor, width: 2, formula: 'p(r) = r * 2 - 5' }
}
