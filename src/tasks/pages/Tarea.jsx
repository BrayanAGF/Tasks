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
  

  return (
    <Layout>
      <Grid sx={{ display: 'grid', placeItems: 'center' }}>

        <Grid width={{ sm: '60vw', xs: '95vw' }}>
          <Grid container justifyContent='space-between'>
            <Grid>
              <Typography level="h2">{Nombre}</Typography>
              <Typography level="h5">{Descripcion}</Typography>
            </Grid>
            <Box>
              <OpcionesTarea />
            </Box>
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
          <LinearProgress determinate variant="plain" color="success" value={progreso}
          sx={{transitionProperty: 'width', transitionDuration: '300ms'}}/>
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
