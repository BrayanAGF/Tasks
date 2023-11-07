
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
                            <Progress size="sm" className="absolute top-0 left-0" value={value.progreso}  color='default' />
                            <div className="flex justify-between">
                                <div>
                                    <Link to="/Tarea" onClick={() => dispatch(setTareaActiva(value))}>
                                        <p className="text-lg" aria-label="nombre tarea">{value.Nombre}</p>
                                    </Link>
                                    <p aria-label="dias restantes tarea">{value.dias} días restantes</p>
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
                                        <img src="./assets/svg/lista.svg" alt="lista" height="25px" width="25px" />
                                        <p aria-label="actividades realizadas y actividades pendientes">{value.nActividadesRealizadas} / {value.nActividades}</p>
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
