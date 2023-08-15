import { Box, Card, CardOverflow, Grid, LinearProgress, Link, Typography } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom'
import { startSetActiveProyecto } from '../../../../store';

export const ProyectosView = () => {

    const { Proyectos } = useSelector(state => state.principal)
    const dispatch = useDispatch();

    return (
        <Grid sx={{ flexGrow: 1 }} container spacing={2} className='animate__animated animate__fadeIn animate__faster'>
            <Grid xs={12}>
                <Grid container justifyContent="center" spacing={2}>
                    {Proyectos.map((proyecto, index) => (
                        <Grid key={index}>
                            <Card variant='outlined' sx={{ width: { xs: '300px', md: '380px' }, overflow: 'hidden', mb: 1}} >
                                <CardOverflow>

                                    <Grid sx={{ position: 'absolute', top: -8, bottom: 0, left: -8, right: 0, width:'105%'}} >
                                        <LinearProgress determinate value={proyecto.Progreso} variant="plain" color="success" sx={{
                                            "--LinearProgress-radius": "0px"
                                        }} />
                                    </Grid>

                                </CardOverflow>
                                <Grid>
                                    <Box>
                                        <Link component={RouterLink} to='/Proyecto' onClick={() => dispatch(startSetActiveProyecto(proyecto))}>
                                            <Typography level="h4">{proyecto.Nombre}</Typography>
                                        </Link>
                                    </Box>
                                    <Grid container justifyContent='space-between'>
                                        <Typography><i className="bi bi-list-ul"></i> {proyecto.nActividadesRealizadas} / {proyecto.nActividades}</Typography>
                                        <Typography>{proyecto.Dias} Dias restantes</Typography>
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
