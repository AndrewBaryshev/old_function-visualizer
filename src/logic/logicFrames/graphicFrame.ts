import { createAction } from './createAction'

function roundToTwoNonZeroDigits(number: number) {
  //? Временный вариант
  var numStr = number.toString()
  var decimalIndex = numStr.indexOf('.') + 1
  var nonZeroIndex = decimalIndex + 2

  if (decimalIndex === 0) {
    return parseFloat(numStr)
  }

  if (nonZeroIndex >= numStr.length) {
    return parseFloat(numStr).toFixed(decimalIndex - 1)
  }

  while (nonZeroIndex < numStr.length && numStr.charAt(nonZeroIndex) === '0') {
    nonZeroIndex++
  }

  var roundedNum = parseFloat(numStr.slice(0, nonZeroIndex + 1))
  if (nonZeroIndex === decimalIndex) {
    return roundedNum.toFixed(1)
  } else {
    return roundedNum.toFixed(nonZeroIndex - decimalIndex)
  }
}

function roundUpDecimal(number: number) {
  if (!Number.isInteger(number)) {
    // console.log(number)
    return Math.round(number * 100) / 100
  }

  return number
}

function plotLegend(
  XOffset: number,
  YOffset: number,
  marginOffset: number,
  ctx: CanvasRenderingContext2D,
  designHighTicSize: number,
  legendSpace: number,
  arrLegends: any,
  graphicFirstSize: number,
  graphicSize: number,
  legendBlockSize: number,
  spaceBetweenLegendMark: number,
  legendCoefficientUp: number,
  legendCoefficientRight: number,
  additionalLegendOffset: number,
  linelLegendSize: number,
  turnOffLegend: boolean,
  legendShiftCoeff: number,
  shiftLegend: boolean
) {
  if (!turnOffLegend) {
    let rangeLegend = designHighTicSize * legendSpace
    for (let i = 0; i < arrLegends.length; i++) {
      ctx.beginPath()
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = '18px Verdana'
      ctx.fillStyle = '#000000'
      ctx.lineWidth = 2
      // console.log("test")
      ctx.setLineDash([0])
      if (arrLegends[i].dotted) {
        ctx.setLineDash([10, 5])
      } else if (arrLegends[i].point) {
        ctx.setLineDash([2, 3])
      } else if (arrLegends[i].dashDotted) {
        ctx.setLineDash([6, 6])
      }
      // console.log(arrLegends[i].dotted, arrLegends[i].color, arrLegends[i].width, arrLegends[i])
      // console.log(arrLegends[i].dotted)
      if (shiftLegend) {
        ctx.fillStyle = '#FFFFFF'
        createAction(
          XOffset,
          YOffset,
          marginOffset,
          graphicFirstSize,
          ctx,
          'fillRect',
          graphicSize -
            legendBlockSize +
            legendSpace * designHighTicSize -
            arrLegends[i].formula.length * arrLegends[i].formula.length * 0.5 -
            10,
          graphicSize - rangeLegend + legendShiftCoeff + 10,
          '',
          arrLegends[i].formula.length * 10 + 60,
          23
        )
        ctx.fillStyle = '#000000'
        createAction(
          XOffset,
          YOffset,
          marginOffset,
          graphicFirstSize,
          ctx,
          'fillText',
          graphicSize -
            legendBlockSize +
            legendSpace * designHighTicSize -
            arrLegends[i].formula.length * arrLegends[i].formula.length * 0.1,
          graphicSize - rangeLegend + legendShiftCoeff,
          arrLegends[i].formula + ':'
        )
        // console.log(arrLegends[i].formula)
        rangeLegend += spaceBetweenLegendMark
        createAction(
          XOffset,
          YOffset,
          marginOffset,
          graphicFirstSize,
          ctx,
          'moveTo',
          graphicSize -
            legendBlockSize +
            legendSpace * designHighTicSize * legendCoefficientRight +
            additionalLegendOffset,
          graphicSize -
            rangeLegend +
            spaceBetweenLegendMark * legendCoefficientUp +
            legendShiftCoeff
        )
        createAction(
          XOffset,
          YOffset,
          marginOffset,
          graphicFirstSize,
          ctx,
          'lineTo',
          graphicSize -
            legendBlockSize +
            legendSpace * designHighTicSize * legendCoefficientRight +
            additionalLegendOffset +
            linelLegendSize,
          graphicSize -
            rangeLegend +
            spaceBetweenLegendMark * legendCoefficientUp +
            legendShiftCoeff
        )
      } else {
        ctx.fillStyle = '#FFFFFF'
        createAction(
          XOffset,
          YOffset,
          marginOffset,
          graphicFirstSize,
          ctx,
          'fillRect',
          graphicSize -
            legendBlockSize +
            legendSpace * designHighTicSize -
            arrLegends[i].formula.length * arrLegends[i].formula.length * 0.5 -
            10,
          graphicSize - rangeLegend + 10,
          '',
          arrLegends[i].formula.length * 10 + 60,
          23
        )
        ctx.fillStyle = '#000000'
        createAction(
          XOffset,
          YOffset,
          marginOffset,
          graphicFirstSize,
          ctx,
          'fillText',
          graphicSize -
            legendBlockSize +
            legendSpace * designHighTicSize -
            arrLegends[i].formula.length * arrLegends[i].formula.length * 0.1,
          graphicSize - rangeLegend,
          arrLegends[i].formula + ':'
        )
        rangeLegend += spaceBetweenLegendMark
        createAction(
          XOffset,
          YOffset,
          marginOffset,
          graphicFirstSize,
          ctx,
          'moveTo',
          graphicSize -
            legendBlockSize +
            legendSpace * designHighTicSize * legendCoefficientRight +
            additionalLegendOffset,
          graphicSize -
            rangeLegend +
            spaceBetweenLegendMark * legendCoefficientUp
        )
        createAction(
          XOffset,
          YOffset,
          marginOffset,
          graphicFirstSize,
          ctx,
          'lineTo',
          graphicSize -
            legendBlockSize +
            legendSpace * designHighTicSize * legendCoefficientRight +
            additionalLegendOffset +
            linelLegendSize,
          graphicSize -
            rangeLegend +
            spaceBetweenLegendMark * legendCoefficientUp
        )
      }
      ctx.strokeStyle = arrLegends[i].color
      ctx.lineWidth = arrLegends[i].width
      ctx.stroke()
      ctx.closePath()
    }
  }
  ctx.strokeStyle = '#000000'
  ctx.lineWidth = 2
}

