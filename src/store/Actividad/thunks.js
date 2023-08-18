import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addActividad } from "./actividadSlice";

export const startRegistrarActividad = (Tipo, Mensaje, Complemento) => {
    return async(dispatch, getState) => {
        const { Active } = getState().proyectos;
        const { displayName, photoURL } = getState().auth;
        const { Actividad } = getState().actividad;

        const actividad = {
            Tipo: Tipo,
            Integrante:  displayName,
            photoURL: photoURL,
            Mensaje: Mensaje,
            Complemento: Complemento,
            IdProyecto: Active.id,
            Fecha:  new Date().toLocaleDateString(),
            Orden: Actividad.length
        }

        const docRef = doc(collection(FirebaseDB, 'Actividad'));
        await setDoc(docRef, actividad);

        dispatch(addActividad(actividad));
    }
}