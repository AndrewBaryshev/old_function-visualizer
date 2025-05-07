import { createAction } from '../logicFrames/createAction'

export const lineMethod = (XOffset: number, YOffset: number, marginOffset: number, graphicFirstSize: number, ctx: CanvasRenderingContext2D, graphicSize: number, offsetTics: number, ticsNumber: number) => {
  let lineColor: string = "#3B38D4"
  ctx.beginPath()
  createAction(XOffset, YOffset, marginOffset, graphicFirstSize, ctx, "moveTo", 300, 0)
  createAction(XOffset, YOffset, marginOffset, graphicFirstSize, ctx, "lineTo", 300, graphicSize)
  ctx.strokeStyle = lineColor
  ctx.stroke()
  ctx.closePath()

  return {color: lineColor, width: 2, formula: "x = const"}
}