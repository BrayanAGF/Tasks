import { Avatar, Box, Divider, Grid, Link, ListDivider, Menu, MenuItem, Typography } from "@mui/joy"
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../store/auth/thunks";
import { Link as RouterLink } from "react-router-dom";



export const Navbar = () => {

    const { photoURL, displayName } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const buttonRef = useRef();
    const [open, setOpen] = useState(false);

    const onlogout = () => {
        dispatch(startLogout());
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid
            container
            flex
            bgcolor='#343A40'
            direction={{ md: 'column', xs: 'row' }}
            justifyContent={{ xs: 'space-between', md: 'flex-start' }}
            alignContent='center'
            textAlign='center'
            paddingX={2}
            paddingY={1}
            width={{ xs: '100vw', md: '15vw' }}
            height={{ md: '100vh' }}
            position='fixed'
            zIndex={30}

        >
            <Typography fontSize={{ xs: 25, md: 26, lg: 30 }} sx={{ color: 'white' }}><i className="bi bi-exclude" /> Tasks</Typography>

            <Grid
                container
                height={{md: 'calc(100vh - 65px)'}}
                width={{ md: '13vw' }}
                direction={{ md: 'column' }}
                justifyContent='space-between'
            >
                <Grid
                    container
                    direction={{ md: 'column', sx: 'row' }}
                    alignContent='center'
                >
                    <Grid display={{ xs: 'none', md: 'block' }} width='100%' marginBottom={1}><Divider /></Grid>
                    <Grid container direction={{ sm: 'row', md: 'column' }} spacing={1}>
                      
                            <Typography marginRight={2} alignSelf='center' >
                                <Link component={RouterLink} underline="none" to="/*" sx={{color: 'white'}}>Inicio</Link>
                            </Typography>
                            <Typography marginRight={2} alignSelf='center' sx={{color: 'gray'}}>
                                Mis proyectos
                            </Typography>
                        
                    </Grid>
                </Grid>

                <Grid>

                    <Grid display={{ xs: 'none', md: 'block' }} marginBottom={1}><Divider /></Grid>
                    <Grid>

                        <Box sx={{ cursor: 'pointer' }} width={40}>
                                <button style={{
                                    backgroundColor: 'transparent',
                                    padding: 0,
                                    border: 'none',
                                    cursor: 'pointer'}}>
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
                            <MenuItem>
                                <Link component={RouterLink} underline="none" color="inherit" to='/Perfil'>Perfil</Link>
                            </MenuItem>
                            <ListDivider />
                            <MenuItem onClick={onlogout}>
                                Cerrar sesión
                            </MenuItem>
                        </Menu>
                    </Grid>



                </Grid>
            </Grid>

        </Grid>
    )
}
