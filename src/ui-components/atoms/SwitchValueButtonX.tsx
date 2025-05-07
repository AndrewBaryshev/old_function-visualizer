import { FC } from 'react'

export const SwitchValueButtonX: FC<any> = ({
  minX,
  maxX,
  containText,
  value,
  setNewValue,
  graphicSize,
  offsetTics,
  scaleX,
  ticsNumber,
  rangeOffsetX,
  interval,
  setMinX,
  setMaxX,
}) => {
  let realSize: number = graphicSize - graphicSize / 4
  return (
    <div className='flexibility'>
      <p>{containText}</p>
      <div className='switchValueButton'>
        <div
          onClick={() => {
            setNewValue(value - (maxX - minX) / interval)
            setMinX(minX - (maxX - minX) / interval)
            setMaxX(maxX - (maxX - minX) / interval)
          }}
          className='switch-button-small-minus transition'
        >
          -
        </div>
        <div
          onClick={() => {
            setMinX(minX - value)
            setMaxX(maxX - value)
            setNewValue(0)
          }}
          className='value-switch-container-some transition'
        >
          {parseFloat(value.toFixed(0))}
        </div>
        <div
          onClick={() => {
            setNewValue(value + (maxX - minX) / interval)
            setMinX(minX + (maxX - minX) / interval)
            setMaxX(maxX + (maxX - minX) / interval)
          }}
          className='switch-button-small-plus transition'
        >
          +
        </div>
      </div>
    </div>
  )
}
