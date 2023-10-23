import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../store/auth/thunks";
import { Link } from "react-router-dom";
import { Collapse, ListItemText } from "@mui/material";
import { AccountTreeRounded, ExpandLess, ExpandMore, HomeRounded } from "@mui/icons-material";
import ListItemDecorator, {
    listItemDecoratorClasses,
} from '@mui/joy/ListItemDecorator';
import { startSetActiveProyecto } from "../../store";
import { Avatar, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";



export const Navbar = () => {

    const { photoURL, displayName, ProyectosFavoritos } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const buttonRef = useRef();
    const [OpenMenu, setOpenMenu] = useState(false);
    const [openProyectos, setOpenProyectos] = useState(false);

    const onlogout = () => {
        dispatch(startLogout());
    }

    const onHandleNavigate = (idProyecto) => {
        dispatch(startSetActiveProyecto(idProyecto));
        setOpenProyectos(false);
    }

    return (
        <div className="bg-[#352F44] h-screen w-2/12 flex flex-col justify-between fixed text-white Fuente1">

            <div className="flex flex-col items-center">
                <h2 className="text-4xl mt-5"><i className="bi bi-exclude" /> Tasks</h2>

                <div className="mt-5">
                    <Link to='/*'>
                        <p className="text-xl">Inicio</p>
                    </Link>

                    {/* {
                            ProyectosFavoritos && <Grid>
                                <ListItemButton onClick={() => setOpenProyectos(!openProyectos)} sx={{ color: 'white' }}>
                                    <ListItemDecorator sx={{ color: 'white' }}>
                                        <AccountTreeRounded />
                                    </ListItemDecorator>
                                    <ListItemContent>Mis proyectos</ListItemContent>
                                    {openProyectos ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={openProyectos} timeout="auto" unmountOnExit>
                                    <List component="div">
                                        {
                                            ProyectosFavoritos.map((pf, index) => (
                                                <ListItemButton sx={{ color: 'white', py: 0 }} key={index}>
                                                    <Link component={RouterLink}
                                                        to='/Proyecto'
                                                        underline="none"
                                                        sx={{ color: '#6D5D6E', pl: 5 }}
                                                        onClick={() => onHandleNavigate(pf.id)}>
                                                        <ListItemText primary={pf.Nombre} />
                                                    </Link>
                                                </ListItemButton>
                                            ))
                                        }
                                    </List>
                                </Collapse>
                            </Grid>
                        } */}
                </div>
            </div>

            <div>
                <Popover placement="top" isOpen={OpenMenu} onOpenChange={(open) => setOpenMenu(open)}>
                    <PopoverTrigger>
                        <Avatar src={photoURL} className="ml-3 mb-3 hover:cursor-pointer"></Avatar>
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


        </div>
    )
}

{/* <Grid
    container
    flex
    bgcolor='#343A40'
    direction='column'
    justifyContent='flex-start'
    alignContent='center'
    textAlign='center'
    width='15vw'
    height='100vh'
    position='fixed'
    display={{ xs: 'none', md: 'inherit' }}
    zIndex={30}
>
    <Typography fontSize={{ xs: 25, md: 26, lg: 30 }} sx={{ color: 'white', mt: 2 }}><i className="bi bi-exclude" /> Tasks</Typography>

    <Grid
        container
        height='calc(100vh - 65px)'
        width='100%'
        direction='column'
        justifyContent='space-between'
    >
        <Grid>
            <Grid width={'100%'} mb={1} mt={2}><Divider /></Grid>

            <List sx={{
                '--ListItem-paddingLeft': '0px',
                '--ListItemDecorator-size': '64px',
                '--ListItem-minHeight': '32px',
                '--List-nestedInsetStart': '13px',
                [`& .${listItemDecoratorClasses.root}`]: {
                    justifyContent: 'flex-end',
                    pr: '18px',
                },
                '& [role="button"]': {
                    borderRadius: '0 20px 20px 0',

                    '&:hover': {
                        backgroundColor: '#4F4557',
                        color: 'white',
                    },
                },
                margin: 0,
                padding: 0
            }}>
                <Link component={RouterLink} underline="none" to="/*" sx={{ color: 'white' }}>
                    <ListItemButton sx={{ color: 'white' }}>
                        <ListItemDecorator sx={{ color: 'white' }}>
                            <HomeRounded />
                        </ListItemDecorator>
                        <ListItemContent>Inicio</ListItemContent>
                    </ListItemButton>
                </Link>
                {
                    ProyectosFavoritos && <Grid>
                        <ListItemButton onClick={() => setOpenProyectos(!openProyectos)} sx={{ color: 'white' }}>
                            <ListItemDecorator sx={{ color: 'white' }}>
                                <AccountTreeRounded />
                            </ListItemDecorator>
                            <ListItemContent>Mis proyectos</ListItemContent>
                            {openProyectos ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openProyectos} timeout="auto" unmountOnExit>
                            <List component="div">
                                {
                                    ProyectosFavoritos.map((pf, index) => (
                                        <ListItemButton sx={{ color: 'white', py: 0 }} key={index}>
                                            <Link component={RouterLink}
                                                to='/Proyecto'
                                                underline="none"
                                                sx={{ color: '#6D5D6E', pl: 5 }}
                                                onClick={() => onHandleNavigate(pf.id)}>
                                                <ListItemText primary={pf.Nombre} />
                                            </Link>
                                        </ListItemButton>
                                    ))
                                }
                            </List>
                        </Collapse>
                    </Grid>
                }
            </List>
        </Grid>

        <Grid>

            <Grid display={{ xs: 'none', md: 'block' }} marginBottom={1}><Divider /></Grid>
            <Grid>
                <Box sx={{ cursor: 'pointer', pl: 1 }} width={40}>
                    <button style={{
                        backgroundColor: 'transparent',
                        padding: 0,
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                        <Avatar
                            ref={buttonRef}
                            onClick={() => {
                                setOpen(!open);
                            }}
                            alt={displayName}
                            src={photoURL}
                        />
                    </button>
                </Box>
                <Menu
                    size="sm"
                    anchorEl={buttonRef.current}
                    open={open}
                    onClose={handleClose}
                    placement="bottom-end"
                >
                    <Link component={RouterLink} underline="none" color="inherit" to='/Perfil'>
                        <MenuItem>
                            Perfil
                        </MenuItem>
                    </Link>
                    <ListDivider />
                    <MenuItem onClick={onlogout}>
                        Cerrar sesión
                    </MenuItem>
                </Menu>
            </Grid>

        </Grid>
    </Grid>

</Grid> */}