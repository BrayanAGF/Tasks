import { createSlice } from '@reduxjs/toolkit';

export const proyectosSlice = createSlice({
    name: 'Proyectos',
    initialState: {
       Proyectos: [],
       Active: null,
       ActiveProgreso: 0,
       ActiveNT: 0,
       ActiveNTR: 0,
       Loading: true
    },
    reducers: {
        loadingProyectos: (state, {payload}) => {
            state.Loading = payload;
        },
        setActiveP: (state, {payload}) => {
            state.Active = payload;
        },
        setActiveProgreso: (state, {payload}) => {
            state.ActiveProgreso = payload;
        },
        setActiveNT: (state, {payload}) => {
            state.ActiveNT = payload;
        },
        setActiveNTR: (state, {payload}) => {
            state.ActiveNTR = payload;
        },
        addNewProyecto: (state, {payload}) => {
            state.Proyectos = [...state.Proyectos, payload];
        },
        setProyectos: (state, {payload}) => {
            state.Proyectos = payload;
            state.Loading = false;
        },
        deleteProyecto: (state, {payload}) => {
            state.Proyectos = state.Proyectos.filter(p => p.id !== payload);
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    setActiveP, 
    addNewProyecto, 
    setProyectos, 
    loadingProyectos, 
    deleteProyecto,
    setActiveNT,
    setActiveNTR,
    setActiveProgreso
} = proyectosSlice.actions;