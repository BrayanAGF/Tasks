import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', //checking, not-authenticated, authenticated
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        ProyectosFavoritos: [],
        errorMessage: null,
    },
    reducers: {
        login: (state, {payload}) => {
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.ProyectosFavoritos = payload.ProyectosFavoritos;
            state.errorMessage = null;
        },
        logout: (state, { payload }) => {
           state.status = 'not-authenticated';
           state.uid = null;
           state.email = null;
           state.displayName = null;
           state.photoURL = null;
           state.ProyectosFavoritos = [];
           state.errorMessage = payload?.errorMessage;
        },
        checkinCredentials: (state) => {
            state.status = 'checking';
        },
        updatePhotoURL: (state, {payload}) => {
            state.photoURL = payload;
        },
        addProyectoFavorito:(state, {payload}) => {
            state.ProyectosFavoritos = [...state.ProyectosFavoritos, payload];
        }
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkinCredentials, updatePhotoURL, addProyectoFavorito } = authSlice.actions;