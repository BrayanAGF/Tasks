import { collection, endAt, getDocs, orderBy, query, startAt, where } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config"

export const LoadUsuarios = async( nombre ) => {

    const q = query(collection(FirebaseDB, `Usuarios`), orderBy('displayName'), startAt(nombre), endAt(nombre+'\uf8ff'));
    const querySnapshot = await getDocs(q);

    if(querySnapshot.empty) return;

    const usuarios = [];
    querySnapshot.forEach(d => {
        usuarios.push({id: d.id,...d.data()});
    });

    return usuarios;
}