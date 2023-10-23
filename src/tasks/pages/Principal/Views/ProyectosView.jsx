
import { useDispatch, useSelector } from 'react-redux';
import { Link, Link as RouterLink } from 'react-router-dom'
import { startSetActiveProyecto } from '../../../../store';
import { Card, CardBody, Progress } from '@nextui-org/react';

export const ProyectosView = () => {

    const { Proyectos } = useSelector(state => state.principal)
    const dispatch = useDispatch();


    if (Proyectos.length > 0) {
        return (
            <div className='flex gap-2 animate__animated animate__fadeIn animate__faster'>
                {
                    Proyectos.map((value, index) => (
                        <Card className='w-4/12' key={index}>
                            <CardBody>
                                <Progress size='sm' aria-label="Loading..." value={value.Progreso} className="max-w-md absolute top-0 right-0"
                                    classNames={{
                                        indicator: "bg-[#4c4365]"
                                    }}
                                />
                                <Link to="/Proyecto" onClick={() => dispatch(startSetActiveProyecto(value.id))}>
                                    <p className='text-2xl font-bold'>{value.Nombre}</p>
                                </Link>
                                <div className='flex items-center gap-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-task" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z" />
                                        <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z" />
                                        <path fillRule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z" />
                                    </svg>
                                    <p>
                                        {value.nActividadesRealizadas} / {value.nActividades}
                                    </p>
                                </div>
                                <p className='mt-3'>{value.Dias} Dias restantes</p>
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
                    <img src="./assets/images/Team.svg" width='402px' height='300px' />
                    <p className="font-bold Fuente1 text-2xl relative">Parece que no tienes equipos, intenta crear uno o espera a que alguien te una al suyo</p>
                </div>
            </div>
        )
    }


}
