import {  Grid, IconButton, Switch, Typography } from "@mui/joy"
import { ListaTareas, ListaTareasEnTarjetas, ModalCrearTarea } from "../Components"
import { useState } from "react"
import { useSelector } from "react-redux"


export const TareasView = () => {

    const [openModal, setOpenModal] = useState(false);
    const { Tareas, ViewMode } = useSelector(state => state.tareas);

    return (
        <Grid width={{xs: '95vw', md: '68vw'}} className='animate__animated animate__fadeIn animate__faster'>
            <Grid container mt={2} mb={2} justifyContent='space-between'>
                <Grid container>
                    <Typography level="h4" fontWeight='bold'>Tareas</Typography>
                    <IconButton sx={{ borderRadius: 100, ml: 1 }} onClick={() => { setOpenModal(!openModal) }}>
                        <i className="bi bi-plus-lg" />
                    </IconButton>
                </Grid>
            </Grid>

            {
                ViewMode === 'Normal' ? <ListaTareas Tareas={Tareas} /> : <ListaTareasEnTarjetas Tareas={Tareas} />
            }
            
            <ModalCrearTarea open={openModal} set={() => setOpenModal(!openModal)} />
        </Grid>
    )
}
