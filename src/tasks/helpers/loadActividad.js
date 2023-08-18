import { collection, getDocs, orderBy, query, where } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";

export const loadActividad = async(idProyecto) => {
  
    const q = query(collection(FirebaseDB, `Actividad`), where("IdProyecto", "==", idProyecto), orderBy('Orden', 'desc'));
    const querySnapshot = await getDocs(q);

    const actividades = [];
    
    querySnapshot.forEach(doc => {
        actividades.push({ id: doc.id, ...doc.data() })
    });

    return actividades;

}
