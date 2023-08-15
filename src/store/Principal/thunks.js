import { addInfoUsuarios, loadEquipos, loadProyectosPorUsuario, loadTareasByUsuario } from "../../tasks/helpers";
import { setActive } from "../Equipos";
import { setActiveP } from "../Proyectos";
import { LoadingPrincipal, setEquiposPrincipal, setProyectosPrincipal, setTareasPrincipal } from "./principalSlice";

export const startLoadApp = () => {
    return async(dispatch) => {
        dispatch(startloadEquipos());
        dispatch(startLoadProyectosInicio());
        dispatch(startLoadTareasInicio());
        
    }
}

export const startAsignarEquipoActivo = ( proyecto ) => {
    return async(dispatch, getState) => {

        const {IdEquipo} = proyecto
        const {equipos} = getState().equipos
        const equipoActivo = equipos.find(e => e.id === IdEquipo);
        dispatch(setActiveP(proyecto));
        dispatch(setActive(equipoActivo));
    
    }
}

export const startloadEquipos = () => {
    return async (dispatch, getState) => {
        
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe');
        const equipos = await loadEquipos(uid);
        dispatch(setEquiposPrincipal(equipos));
    }
}

export const startLoadProyectosInicio = () => {
    return async(dispatch, getState) => {

     const { uid } = getState().auth;
     const proyectos = await loadProyectosPorUsuario(uid);
     dispatch(setProyectosPrincipal(proyectos));
    
    }
 }

 
export const startLoadTareasInicio = () => {
    return async(dispatch, getState) => {

        const { uid } = getState().auth;
        const tareas = await loadTareasByUsuario(uid);
        const tareasNueva = await addInfoUsuarios(tareas);
        dispatch(setTareasPrincipal(tareasNueva));
        dispatch(LoadingPrincipal(false));
    }
}