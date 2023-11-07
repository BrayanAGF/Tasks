import { useDispatch } from 'react-redux'
import { Link as Routerlink } from 'react-router-dom'
import { setTareaActiva } from '../../../../store/Tareas/tareasSlice'
import { Avatar, AvatarGroup, Button, Card, CardBody, CircularProgress, Tooltip } from '@nextui-org/react';

export const ListaTareasEnTarjetas = ({ Tareas }) => {

    const dispatch = useDispatch();


    return (
        <div className='flex md:flex-row xs:flex-col gap-2'>
            {
                Tareas.map((tarea, index) => (
                    <Card className='w-12/12 md:w-3/12'>
                        <CardBody className='flex flex-col gap-1 justify-between items-center'>
                            <div className='flex flex-col gap-1 items-center'>
                                <AvatarGroup>
                                    {
                                        tarea.infoU.map((integrante, index) => (
                                            <Tooltip content={integrante.displayName} key={index} showArrow>
                                                <Avatar src={integrante.photoURL} />
                                            </Tooltip>
                                        ))
                                    }
                                </AvatarGroup>
                                <h5 className='text-xl'>{tarea.Nombre}</h5>
                                <p className='text-center'>{tarea.Descripcion}</p>
                                <CircularProgress value={tarea.progreso} showValueLabel classNames={{ svg: 'w-20 h-20', value: "text-xl font-semibold", track: "stroke-content2/10", indicator: "stroke-content2" }} />
                            </div>
                                <Routerlink to="/Tarea" className='justify-self-end'>
                                    <Button className='bg-secondary text-white'  onClick={() => dispatch(setTareaActiva(tarea))}>Ver tarea</Button>
                                </Routerlink>
                        </CardBody>
                    </Card>
                ))
            }
        </div>
    )
}
