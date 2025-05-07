import { FC, useState } from 'react'
import { templateFunctions } from '../../logic'
import { ChooseParameters } from '../molecules/ChooseParameters'

export const AddFunctionButton: FC<any> = ({
  containText,
  method,
  setMethod,
  arrFunctions,
  setArrFunctions,
}) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false)

  return (
    <div className='button-add-function'>
      <div
        onClick={() => setIsOpenAdd(!isOpenAdd)}
        className='switch-button-small-plus transition'
      >
        +
      </div>
      <div className='value-switch-container-interface transition'>
        {containText}
      </div>
      {isOpenAdd && (
        <ChooseParameters
          method={method}
          setMethod={setMethod}
          arrFunctions={arrFunctions}
          setArrFunctions={setArrFunctions}
          setIsOpenAdd={setIsOpenAdd}
          isOpenAdd={isOpenAdd}
        ></ChooseParameters>
      )}
    </div>
  )
}
