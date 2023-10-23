import { createSlice } from '@reduxjs/toolkit';

export const equiposSlice = createSlice({
    name: 'equipos',
    initialState: {
        active: null
    },
    reducers: {
        setActive: (state, {payload}) => {
            state.active = payload;
        },
    }
});


// Action creators are generated for each case reducer function
export const { setActive } = equiposSlice.actions;