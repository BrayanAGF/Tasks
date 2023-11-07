
import { useDispatch, useSelector } from 'react-redux'
import { Link, Link as Routerlink } from "react-router-dom"
import { startSetTareaActiva } from '../../../../store/Tareas/thunks';
import { Card, CardBody, Progress } from '@nextui-org/react';
import { AddIcon } from '../../../components/Icons';

export const TareasView = () => {

    const { Tareas } = useSelector(state => state.principal);
    const dispatch = useDispatch();

    if (Tareas.length > 0) {
        return (
            <div className='flex flex-col gap-2 md:flex-row animate__animated animate__fadeIn animate__faster'>
                {
                    Tareas.map((value, index) => (
                        <Card key={index} className='w-full md:w-4/12 lg:w-3/12'>
                            <CardBody>
                                <Progress size='sm' aria-label="Loading..." value={value.progreso} className="max-w-md absolute top-0 right-0" color='default'/>
                                <Link to="/Tarea" onClick={() => dispatch(startSetTareaActiva(value))}>
                                    <p className='text-2xl font-bold'>{value.Nombre}</p>
                                </Link>
                                <div className='flex items-center gap-2'>
                                    <img src="./assets/svg/lista.svg" height="30px" width="30px" alt="lista" />
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

