import { createSlice } from '@reduxjs/toolkit';

export const equiposSlice = createSlice({
    name: 'equipos',
    initialState: {
        equipos: [],
        active: null,
        loading: false
    },
    reducers: {
        loadingEquipo: (state) => {
            state.loading = true
        },
        addNewEquipo: (state, { payload }) => {
            state.equipos = [...state.equipos, payload];
        },
        setEquiposPropios: (state, {payload}) => {
            state.equipos = payload;
            state.loading = false;
        },
        setActive: (state, {payload}) => {
            state.active = payload;
        },
        deleteEquipo: (state, {payload}) => {
            state.equipos = state.equipos.filter(equipo => equipo.id !== payload);
            state.active = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { addNewEquipo, setEquiposPropios, setActive, deleteEquipo, loadingEquipo } = equiposSlice.actions;