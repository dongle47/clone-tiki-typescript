import { RootState } from './../../app/store';
import { WishItem } from './../../models/common';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const delItems = (arr: WishItem[], itemId: any)=>arr.filter((e)=>e._id !== itemId)

const initialState: WishItem[] = []

const wishListSlice = createSlice({
    name:'wishList',
    initialState,
    reducers:{
        addWishList: (state, action:PayloadAction<WishItem>) => {
            state.push(action.payload)
            return state
        },
        removeWishList: (state, action:PayloadAction<any>) => {
            return delItems(state, action.payload)
        },

        removeAll:(state) => {
            state =[]
            return state
        }
    }
})

//actions
export const wishListActions = wishListSlice.actions

//selector
export const selectWishList = (state:RootState) => state.wishList

//reducer
const wishListReducer = wishListSlice.reducer
export default wishListReducer 

