import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadEquiposIds } from "./loadEquipos";
import { loadTareas } from "./loadTareas";
import { getDiasDiff } from "./getDiasDiff";

export const loadProyectosPorEquipo = async( idEquipo ) => {

    const q = query(collection(FirebaseDB, `Proyectos`), where("IdEquipo", "==", idEquipo));
    const querySnapshot = await getDocs(q);
    const proyectos = [];
    querySnapshot.forEach(doc => {
        proyectos.push({id: doc.id, ...doc.data()})
    });
    return proyectos;
    
}

export const loadProyectosPorUsuario = async( idUsuario ) => {
    const equiposIds = await loadEquiposIds(idUsuario);
    
    const q = query(collection(FirebaseDB, `Proyectos`), where("IdEquipo", "in", equiposIds));
    const querySnapshot = await getDocs(q);
    
    const proyectos = [];
    querySnapshot.forEach(doc => {
        proyectos.push({id: doc.id, ...doc.data()})
    });

    const proyectosTemporal = [];
    for (const proyecto of proyectos) {
        const tareasProyecto = await loadTareas(proyecto.id);
        const nActividades = tareasProyecto.length;
        let cont = 0;
        for (const tarea of tareasProyecto) {
           if(tarea.progreso === 100) cont++;
        }
        const progreso = cont === 0 ? 0 : cont * 100 / nActividades;
        proyectosTemporal.push({
            id: proyecto.id,
            Nombre: proyecto.Nombre,
            Dias: getDiasDiff(new Date(), proyecto.FechaTermino),
            nActividades: nActividades,
            nActividadesRealizadas: cont,
            Progreso: progreso,
            IdEquipo: proyecto.IdEquipo
        })
    }

    return proyectosTemporal;
}

export const loadProyectoPorId = async(idProyecto) => {
    const docRef = doc(FirebaseDB, `Proyectos/${idProyecto}`);
    const proyectoTemp = await getDoc(docRef);
    const proyecto = {id: proyectoTemp.id, ...proyectoTemp.data()}

    return proyecto;
}