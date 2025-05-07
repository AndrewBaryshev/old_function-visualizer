import { FC } from 'react'
import {
  testFunctions,
  selfSimilarDensityProfileApprox,
  templateFunctions,
} from '../../../logic'
import { GraphicComponent } from '../graphicBase/GraphicComponent'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { mvOffsetLeft, mvOffsetRight } from '../../../app/reducerSlider'
import { RootState } from '../../../app/store'

export const SliderComponent: FC<any> = () => {
  const offset = useSelector((state: RootState) => state.myReducerSlider.offset)
  const position = useSelector(
    (state: RootState) => state.myReducerSlider.position
  )
  const dispatch = useDispatch()

  let objForBind: any = {
    legendStyle: {
      color: '#E0D1A8',
      width: 2,
      formula: 'p(r) = 6 * r',
    },
    formula: '6 * r',
  }
  let objForBind2: any = {
    legendStyle: {
      color: '#76BD3E',
      width: 2,
      formula: 'p(r) = r + 9 + r ** 2',
    },
    formula: 'r + 9 + r ** 2',
  }

  let myFunc = templateFunctions.bind(objForBind)
  let myFunc2 = templateFunctions.bind(objForBind2)

  let arrMethods: any = [[myFunc, myFunc2]]

  let objectMethods = {
    testFunctions,
    selfSimilarDensityProfileApprox,
  }

  let arrGraphicComponents: any = [
    {
      name: 'function',
    },
    {
      name: 'self-similar 2',
    },
    {
      name: 'self-similar 3',
    },
    {
      name: 'self-similar 4',
    },
    {
      name: 'self-similar 5',
    },
    {
      name: 'self-similar 6',
    },
    {
      name: 'self-similar 7',
    },
    {
      name: 'self-similar 8',
    },
    {
      name: 'self-similar 9',
    },
    {
      name: 'self-similar 10',
    },
    {
      name: 'self-similar 11',
    },
    {
      name: 'self-similar 12',
    },
    {
      name: 'self-similar 13',
    },
  ]

  return (
    <div className='container-main-graphic'>
      <div className='slider-component'>
        <div
          style={{ left: offset + 'px' }}
          className='slider-component-container transition'
        >
          {arrGraphicComponents.map((elem: any, index: number) => (
            <GraphicComponent key={index} title={elem.name} />
          ))}
        </div>
      </div>
      <div
        onClick={() => dispatch(mvOffsetLeft())}
        className='left-arrow transition'
      >
        <svg
          width='58'
          height='59'
          viewBox='0 0 58 59'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M29.3164 58.6328L0 29.3164L29.3164 0L36.5543 7.18182L19.6939 24.0423H57.7351V34.5906H19.6939L36.5543 51.4229L29.3164 58.6328Z'
            fill='url(#paint0_radial_308_16)'
          />
          <defs>
            <radialGradient
              id='paint0_radial_308_16'
              cx='0'
              cy='0'
              r='1'
              gradientUnits='userSpaceOnUse'
              gradientTransform='translate(30.3519 27) rotate(-175.099) scale(87.7848 35.4452)'
            >
              <stop offset='0.145416' stopColor='#BDE3FF' />
              <stop
                offset='0.376996'
                stopColor='#FF0707'
                stopOpacity='0.742344'
              />
              <stop offset='0.502897' stopColor='#0093FF' stopOpacity='0.49' />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className='title'>График № {position + 1} из 13</div>
      <div
        onClick={() => dispatch(mvOffsetRight())}
        className='right-arrow transition'
      >
        <svg
          width='58'
          height='59'
          viewBox='0 0 58 59'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M28.4185 58.6328L57.7349 29.3164L28.4185 0L21.1805 7.18182L38.041 24.0423H-0.000225067V34.5906H38.041L21.1805 51.4229L28.4185 58.6328Z'
            fill='url(#paint0_radial_308_17)'
          />
          <defs>
            <radialGradient
              id='paint0_radial_308_17'
              cx='0'
              cy='0'
              r='1'
              gradientUnits='userSpaceOnUse'
              gradientTransform='translate(27.3829 27) rotate(-4.9011) scale(87.7848 35.4452)'
            >
              <stop offset='0.145416' stopColor='#BDE3FF' />
              <stop
                offset='0.376996'
                stopColor='#FF0707'
                stopOpacity='0.742344'
              />
              <stop offset='0.502897' stopColor='#0093FF' stopOpacity='0.49' />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}
