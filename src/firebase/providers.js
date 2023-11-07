import { EmailAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, reauthenticateWithCredential, signInWithEmailAndPassword, signInWithPopup, updatePassword, updateProfile } from "firebase/auth";
import { FirebaseAuth, FirebaseDB } from "./config";
import { collection, doc, getDoc, setDoc } from "firebase/firestore/lite";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const { displayName, email, photoURL, uid, metadata } = result.user;

        return {
            ok: true,
            //user info
            displayName, email, photoURL, uid
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}

export const loginWithEmailAndPassword = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);

        const { uid, photoURL, displayName } = result.user;
        const docRef = doc(FirebaseDB, `Usuarios/${uid}`);
        const infoUser = await getDoc(docRef);
        const { rol } = infoUser.data();

        return {
            ok: true,
            uid, photoURL, email, displayName, rol
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false, errorMessage: error.message
        }
    }
}

export const registerWithEmailAndPassword = async (usuario) => {
    try {
        const { Correo: email, Contraseña, Nombre: displayName, Rol } = usuario;
        const result = await createUserWithEmailAndPassword(FirebaseAuth, email, Contraseña);

        if (!result) throw new Error('Error al registrar el usuario');

        await updateProfile(FirebaseAuth.currentUser, { displayName });
        const { uid } = result.user;

        const newDoc = doc(FirebaseDB, `Usuarios`, uid);
        await setDoc(newDoc, { displayName, rol: Rol, email });

        return {
            ok: true,
            email, displayName, uid
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false, errorMessage: error.message
        }

    }
}

export const updateProfileUser = async (usuario) => {
    try {
        const { Correo, Nombre, Rol, uid } = usuario;

        await updateProfile(FirebaseAuth.currentUser, { 'displayName': Nombre, 'email': Correo });

        const newDoc = doc(FirebaseDB, `Usuarios`, uid);
        await setDoc(newDoc, { 'displayName': Nombre, 'email': Correo, 'rol': Rol }, { merge: true });

        return {
            ok: true, message: 'Se actualizó tu perfil correctamente.'
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false, message: error.message
        }
    }
}

export const updatePasswordUser = async (email, password, newPassword) => {
    try {
        let ok = false;
        let message = '';
        const credential = EmailAuthProvider.credential(email, password);
        reauthenticateWithCredential(FirebaseAuth.currentUser, credential).then(() => {
            updatePassword(FirebaseAuth.currentUser, newPassword).then(() => {
                ok = true;
                message = 'Tu contraseña ha sido actualizada.';
            })
            .catch((error) => {
                ok = false;
                message = error;
            });
        })
        return {
            ok,
            message
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false, errorMessage: error.message
        }
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}