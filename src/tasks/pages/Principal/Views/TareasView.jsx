import { Box, Card, CardOverflow, Grid, LinearProgress, Link, Typography } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux'
import { Link as Routerlink } from "react-router-dom"
import { setTareaActiva } from '../../../../store/Tareas/tareasSlice';

export const TareasView = () => {

    const { Tareas } = useSelector(state => state.principal);
    const dispatch = useDispatch();

    return (
        <Grid sx={{ flexGrow: 1 }} container spacing={2} className='animate__animated animate__fadeIn animate__faster'>
            <Grid xs={12}>
                <Grid container justifyContent="center" spacing={1}>
                    {Tareas.map((tarea, index) => (
                        <Grid key={index}>
                            <Card sx={{ width: { xs: '300px', md: '380px' }, overflow: 'hidden', mb: 1}} variant='outlined'>
                                <CardOverflow>

                                    <Grid sx={{ position: 'absolute', top: -8, bottom: 0, left: -8, right: 0, width:'105%' }} >
                                        <LinearProgress determinate value={tarea.progreso}  variant="plain" color="success" sx={{
                                            "--LinearProgress-radius": "0px"
                                        }} />
                                    </Grid>

                                </CardOverflow>
                                <Grid>
                                        <Link component={Routerlink} to='/Tarea' onClick={() => dispatch(setTareaActiva(tarea))}>
                                            <Typography level="h4">{tarea.Nombre}</Typography>
                                        </Link>
                                    <Grid container justifyContent='space-between'>
                                        <Typography><i className="bi bi-list-ul"></i> {tarea.nActividadesRealizadas} / {tarea.nActividades}</Typography>
                                        <Typography>{tarea.pNombre}</Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}
