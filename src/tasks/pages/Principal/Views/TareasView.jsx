
import { useDispatch, useSelector } from 'react-redux'
import { Link, Link as Routerlink } from "react-router-dom"
import { startSetTareaActiva } from '../../../../store/Tareas/thunks';
import { Card, CardBody, Progress } from '@nextui-org/react';

export const TareasView = () => {

    const { Tareas } = useSelector(state => state.principal);
    const dispatch = useDispatch();

    if (Tareas.length > 0) {
        return (
            <div className='flex gap-2 animate__animated animate__fadeIn animate__faster'>
                {
                    Tareas.map((value, index) => (
                        <Card key={index} className='w-4/12'>
                            <CardBody>
                                <Progress size='sm' aria-label="Loading..." value={value.progreso} className="max-w-md absolute top-0 right-0"
                                    classNames={{
                                        indicator: "bg-[#4c4365]"
                                    }} />
                                <Link to="/Tarea" onClick={() => dispatch(startSetTareaActiva(value))}>
                                    <p className='text-2xl font-bold'>{value.Nombre}</p>
                                </Link>
                                <div className='flex items-center gap-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-task" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z" />
                                        <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z" />
                                        <path fillRule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z" />
                                    </svg>
                                    <p>{value.nActividadesRealizadas} / {value.nActividades}</p>
                                </div>
                                <p>{value.pNombre}</p>
                            </CardBody>
                        </Card>
                    ))
                }
            </div>
        )
    } else {
        return (
            <div className="grid place-items-center h-full w-full animate__animated animate__fadeIn animate__faster">
                <div className="flex flex-col items-center">
                    <img src="./assets/images/Library.svg" width='402px' height='300px' />
                    <p className="font-bold Fuente1 text-2xl relative">Parece que no tienes tareas por ahora</p>
                </div>
            </div>
        )
    }
}

{/* <Grid sx={{ flexGrow: 1 }} container spacing={2} className='animate__animated animate__fadeIn animate__faster'>
        <Grid xs={12}>
            <Grid container justifyContent="center" spacing={1}>
                {
                    Tareas.length === 0
                        ? <Grid sx={{display: 'grid', placeItems: 'center'}} height='80vh'>
                            <Grid textAlign='center'>
                                <Typography level='h3' fontWeight='bold'>Parece que no tienes tareas por ahora</Typography>
                                <img src='./assets/images/Library.svg' width='512px' height='300px'/>
                            </Grid>
                          </Grid>
                        : Tareas.map((tarea, index) => (
                            <Grid key={index}>
                                <Card sx={{ width: { xs: '300px', md: '380px' }, overflow: 'hidden', mb: 1 }} variant='outlined'>
                                    <CardOverflow>

                                        <Grid sx={{ position: 'absolute', top: -8, bottom: 0, left: -8, right: 0, width: '105%' }} >
                                            <LinearProgress determinate value={tarea.progreso} variant="plain" color="success" sx={{
                                                "--LinearProgress-radius": "0px"
                                            }} />
                                        </Grid>

                                    </CardOverflow>
                                    <Grid>
                                        <Link component={Routerlink} to='/Tarea' onClick={() => dispatch(startSetTareaActiva(tarea))}>
                                            <Typography level="h4">{tarea.Nombre}</Typography>
                                        </Link>
                                        <Grid container justifyContent='space-between'>
                                            <Typography><i className="bi bi-list-ul"></i> {tarea.nActividadesRealizadas} / {tarea.nActividades}</Typography>
                                            <Typography>{tarea.pNombre}</Typography>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        ))
                }
            </Grid>
        </Grid>
    </Grid> */}