import { createSlice } from '@reduxjs/toolkit';

export const tareasSlice = createSlice({
  name: 'tareas',
  initialState: {
    Tareas: [],
    Tactive: null,
    TActividades: [],
    TNotas: [],
    ViewMode: 'Normal',
    loading: false
  },
  reducers: {
    setTareas: (state, { payload }) => {
      state.Tareas = payload;
    },
    setTareaActiva: (state, { payload }) => {
      state.TActividades = payload.Actividades;
      state.TNotas = payload.Notas;
      state.Tactive = payload;
    },
    setTActividades: (state, {payload}) => {
      state.TActividades = payload;
    },
    addTarea: (state, { payload }) => {
      state.Tareas = [...state.Tareas, payload]
    },
    addActividad: (state, { payload }) => {
      state.TActividades = [...state.TActividades, payload]
    },
    addNota: (state, { payload }) => {
      state.TNotas = [...state.TNotas, payload]
    },
    deleteTarea: (state, { payload }) => {
      state.Tareas = state.Tareas.filter(t => t.id !== payload);
      state.Tactive = null;
    },
    setViewMode: (state, { payload }) => {
      state.ViewMode = payload;
    }
  }
});


// Action creators are generated for each case reducer function
export const { 
  setTareas, 
  setTareaActiva, 
  addTarea, 
  addActividad, 
  deleteTarea, 
  addNota, 
  setTActividades,
  setViewMode
} = tareasSlice.actions;