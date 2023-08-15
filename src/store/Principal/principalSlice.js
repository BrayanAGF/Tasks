import { createSlice } from '@reduxjs/toolkit';

export const principalSlice = createSlice({
    name: 'principal',
    initialState: {
        Equipos: [],
        Tareas: [], 
        Proyectos: [],
        Loading: true
    },
    reducers: {
        LoadingPrincipal: (state, {payload}) => {
            state.Loading = payload;
        },
        setEquiposPrincipal: (state, {payload}) => {
            state.Equipos = payload;
        },
        DeleteEquipo: (state, {payload}) => {
            state.Equipos = state.Equipos.filter(equipo => equipo.id !== payload);
        },
        setTareasPrincipal: (state, {payload}) => {
            state.Tareas = payload;
        },
        setProyectosPrincipal: (state, {payload}) => {
            state.Proyectos = payload;
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    LoadingPrincipal,
    setEquiposPrincipal,
    setProyectosPrincipal,
    setTareasPrincipal,
    DeleteEquipo
} = principalSlice.actions;