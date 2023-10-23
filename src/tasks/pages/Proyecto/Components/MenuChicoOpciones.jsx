import { Box, Grid, IconButton, ListItemDecorator, Menu, MenuItem, Switch, Typography } from "@mui/joy";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setViewMode } from "../../../../store/Tareas/tareasSlice";
import { useEffect } from "react";
import { addProyectoFavorito, startAddFavorito } from "../../../../store";


export const MenuChicoOpciones = () => {
    const buttonRef = useRef();
    const [open, setOpen] = useState(false);
    const { ViewMode } = useSelector(state => state.tareas);
    const [switchValue, setSwitchValue] = useState(ViewMode === 'Tarjetas' ? true : false);
    const dispatch = useDispatch();

    const onHandleClose = () => {
        setOpen(false);
    };

    const onHandleOpen = () => {
        setOpen(true);
    }


    useEffect(() => {
        if (switchValue) {
            dispatch(setViewMode('Tarjetas'))
            localStorage.setItem('vistaTareas', JSON.stringify('Tarjetas'))
        } else {
            dispatch(setViewMode('Normal'))
            localStorage.setItem('vistaTareas', JSON.stringify('Normal'))
        }
    }, [switchValue])


    const onHandleSwitch = () => {
        setSwitchValue(!switchValue);
    }

    return (
        <Grid container onClick={onHandleOpen}
           /*  sx={{ position: 'absolute', top: { xs: 66, md: 15 }, bottom: 0, left: { xs: '85vw', md: '93vw' }, right: 0, zIndex: 10 }} */
            width={40}
            height={40}>
            <Box sx={{ cursor: 'pointer' }} width={40}>
                <IconButton ref={buttonRef} sx={{ height: 10, bgcolor: '#343A40' }} variant="solid">
                    <i className="bi bi-three-dots-vertical"></i>
                </IconButton>
            </Box>
            <Menu
                size="sm"
                anchorEl={buttonRef.current}
                open={open}
                onClose={onHandleClose}
                placement="bottom-end"
            >

                <MenuItem onClick={() => dispatch(startAddFavorito())}>
                    <ListItemDecorator>
                        <Typography color='danger'><i className="bi bi-heart-fill"></i></Typography>
                    </ListItemDecorator>
                    Añadir a mis proyectos
                </MenuItem>
                <MenuItem sx={{ display: 'grid', placeItems: 'center' }}>
                    <Grid sx={{ display: 'grid', placeItems: 'center' }}>
                        <Box mb={1}>Alternar vista</Box>
                        <Grid>
                            <Switch
                                slotProps={{ input: { 'aria-label': 'dark mode' } }}
                                startDecorator={
                                    <i className="bi bi-list-task"></i>
                                }
                                endDecorator={
                                    <i className="bi bi-postcard-fill"></i>
                                }
                                onChange={onHandleSwitch}
                                checked={switchValue}
                            />
                        </Grid>
                    </Grid>
                </MenuItem>

            </Menu>
        </Grid>
    )
}
