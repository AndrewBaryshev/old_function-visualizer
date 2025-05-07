import { FC } from 'react'

export const ApproveButton: FC<any> = ({
  minVal,
  maxVal,
  setMinVal,
  setMaxVal,
  copyMinVal,
  copyMaxVal,
}) => {
  return (
    <div
      onClick={() => {
        setMinVal(Number(copyMinVal))
        setMaxVal(Number(copyMaxVal))
      }}
      className='button-approve transition'
    >
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M3.52002 7.35976L6.72002 10.5598L12.48 4.86377'
          stroke='#121923'
          strokeWidth='2.4'
        />
      </svg>
    </div>
  )
}
