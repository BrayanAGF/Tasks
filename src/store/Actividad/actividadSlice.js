import { createSlice } from '@reduxjs/toolkit';

export const actividadSlice = createSlice({
    name: 'actividad',
    initialState: {
        Actividad: []
    },
    reducers: {
        setActividad: (state, {payload}) => {
            state.Actividad = payload;
        }
    }
});


// Action creators are generated for each case reducer function
export const { setActividad } = actividadSlice.actions;