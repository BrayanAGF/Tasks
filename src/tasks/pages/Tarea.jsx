import { Avatar, AvatarGroup, Box, Divider, Grid, LinearProgress, Tooltip, Typography } from '@mui/joy'
import { Layout } from '../layout/Layout'
import { useSelector } from 'react-redux'
import { OpcionesTarea } from './Tareas/Components';
import { ActividadesView, NotasView } from './Tareas/Views';
import { useEffect } from 'react';
import { useState } from 'react';

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

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--progreso', `${progreso}%`);
  }, [progreso])
  
  

  return (
    <Layout>
      <Grid sx={{ display: 'grid', placeItems: 'center' }}>

        <Grid width={{ sm: '60vw', xs: '95vw' }}>
          <Grid>
            <Grid container justifyContent='space-between'>
              <Typography level="h2" sx={{width: {xs: 300}}}>{Nombre}</Typography>
            <Box>
              <OpcionesTarea />
            </Box>
            </Grid>
              <Typography level="h5">{Descripcion}</Typography>
          </Grid>
          <AvatarGroup sx={{mb: 1}}>
            {
              infoU.map((inte, index) => (
                <Tooltip title={inte.displayName} arrow key={index}>
                  <Avatar src={inte.photoURL} />
                </Tooltip>
              ))
            }
          </AvatarGroup>
          <LinearProgress determinate variant="plain" color="success" value={100}
          className='barraProgreso'/>
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
      </Grid>
    </Layout>
  )
}
