import { Grid, IconButton, Switch, Typography } from "@mui/joy"
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
                <h5 className="text-3xl">Tareas</h5>
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

{/* <Grid className='animate__animated animate__fadeIn animate__faster'>
        <Grid container mt={2} mb={2} justifyContent='space-between' >
            <Grid container >
                <Typography level="h4" fontWeight='bold'>Tareas</Typography>
                {
                    Owner === uid && <IconButton sx={{ borderRadius: 100, ml: 1 }} onClick={() => { setOpenModal(!openModal) }}>
                        <i className="bi bi-plus-lg" />
                    </IconButton>
                }
            </Grid>
        </Grid>

        {
            ViewMode === 'Normal' ? <ListaTareas Tareas={Tareas} /> : <ListaTareasEnTarjetas Tareas={Tareas} />
        }

        
    </Grid> */}