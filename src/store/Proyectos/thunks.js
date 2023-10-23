import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { loadTareas } from "../../tasks/helpers/loadTareas"
import { addNewProyecto, deleteProyecto, loadingProyectos, setActiveNT, setActiveNTR, setActiveP, setActiveProgreso } from "../Proyectos"
import { setTareas, setViewMode } from "../Tareas/tareasSlice"
import { loadArchivosPorProyecto } from "../../tasks/helpers/loadArchivosPorProyecto"
import { setArchivos } from "../Archivos/archivosSlice"
import { addInfoUsuarios } from "../../tasks/helpers/addInfoUsuarios"
import { setActive } from "../Equipos"
import { loadActividad } from "../../tasks/helpers"
import { setActividad } from "../Actividad"


export const startCreateProyecto = (proyecto) => {
    return async (dispatch, getState) => {

        const { active } = getState().equipos
        proyecto = { IdEquipo: active.id, ...proyecto }

        const docRef = doc(collection(FirebaseDB, `Proyectos/`));
        await setDoc(docRef, proyecto);

        proyecto.id = docRef.id;

        dispatch(addNewProyecto(proyecto));
    }
}

export const startDeleteProyecto = (idProyecto) => {
    return async (dispatch) => {

        const docRef = doc(FirebaseDB, `Proyectos/${idProyecto}`);
        await deleteDoc(docRef);

        const tareasIds = [];
        const tareasAEliminar = await loadTareas(idProyecto);

        tareasAEliminar.forEach(tarea => {
            const docRef = doc(FirebaseDB, `Tareas/${tarea.id}`);
            tareasIds.push(deleteDoc(docRef));
        });

        await Promise.all(tareasIds);

        dispatch(deleteProyecto(idProyecto));

    }
}

export const startUpdateProgreso = (tareas) => {
    return async (dispatch) => {

        let cont = 0;
        tareas.forEach(tarea => {
            tarea.progreso === 100 ? cont++ : ''
        });

        const progreso = cont === 0 ? 0 : cont * 100 / tareas.length;
        dispatch(setActiveNT(tareas.length));
        dispatch(setActiveNTR(cont));
        dispatch(setActiveProgreso(progreso));

    }
}

export const startLoadProyecto = () => {
    return async (dispatch) => {
        dispatch(loadingProyectos(true));
        dispatch(startLoadTareas());
        dispatch(startLoadArchivos());
        dispatch(startLoadActividad());
    }
}

export const startSetActiveProyecto = (idProyecto) => {
    return async (dispatch, getState) => {

        const { Equipos, Proyectos } = getState().principal;
        const proyecto = Proyectos.find(p => p.id === idProyecto);
        const { IdEquipo } = proyecto;
        const equipoActivo = Equipos.find(e => e.id === IdEquipo);
        dispatch(setActive(equipoActivo));
        dispatch(setActiveP(proyecto));

    }
}

export const startLoadTareas = () => {
    return async (dispatch, getState) => {

        const { Active } = getState().proyectos;
        const { id } = Active;
        const tareas = await loadTareas(id);
        const tareasNueva = await addInfoUsuarios(tareas);
        dispatch(startUpdateProgreso(tareasNueva));
        dispatch(setTareas(tareasNueva));
        const viewMode = localStorage.getItem('vistaTareas')
        if (viewMode !== null) dispatch(setViewMode(viewMode.replaceAll('"', '')));

        dispatch(loadingProyectos(false));

    }
}

export const startLoadArchivos = () => {
    return async (dispatch, getState) => {

        const { Active } = getState().proyectos;
        const { id } = Active;
        const archivos = await loadArchivosPorProyecto(id);
        dispatch(setArchivos(archivos));

    }
}

export const startLoadActividad = () => {
    return async (dispatch, getState) => {

        const { Active } = getState().proyectos;
        const { id } = Active;
        const actividades = await loadActividad(id);
        dispatch(setActividad(actividades));

    }
}



