
import { ListaTareas, ListaTareasEnTarjetas, ModalCrearTarea } from "../Components"
import { useState } from "react"
import { useSelector } from "react-redux"


export const TareasView = () => {

    const [openModal, setOpenModal] = useState(false);
    const { Tareas, ViewMode } = useSelector(state => state.tareas);
    const { uid } = useSelector(state => state.auth);
    const { active } = useSelector(state => state.equipos);
    const { Owner } = active;


    return (
        <div className='animate__animated animate__fadeIn animate__faster'>
            <div className="flex items-center gap-1">
                <h5 className="text-3xl" aria-label="Tareas">Tareas</h5>
                {
                    Owner === uid 
                    &&
                    <ModalCrearTarea open={openModal} set={() => setOpenModal(!openModal)} />
                }
            </div>
            <div className="mt-4">
                {
                    ViewMode === 'Normal' ? <ListaTareas Tareas={Tareas} /> : <ListaTareasEnTarjetas Tareas={Tareas} />
                }
            </div>
        </div>
    )
}
