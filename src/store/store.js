import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { equiposSlice } from "./Equipos/equiposSlice";
import { proyectosSlice } from "./Proyectos";
import { tareasSlice } from "./Tareas/tareasSlice";
import { archivosSlice } from "./Archivos/archivosSlice";
import { principalSlice } from "./Principal/principalSlice";
import { actividadSlice } from "./Actividad";

export const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        equipos: equiposSlice.reducer,
        proyectos: proyectosSlice.reducer,
        tareas: tareasSlice.reducer,
        archivos: archivosSlice.reducer,
        principal: principalSlice.reducer,
        actividad: actividadSlice.reducer
    }
});