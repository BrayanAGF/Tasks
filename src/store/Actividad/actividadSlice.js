import { createSlice } from '@reduxjs/toolkit';

export const actividadSlice = createSlice({
    name: 'actividad',
    initialState: {
        Actividad: []
    },
    reducers: {
        setActividad: (state, {payload}) => {
            state.Actividad = payload;
        },
        addActividad: (state, {payload}) => {
            state.Actividad = [ payload, ...state.Actividad];
        }
    }
});


// Action creators are generated for each case reducer function
export const { setActividad, addActividad } = actividadSlice.actions;