import { useDispatch, useSelector } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'

// TODO: rename
import commonSlice from './slices/commonSlice'

export const store = configureStore({
  reducer: {
    common: commonSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppStore = typeof store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export const useAppSelector = useSelector.withTypes<RootState>()
