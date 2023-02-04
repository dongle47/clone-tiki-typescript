import { RootState } from './../../app/store';
import { Address } from 'models/address';
import { createSlice } from '@reduxjs/toolkit';

const delItems = (arr: any, item: any)=>arr.filter((e:any)=>e._id !== item._id)
const findIndexItem = (arr: any,item:any)=>arr.findIndex((e:any)=>e._id===item.id) 

const initialState:Address[] = []

const addressListSlice = createSlice({
    name: "addressList",
    initialState,
    reducers:{
        addAddressItem: (state, action) => {
            state.push(action.payload)
            return state
        },
        updateItem:(state,action)=>{
            const itemUpdate = action.payload
           
            const index = findIndexItem(state,itemUpdate)
    
            if(index>-1){
                let temp = [...state]
                temp[index] = {...itemUpdate}
                state = temp
            }
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