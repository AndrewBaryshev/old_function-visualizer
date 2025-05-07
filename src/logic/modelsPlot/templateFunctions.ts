import {
  createGraphicAction,
  createRangeAction,
} from '../logicFrames/createAction'
import { evaluateFormula } from './formulaEvaluator'

interface MyInterface {
  formula?: string
  legendStyle?: any
  dotted?: any
  point?: any
  dashDotted?: any
}

export function templateFunctions(
  this: MyInterface,
  xDefaultRange: number,
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
) {
  let flag = false
  ctx.setLineDash([0])
  let lineColor: string = '#7E00CC'
  if (this && this?.legendStyle) {
    lineColor = this?.legendStyle.color
  }
  if (this && this?.dotted) {
    ctx.setLineDash([10, 5])
    flag = true
  }
  let dataY: number[] = []
  let dataX: number[] = []

  let stepX = (ticsNumber * scaleX) / 100

  for (let i = 0; i < 100; i++) {
    let x = (i * stepX) / scaleX + rangeOffsetX

    if (this && this?.formula) {
      const y = evaluateFormula(this.formula, x)
      dataY.push(y * (offsetTics + 1) * scaleY)
    } else {
      dataY.push(1 * (offsetTics + 1) * scaleY)
    }

    dataX.push(x * (offsetTics + 1))
  }

  ctx.closePath()
  ctx.beginPath()
  ctx.strokeStyle = lineColor

  for (let r = 0; r < dataX.length; r++) {
    createGraphicAction(
      XOffset,
      YOffset,
      marginOffset,
      graphicFirstSize,
      ctx,
      r === 0 ? 'graphicMoveTo' : 'graphicLineTo',
      dataX[r] / scaleX,
      dataY[r] / scaleY,
      offsetTics,
      rangeOffsetX,
      rangeOffsetY,
      scaleX,
      scaleY
    )
  }

  ctx.stroke()
  ctx.closePath()

  if (this && this?.legendStyle) {
    return this?.legendStyle
  }
  return {
    color: lineColor,
    width: 2,
    formula: 'p(r) = \u{0394}\u{03B8} * sqrt(6 * r)',
    dotted: flag,
  }
}

export function templateRange(
  this: MyInterface,
  minX: number,
  minY: number,
  maxX: number,
  maxY: number,
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
  scaleY: number,
  setStartPoint: any,
  setEndPoint: any,
  logarithm: boolean
) {
  let flag = false
  ctx.setLineDash([0])
  let lineColor: string = '#7E00CC'
  if (this && this?.legendStyle) {
    lineColor = this?.legendStyle.color
  }
  if (this && this?.dotted) {
    ctx.setLineDash([10, 5])
    flag = true
  } else if (this && this?.point) {
    ctx.setLineDash([2, 3])
  } else if (this && this?.dashDotted) {
    ctx.setLineDash([6, 6])
  }
  let dataY: number[] = []
  let dataX: number[] = []

  let realDataX: number[] = []
  let realDataY: number[] = []

  const minPosition = 100
  const maxPosition = 700
  const nSteps = 100
  const pxDensity = (maxPosition - minPosition) / nSteps

  let stepX = (maxX - minX) / nSteps
  let stepY = (maxY - minY) / nSteps
  const lPX = (maxX - minX) / nSteps / pxDensity
  const lPY = (maxY - minY) / nSteps / pxDensity

  let logMinX
  if (minX <= 0) {
    logMinX = Math.log10(0.01)
  } else {
    logMinX = Math.log10(minX)
  }

  let logMinY
  if (minY <= 0) {
    logMinY = Math.log10(0.01)
  } else {
    logMinY = Math.log10(minX)
  }

  let logMaxX = Math.log10(maxX)
  let logMaxY = Math.log10(maxY)
  let logLPX = (logMaxX - logMinX) / nSteps / pxDensity
  let logLPY = (logMaxY - logMinY) / nSteps / pxDensity

  if (logarithm) {
    for (let i = 0; i < 100; i++) {
      let logStep = (logMaxX - logMinX) / 100
      let x = Math.pow(10, logMinX + (i * logStep) / scaleX)

      if (this && this?.formula) {
        const y = evaluateFormula(this.formula, x)
        console.log(y)
        dataY.push(((Math.log10(y) - logMinY) / logLPY) * scaleY)
        realDataY.push(Math.log10(y))
      }
      dataX.push((Math.log10(x) - logMinX) / logLPX)
      realDataX.push(Math.log10(x))
    }
  } else {
    for (let i = 0; i < 100; i++) {
      let linearStep = (maxX - minX) / 100
      let x = minX + (i * linearStep) / scaleX

      if (this && this?.formula) {
        const y = evaluateFormula(this.formula, x)
        console.log(y)
        dataY.push(((y - minY) / lPY) * scaleY)
        realDataY.push(y)
      }
      dataX.push((x - minX) / lPX)
      realDataX.push(x)
    }
  }

  while (realDataY.length < 101) {
    realDataY.push(realDataY[realDataY.length - 1])
  }
  ctx.closePath()

  ctx.beginPath()
  setStartPoint(realDataY[0])
  setEndPoint(realDataY[100])

  ctx.strokeStyle = lineColor
  for (let r = 0; r <= 100; r++) {
    createRangeAction(
      XOffset,
      YOffset,
      marginOffset,
      graphicFirstSize,
      ctx,
      r === 0 ? 'graphicMoveTo' : 'graphicLineTo',
      dataX[r],
      dataY[r],
      offsetTics,
      rangeOffsetX,
      rangeOffsetY,
      scaleX,
      scaleY
    )
  }
  ctx.stroke()
  ctx.closePath()

  if (this && this?.legendStyle) {
    return this?.legendStyle
  }
  return {
    color: lineColor,
    width: 2,
    formula: 'p(r) = \u{0394}\u{03B8} * sqrt(6 * r)',
    dotted: flag,
  }
}
