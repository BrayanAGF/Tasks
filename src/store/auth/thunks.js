import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { singInWithGoogle, logoutFirebase, loginWithEmailAndPassword, registerWithEmailAndPassword} from "../../firebase/providers";
import { checkinCredentials, login, logout, updatePhotoURL } from "./authSlice";
import { FirebaseAuth, FirebaseDB, FirebaseStorage } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore/lite";
import { updateProfile } from "firebase/auth";

export const startGoogleSingIn = () => {
    return async(dispatch) =>{
        dispatch(checkinCredentials());
        const resp = await singInWithGoogle();
        if(!resp.ok) return dispatch(logout());

        const {uid, photoURL} = resp;

        const newDoc = doc(FirebaseDB, `Usuarios`, uid);
        await setDoc( newDoc, {photoURL: photoURL}, { merge: true});

        dispatch(login(resp));
    }
}

export const startLoginWithEmailAndPassword = (Correo, Contraseña) => {
    return async(dispatch) => {
        dispatch(checkinCredentials());
        const {ok, uid, displayName, email, photoURL, errorMessage} = await loginWithEmailAndPassword(Correo, Contraseña);
        
        if(!ok) return dispatch(logout({errorMessage}));
        dispatch(login({uid, displayName, email, photoURL}));
    }
}

export const startCreateUserWithEmailAndPassword = (usuario) => {
    return async(dispatch) => {
        dispatch(checkinCredentials());
        const {ok, email, uid, displayName, errorMessage} = await registerWithEmailAndPassword(usuario);
        if(!ok) return dispatch(logout({errorMessage}));
        dispatch(login({email, uid, displayName}));
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();
        dispatch(logout());
    }
}

export const startUpdatePhoto = ( Foto ) => {
    return async(dispatch, getState) => {

        const { uid } = getState().auth;

        const storageRef = ref(FirebaseStorage, `${uid}.jpg`);
        await uploadBytes(storageRef, Foto);
        const url = await getDownloadURL(storageRef);
        await updateProfile( FirebaseAuth.currentUser, {photoURL: url});
        const newDoc = doc(FirebaseDB, `/Usuarios/${uid}`);
        await setDoc( newDoc, {photoURL: url}, { merge: true});
    
        dispatch(updatePhotoURL(url));
    }
}