import { collection, doc, getDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"

export const loadProyectosFavoritos = async (uid) => {

    const docRef = doc(FirebaseDB, `Usuarios/${uid}`);
    const usuario = await getDoc(docRef);
    const { ProyectosFavoritos } = usuario.data();

    return ProyectosFavoritos
    
}
