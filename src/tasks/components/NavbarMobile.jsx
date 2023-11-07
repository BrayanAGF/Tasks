

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { startLogout } from "../../store/auth/thunks";
import { Avatar, Navbar, NavbarBrand, NavbarContent, NavbarItem, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";


export const NavbarMobile = () => {

    const [open, setOpen] = useState(false);
    const { displayName, photoURL } = useSelector(state => state.auth);
    const [OpenMenu, setOpenMenu] = useState(false);
    const dispatch = useDispatch();

    const onlogout = () => {
        dispatch(startLogout());
    }

    return (
        <Navbar shouldHideOnScroll className="md:hidden xs:inline"
            classNames={{
                wrapper: 'bg-primary text-white flex items-center Fuente1'
            }}
        >
            <NavbarBrand className="flex items-center">
                <h2 className="text-xl "><i className="bi bi-exclude" /> Tasks</h2>
            </NavbarBrand>
            <NavbarContent className="sm:flex gap-4" justify="center">

                <NavbarItem>
                    <Link to='/*'>
                        Inicio
                    </Link>
                </NavbarItem>

                <div>
                    <Popover placement="bottom-end" isOpen={OpenMenu} onOpenChange={(open) => setOpenMenu(open)}>
                        <PopoverTrigger>
                            <Avatar src={photoURL} className="hover:cursor-pointer"></Avatar>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="flex flex-col gap-1 py-2">
                                <Link to="/Perfil" onClick={() => setOpenMenu(false)}>
                                    <div className="text-small font-bold flex gap-2 items-center hover:bg-[#D4D4D8] hover:rounded-md hover:cursor-pointer px-1">
                                    <img src='./assets/svg/ajustes.svg' height="30px" width="30px" />
                                        Ajustes
                                    </div>
                                </Link>
                                <div className="text-small font-bold flex gap-2 items-center hover:bg-[#D4D4D8] hover:rounded-md hover:cursor-pointer px-1" onClick={onlogout}>
                                    <img src="./assets/svg/salir.svg" height="30px" width="30px" alt="sesionCerrar" />
                                    Cerrar sesión
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </NavbarContent>

        </Navbar>
    )
}

{/* <Grid display={{xs: 'block', sm: 'block', md: 'none'}}>
        <Grid bgcolor='#343A40' width={'100vw'} position='absolute' top={0} left={0} right={0} onClick={() => setOpen(true)}>
            <Grid container justifyContent='space-between' alignItems='center'>
                <Typography sx={{ p: 2, color: 'white' }} level="h5"> <i className="bi bi-exclude" />  Tasks</Typography>
                <Avatar alt={displayName} src={photoURL} sx={{ mr: 1 }} />
            </Grid>
            <Puller />
        </Grid>

        <Drawer
            anchor='top'
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{
                sx: {
                    px: 2,
                    pb: 2,
                    height: orientation === "portrait-primary" ? '22vh' : '45vh',
                    overflow: 'hidden',
                    bgcolor: '#343A40'
                }
            }}
        >
            <Grid container flexDirection='column' alignItems='center' mt={2}>
                <Typography>
                    <Link component={RouterLink} underline="none" to="/*" sx={{ color: 'white' }}>Inicio</Link>
                </Typography>
                <Typography sx={{ color: 'white' }}>
                    Mis proyectos
                </Typography>
                <Typography sx={{ color: 'white' }}>
                    <Link component={RouterLink} underline="none" to='/Perfil' sx={{ color: 'white' }}>Perfil</Link>
                </Typography>
                <Typography sx={{ color: 'white' }} onClick={onlogout}>
                    Cerrar sesión
                </Typography>
            </Grid>
            <Grid bgcolor='#343A40' width='100%'>
                <Grid container justifyContent='space-between' alignItems='center'>
                    <Typography sx={{ p: 2, color: 'white' }} level="h5"> <i className="bi bi-exclude" />  Tasks</Typography>
                    <Avatar alt={displayName} src={photoURL} sx={{ mr: 1 }} />
                </Grid>
                <Puller />
            </Grid>
        </Drawer>
    </Grid> */}