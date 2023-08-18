import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { addActividad, addNota, addTarea, deleteTarea, setTActividades, setTareas } from "./tareasSlice"
import { startUpdateProgreso } from "../Proyectos"
import { getInfoUser } from "../../tasks/helpers"
import { startRegistrarActividad } from "../Actividad/thunks"


export const startCreateTarea = (tarea) => {
    return async (dispatch, getState) => {
        const { Active } = getState().proyectos;
        
        const tareaInsertar = {...tarea, IdProyecto: Active.id}
        
        delete tareaInsertar.progreso
        delete tareaInsertar.dias
        delete tareaInsertar.nActividades
        delete tareaInsertar.nActividadesRealizadas

       
        const docRef = doc(collection(FirebaseDB, 'Tareas'));
        await setDoc(docRef, tareaInsertar);

        tarea.id = docRef.id;

        const infoU = [];
        
        const { Integrantes } = tarea;

        for (const inte of Integrantes) {
            const usuario = await getInfoUser(inte);
            infoU.push(usuario);
        }
        
        tarea = { ...tarea, infoU }

        dispatch(addTarea(tarea));
        const { Tareas } = getState().tareas;
        dispatch(startUpdateProgreso(Tareas));
        dispatch(startRegistrarActividad('Tarea', 'ha creado la tarea', tarea.Nombre));
    }
}


export const startCreateAndAddActividad = (actividad) => {
    return async (dispatch, getState) => {

        const { TActividades, Tactive } = getState().tareas;
        const { id } = Tactive;
        const actividadesNew = [...TActividades, actividad];
        const docRef = doc(FirebaseDB, `Tareas/${id}`);
        await setDoc(docRef, { Actividades: actividadesNew }, { merge: true });

        dispatch(addActividad(actividad));

    }
}

export const startMarkActividad = (posicion) => {
    return async (dispatch, getState) => {

        const { TActividades, Tactive } = getState().tareas;
        const { id } = Tactive;

        const TActividadesNuevo = [...TActividades];
        const elementoNuevo = { ...TActividadesNuevo[posicion] };
        elementoNuevo.Realizada = !elementoNuevo.Realizada;
        TActividadesNuevo[posicion] = elementoNuevo;

        const docRef = doc(FirebaseDB, `Tareas/${id}`);
        await setDoc(docRef, { Actividades: TActividadesNuevo }, { merge: true });

        dispatch(setTActividades(TActividadesNuevo));
        
        elementoNuevo.Realizada 
        ? dispatch(startRegistrarActividad('Tarea','ha completado la actividad', elementoNuevo.Descripcion))
        : dispatch(startRegistrarActividad('Tarea','ha retomado la actividad', elementoNuevo.Descripcion));
    }
}

export const startCreateNota = (NotaTarea) => {
    return async (dispatch, getState) => {

        const { Titulo, Nota } = NotaTarea;
        const { displayName, photoURL } = getState().auth;
        const { Tactive, TNotas } = getState().tareas;
        const { id, Nombre } = Tactive;

        const nuevaNota = {
            Titulo: Titulo,
            Nota: Nota,
            uInfo: { displayName: displayName, photoURL: photoURL },
            Fecha: new Date().toLocaleDateString()
        };

        const notasNueva = [...TNotas, nuevaNota];

        const docRef = doc(FirebaseDB, `Tareas/${id}`);
        await setDoc(docRef, { Notas: notasNueva }, { merge: true });
        nuevaNota.id = docRef.id;

        dispatch(addNota(nuevaNota));
        dispatch(startRegistrarActividad('Tarea','ha creado una nota en la tarea', Nombre));

    }
}


export const startDeleteTarea = () => {
    return async (dispatch, getState) => {

        const { Tactive } = getState().tareas;
        const docRef = doc(FirebaseDB, `Tareas/${Tactive.id}`);
        await deleteDoc(docRef);
        dispatch(deleteTarea(Tactive.id));

    }
}
