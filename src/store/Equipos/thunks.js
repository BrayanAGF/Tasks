import { FirebaseDB } from "../../firebase/config";
import { loadEquipos, loadProyectosPorEquipo } from "../../tasks/helpers";
import { loadingProyectos, setProyectos } from "../Proyectos/ProyectosSlice";
import { addNewEquipo, deleteEquipo, loadingEquipo, setActive, setEquiposPropios } from "./equiposSlice";
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite'


export const startCrearNuevoEquipo = (equipo) => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe');
        const docRef = doc(collection(FirebaseDB, `Equipos/`));
        await setDoc(docRef, equipo);
        dispatch(startloadEquipos());

    }
}


export const startDeleteEquipos = () => {
    return async(dispatch, getState) => {

        const { active } = getState().equipos;
        const docRef = doc(FirebaseDB, `Equipos/${active}`);
        await deleteDoc(docRef);
        dispatch(deleteEquipo(active));

    }
}

export const startSelectEquipoActive = (equipo) => {
    return async(dispatch) => {

        dispatch(setActive(equipo));
        dispatch(loadingProyectos());
        const proyectosDelEquipo = await loadProyectosPorEquipo(equipo.id);
        dispatch(setProyectos(proyectosDelEquipo));

    }
}

