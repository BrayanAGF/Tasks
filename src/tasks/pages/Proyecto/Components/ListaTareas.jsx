
import { Link, Link as Routerlink } from "react-router-dom"
import { setTareaActiva } from "../../../../store/Tareas/tareasSlice"
import { useDispatch } from "react-redux"
import { Avatar, AvatarGroup, Card, CardBody, Progress, Tooltip } from "@nextui-org/react";

export const ListaTareas = ({ Tareas }) => {

    const dispatch = useDispatch();

    return (
        <div className="flex flex-col gap-2">
            {
                Tareas.map((value, index) => (
                    <Card key={index}>
                        <CardBody>
                            <Progress size="sm" className="absolute top-0 left-0" value={value.progreso} color="success" />
                            <div className="flex justify-between">
                                <div>
                                    <Link to="/Tarea" onClick={() => dispatch(setTareaActiva(value))}>
                                        <p className="text-lg">{value.Nombre}</p>
                                    </Link>
                                    <p>{value.dias} días restantes</p>
                                </div>
                                <div className="flex flex-col">
                                    <AvatarGroup className="pl-5">
                                        {
                                            value.infoU.map((integrante, index) => (
                                                <Tooltip content={integrante.displayName} showArrow key={index}>
                                                    <Avatar src={integrante.photoURL}></Avatar>
                                                </Tooltip>
                                            ))
                                        }
                                    </AvatarGroup>
                                    <div className="flex gap-2 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-task" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z" />
                                            <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z" />
                                            <path fillRule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z" />
                                        </svg>
                                        <p className="">{value.nActividadesRealizadas} / {value.nActividades}</p>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))
            }
        </div>
    )
}
{/* <Grid className="animate__animated animate__fadeIn animate__faster">
        {
            Tareas.map((tarea, index) => (
                <Grid key={index} mb={1}>
                    <Card variant="outlined" sx={{overflow: "hidden"}}>
                        <CardOverflow>

                            <Grid sx={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }} >
                                <LinearProgress determinate variant="plain" color="success" value={tarea.progreso} 
                                sx={{
                                    "--LinearProgress-radius": "0px",
                                    color: "#28A745"
                                }}/>
                            </Grid>

                        </CardOverflow>
                        <CardContent>
                            <Grid container justifyContent="space-between">
                                <Grid>
                                    <Link component={Routerlink} to="/Tarea" onClick={() => dispatch(setTareaActiva(tarea))}>
                                        <Typography fontWeight="bold" >{tarea.Nombre}</Typography>
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
                                    <Grid container alignItems="center" ml={1}>
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
    </Grid> */}
