

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom"
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
        <Navbar shouldHideOnScroll className="md:hidden sm:inline"
            classNames={{
                wrapper: 'bg-[#352F44] text-white flex items-center Fuente1'
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                        </svg>
                                        Perfil
                                    </div>
                                </Link>
                                <div className="text-small font-bold flex gap-2 items-center hover:bg-[#D4D4D8] hover:rounded-md hover:cursor-pointer px-1" onClick={onlogout}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-door-closed" viewBox="0 0 16 16">
                                        <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z" />
                                        <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
                                    </svg>
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