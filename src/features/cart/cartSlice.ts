import { removeItem } from 'utils';
import { RootState } from './../../app/store';
import { createSlice } from '@reduxjs/toolkit';

const findIndexItem = (arr: any,item:any)=>arr.findIndex((e:any)=>e.id===item.id) 
const delItems = (arr: any,item:any)=>arr.filter((e:any)=>e.id!==item.id)
export interface CartItem {
    choose: boolean;
    id: string;
    name: string;
    slug: string;
    image: string;
    price: number;
    quantity: number;
}

const initialState: CartItem[] = []

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addItem:(state,action)=>{
            let newItem = action.payload
            let items = [...state]
            
            const indexItem = items.findIndex(item=>item.id===newItem.id)

            if(indexItem >= 0){
                items[indexItem].quantity += newItem.quantity
            }
            else
                items.unshift(newItem)

            return [...items]
        },
        removeItem:(state,action)=>{
            const itemUpdate = action.payload
            return delItems(state,itemUpdate)
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
        chooseAll:(state,action)=>{
            return state.map(item => {return {...item,choose:true}})
        },
        unChooseAll:(state,action)=>{
            return state.map(item=>{return {...item,choose:false}})
        },
        deleteAll:(state,action)=>{
            return []
        },
        deleteItemsAfterPayment:(state,action)=>{
            return state.filter(item=>!item.choose)
            // return state
        }
    }
})

// actions
export const cartActions = cartSlice.actions

// selectors
export const selectCart = (state:RootState) => state.cart

// reducers
const cartReducer = cartSlice.reducer
export default cartReducer