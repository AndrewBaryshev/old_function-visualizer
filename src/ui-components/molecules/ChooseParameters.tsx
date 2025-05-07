import { FC, useEffect, useState } from 'react'
import { templateFunctions } from '../../logic'
import { templateRange } from '../../logic'

interface FormValues {
  name: string
  formula: string
  color: string
  description: string
  dotted: boolean
  point: boolean
  dashDotted: boolean
}

interface Props {
  method: any
  setMethod: any
  arrFunctions: any
  setArrFunctions: any
  setIsOpenAdd: any
  isOpenAdd: any
}

export const ChooseParameters = ({
  method,
  setMethod,
  arrFunctions,
  setArrFunctions,
  setIsOpenAdd,
  isOpenAdd,
}: Props) => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    formula: '',
    color: '#000000',
    description: '',
    dotted: false,
    point: false,
    dashDotted: false,
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (formValues.description === '') {
      formValues.description = formValues.formula
    }
    let newFunc = templateRange.bind({
      legendStyle: {
        color: formValues.color,
        width: 2,
        formula: formValues.description,
        dotted: formValues.dotted,
        point: formValues.point,
        dashDotted: formValues.dashDotted,
      },
      formula: formValues.formula,
      dotted: formValues.dotted,
      point: formValues.point,
      dashDotted: formValues.dashDotted,
    })
    setIsOpenAdd(false)
    if (formValues.name === '' || formValues.formula === '') {
      return
    }
    setMethod([...method, newFunc])
    setArrFunctions([
      ...arrFunctions,
      {
        name: formValues.name,
        color: formValues.color,
        description: formValues.description,
        formula: formValues.formula,
        dotted: formValues.dotted,
        point: formValues.point,
        dashDotted: formValues.dashDotted,
      },
    ])
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = event.target
    let newValue
    if (type === 'checkbox') {
      newValue = event.target.checked
    } else {
      newValue = event.target.value
    }
    setFormValues({ ...formValues, [name]: newValue })
  }

  // useEffect(() => {
  //   console.log(formValues.dotted, formValues.point);
  // }, [formValues.dotted, formValues.point]);

  return (
    <form className='choose-params' onSubmit={handleSubmit}>
      <div className='formula-input'>
        <label>Enter function name</label>
        <input
          className='input-formula'
          type='text'
          name='name'
          value={formValues.name}
          onChange={handleChange}
        />
      </div>
      <div className='formula-input'>
        <label>Enter formula</label>
        <input
          className='input-formula'
          type='text'
          name='formula'
          value={formValues.formula}
          onChange={handleChange}
        />
      </div>
      <div className='formula-input'>
        <label>Choose line color</label>
        <input
          type='color'
          name='color'
          value={formValues.color}
          onChange={handleChange}
        />
      </div>
      <div className='formula-input'>
        <label>Enter legend description</label>
        <input
          className='input-formula'
          type='text'
          name='description'
          value={formValues.description}
          onChange={handleChange}
        />
      </div>
      <div className='formula-input'>
        <label>Check if dotted</label>
        <input
          type='checkbox'
          name='dotted'
          checked={formValues.dotted}
          onChange={handleChange}
        />
      </div>
      <div className='formula-input'>
        <label>Check if point</label>
        <input
          type='checkbox'
          name='point'
          checked={formValues.point}
          onChange={handleChange}
        />
      </div>
      <div className='formula-input'>
        <label>Check if dash dotted</label>
        <input
          type='checkbox'
          name='dashDotted'
          checked={formValues.dashDotted}
          onChange={handleChange}
        />
      </div>

      <button type='submit' className='btn-form-submit'>
        Submit
      </button>
    </form>
  )
}
