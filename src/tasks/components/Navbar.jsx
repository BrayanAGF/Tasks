import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../store/auth/thunks";
import { Link } from "react-router-dom";
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
        <div className="bg-primary hidden h-screen w-2/12 md:flex md:flex-col justify-between fixed text-white Fuente1">

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


        </div>
    )
}

