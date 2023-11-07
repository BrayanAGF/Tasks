
import { useDispatch, useSelector } from 'react-redux';
import { Link, Link as RouterLink } from 'react-router-dom'
import { startSetActiveProyecto } from '../../../../store';
import { Card, CardBody, Progress } from '@nextui-org/react';

export const ProyectosView = () => {

    const { Proyectos } = useSelector(state => state.principal)
    const dispatch = useDispatch();


    if (Proyectos.length > 0) {
        return (
            <div className='flex flex-col gap-2 md:flex-row animate__animated animate__fadeIn animate__faster'>
                {
                    Proyectos.map((value, index) => (
                        <Card className='w-full md:w-4/12 lg:w-3/12' key={index}>
                            <CardBody>
                                <Progress size='sm' aria-label="Loading..." value={value.Progreso} className="max-w-md absolute top-0 right-0" color='default'/>
                                <Link to="/Proyecto" onClick={() => dispatch(startSetActiveProyecto(value.id))}>
                                    <p className='text-2xl font-bold'>{value.Nombre}</p>
                                </Link>
                                <div className='flex items-center gap-2'>
                                    <img src="./assets/svg/lista.svg" height="30px" width="30px" alt="lista" />
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
