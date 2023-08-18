import { SwipeableDrawer } from "@mui/material"
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey, } from '@mui/material/colors';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom"
import { Avatar, Box, Grid, Link, Typography } from "@mui/joy"
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
const drawerBleeding = 56;

export const NavbarMobile = () => {

    const [open, setOpen] = useState(false);
    const { displayName, photoURL } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const onlogout = () => {
        dispatch(startLogout());
    }



    return (
        <Grid>
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `20vh`,
                        overflow: 'visible',
                    },
                }}
            />

            <SwipeableDrawer
                anchor="top"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}              
            >
                <StyledBox
                    sx={{
                        position: 'absolute',
                        top: '20vh',
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                        bgcolor: '#343A40',
                        display: {xs: 'block', md: 'none'}
                    }}
                >
                    <Grid container justifyContent='space-between' alignItems='center'>
                        <Typography sx={{ p: 2, color: 'white' }} level="h5"> <i className="bi bi-exclude" />  Tasks</Typography>
                        <Avatar alt={displayName} src={photoURL} sx={{ mr: 1 }} />
                    </Grid>
                    <Puller />
                </StyledBox>
                <StyledBox
                    sx={{
                        px: 2,
                        pb: 2,
                        height: '100%',
                        overflow: 'hidden',
                        bgcolor: '#343A40'
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
                </StyledBox>
            </SwipeableDrawer>
        </Grid>
    )
}
