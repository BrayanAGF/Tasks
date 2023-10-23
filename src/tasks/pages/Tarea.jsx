import { useSelector } from 'react-redux'
import { OpcionesTarea } from './Tareas/Components';
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
            ? <Chip color="success" className='text-white'>Completada</Chip>
            : <Chip color="secondary" className='text-white'>En progreso</Chip>
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
        <Progress size='sm' className='mt-2' value={progreso} classNames={{ indicator: 'bg-[#352f44]' }} />
        <div className='flex justify-between items-center Fuente1'>
          <div className='flex items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-task" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z" />
              <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z" />
              <path fillRule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z" />
            </svg>
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

{/* <Grid sx={{ display: 'grid', placeItems: 'center' }}>

    <Grid width={{ sm: '60vw', xs: '95vw' }}>
      <Grid >
        <Grid container justifyContent='space-between'>
          <Typography level="h2" sx={{ width: { xs: 300 } }}>{Nombre}</Typography>
          <Box>
            {
              Owner === uid && <OpcionesTarea />
            }
          </Box>
        </Grid>
        <Typography level="h5">{Descripcion}</Typography>
      </Grid>
      <AvatarGroup sx={{ mb: 1 }}>
        {
          infoU.map((inte, index) => (
            <Tooltip title={inte.displayName} arrow key={index}>
              <Avatar src={inte.photoURL} />
            </Tooltip>
          ))
        }
      </AvatarGroup>
      <LinearProgress determinate variant="plain" value={100}
        className='barraProgreso' sx={{color: '#28A745'}} />
      <Grid container justifyContent='space-between'>
        <Grid container alignItems='center'>
          <i className="bi bi-card-list"></i>
          <Typography sx={{ ml: 1 }}>{nActividadesRealizadas} / {nActividades}</Typography>
        </Grid>
        <Typography>{dias} Días restantes</Typography>
      </Grid>

      <Grid width='100%' mb={2}><Divider /></Grid>

      <ActividadesView />
      <NotasView />

    </Grid>
  </Grid> */}