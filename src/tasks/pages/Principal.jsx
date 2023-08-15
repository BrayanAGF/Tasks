import { Box, Grid, Tab, TabList, TabPanel, Tabs } from "@mui/joy"
import { Layout } from "../layout/Layout"
import { tabClasses } from '@mui/joy/Tab';
import { EquiposView, ProyectosView, TareasView } from "./Principal/Views";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadApp } from "../../store/Principal/thunks";
import { CardLoading } from "../components";


export const Principal = () => {

  const dispatch = useDispatch();
  const {Loading} = useSelector(state => state.principal)

  useEffect(() => {
    dispatch(startLoadApp());
  }, [])


 
  return (
    <Layout>

      <Grid>
        <Tabs aria-label="tabs" defaultValue={0} sx={{ backgroundColor: 'transparent' }}>
          <TabList
            sx={{
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
            <Tab sx={{ backgroundColor: 'transparent' }}>Mis equipos</Tab>
            <Tab sx={{ backgroundColor: 'transparent' }}>Mis proyectos</Tab>
            <Tab sx={{ backgroundColor: 'transparent' }}>Mis tareas</Tab>
          </TabList>


          <Box marginTop={2}>
            <Box sx={{overflowX: 'hidden', overflowY: 'hidden'}}>
              <TabPanel value={0}>
               { 
                Loading 
                ? <CardLoading />
                : <EquiposView/>
                }
              </TabPanel>
            </Box>



            <Box overflow='hidden'>
              <TabPanel value={1} >
                { 
                Loading 
                ? <CardLoading />
                : <ProyectosView />
                }
              </TabPanel>
            </Box>


            <Box overflow='hidden'>
              <TabPanel value={2} >
              { 
                Loading 
                ? <CardLoading />
                : <TareasView />
              }
              </TabPanel>
            </Box>

          </Box>

        </Tabs>

      </Grid>
      
      

    </Layout>
  )
}
