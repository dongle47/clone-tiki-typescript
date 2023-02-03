import { RootState } from './../../app/store';
import { WishItem } from './../../models/common';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const delItems = (arr: WishItem[],item:WishItem)=>arr.filter((e)=>e._id!==item._id)

const initialState: WishItem[] = []

const wishListSlice = createSlice({
    name:'wishList',
    initialState,
    reducers:{
        addWishList: (state, action:PayloadAction<WishItem>) => {
            state.push(action.payload)
            return state
        },
        removeWishList: (state, action:PayloadAction<WishItem>) => {
            return delItems(state, action.payload)
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

