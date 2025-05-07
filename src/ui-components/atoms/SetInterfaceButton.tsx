import { FC } from 'react'

function countDecimalPlaces(num: number) {
  const match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/)
  if (!match) {
    return 0
  }
  return Math.max(
    0,
    (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0)
  )
}

export const SetInterfaceButton: FC<any> = ({
  containText,
  value,
  setNewValue,
  step,
  oldValue,
}) => {
  let toFixedValue = countDecimalPlaces(step)
  return (
    <div className='flexibility'>
      <p style={{ marginTop: '20px' }}>{containText}</p>
      <div className='scaleButton'>
        <div
          onClick={() => {
            setNewValue(+(value - step).toFixed(toFixedValue))
          }}
          className='switch-button-small-minus transition'
        >
          -
        </div>
        <div
          onClick={() => {
            setNewValue(oldValue)
          }}
          className='value-switch-container-interface transition'
        >
          {value}
        </div>
        <div
          onClick={() => setNewValue(+(value + step).toFixed(toFixedValue))}
          className='switch-button-small-plus transition'
        >
          +
        </div>
      </div>
    </div>
  )
}
