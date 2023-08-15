import { Avatar, AvatarGroup, Box, Divider, Grid, IconButton, Tab, TabList, TabPanel, Tabs, Tooltip, Typography } from "@mui/joy"
import { tabClasses } from '@mui/joy/Tab';
import { Layout } from "../layout/Layout"
import { useSelector } from "react-redux"
import { FloatingButton } from "../components";
import { useEffect, useState } from "react";

import {ModalAgregarUsuario, ModalCrearProyecto, MenuChicoProyectos} from './Equipo/Components'
import { ProyectosEquipoView, IntegrantesEquipoView } from "./Equipo/Views";


export const Equipo = () => {

    const [openModal, setOpenModal] = useState(false);
    const [ownerOn, setOwnerOn] = useState(false);
    const [openModalAgregarUsuario, setOpenModalAgregarUsuario] = useState(false);
    const { active } = useSelector(state => state.equipos);
    const { uid } = useSelector(state => state.auth);

    useEffect(() => {
        if (active.Owner === uid) {
            setOwnerOn(true);
        }
    }, [])


    return (
        <Layout>
            <Grid container sx={{
                display: 'grid', placeItems: 'center'
            }} className='animate__animated animate__fadeIn animate__faster'>
                <Grid width={{ md: '60vw' }}>
                    <Typography level="h2">{active.Nombre}</Typography>
                    <Typography level="h5">{active.Descripcion}</Typography>
                    <AvatarGroup>
                        {
                            active.infoU.map((usuario) => (
                                <Tooltip key={usuario.displayName} title={usuario.displayName} arrow placement="bottom">
                                    <Avatar src={usuario.photoURL}></Avatar>
                                </Tooltip>
                            ))
                        }
                        {
                            ownerOn && <IconButton sx={{ borderRadius: 100 }} onClick={() => setOpenModalAgregarUsuario(!openModalAgregarUsuario)}>
                                <i className="bi bi-plus-lg"></i>
                            </IconButton>
                        }
                    </AvatarGroup>
                    <Grid mt={1}>
                        <Divider />
                    </Grid>

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
                            <Tab sx={{ backgroundColor: 'transparent' }}>Proyectos</Tab>
                            <Tab sx={{ backgroundColor: 'transparent' }}>Integrantes</Tab>
                        </TabList>

                        <TabPanel value={0} >
                            <ProyectosEquipoView />
                        </TabPanel>

                        <TabPanel value={1} >
                            <IntegrantesEquipoView />
                        </TabPanel>

                        {
                            ownerOn &&
                            <Grid>
                                <FloatingButton fn={() => setOpenModal(!openModal)}>
                                    <i className="bi bi-plus-lg"></i> <Box ml={1}> Nuevo proyecto </Box>
                                </FloatingButton>
                                <ModalCrearProyecto open={openModal} set={() => setOpenModal(!openModal)} />
                                <ModalAgregarUsuario open={openModalAgregarUsuario} set={() => setOpenModalAgregarUsuario(!openModalAgregarUsuario)} />
                            </Grid>
                        }
                    </Tabs>

                    

                </Grid>
            </Grid>
        </Layout>
    )
}
