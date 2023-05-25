import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  basketId: "",
  itemNum: 0,
  itemArr:""
}

export const counterSlice = createSlice({
  name: 'id',
  initialState,
  reducers: {
    assignBasketId: (state, action) => {
      state.basketId = action.payload
    },
    assignItemNum: (state, action) => {
      state.itemNum = action.payload
    },
    assignItemArr: (state, action) => {
      state.itemArr = action.payload
    },
    resetIBasketId: (state) => {
      state.active = ""
    },
    resetItemNum: (state) => {
      state.active = 0
    },
    resetItemArr: (state) => {
      state.active = ""
    }
  }
})

export const { assignBasketId, resetIBasketId, assignItemNum, assignItemArr, resetItemNum, resetItemArr } = counterSlice.actions
export default counterSlice.reducer
