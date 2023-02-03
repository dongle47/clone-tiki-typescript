import { RootState } from './../../app/store';
import { Address } from 'models/address';
import { createSlice } from '@reduxjs/toolkit';

const delItems = (arr: any, itemId: any)=>arr.filter((e:any)=>e._id !== itemId)

const initialState:Address[] = []

const addressListSlice = createSlice({
    name: "addressList",
    initialState,
    reducers:{
        addAddressItem: (state, action) => {
            state.push(action.payload)
            return state
        },
        removeAddressItem: (state, action) => {
            return delItems(state, action.payload)
        },

        removeAll: (state) => {
            state = []
            return state
        }
    }
})

export const addressListActions = addressListSlice.actions

export const selectAddressList = (state:RootState) => state.addressList 

//reducer
const addressListReducer = addressListSlice.reducer
export default addressListReducer