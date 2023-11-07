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
        LoadingPrincipal: (state, { payload }) => {
            state.Loading = payload;
        },
        setEquiposPrincipal: (state, { payload }) => {
            state.Equipos = payload;
        },
        DeleteEquipo: (state, { payload }) => {
            state.Equipos = state.Equipos.filter(equipo => equipo.id !== payload);
        },
        EditEquipo: (state, { payload }) => {
            const equiposTemporal = state.Equipos.filter(equipo => equipo.id !== payload.id);
            state.Equipos = [...equiposTemporal, payload];
        },
        setTareasPrincipal: (state, { payload }) => {
            state.Tareas = payload;
        },
        setProyectosPrincipal: (state, { payload }) => {
            state.Proyectos = payload;
        },
        setPrincipalOff: (state) => {
            state.Equipos = [];
            state.Tareas = [];
            state.Proyectos = [];
        },
        quitarProyecto: (state, {payload}) => {
            state.Proyectos = state.Proyectos.filter(p => p.id !== payload);
        },
        quitarTarea: (state, {payload}) => {
            state.Tareas = state.Tareas.filter(t => t.id !== payload);
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    LoadingPrincipal,
    setEquiposPrincipal,
    setProyectosPrincipal,
    setTareasPrincipal,
    DeleteEquipo,
    EditEquipo,
    setPrincipalOff,
    quitarProyecto,
    quitarTarea
} = principalSlice.actions;