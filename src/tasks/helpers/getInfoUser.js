import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"

export const getInfoUser = async( idUser ) => {

    const docRef = doc(FirebaseDB, `Usuarios/${idUser}`);
    const resp = await getDoc(docRef);
    return {id: idUser,...resp.data()};
}