export const createGraphicFrame = (
  graphicFirstSize: number | undefined,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  titleGraphic: string,
  method: any,
  turnOffUpperX: boolean,
  turnOffRightY: boolean,
  turnOffGrid: boolean,
  turnOffValues: boolean,
  turnOffLegend: boolean,
  rangeOffsetX: number,
  rangeOffsetY: number,
  scaleX: number,
  offsetTics: number,
  designTicsOffset: number,
  designLowTicSize: number,
  designHighTicSize: number,
  legendBlockSize: number,
  intervalHighTicDesignTech: number,
  legendSpace: number,
  legendCoefficientUp: number,
  legendCoefficientRight: number,
  additionalLegendOffset: number,
  linelLegendSize: number,
  otherAxisTics: number,
  titleCoefficient: number,
  leftSignatureCoefficient: number,
  minValuesDraw: number,
  legendShiftCoeff: number,
  shiftLegend: boolean,
  marginOffset: number,
  XOffset: number,
  YOffset: number,
  graphicMargin: number,
  leftSignatureCoefficientUpDown: number,
  rightSignatureCoefficient: number,
  scaleY: number,
  minX: number,
  minY: number,
  maxX: number,
  maxY: number,
  upperSlice: number,
  lowerSlice: number,
  setStartPoint: any,
  setEndPoint: any,
  logarithm: boolean
) => {
  ctx.setLineDash([0])
  if (!graphicFirstSize) {
    graphicFirstSize = 500
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.resetTransform()
  ctx.fillStyle = '#FFFFFF'
  createAction(
    XOffset,
    YOffset,
    marginOffset,
    graphicFirstSize,
    ctx,
    'fillRect',
    graphicMargin,
    graphicFirstSize + graphicMargin,
    '',
    canvas.width,
    canvas.height
  )
  let graphicSize: number = 0
  if (graphicFirstSize >= 800) {
    graphicSize = graphicFirstSize - graphicFirstSize / 4 //? По умолчанию: 500
  } else if (graphicFirstSize >= 600) {
    graphicSize = graphicFirstSize - 200 //? По умолчанию: 500
  } else {
    graphicSize = graphicFirstSize - 150
  }
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, 800, 800)
  // const offsetTics: number = 5 //? По умолчанию: 4
  // const designTicsOffset: number = -20 //? По умолчанию: -20
  // const designLowTicSize: number = 5 //? По умолчанию: 5
  // const designHighTicSize: number = 10 //? По умолчанию: 10
  // const legendBlockSize: number = 150 //? По умолчанию: 200
  // const intervalHighTicDesignTech: number = 10 //? По умолчанию: 10

  // const legendSpace: number = 4 //? По умолчанию: 6
  const spaceBetweenLegendMark: number = 27 //!неизменный параметр
  // const legendCoefficientUp: number = 1.05 //? По умолчанию: 1.05
  // const legendCoefficientRight: number = 1.5 //? По умолчанию: 1.5
  // const additionalLegendOffset: number = 10 //? По умолчанию: 10
  // const linelLegendSize: number = 20 //? По умолчанию: 20

  // const otherAxisTics: number = 8 //? По умолчанию: 8

  // const titleCoefficient: number = 45 //? По умолчанию: 45

  // const leftSignatureCoefficient: number = 6.8 //? По умолчанию: 6.8

  // const minValuesDraw: number = 3 //? По умолчанию: 3

  const arrLegends: any = []

  let ticsNumber: number = graphicSize / (offsetTics + 1)
  let otherTicsNumber: number = graphicSize / (otherAxisTics + 1)

  ctx.strokeStyle = '#C8C8C8'
  ctx.lineWidth = 1.5

  if (!turnOffGrid) {
    // Построение сетки по условию
    ctx.setLineDash([5, 10])
    for (let i = 1; i < ticsNumber; i++) {
      if (i % intervalHighTicDesignTech === 0) {
        ctx.beginPath()
        createAction(
          XOffset,
          YOffset,
          marginOffset,
          graphicFirstSize,
          ctx,
          'moveTo',
          i + i * offsetTics,
          0
        )
        createAction(
          XOffset,
          YOffset,
          marginOffset,
          graphicFirstSize,
          ctx,
          'lineTo',
          i + i * offsetTics,
          graphicSize
        )
        ctx.stroke()
        ctx.closePath()
        ctx.beginPath()
        createAction(
          XOffset,
          YOffset,
          marginOffset,
          graphicFirstSize,
          ctx,
          'moveTo',
          0,
          i + i * offsetTics
        )
        createAction(
          XOffset,
          YOffset,
          marginOffset,
          graphicFirstSize,
          ctx,
          'lineTo',
          graphicSize,
          i + i * offsetTics
        )
        ctx.stroke()
        ctx.closePath()
      }
    }
    ctx.setLineDash([])
  }

  function callFunctionsAsync(
    graphicFirstSize: number,
    ctx: CanvasRenderingContext2D,
    graphicSize: number,
    offsetTics: number,
    ticsNumber: number,
    callback: any
  ) {
    if (!method) {
      return
    }
    for (let func in method) {
      arrLegends.push(
        method[func](
          minX,
          minY,
          maxX,
          maxY,
          XOffset,
          YOffset,
          marginOffset,
          graphicFirstSize,
          ctx,
          graphicSize,
          offsetTics,
          ticsNumber,
          rangeOffsetX,
          rangeOffsetY,
          scaleX,
          scaleY,
          setStartPoint,
          setEndPoint,
          logarithm
        )
      )
    }
    callback(
      XOffset,
      YOffset,
      marginOffset,
      ctx,
      designHighTicSize,
      legendSpace,
      arrLegends,
      graphicFirstSize,
      graphicSize,
      legendBlockSize,
      spaceBetweenLegendMark,
      legendCoefficientUp,
      legendCoefficientRight,
      additionalLegendOffset,
      linelLegendSize,
      turnOffLegend,
      legendShiftCoeff,
      shiftLegend
    )
  }

  callFunctionsAsync(
    graphicFirstSize,
    ctx,
    graphicSize,
    offsetTics,
    ticsNumber,
    plotLegend
  )

  ctx.setLineDash([0])
  ctx.fillStyle = '#000000'
  ctx.strokeStyle = '#000000'
  ctx.lineWidth = 2
  ctx.beginPath()
  createAction(
    XOffset,
    YOffset,
    marginOffset,
    graphicFirstSize,
    ctx,
    'moveTo',
    0,
    0
  )
  createAction(
    XOffset,
    YOffset,
    marginOffset,
    graphicFirstSize,
    ctx,
    'lineTo',
    0,
    graphicSize
  )
  createAction(
    XOffset,
    YOffset,
    marginOffset,
    graphicFirstSize,
    ctx,
    'lineTo',
    graphicSize,
    graphicSize
  )
  createAction(
    XOffset,
    YOffset,
    marginOffset,
    graphicFirstSize,
    ctx,
    'lineTo',
    graphicSize,
    0
  )
  createAction(
    XOffset,
    YOffset,
    marginOffset,
    graphicFirstSize,
    ctx,
    'lineTo',
    0,
    0
  )
  ctx.stroke()
  ctx.closePath()

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, 800, upperSlice)
  ctx.fillRect(0, lowerSlice, 800, 300)
  ctx.fillStyle = '#000000'

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = '22px Verdana'
  createAction(
    XOffset,
    YOffset,
    marginOffset,
    graphicFirstSize,
    ctx,
    'fillText',
    graphicSize / 2,
    graphicSize + titleCoefficient,
    titleGraphic
  ) // Заголовок графика

  ctx.strokeStyle = '#000000'
  ctx.lineWidth = 2

  let mainTicsValueInterval: number = 0
  let otherMainTicsValueInterval: number = 0
  let mainFlagIsNeedCut: boolean = false
  let otherFlagIsNeedCut: boolean = false
  for (let i = 1; i < ticsNumber; i++) {
    if (i % intervalHighTicDesignTech === 0) {
      mainTicsValueInterval += 1
    }
  }
  for (let i = 1; i < otherTicsNumber; i++) {
    if (i % intervalHighTicDesignTech === 0) {
      otherMainTicsValueInterval += 1
    }
  }
  if (mainTicsValueInterval > minValuesDraw) {
    mainFlagIsNeedCut = true
  }
  if (otherMainTicsValueInterval > minValuesDraw) {
    otherFlagIsNeedCut = true
  }

  let countFlag: number = 0
  let otherCountFlag: number = 0

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = '18px Verdana'
  if (logarithm) {
    if (minX <= 0) {
      minX = Math.log10(0.01)
    } else {
      minX = Math.log10(minX)
    }
    maxX = Math.log10(maxX)
  }

  const xStep = (maxX - minX) / ticsNumber
  const yStep = (maxY - minY) / ticsNumber

  const xArrayVal = []
  const yArrayVal = []

  for (let i = minX; i <= maxX + xStep; i += xStep) {
    xArrayVal.push(i)
  }

  for (let i = minY; i <= maxY + yStep; i += yStep) {
    yArrayVal.push(i)
  }

  for (let i = 0; i <= ticsNumber; i++) {
    if (i % intervalHighTicDesignTech === 0) {
      ctx.beginPath()
      createAction(
        XOffset,
        YOffset,
        marginOffset,
        graphicFirstSize,
        ctx,
        'moveTo',
        i + i * offsetTics,
        0
      )
      createAction(
        XOffset,
        YOffset,
        marginOffset,
        graphicFirstSize,
        ctx,
        'lineTo',
        i + i * offsetTics,
        designHighTicSize
      )
      ctx.stroke()
      ctx.beginPath()
      createAction(
        XOffset,
        YOffset,
        marginOffset,
        graphicFirstSize,
        ctx,
        'moveTo',
        0,
        i + i * offsetTics
      )
      createAction(
        XOffset,
        YOffset,
        marginOffset,
        graphicFirstSize,
        ctx,
        'lineTo',
        designHighTicSize,
        i + i * offsetTics
      )
      ctx.stroke()
      if (turnOffValues) {
      } else {
        if (mainFlagIsNeedCut) {
          if (countFlag % 2 === 0) {
            createAction(
              XOffset,
              YOffset,
              marginOffset,
              graphicFirstSize,
              ctx,
              'fillText',
              i + i * offsetTics,
              designTicsOffset,
              roundUpDecimal(xArrayVal[i]) + ''
            )
            createAction(
              XOffset,
              YOffset,
              marginOffset,
              graphicFirstSize,
              ctx,
              'fillText',
              designTicsOffset,
              i + i * offsetTics,
              roundUpDecimal(yArrayVal[i]) + ''
            )
          }
          countFlag += 1
        } else {
          createAction(
            XOffset,
            YOffset,
            marginOffset,
            graphicFirstSize,
            ctx,
            'fillText',
            i + i * offsetTics,
            designTicsOffset,
            roundUpDecimal(xArrayVal[i]) + ''
          )
          createAction(
            XOffset,
            YOffset,
            marginOffset,
            graphicFirstSize,
            ctx,
            'fillText',
            designTicsOffset,
            i + i * offsetTics,
            roundUpDecimal(yArrayVal[i]) + ''
          )
        }
      }
    } else {
      ctx.beginPath()
      createAction(
        XOffset,
        YOffset,
        marginOffset,
        graphicFirstSize,
        ctx,
        'moveTo',
        i + i * offsetTics,
        0
      )
      createAction(
        XOffset,
        YOffset,
        marginOffset,
        graphicFirstSize,
        ctx,
        'lineTo',
        i + i * offsetTics,
        designLowTicSize
      )
      ctx.stroke()
      ctx.beginPath()
      createAction(
        XOffset,
        YOffset,
        marginOffset,
        graphicFirstSize,
        ctx,
        'moveTo',
        0,
        i + i * offsetTics
      )
      createAction(
        XOffset,
        YOffset,
        marginOffset,
        graphicFirstSize,
        ctx,
        'lineTo',
        designLowTicSize,
        i + i * offsetTics
      )
      ctx.stroke()
    }
  }

  for (let i = 0; i <= otherTicsNumber; i++) {
    if (i % intervalHighTicDesignTech === 0) {
      if (!turnOffUpperX) {
        ctx.beginPath()
        createAction(
          XOffset,
          YOffset,
          marginOffset,
          graphicFirstSize,
          ctx,
          'moveTo',
          i + i * otherAxisTics,
          graphicSize
        )
        createAction(
          XOffset,
          YOffset,
          marginOffset,
          graphicFirstSize,
          ctx,
          'lineTo',
          i + i * otherAxisTics,
          graphicSize - designHighTicSize
        )
        ctx.stroke()
      }
      if (!turnOffRightY) {
        ctx.beginPath()
        createAction(
          XOffset,
          YOffset,
          marginOffset,
          graphicFirstSize,
          ctx,
          'moveTo',
          graphicSize,
          i + i * otherAxisTics
        )
        createAction(
          XOffset,
          YOffset,
          marginOffset,
          graphicFirstSize,
          ctx,
          'lineTo',
          graphicSize - designHighTicSize,
          i + i * otherAxisTics
        )
        ctx.stroke()
      }
      if (turnOffValues) {
      } else {
        if (otherFlagIsNeedCut) {
          if (otherCountFlag % 2 === 0) {
            if (!turnOffUpperX) {
              createAction(
                XOffset,
                YOffset,
                marginOffset,
                graphicFirstSize,
                ctx,
                'fillText',
                i + i * otherAxisTics,
                graphicSize - designTicsOffset,
                i + ''
              )
            }
            if (!turnOffRightY) {
              createAction(
                XOffset,
                YOffset,
                marginOffset,
                graphicFirstSize,
                ctx,
                'fillText',
                graphicSize - designTicsOffset,
                i + i * otherAxisTics,
                i + ''
              )
            }
          }
          otherCountFlag += 1
        } else {
          if (!turnOffUpperX) {
            createAction(
              XOffset,
              YOffset,
              marginOffset,
              graphicFirstSize,
              ctx,
              'fillText',
              i + i * otherAxisTics,
              graphicSize - designTicsOffset,
              i + ''
            )
          }
          if (!turnOffRightY) {
            createAction(
              XOffset,
              YOffset,
              marginOffset,
              graphicFirstSize,
              ctx,
              'fillText',
              graphicSize - designTicsOffset,
              i + i * otherAxisTics,
              i + ''
            )
          }
        }
      }
    } else {
      if (!turnOffUpperX) {
        ctx.beginPath()
        createAction(
          XOffset,
          YOffset,
          marginOffset,
          graphicFirstSize,
          ctx,
          'moveTo',
          i + i * otherAxisTics,
          graphicSize
        )
        createAction(
          XOffset,
          YOffset,
          marginOffset,
          graphicFirstSize,
          ctx,
          'lineTo',
          i + i * otherAxisTics,
          graphicSize - designLowTicSize
        )
        ctx.stroke()
      }
      if (!turnOffRightY) {
        ctx.beginPath()
        createAction(
          XOffset,
          YOffset,
          marginOffset,
          graphicFirstSize,
          ctx,
          'moveTo',
          graphicSize,
          i + i * otherAxisTics
        )
        createAction(
          XOffset,
          YOffset,
          marginOffset,
          graphicFirstSize,
          ctx,
          'lineTo',
          graphicSize - designLowTicSize,
          i + i * otherAxisTics
        )
        ctx.stroke()
      }
    }
  }

  ctx.fillStyle = '#000000'
  ctx.textAlign = 'start'
  ctx.textBaseline = 'alphabetic'
  ctx.font = '18px Verdana'

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = '18px Verdana'
  createAction(
    XOffset,
    YOffset,
    marginOffset,
    graphicFirstSize,
    ctx,
    'fillText',
    graphicSize / 2,
    0 - 40,
    'x'
  )
  ctx.save()

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = '18px Verdana'
  ctx.rotate(-Math.PI / 2)
  ctx.fillText(
    'y',
    graphicSize - graphicSize * leftSignatureCoefficientUpDown,
    graphicSize / leftSignatureCoefficient
  )
  ctx.restore()

  ctx.closePath()
}
