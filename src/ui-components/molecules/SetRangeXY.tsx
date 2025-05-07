import { FC, useEffect, useState } from 'react'
import { ApproveButton } from '../atoms/ApproveButton'

export const SetRangeXY: FC<any> = ({
  minX,
  maxX,
  setMinX,
  setMaxX,
  minY,
  maxY,
  setMinY,
  setMaxY,
  setXDefaultRange,
  yDefaultRange,
  setYDefaultRange,
  setScaleX,
  setScaleY,
  ticsNumber,
}) => {
  const [minXCopy, setMinXCopy] = useState(minX)
  const [maxXCopy, setMaxXCopy] = useState(maxX)

  const [minYCopy, setMinYCopy] = useState(minY)
  const [maxYCopy, setMaxYCopy] = useState(maxY)

  useEffect(() => {
    setMinXCopy(minX)
    setMaxXCopy(maxX)
  }, [minX, maxX])

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    switch (name) {
      case 'xrange':
        setMinXCopy(value)
        break
      case 'xrangemax':
        setMaxXCopy(value)
        break
      case 'yrange':
        setMinYCopy(value)
        break
      case 'yrangemax':
        setMaxYCopy(value)
        break
      default:
        break
    }
  }

  return (
    <div className='set-range'>
      <div className='set-range__iner'>
        <div className='flex-set-range'>Set X range:</div>
        <div className='flex-set-range'>
          <input
            type='text'
            name='xrange'
            value={minXCopy}
            onChange={handleInputChange}
          ></input>
          <input
            type='text'
            name='xrangemax'
            value={maxXCopy}
            onChange={handleInputChange}
          ></input>
        </div>
        <div className='flex-set-range'>
          <ApproveButton
            minVal={minX}
            maxVal={maxX}
            setMinVal={setMinX}
            setMaxVal={setMaxX}
            copyMinVal={minXCopy}
            copyMaxVal={maxXCopy}
          ></ApproveButton>
        </div>
      </div>
      <div className='set-range__iner'>
        <div className='flex-set-range'>Set Y range:</div>
        <div className='flex-set-range'>
          <input
            type='text'
            name='yrange'
            value={minYCopy}
            onChange={handleInputChange}
          ></input>
          <input
            type='text'
            name='yrangemax'
            value={maxYCopy}
            onChange={handleInputChange}
          ></input>
        </div>
        <div className='flex-set-range'>
          <ApproveButton
            minVal={minY}
            maxVal={maxY}
            setMinVal={setMinY}
            setMaxVal={setMaxY}
            copyMinVal={minYCopy}
            copyMaxVal={maxYCopy}
          ></ApproveButton>
        </div>
      </div>
    </div>
  )
}
