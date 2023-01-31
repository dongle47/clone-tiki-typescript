import { createSlice } from '@reduxjs/toolkit';

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
            state = [...items]
        },
        removeItem:(state,action)=>{
            const itemUpdate = action.payload
            state = delItems(state,itemUpdate)
        },
        updateItem:(state,action)=>{
            const itemUpdate = action.payload
           
            const index = findIndexItem(state,itemUpdate)
    
            if(index>-1){
                let temp = [...state]
                temp[index] = {...itemUpdate}
                state = temp
            }
        },
        chooseAll:(state,action)=>{
            state= state.map(item => {return {...item,choose:true}})
        },
        unchooseAll:(state,action)=>{
            state= state.map(item=>{return {...item,choose:false}})
        },
        deleteAll:(state,action)=>{
            state = []
        },
        deleteItemsAfterPayment:(state,action)=>{
            state= state.filter(item=>!item.choose)
        }
    }
})

const findIndexItem = (arr: any,item:any)=>arr.findIndex((e:any)=>e.id===item.id) 
const delItems = (arr: any,item:any)=>arr.filter((e:any)=>e.id!==item.id)
// actions
export const cartActions = cartSlice.actions

// selectors
// export const selectCart = (state) => state

// reducers