import { FC, useState } from 'react'

export const SimpleButton: FC<any> = ({
  containText,
  onHandleClick,
  setTurnOffUpperX,
  setTurnOffRightY,
  setTurnOffGrid,
  setTurnOffValues,
  setTurnOffLegend,
  setActualPage,
  setShiftLegend,
  setLoragithm,
  oldValueMinX,
  oldValueMaxX,
  setOldValueMinX,
  setOldValueMaxX,
  minX,
  maxX,
  setMinX,
  setMaxX,
  logarithm,
}) => {
  let [catchClick, setCatchClick] = useState<boolean>(false)
  let style = {}
  if (catchClick) {
    style = {
      background: '#F5F5F5',
      color: '#A0A0A0',
    }
    if (containText === 'Turn off upper X') {
      setTurnOffUpperX(catchClick)
    } else if (containText === 'Turn off right Y') {
      setTurnOffRightY(catchClick)
    } else if (containText === 'Turn off grid') {
      setTurnOffGrid(catchClick)
    } else if (containText === 'Turn off values') {
      setTurnOffValues(catchClick)
    } else if (containText === 'Turn off legend') {
      setTurnOffLegend(catchClick)
    } else if (containText === 'Show detail') {
      setActualPage(1)
      // console.log("good");
    } else if (containText === 'Shift legend') {
      setShiftLegend(catchClick)
    } else if (containText === 'Logarithm') {
      setLoragithm(catchClick)
    }
  } else {
    style = {}
    if (containText === 'Turn off upper X') {
      setTurnOffUpperX(catchClick)
    } else if (containText === 'Turn off right Y') {
      setTurnOffRightY(catchClick)
    } else if (containText === 'Turn off grid') {
      setTurnOffGrid(catchClick)
    } else if (containText === 'Turn off values') {
      setTurnOffValues(catchClick)
    } else if (containText === 'Turn off legend') {
      setTurnOffLegend(catchClick)
    } else if (containText === 'Show detail') {
      setActualPage(0)
      // console.log("bay");
    } else if (containText === 'Shift legend') {
      setShiftLegend(catchClick)
    } else if (containText === 'Logarithm') {
      setLoragithm(catchClick)
    }
  }
  if (
    containText === 'Show detail' ||
    containText === 'Shift legend' ||
    containText === 'Send to overleaf'
  ) {
    return (
      <div
        onClick={() => {
          setCatchClick(onHandleClick)
        }}
        className='smallButton transition'
      >
        {containText}
      </div>
    )
  }
  return (
    <div
      onClick={() => {
        setCatchClick(onHandleClick)
      }}
      className='smallButton transition'
      style={style}
    >
      {containText}
    </div>
  )
}
