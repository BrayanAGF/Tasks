import { Avatar, AvatarGroup, Card, CardContent, CardOverflow, Grid, LinearProgress, Link, Tooltip, Typography } from '@mui/joy'
import React from 'react'
import { Link as Routerlink } from 'react-router-dom'
import { setTareaActiva } from '../../../../store/Tareas/tareasSlice'
import { useDispatch } from 'react-redux'

export const ListaTareas = ({ Tareas }) => {

    const dispatch = useDispatch();

    return (
        <Grid className='animate__animated animate__fadeIn animate__faster'>
            {
                Tareas.map((tarea, index) => (
                    <Grid key={index} mb={1}>
                        <Card variant="outlined" sx={{overflow: 'hidden'}}>
                            <CardOverflow>

                                <Grid sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} >
                                    <LinearProgress determinate variant="plain" color="success" value={tarea.progreso} 
                                    sx={{
                                        "--LinearProgress-radius": "0px"
                                    }}/>
                                </Grid>

                            </CardOverflow>
                            <CardContent>
                                <Grid container justifyContent='space-between'>
                                    <Grid>
                                        <Link component={Routerlink} to='/Tarea' onClick={() => dispatch(setTareaActiva(tarea))}>
                                            <Typography fontWeight='bold' >{tarea.Nombre}</Typography>
                                        </Link>
                                        <Typography>{tarea.dias} días restantes</Typography>
                                    </Grid>
                                    <Grid container alignItems="center">
                                        <AvatarGroup>
                                            {
                                                tarea.infoU.map((integrante, index) => (
                                                    <Tooltip title={integrante.displayName} arrow key={index}>
                                                        <Avatar src={integrante.photoURL}></Avatar>
                                                    </Tooltip>
                                                ))
                                            }
                                        </AvatarGroup>
                                        <Grid container alignItems='center' ml={1}>
                                            <i className="bi bi-card-list"></i>
                                            <Typography sx={{ ml: 1 }}>{tarea.nActividadesRealizadas} / {tarea.nActividades}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    )
}
