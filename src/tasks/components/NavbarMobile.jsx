import { Drawer, SwipeableDrawer } from "@mui/material"
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey, } from '@mui/material/colors';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom"
import { Avatar, Box, Button, Grid, Link, Typography } from "@mui/joy"
import { startLogout } from "../../store/auth/thunks";

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: "absolute",
    bottom: 10,
    left: 'calc(50% - 15px)',
}));

export const NavbarMobile = () => {

    const [open, setOpen] = useState(false);
    const { displayName, photoURL } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [orientation, setOrientation] = useState(window.screen.orientation.type);

    useEffect(() => {

        const handleOrientationChange = () => {
            console.log(orientation);
            setOrientation(window.screen.orientation.type);
            this.forceUpdate();
        };

        window.addEventListener('orientationchange', handleOrientationChange);

        return () => {
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, []);


    const onlogout = () => {
        dispatch(startLogout());
    }

    return (
        <Grid display={{xs: 'block', sm: 'block', md: 'none'}}>
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
        </Grid>
    )
}
