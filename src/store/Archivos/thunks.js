import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { addArchivo, deleteArchivo } from "./archivosSlice";
import { supabase } from '../../supabase'
import { startRegistrarActividad } from "../Actividad/thunks";

export const startLoadArchivo = (archivo) => {
    return async (dispatch, getState) => {
        const { uid, displayName, photoURL } = getState().auth;
        const { Active } = getState().proyectos;
        const { id } = Active;
        const { name } = archivo;

        const nombre = name.substring(0, name.lastIndexOf('.'));
        const extension = name.substring(name.lastIndexOf('.') + 1, name.length);


        await supabase
            .storage
            .from('Archivos')
            .upload(`Archivos/${name}`, archivo, {
                upsert: false
            })

        const { data: url } = supabase.storage.from('Archivos').getPublicUrl(`Archivos/${name}`);
        const { publicUrl } = url;

        const archivoInfo = {
            Nombre: nombre,
            Extension: extension,
            URL: publicUrl,
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
        dispatch(startRegistrarActividad('Archivo','ha compartido el archivo', nombre));
    }
}


export const startDeleteArchivo = (Archivo) => {
    return async (dispatch) => {
        const { id, Nombre, Extension } = Archivo;

        const docRef = doc(FirebaseDB, `Archivos/${id}`);
        await deleteDoc(docRef);

        /* const storageRef = ref(FirebaseStorage, `${Nombre}.${Extension}`);
        await deleteObject(storageRef); */
        await supabase
        .storage
        .from('Archivos')
        .remove(`Archivos/${Nombre}.${Extension}`)

        dispatch(deleteArchivo(id));
    }
}