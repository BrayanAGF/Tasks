import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth, FirebaseDB } from "./config";
import { collection, doc, setDoc } from "firebase/firestore/lite";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async() => {
    try{
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const {displayName, email, photoURL, uid, metadata} = result.user;

        return {
            ok: true,
            //user info
            displayName, email, photoURL, uid
        }
    }catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        
        return {
            ok: false,
            errorMessage
        }
    }
}

export const loginWithEmailAndPassword = async(email, password) => {
    try{
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        
        const {uid, photoURL, displayName} = result.user;

        return {
            ok: true,
            uid, photoURL, email, displayName
        }
    }catch(error){
        console.log(error);
        return {
            ok: false, errorMessage: error.message
        }
    }
}

export const registerWithEmailAndPassword = async( usuario ) => {
    try{
        const {Correo:email, Contraseña, Nombre:displayName, Rol} = usuario;
        const result = await createUserWithEmailAndPassword(FirebaseAuth, email, Contraseña);
        
        if(!result) throw new Error('Error al registrar el usuario');
        
        await updateProfile( FirebaseAuth.currentUser, {displayName});
        const { uid } = result.user;
        
        const newDoc = doc(FirebaseDB, `Usuarios`, uid);
        await setDoc( newDoc, {displayName, Rol});

        return {
            ok: true,
            email, displayName, uid
        }

    }catch(error){
        console.log(error);
        return {
            ok: false, errorMessage: error.message
        }

    }
}

export const logoutFirebase = async() => { 
    return await FirebaseAuth.signOut();
}