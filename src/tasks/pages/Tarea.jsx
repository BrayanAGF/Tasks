import { useSelector } from 'react-redux'
import { ActividadesView, NotasView } from './Tareas/Views';
import { useEffect } from 'react';
import { useState } from 'react';
import { Avatar, AvatarGroup, Chip, Progress, Tooltip } from '@nextui-org/react';

export const Tarea = () => {

  const { Tactive, TActividades } = useSelector(state => state.tareas);
  const { Nombre, Descripcion, dias, infoU } = Tactive;
  const [nActividades, setnActividades] = useState(0);
  const [nActividadesRealizadas, setnActividadesRealizadas] = useState(0);
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    setnActividades(TActividades.length);

    let cont = 0;
    TActividades.forEach(act => {
      act.Realizada === true ? cont++ : ''
    });

    setnActividadesRealizadas(cont);
    TActividades.length === 0 ? 0 : setProgreso(cont * 100 / TActividades.length);
  }, [TActividades])


  return (
    <div>

      <div id='HeaderTarea'>
        <div className='flex justify-between items-center gap-3'>
          <h1 className='text-4xl Fuente1'>{Nombre}</h1>
          {
            nActividades === nActividadesRealizadas && nActividades !== 0
            ? <Chip className='text-white bg-[#748E63] Fuente1'>Completada</Chip>
            : <Chip color="secondary" className='text-white Fuente1'>En progreso</Chip>
          }
        </div>
        <p className='text-lg Fuente1'>{Descripcion}</p>
        <AvatarGroup className='flex justify-start ml-2'>
          {
            infoU.map((inte, index) => (
              <Tooltip content={inte.displayName} showArrow key={index}>
                <Avatar src={inte.photoURL} />
              </Tooltip>
            ))
          }
        </AvatarGroup>
        <Progress size='sm' className='mt-2' value={progreso} classNames={{ indicator: 'bg-content2' }} />
        <div className='flex justify-between items-center Fuente1'>
          <div className='flex items-center gap-2 mt-1'>
          <img src="./assets/svg/lista.svg" alt="lista" height="25px" width="25px" />
            <p>{nActividadesRealizadas}/{nActividades} Actividades</p>
          </div>
          <p>{dias} Días restantes</p>
        </div>
      </div>

      <ActividadesView />
      <NotasView />


    </div>
  )
}
