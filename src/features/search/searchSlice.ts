import { createSlice } from '@reduxjs/toolkit';


const searchSlice = createSlice({
    name: 'search',
    initialState: "",
    reducers: {

    }
})

//actions
export const searchActions = searchSlice.actions

//selector


//reducer
const searchReducer = searchSlice.reducer
export default searchReducer