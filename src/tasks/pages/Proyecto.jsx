import { Box, Grid, LinearProgress, Tab, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
import { tabClasses } from '@mui/joy/Tab';
import { Layout } from "../layout/Layout";
import { TareasView, ArchivosView, ActividadView } from "./Proyecto/Views";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { startLoadProyecto } from "../../store";
import { getDiasDiff } from "../helpers";
import { CircularLoading } from "../components/CircularLoading";
import { MenuChicoOpciones } from "./Proyecto/Components";

export const Proyecto = () => {

  const dispatch = useDispatch();
   
  useEffect(() => {
    dispatch(startLoadProyecto());  
  }, [])

  const { Active, ActiveProgreso, ActiveNT, ActiveNTR, Loading } = useSelector(state => state.proyectos);
  const { Nombre, FechaTermino, Descripcion, Dias} = Active;
  const dias = getDiasDiff(new Date(), FechaTermino);



  return (
    <Layout>
      {
        Loading 
        ? <CircularLoading />
        : <Grid>
          <MenuChicoOpciones />
          <Grid container sx={{
            display: 'grid', placeItems: 'center'
          }}>
            <Grid width={{ sm: '60vw', xs: '95vw', xl: '70vw' }}>
              <Box width={280} >
                <Typography level="h2">{Nombre}</Typography>
              </Box>
              <Typography>{Descripcion}</Typography>
              <LinearProgress determinate variant="plain" color="success" value={ActiveProgreso}
              />
          
              <Grid container justifyContent='space-between'>
                <Grid container alignItems='center'>
                  <i className="bi bi-card-list"></i>
                  <Typography sx={{ ml: 1 }}>{ActiveNTR} / {ActiveNT}</Typography>
                </Grid>
                <Typography>{Dias} Días restantes</Typography>
              </Grid>
            </Grid>
            <Tabs aria-label="tabs" defaultValue={0} sx={{ backgroundColor: 'transparent' }}>
              <TabList
                sx={{
                  width: { sm: '800px', xl: '1200px'},
                  backgroundColor: 'transparent',
                  '--List-padding': '0px',
                  '--List-radius': '0px',
                  '--ListItem-minHeight': '48px',
                  [`& .${tabClasses.root}`]: {
                    boxShadow: 'none',
                    fontWeight: 'md',
                    [`&.${tabClasses.selected}::before`]: {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      left: 'var(--ListItem-paddingLeft)', // change to `0` to stretch to the edge.
                      right: 'var(--ListItem-paddingRight)', // change to `0` to stretch to the edge.
                      bottom: 0,
                      height: 3,
                      bgcolor: 'black',
                    },
                  },
                }}
              >
                <Tab sx={{ backgroundColor: 'transparent' }}>Tareas</Tab>
                <Tab sx={{ backgroundColor: 'transparent' }}>Archivos</Tab>
                <Tab sx={{ backgroundColor: 'transparent' }}>Actividad</Tab>
              </TabList>
              <TabPanel value={0} >
                <TareasView />
              </TabPanel>
              <TabPanel value={1} >
                <ArchivosView />
              </TabPanel>
              <TabPanel value={2} >
                <ActividadView />
              </TabPanel>
            </Tabs>
          </Grid>
        </Grid>
      }
    </Layout>
  )
}
