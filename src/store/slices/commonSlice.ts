import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../store'

type CommonState = {
  value: undefined
}

const initialState: CommonState = {
  value: undefined,
}

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    commonSettled: (state, action: any) => {
      state.value = action.payload
    },
  },
})

export const { commonSettled } = commonSlice.actions

export const selectCommonValue = (state: RootState) => state.common

export default commonSlice.reducer
