import { Avatar, Box, Card, Divider, Grid, Typography } from '@mui/joy'
import { useSelector } from 'react-redux'

export const ActividadView = () => {

    const { Actividad } = useSelector(state => state.actividad);

    return (
        <Grid mt={2}  className='animate__animated animate__fadeIn animate__faster'>
            <Typography level='h4' fontWeight='bold'> Actividad </Typography>

            <Card variant='outlined'>
                {
                    Actividad.map((act, index) => (
                        <Grid key={index}>
                            <Grid container padding={1} alignItems='center'>
                                <Grid container >
                                    <Box sx={{ borderRadius: 100, display: 'grid', placeItems: 'center' }}
                                        bgcolor='blue' color='white' width={40} height={40} zIndex={10}>
                                        <span><i className="bi bi-file-earmark-fill"></i></span>
                                    </Box>
                                    <Box right={8} position='relative'>
                                        <Avatar src={act.photoURL}/>
                                    </Box>
                                </Grid>
                                <Grid>
                                    <Typography>
                                        <Typography fontWeight='bold'>{act.Integrante} </Typography>
                                        {act.Mensaje}
                                        <Typography fontWeight='bold' sx={{ color: 'blue' }}> {act.Complemento}</Typography>
                                    </Typography>
                                    <Typography>{act.Fecha}</Typography>
                                </Grid>
                            
                            </Grid>
                               <Grid width='100%' mt={1}><Divider /></Grid>
                        </Grid>
                    ))
                }
            </Card>
        </Grid>
    )
}
