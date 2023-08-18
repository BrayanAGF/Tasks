import { Avatar, AvatarGroup, Box, Button, Card, CardContent, CircularProgress, Grid, Link, Tooltip, Typography } from '@mui/joy'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link as Routerlink } from 'react-router-dom'
import { setTareaActiva } from '../../../../store/Tareas/tareasSlice'

export const ListaTareasEnTarjetas = ({ Tareas }) => {
    
    const dispatch = useDispatch();
    
    
    return (
        <Grid 
        container 
        className='animate__animated animate__fadeIn animate__faster'
        /* width={{md: 800, xl: 1200}} */
        justifyContent={{xs: 'center'}}
        >
            {
                Tareas.map((tarea, index) => (
                    <Card key={index} variant='outlined' sx={{ ml: 2, mb: 2, width: 200, height: '100%' }}>
                        <CardContent>
                            <Grid sx={{ display: 'grid', placeItems: 'center'}} textAlign='center'>
                                <AvatarGroup>
                                    {
                                        tarea.infoU.map((integrante, index) => (
                                            <Tooltip title={integrante.displayName} key={index} arrow>
                                                <Avatar src={integrante.photoURL} />
                                            </Tooltip>
                                        ))
                                    }
                                </AvatarGroup>
                                <Typography fontWeight='bold'>{tarea.Nombre}</Typography>
                            </Grid>
                            <Typography sx={{ mt: 1 }}>{tarea.Descripcion}</Typography>
                            <Box container='true' sx={{display: 'grid', placeItems: 'center', mt: 1}}>
                                <CircularProgress size="lg" determinate value={tarea.progreso}>
                                    {tarea.nActividadesRealizadas} / {tarea.nActividades}
                                </CircularProgress>
                            <Link component={Routerlink} to='/Tarea' 
                            onClick={() => dispatch(setTareaActiva(tarea))}
                            underline='none'
                            sx={{color: 'white', mt: 1}}
                            >
                            <Button> 
                            Ver tarea
                            </Button>
                            </Link>
                            </Box>
                        </CardContent>
                    </Card>
                ))
            }
        </Grid>
    )
}
