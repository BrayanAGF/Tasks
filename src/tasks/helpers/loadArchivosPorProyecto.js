import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { getInfoUser } from "./getInfoUser";

export const loadArchivosPorProyecto = async(idProyecto) => {
    
    const q = query(collection(FirebaseDB, `Archivos`), where("IdProyecto", "==", idProyecto));
    const querySnapshot = await getDocs(q);

    const archivos = [];
    const infoUTemp = [];

    querySnapshot.forEach(doc => {
        archivos.push({ id: doc.id, ...doc.data() })
    });

    for (const archivo of archivos) {
        const {UsuarioProvee} = archivo;
        infoUTemp.push(getInfoUser(UsuarioProvee))
    }

   const infoU = await Promise.all(infoUTemp);

    infoU.forEach((usuario, index) => {
        archivos[index] = {...archivos[index], usuario: usuario}
    });


    return archivos;
}
