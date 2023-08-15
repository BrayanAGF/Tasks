import { createSlice } from '@reduxjs/toolkit';

export const archivosSlice = createSlice({
    name: 'archivos',
    initialState: {
       Archivos: []
    },
    reducers: {
        setArchivos: (state, {payload} ) => {
            state.Archivos = payload;
        },
        addArchivo: (state, {payload}) => {
            state.Archivos = [...state.Archivos, payload];
        },
        deleteArchivo: (state, {payload}) => {
            state.Archivos = state.Archivos.filter(a => a.id !== payload);
        }
    }
});


// Action creators are generated for each case reducer function
export const { setArchivos, addArchivo, deleteArchivo } = archivosSlice.actions;