import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { singInWithGoogle, logoutFirebase, loginWithEmailAndPassword, registerWithEmailAndPassword } from "../../firebase/providers";
import { addProyectoFavorito, checkinCredentials, login, logout, updatePhotoURL } from "./authSlice";
import { FirebaseAuth, FirebaseDB, FirebaseStorage } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore/lite";
import { updateProfile } from "firebase/auth";
import { supabase } from "../../supabase";
import { setActividadOff } from "../Actividad";
import { setArchivosOff } from "../Archivos";
import { setActiveOff } from "../Equipos";
import { setPrincipalOff } from "../Principal/principalSlice";
import { setProyectosOff } from "../Proyectos";
import { setTareasOff } from "../Tareas/tareasSlice";
import { getInfoUser } from "../../tasks/helpers";

export const startGoogleSingIn = () => {
    return async (dispatch) => {
        dispatch(checkinCredentials());
        const resp = await singInWithGoogle();
        if (!resp.ok) return dispatch(logout());

        const { uid, photoURL, displayName, email } = resp;

        const infoUser = await getInfoUser(uid);

        if(!infoUser){
            const newDoc = doc(FirebaseDB, `Usuarios`, uid);
            await setDoc(newDoc, { photoURL: photoURL, displayName: displayName, email: email, rol: 'Usuario nuevo' }, { merge: true });
        }

    }
}

export const startLoginWithEmailAndPassword = (Correo, Contraseña) => {
    return async (dispatch) => {
        dispatch(checkinCredentials());
        const { ok, errorMessage } = await loginWithEmailAndPassword(Correo, Contraseña);

        if (!ok) return dispatch(logout({ errorMessage }));
    }
}

export const startCreateUserWithEmailAndPassword = (usuario) => {
    return async (dispatch) => {
        dispatch(checkinCredentials());
        const { ok, errorMessage } = await registerWithEmailAndPassword(usuario);
        if (!ok) return dispatch(logout({ errorMessage }));
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();
        dispatch(logout());
        dispatch(setActividadOff());
        dispatch(setArchivosOff());
        dispatch(setActiveOff());
        dispatch(setPrincipalOff());
        dispatch(setProyectosOff());
        dispatch(setTareasOff());
    }
}

export const startUpdatePhoto = (Foto) => {
    return async (dispatch, getState) => {
        const { name } = Foto;
        const extension = name.substring(name.lastIndexOf('.') + 1, name.length);
        const { uid, photoURL } = getState().auth;

        if(photoURL){
            const photoURLTemp = photoURL.substring(photoURL.lastIndexOf("/") + 1, photoURL.length);
            
            await supabase
            .storage
            .from('avatars')
            .remove(`FPerfiles/${photoURLTemp}`)
        }
        
        const factorUnico = Math.floor(Math.random() * 20);

        await supabase
            .storage
            .from('Avatars')
            .upload(`FPerfiles/${uid+factorUnico}.${extension}`, Foto, {
                upsert: true
            })

        const { data: url } = supabase.storage.from('Avatars').getPublicUrl(`FPerfiles/${uid+factorUnico}.${extension}`);
        const { publicUrl } = url;


        await updateProfile(FirebaseAuth.currentUser, { photoURL: publicUrl });
        const newDoc = doc(FirebaseDB, `/Usuarios/${uid}`);
        await setDoc(newDoc, { photoURL: publicUrl }, { merge: true });

        dispatch(updatePhotoURL(publicUrl));
    }
}


export const startAddFavorito = () => {
    return async(dispatch, getState) => {
        const { Active } = getState().proyectos;
        const { ProyectosFavoritos, uid } = getState().auth;
        const { Nombre, id } = Active;
        const newProyectosFavoritos = [...ProyectosFavoritos, {Nombre: Nombre, id: id}];

        const newDoc = doc(FirebaseDB, `/Usuarios/${uid}`);
        await setDoc(newDoc, { ProyectosFavoritos:  newProyectosFavoritos}, { merge: true });

        dispatch(addProyectoFavorito({Nombre: Nombre, id: id}));
    }
}