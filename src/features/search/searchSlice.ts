import { RootState } from './../../app/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface SearchState {
    searchText: string,
    slug: string,
    type: 'product' | 'filter' 
}

const initialState : SearchState[] = []

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        addItem(state,action:PayloadAction<SearchState>){
            let newItem = action.payload
            let items = [...state]

            items.unshift(newItem)
            state = [...items]

            return state
        },
        removeItem(state,action:PayloadAction<string>){
            const slugDel = action.payload
            state = state.filter(item => item.slug !== slugDel)
            return state
        }
    }
})

//actions
export const searchActions = searchSlice.actions

//selector
export const search = (state:RootState) => state.search 

//reducer
const searchReducer = searchSlice.reducer
export default searchReducer