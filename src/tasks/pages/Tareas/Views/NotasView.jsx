import { Avatar, Card, Grid, IconButton, Typography } from "@mui/joy"
import { ModalCrearNota } from "../Components"
import { useState } from "react"
import { useSelector } from "react-redux";

export const NotasView = () => {

    const [openModalCrearNota, setOpenModalCrearNota] = useState(false);
    const { TNotas } = useSelector(state => state.tareas);

  return (
    <Grid>
            <Grid container mb={1}>
                <Typography level='h3' fontWeight='bold'>Notas</Typography>
                <IconButton sx={{ borderRadius: 100, ml: 1 }} onClick={() => setOpenModalCrearNota(!openModalCrearNota)}>
                    <i className="bi bi-plus-lg"></i>
                </IconButton>
            </Grid>
            {
                TNotas.map((nota, index) => (
                    <Card variant='plain' sx={{ bgcolor: '#FFF7DD', mb: 1 }} key={index}>
                        <Grid container justifyContent='space-between'>
                            <Grid>
                                <Grid container alignItems='center'>
                                    <Avatar src={nota.uInfo.photoURL}/>
                                    <Typography sx={{ ml: 1 }} fontWeight='bold'>{nota.Titulo}</Typography>
                                </Grid>
                                <Typography>{nota.Nota}</Typography>
                            </Grid>
                            <Typography>{nota.Fecha}</Typography>
                        </Grid>
                    </Card>
                ))
            }

            <ModalCrearNota open={openModalCrearNota} set={() => setOpenModalCrearNota(!openModalCrearNota)}/>
        </Grid>
  )
}
