import { FirebaseDB } from "../../firebase/config";
import { enviarEmailEquipoAsignado } from "../../helpers/emailProvider";
import { loadProyectosPorEquipo } from "../../tasks/helpers";
import { startloadEquipos } from "../Principal";
import { DeleteEquipo, EditEquipo } from "../Principal/principalSlice";
import { loadingProyectos, setProyectos } from "../Proyectos/";
import { setActive } from "./equiposSlice";
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

export const startEditEquipo = (Equipo) => {
    return async (dispatch) => {
        dispatch(EditEquipo(Equipo));

        const idEquipo = Equipo.id;
        const equipoTemporal = {...Equipo}
        delete equipoTemporal.infoU;
        delete equipoTemporal.id;

        const docRef = doc(FirebaseDB, `Equipos/${idEquipo}`);
        await setDoc(docRef, equipoTemporal, {merge: true});
    }
}


export const startDeleteEquipos = (IdEquipo) => {
    return async(dispatch) => {

        const docRef = doc(FirebaseDB, `Equipos/${IdEquipo}`);
        await deleteDoc(docRef);
        dispatch(DeleteEquipo(IdEquipo));

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


export const startAgregarUsuarioEquipo = (Usuario) => {
    return async(dispatch, getState) => {

        const { active } = getState().equipos;
        const { Integrantes, infoU, Nombre } = active;
        const newIntegrantes = [...Integrantes, Usuario.id];
        const newInfoU = [...infoU, Usuario];
        const docRef = doc(FirebaseDB, `Equipos/${active.id}`);
        await setDoc(docRef,  { Integrantes: newIntegrantes }, { merge: true });

        let equipoConNuevoIntegrante = {...active}
        delete equipoConNuevoIntegrante.Integrantes;
        delete equipoConNuevoIntegrante.infoU;
        equipoConNuevoIntegrante = {...equipoConNuevoIntegrante, Integrantes: newIntegrantes, infoU: newInfoU}

        dispatch(setActive(equipoConNuevoIntegrante));
        enviarEmailEquipoAsignado(Usuario.email,Nombre);
    }
}
