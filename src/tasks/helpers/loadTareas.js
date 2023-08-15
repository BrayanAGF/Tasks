import { collection, getDocs, orderBy, query, where } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { getDiasDiff } from "./getDiasDiff";


export const loadTareas = async (IdProyecto) => {

    const q = query(collection(FirebaseDB, `Tareas`), where("IdProyecto", "==", IdProyecto), orderBy('Orden', 'asc'));
    const querySnapshot = await getDocs(q);

    let tareas = [];

    querySnapshot.forEach(t => {

        const { FechaTermino, Actividades } = t.data();
        const dias = getDiasDiff(new Date(), FechaTermino);

        let cont = 0;
        Actividades.forEach(act => {
            act.Realizada === true ? cont++ : ''
        });

        const progreso = cont === 0 ? 0 : cont * 100 / Actividades.length;
        const tareaTemp = { id: t.id, dias: dias, nActividades: Actividades.length, nActividadesRealizadas: cont, progreso: progreso, ...t.data() };

        tareas.push(tareaTemp);

    });


    return tareas;
}


export const loadTareasByUsuario = async (idUsuario) => {

    const q = query(collection(FirebaseDB, `Tareas`), where("Integrantes", "array-contains", idUsuario), orderBy('Orden', 'asc'));
    const querySnapshot = await getDocs(q);

    let tareas = [];
    let tareasTemp = []
    querySnapshot.forEach(tarea => {
        tareasTemp.push({ id: tarea.id, ...tarea.data() });
    });

    for (const tarea of tareasTemp) {
        const { IdProyecto, FechaTermino, Actividades } = tarea;

        const q = query(collection(FirebaseDB, `Proyectos`), where('__name__', "==", IdProyecto));
        const qS = await getDocs(q);
        let nProyecto = '';

        qS.forEach(proyecto => {
            nProyecto = proyecto.data().Nombre;
        });

        const dias = getDiasDiff(new Date(), FechaTermino);

        let cont = 0;
        Actividades.forEach(act => {
            act.Realizada === true ? cont++ : ''
        });

        const progreso = cont === 0 ? 0 : cont * 100 / Actividades.length;
        if (progreso !== 100) {
            const tareaTemp = {
                ...tarea,
                dias: dias,
                nActividades: Actividades.length,
                nActividadesRealizadas: cont,
                progreso: progreso,
                pNombre: nProyecto,
            };
            tareas.push(tareaTemp);
        }
    }

    return (tareas);
}
