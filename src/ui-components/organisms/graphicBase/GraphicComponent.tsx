import { FC, useEffect, useRef, useState } from 'react'
import { createGraphicFrame } from '../../../logic'
import { GraphicComponentType } from './GraphicComponent.type'
import { ContainerStyleType } from './GraphicComponent.type'
import {
  SimpleButton,
  SetValueButton,
  SetInterfaceButton,
  SwitchValueButtonX,
  AddMethod,
  SetRangeXY,
} from '../../index'

function roundUpDecimal(number: number) {
  if (!Number.isInteger(number)) {
    // console.log(number);
    return Math.round(number * 100) / 100
  }

  return number
}

export const GraphicComponent: FC<GraphicComponentType> = ({ title }) => {
  const [graphicSize, setGraphicSize] = useState<number>(800)
  const [offsetTics, setOffsetTics] = useState<number>(5) //? По умолчанию: 4
  const [designTicsOffset, setDesignTicsOffset] = useState<number>(-20) //? По умолчанию: -20
  const [designLowTicSize, setDesignLowTicSize] = useState<number>(5) //? По умолчанию: 5
  const [designHighTicSize, setDesignHighTicSize] = useState<number>(10) //? По умолчанию: 10
  const [legendBlockSize, setLegendBlockSize] = useState<number>(150) //? По умолчанию: 200
  const [intervalHighTicDesignTech, setIntervalHighTicDesignTech] =
    useState<number>(10) //? По умолчанию: 10

  const [legendSpace, setLegendSpace] = useState<number>(4) //? По умолчанию: 6
  const [legendCoefficientUp, setLegendCoefficientUp] = useState<number>(1) //? По умолчанию: 1.05
  const [legendCoefficientRight, setLegendCoefficientRight] =
    useState<number>(2.5) //? По умолчанию: 1.5
  const [additionalLegendOffset, setAdditionalLegendOffset] =
    useState<number>(10) //? По умолчанию: 10
  const [linelLegendSize, setLinelLegendSize] = useState<number>(20) //? По умолчанию: 20

  const [otherAxisTics, setOtherAxisTics] = useState<number>(8) //? По умолчанию: 8

  const [titleCoefficient, setTitleCoefficient] = useState<number>(67) //? По умолчанию: 45

  const [leftSignatureCoefficient, setLeftSignatureCoefficient] =
    useState<number>(11) //? По умолчанию: 6.8

  const [minValuesDraw, setMinValuesDraw] = useState<number>(3) //? По умолчанию: 3

  const [legendShiftCoeff, setLegendShiftCoeff] = useState<number>(-500)

  const [marginOffset, setMarginOffset] = useState<number>(9) //? По умолчанию: 7
  const [XOffset, setXOffset] = useState<number>(13) //? По умолчанию: 35
  const [YOffset, setYOffset] = useState<number>(-16)

  const [graphicMargin, setGraphicMargin] = useState<number>(-100) //? По умолчанию: -50

  const [leftSignatureCoefficientUpDown, setLeftSignatureCoefficientUpDown] =
    useState<number>(1.65) //? По умолчанию: 1.65

  const [rightSignatureCoefficient, setRightSignatureCoefficient] =
    useState<number>(150) //? По умолчанию: 150

  const [method, setMethod] = useState<any>([])

  const [upperSlice, setUpperSilce] = useState<number>(94)
  const [lowerSlice, setLowerSlice] = useState<number>(696)

  let ticsNumber: number = (graphicSize - graphicSize / 4) / (offsetTics + 1)

  let arrayPagesUI: any = [
    [
      'Show detail',
      'Turn off grid',
      'Turn off upper X',
      'Turn off right Y',
      'Turn off values',
      'Turn off legend',
      'Turn off border',
      'Shift legend',
      'Logarithm',
      'Send to overleaf',
    ],
    [
      {
        containText: 'Offset tics',
        value: offsetTics,
        setNewValue: setOffsetTics,
        step: 1,
        oldValue: 5,
      },
      {
        containText: 'Design tics offset',
        value: designTicsOffset,
        setNewValue: setDesignTicsOffset,
        step: -10,
        oldValue: -20,
      },
      {
        containText: 'Design low tic',
        value: designLowTicSize,
        setNewValue: setDesignLowTicSize,
        step: 1,
        oldValue: 5,
      },
      {
        containText: 'Design high tic',
        value: designHighTicSize,
        setNewValue: setDesignHighTicSize,
        step: 1,
        oldValue: 10,
      },
      {
        containText: 'Legend block size',
        value: legendBlockSize,
        setNewValue: setLegendBlockSize,
        step: 10,
        oldValue: 150,
      },
      {
        containText: 'Interval high tic',
        value: intervalHighTicDesignTech,
        setNewValue: setIntervalHighTicDesignTech,
        step: 1,
        oldValue: 10,
      },
      {
        containText: 'Legend space',
        value: legendSpace,
        setNewValue: setLegendSpace,
        step: 1,
        oldValue: 4,
      },
      {
        containText: 'Legend coeff up',
        value: legendCoefficientUp,
        setNewValue: setLegendCoefficientUp,
        step: 0.01,
        oldValue: 1,
      },
      {
        containText: 'Legend coeff right',
        value: legendCoefficientRight,
        setNewValue: setLegendCoefficientRight,
        step: 0.1,
        oldValue: 2.5,
      },
    ],
    [
      {
        containText: 'Addnal offset',
        value: additionalLegendOffset,
        setNewValue: setAdditionalLegendOffset,
        step: 1,
        oldValue: 10,
      },
      {
        containText: 'Linel legend size',
        value: linelLegendSize,
        setNewValue: setLinelLegendSize,
        step: 1,
        oldValue: 20,
      },
      {
        containText: 'Other axis tics',
        value: otherAxisTics,
        setNewValue: setOtherAxisTics,
        step: 1,
        oldValue: 8,
      },
      {
        containText: 'Title coefficient',
        value: titleCoefficient,
        setNewValue: setTitleCoefficient,
        step: 1,
        oldValue: 67,
      },
      {
        containText: 'Left signature coeff',
        value: leftSignatureCoefficient,
        setNewValue: setLeftSignatureCoefficient,
        step: 0.1,
        oldValue: 11,
      },
      {
        containText: 'Min values draw',
        value: minValuesDraw,
        setNewValue: setMinValuesDraw,
        step: 1,
        oldValue: 3,
      },
      {
        containText: 'Legend shift coeff',
        value: legendShiftCoeff,
        setNewValue: setLegendShiftCoeff,
        step: 10,
        oldValue: -500,
      },
      {
        containText: 'Margin offset',
        value: marginOffset,
        setNewValue: setMarginOffset,
        step: 1,
        oldValue: 9,
      },
      {
        containText: 'X offset',
        value: XOffset,
        setNewValue: setXOffset,
        step: 1,
        oldValue: 13,
      },
      {
        containText: 'Y offset',
        value: YOffset,
        setNewValue: setYOffset,
        step: 1,
        oldValue: -16,
      },
    ],
    [
      {
        containText: 'Graphic margin',
        value: graphicMargin,
        setNewValue: setGraphicMargin,
        step: 10,
        oldValue: -100,
      },
      // {
      //   containText: "Left signature",
      //   value: leftSignatureCoefficientUpDown,
      //   setNewValue: setLeftSignatureCoefficientUpDown,
      //   step: 0.01,
      //   oldValue: 1.65,
      // },
      {
        containText: 'Right signature',
        value: rightSignatureCoefficient,
        setNewValue: setRightSignatureCoefficient,
        step: 1,
        oldValue: 150,
      },
    ],
  ]
  const [actualPage, setActualPage] = useState<number>(0)
  const [turnOffUpperX, setTurnOffUpperX] = useState<boolean>(false)
  const [turnOffRightY, setTurnOffRightY] = useState<boolean>(false)
  const [turnOffGrid, setTurnOffGrid] = useState<boolean>(false)
  const [turnOffValues, setTurnOffValues] = useState<boolean>(false)
  const [turnOffLegend, setTurnOffLegend] = useState<boolean>(false)
  const [shiftLegend, setShiftLegend] = useState<boolean>(false)
  const [logarithm, setLoragithm] = useState<boolean>(false)

  const [rangeOffsetX, setRangeOffsetX] = useState<number>(0) //? Диапазон для X
  const [rangeOffsetY, setRangeOffsetY] = useState<number>(0) //? Диапазон для Y

  const [scaleX, setScaleX] = useState<number>(1) //? Диапазон для X
  const [scaleY, setScaleY] = useState<number>(1) //? Диапазон для Y

  const [minX, setMinX] = useState<number>(0)
  const [maxX, setMaxX] = useState<number>(100)
  const [minY, setMinY] = useState<number>(0)
  const [maxY, setMaxY] = useState<number>(100)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [startPoint, setStartPoint] = useState<number>(0)
  const [endPoint, setEndPoint] = useState<number>(0)
  // console.log(logarithm);
  const [oldValueMinX, setOldValueMinX] = useState<number>(0)
  const [oldValueMaxX, setOldValueMaxX] = useState<number>(100)

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      if (context) {
        createGraphicFrame(
          graphicSize,
          context,
          canvas,
          title,
          method,
          turnOffUpperX,
          turnOffRightY,
          turnOffGrid,
          turnOffValues,
          turnOffLegend,
          rangeOffsetX,
          rangeOffsetY,
          scaleX,
          offsetTics,
          designTicsOffset,
          designLowTicSize,
          designHighTicSize,
          legendBlockSize,
          intervalHighTicDesignTech,
          legendSpace,
          legendCoefficientUp,
          legendCoefficientRight,
          additionalLegendOffset,
          linelLegendSize,
          otherAxisTics,
          titleCoefficient,
          leftSignatureCoefficient,
          minValuesDraw,
          legendShiftCoeff,
          shiftLegend,
          marginOffset,
          XOffset,
          YOffset,
          graphicMargin,
          leftSignatureCoefficientUpDown,
          rightSignatureCoefficient,
          scaleY,
          minX,
          minY,
          maxX,
          maxY,
          upperSlice,
          lowerSlice,
          setStartPoint,
          setEndPoint,
          logarithm
        )
      }
    }
  }, [
    method,
    turnOffUpperX,
    turnOffRightY,
    turnOffGrid,
    turnOffValues,
    turnOffLegend,
    rangeOffsetX,
    rangeOffsetY,
    scaleX,
    graphicSize,
    offsetTics,
    designTicsOffset,
    designLowTicSize,
    designHighTicSize,
    legendBlockSize,
    intervalHighTicDesignTech,
    legendSpace,
    legendCoefficientUp,
    legendCoefficientRight,
    additionalLegendOffset,
    linelLegendSize,
    otherAxisTics,
    titleCoefficient,
    leftSignatureCoefficient,
    minValuesDraw,
    legendShiftCoeff,
    shiftLegend,
    marginOffset,
    XOffset,
    YOffset,
    graphicMargin,
    leftSignatureCoefficientUpDown,
    rightSignatureCoefficient,
    scaleY,
    minX,
    minY,
    maxX,
    maxY,
    upperSlice,
    lowerSlice,
    logarithm,
  ])

  const handleDownloadPNG = () => {
    async function doSetYOffset() {
      setYOffset(7)
      setUpperSilce(117)
      setLowerSlice(719)
    }
    async function downloadCanvas() {
      setTimeout(() => {
        const canvas = canvasRef.current
        if (canvas) {
          let dataURL = canvas.toDataURL('image/png')
          const link = document.createElement('a')
          link.download = `${title}.png`
          link.href = dataURL
          document.body.appendChild(link)
          link.click()
        }
      }, 100)
    }
    async function callFunctions() {
      await doSetYOffset()
      await downloadCanvas()
      setTimeout(() => {
        setYOffset(-16)
        setUpperSilce(94)
        setLowerSlice(696)
      }, 200)
    }

    callFunctions()
  }

  const containerStyle: ContainerStyleType = {
    width: graphicSize,
    height: graphicSize,
  }

  let styleNotClickable = {
    background: '#F5F5F5',
    color: '#A0A0A0',
  }

  return (
    <div className='graphic-container'>
      <AddMethod method={method} setMethod={setMethod}></AddMethod>
      <div className='myCanvas' style={containerStyle}>
        <canvas
          width={graphicSize}
          height={graphicSize}
          ref={canvasRef}
        ></canvas>
      </div>
      <div className='graphic-container__inner'>
        {actualPage === 0 && (
          <div className='buttonContainer'>
            <div className='buttonContainer__inner'>
              {arrayPagesUI[actualPage].map((elem: any, index: number) => {
                return (
                  <SimpleButton
                    key={index}
                    containText={elem}
                    onHandleClick={(elem: any) => !elem}
                    setTurnOffUpperX={setTurnOffUpperX}
                    setTurnOffRightY={setTurnOffRightY}
                    setTurnOffGrid={setTurnOffGrid}
                    setTurnOffValues={setTurnOffValues}
                    setTurnOffLegend={setTurnOffLegend}
                    setActualPage={setActualPage}
                    setShiftLegend={setShiftLegend}
                    setLoragithm={setLoragithm}
                    oldValueMinX={oldValueMinX}
                    oldValueMaxX={oldValueMaxX}
                    setOldValueMinX={setOldValueMinX}
                    setOldValueMaxX={setOldValueMaxX}
                    minX={minX}
                    maxX={maxX}
                    setMinX={setMinX}
                    setMaxX={setMaxX}
                    logarithm={logarithm}
                  ></SimpleButton>
                )
              })}
            </div>
            <div className='container-footer'>
              <SwitchValueButtonX
                minX={minX}
                maxX={maxX}
                value={rangeOffsetX}
                setNewValue={setRangeOffsetX}
                containText={'Offset X'}
                graphicSize={graphicSize}
                offsetTics={offsetTics}
                scaleX={scaleX}
                ticsNumber={ticsNumber}
                rangeOffsetX={rangeOffsetX}
                interval={intervalHighTicDesignTech}
                setMinX={setMinX}
                setMaxX={setMaxX}
              ></SwitchValueButtonX>
              <SwitchValueButtonX
                minX={minY}
                maxX={maxY}
                value={rangeOffsetY}
                setNewValue={setRangeOffsetY}
                containText={'Offset Y'}
                graphicSize={graphicSize}
                offsetTics={offsetTics}
                scaleX={scaleY}
                ticsNumber={ticsNumber}
                rangeOffsetX={rangeOffsetY}
                interval={intervalHighTicDesignTech}
                setMinX={setMinY}
                setMaxX={setMaxY}
              ></SwitchValueButtonX>
              <SetValueButton
                value={scaleX}
                setNewValue={setScaleX}
                containText={'Scale X'}
                step={2}
                oldValue={1}
              ></SetValueButton>
              <SetValueButton
                value={scaleY}
                setNewValue={setScaleY}
                containText={'Scale Y'}
                step={2}
                oldValue={1}
              ></SetValueButton>
              <SetRangeXY
                minX={minX}
                maxX={maxX}
                setMinX={setMinX}
                setMaxX={setMaxX}
                minY={minY}
                maxY={maxY}
                setMinY={setMinY}
                setMaxY={setMaxY}
                setScaleX={setScaleX}
                setScaleY={setScaleY}
                ticsNumber={ticsNumber}
              ></SetRangeXY>
            </div>
            <div className='download-container'>
              <div
                onClick={handleDownloadPNG}
                className='smallButton transition'
              >
                Download PNG
              </div>
              <div
                onClick={handleDownloadPNG}
                className='smallButton transition'
              >
                Download EPS
              </div>
            </div>
          </div>
        )}
        {actualPage === 1 && (
          <div className='buttonContainer'>
            <div className='buttonContainer__other'>
              {arrayPagesUI[actualPage].map((elem: any, index: number) => {
                return (
                  <SetInterfaceButton
                    key={index}
                    value={elem.value}
                    setNewValue={elem.setNewValue}
                    containText={elem.containText}
                    step={elem.step}
                    oldValue={elem.oldValue}
                  ></SetInterfaceButton>
                )
              })}
            </div>
            <div className='flexibility-row' style={{ marginTop: '40px' }}>
              <div
                onClick={() => setActualPage(0)}
                className='smallButton transition'
              >
                Back
              </div>
              <div
                onClick={() => setActualPage(2)}
                className='smallButton transition'
              >
                Forward
              </div>
            </div>
            <div className='download-container'>
              <div
                onClick={handleDownloadPNG}
                className='smallButton transition'
              >
                Download PNG
              </div>
              <div
                onClick={handleDownloadPNG}
                className='smallButton transition'
              >
                Download EPS
              </div>
            </div>
          </div>
        )}
        {actualPage === 2 && (
          <div className='buttonContainer'>
            <div className='buttonContainer__other'>
              {arrayPagesUI[actualPage].map((elem: any, index: number) => {
                return (
                  <SetInterfaceButton
                    key={index}
                    value={elem.value}
                    setNewValue={elem.setNewValue}
                    containText={elem.containText}
                    step={elem.step}
                    oldValue={elem.oldValue}
                  ></SetInterfaceButton>
                )
              })}
            </div>
            <div className='flexibility-row' style={{ marginTop: '40px' }}>
              <div
                onClick={() => setActualPage(1)}
                className='smallButton transition'
              >
                Back
              </div>
              <div
                onClick={() => setActualPage(3)}
                className='smallButton transition'
              >
                Forward
              </div>
            </div>
            <div className='download-container'>
              <div
                onClick={handleDownloadPNG}
                className='smallButton transition'
              >
                Download PNG
              </div>
              <div
                onClick={handleDownloadPNG}
                className='smallButton transition'
              >
                Download EPS
              </div>
            </div>
          </div>
        )}
        {actualPage === 3 && (
          <div className='buttonContainer'>
            <div className='buttonContainer__other'>
              {arrayPagesUI[actualPage].map((elem: any, index: number) => {
                return (
                  <SetInterfaceButton
                    key={index}
                    value={elem.value}
                    setNewValue={elem.setNewValue}
                    containText={elem.containText}
                    step={elem.step}
                    oldValue={elem.oldValue}
                  ></SetInterfaceButton>
                )
              })}
            </div>
            <div className='flexibility-row' style={{ marginTop: '40px' }}>
              <div
                onClick={() => setActualPage(2)}
                className='smallButton transition'
              >
                Back
              </div>
              <div className='smallButton transition' style={styleNotClickable}>
                Forward
              </div>
            </div>
            <div className='download-container'>
              <div
                onClick={handleDownloadPNG}
                className='smallButton transition'
              >
                Download PNG
              </div>
              <div
                onClick={handleDownloadPNG}
                className='smallButton transition'
              >
                Download EPS
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='show-y0-y100'>
        <div className='flex-point'>
          {'last y[0] = ' + roundUpDecimal(startPoint)}
        </div>
        <div className='flex-point'>
          {'last y[100] = ' + roundUpDecimal(endPoint)}
        </div>
      </div>
    </div>
  )
}
