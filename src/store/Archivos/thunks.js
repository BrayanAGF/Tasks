import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { addArchivo, deleteArchivo } from "./archivosSlice";

export const startLoadArchivo = (archivo) => {
    return async (dispatch, getState) => {
        const { uid, displayName, photoURL } = getState().auth;
        const { Active } = getState().proyectos;
        const { id } = Active;
        const { name } = archivo;
        
        const nombre = name.substring(0, name.lastIndexOf('.'));
        const extension = name.substring(name.lastIndexOf('.') + 1, name.length);

        const storageRef = ref(FirebaseStorage, name);
        await uploadBytes(storageRef, archivo);
        const url = await getDownloadURL(storageRef);

        const archivoInfo = {
            Nombre: nombre,
            Extension: extension,
            URL: url,
            IdProyecto: id,
            UsuarioProvee: uid,
            usuario: {
                displayName: displayName,
                photoURL: photoURL
            }
        }
        
        const docRef = doc(collection(FirebaseDB, `Archivos/`));
        await setDoc(docRef, archivoInfo);

        dispatch(addArchivo(archivoInfo));
    }
}


export const startDeleteArchivo = (Archivo) => {
    return async (dispatch) => {
        const { id, Nombre, Extension } = Archivo;
        
        const docRef = doc(FirebaseDB, `Archivos/${id}`);
        await deleteDoc(docRef);

        const storageRef = ref(FirebaseStorage, `${Nombre}.${Extension}`);
        await deleteObject(storageRef);

        dispatch(deleteArchivo(id));
    }
}