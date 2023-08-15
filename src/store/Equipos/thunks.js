import { FirebaseDB } from "../../firebase/config";
import { loadProyectosPorEquipo } from "../../tasks/helpers";
import { startloadEquipos } from "../Principal";
import { DeleteEquipo } from "../Principal/principalSlice";
import { loadingProyectos, setProyectos } from "../Proyectos/";
import { deleteEquipo, setActive } from "./equiposSlice";
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
        dispatch(DeleteEquipo(active));

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

