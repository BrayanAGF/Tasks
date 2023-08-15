import { Box, Grid, IconButton, ListItemDecorator, Menu, MenuItem, Typography } from '@mui/joy';
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setActive } from '../../store/Equipos/equiposSlice';
import { startDeleteEquipos } from '../../store/Equipos/thunks';

export const MenuChico = ({idEquipo}) => {

    const buttonRef = useRef();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
    };

    const onSetEquipoActivo = () =>{
        dispatch(setActive(idEquipo))
        setOpen(true);
    }

    const onEliminarEquipo = () => {
        dispatch(startDeleteEquipos());
    }

    return (
        <Grid onClick={onSetEquipoActivo}>
            <Box sx={{ cursor: 'pointer' }} width={40}>
                <IconButton ref={buttonRef}
                    >
                    <i className="bi bi-caret-down-fill"></i>
                </IconButton>
            </Box>
            <Menu
                size="sm"
                anchorEl={buttonRef.current}
                open={open}
                onClose={handleClose}
                placement="bottom-end"
            >
                <MenuItem onClick={handleClose} color='primary'>
                    <ListItemDecorator>
                    <Typography color='primary'><i className="bi bi-pencil"></i></Typography>
                    </ListItemDecorator>
                    Editar
                </MenuItem>

                <MenuItem onClick={onEliminarEquipo} color='danger'>
                    <ListItemDecorator>
                    <Typography color='danger'><i className="bi bi-trash-fill"></i></Typography>
                    </ListItemDecorator>
                    Eliminar
                </MenuItem>
                
            </Menu>
        </Grid>
    )
}
