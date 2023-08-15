
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addInfoUsuarios } from "./addInfoUsuarios";

export const loadEquipos = async(uid = '') => {
    if(!uid) throw new Error('El UID del usuario no existe');

    const q = query(collection(FirebaseDB, `Equipos`), where("Integrantes", "array-contains", uid));
    const querySnapshot = await getDocs(q);

    let equipos = [];
    
    querySnapshot.forEach((doc) => {
      equipos.push({id: doc.id, ...doc.data()});
    });

    return addInfoUsuarios(equipos);
}

export const loadEquiposIds = async (uid = '') => {
  if(!uid) throw new Error('El UID del usuario no existe');

    const q = query(collection(FirebaseDB, `Equipos`), where("Integrantes", "array-contains", uid));
    const querySnapshot = await getDocs(q);

    let equipos = [];
    
    querySnapshot.forEach((doc) => {
      equipos.push(doc.id);
    });

    return equipos;
}

