import { configureStore } from '@reduxjs/toolkit'
import type { ThunkAction, AnyAction } from '@reduxjs/toolkit'
import reducerSlider from './reducerSlider'

export const store = configureStore({
  reducer: {
    myReducerSlider: reducerSlider,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>
