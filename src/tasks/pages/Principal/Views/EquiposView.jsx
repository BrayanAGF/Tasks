import { Avatar, AvatarGroup, Box, Button, Card, FormControl, FormLabel, Grid, Input, Modal, ModalClose, ModalDialog, Skeleton, Typography, Link } from "@mui/joy"
import { MenuChico } from "../../../components/MenuChico"
import { CardLoading, FloatingButton } from "../../../components"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../../hooks";
import { startCrearNuevoEquipo, startSelectEquipoActive } from "../../../../store/Equipos/thunks";
import { Link as RouterLink } from "react-router-dom";

const equipoNuevoData = {
    Nombre: '',
    Descripcion: '',
    Owner: ''
}

export const EquiposView = () => {

    const { uid } = useSelector(state => state.auth);
    //const {loading, equipos} = useSelector(state => state.equipos);
    const { Equipos } = useSelector(state => state.principal);
    const [openModal, setOpenModal] = useState(false);
    const { Nombre, Descripcion, onInputChange, onResetForm } = useForm(equipoNuevoData);
    const dispatch = useDispatch();


    const onCreateEquipo = () => {
        dispatch(startCrearNuevoEquipo({ Nombre, Descripcion, Owner: uid, Integrantes: [uid]}))
        onResetForm();
        setOpenModal(false);
    }

    //if(loading) return (<CardLoading />)

    return (
        <>
            <Grid sx={{ flexGrow: 1 }} container spacing={2} className='animate__animated animate__fadeIn animate__faster'>
                <Grid xs={12}>
                    <Grid container justifyContent="center" spacing={2}>
                        {Equipos.map((equipo, index) => (

                            <Grid key={index}>
                                <Card variant="outlined" sx={{ width: {xs: '300px', md: '380px'}, mb: 1}}>
                                    <Grid container justifyContent='space-between'>
                                        <Box width='90%'>
                                            <Link component={RouterLink} underline="none" to="/Equipo" onClick={() => {dispatch(startSelectEquipoActive(equipo))}}>
                                                <Typography level="h3" fontWeight='bold'> {equipo.Nombre} </Typography>
                                            </Link>
                                            <Typography> {equipo.Descripcion} </Typography>
                                            {<AvatarGroup>
                                              {
                                                equipo.infoU.map((p, index) => (
                                                    <Avatar src={p.photoURL} key={index}>
                                                        <Skeleton loading></Skeleton>
                                                    </Avatar>
                                                ))
                                               } 
                                            </AvatarGroup>}
                                        </Box>
                                        {
                                            (equipo.Owner === uid) && 
                                            <Box width='10%'>
                                                <MenuChico idEquipo={equipo.id} />
                                            </Box>
                                        }
                                    </Grid>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            <FloatingButton fn={() => setOpenModal(!openModal)}>
                <i className="bi bi-plus-lg"></i> <Box ml={1}> Nuevo equipo </Box>
            </FloatingButton>

            <Modal open={openModal}>
                <ModalDialog>
                    <ModalClose onClick={() => setOpenModal(!openModal)} />
                    <Typography fontWeight='bold' fontSize={20}>Crear nuevo equipo</Typography>
                    <Typography mb={2}>Ingresa la información de tu nuevo equipo</Typography>
                    <FormControl>
                        <FormLabel sx={{ fontWeight: 'bold' }}>Nombre</FormLabel>
                        <Input name="Nombre" value={Nombre} onChange={onInputChange} />
                    </FormControl>
                    <FormControl>
                        <FormLabel sx={{ fontWeight: 'bold' }}>Descripción</FormLabel>
                        <Input name="Descripcion" value={Descripcion} onChange={onInputChange} />
                    </FormControl>
                    <Button sx={{ marginTop: 2 }} onClick={onCreateEquipo}>
                        Crear
                    </Button>
                </ModalDialog>
            </Modal>

        </>

    )
}


