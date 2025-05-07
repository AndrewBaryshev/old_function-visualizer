import { createSlice } from '@reduxjs/toolkit'

const reducerSlider = createSlice({
  name: 'reducerSlider',
  initialState: {
    offset: 0,
    position: 0,
  },
  reducers: {
    mvOffsetRight(state) {
      const leftOffset = state.offset
      if (leftOffset <= 0 && leftOffset > -15600) {
        state.offset -= 1300
        state.position += 1
      } else {
        state.offset += 15600
        state.position -= 12
      }
    },
    mvOffsetLeft(state) {
      const rightOffset = state.offset
      if (rightOffset === 0) {
        state.offset -= 15600
        state.position += 12
      } else {
        state.offset += 1300
        state.position -= 1
      }
    },
  },
})

export const { mvOffsetLeft, mvOffsetRight } = reducerSlider.actions

export default reducerSlider.reducer
