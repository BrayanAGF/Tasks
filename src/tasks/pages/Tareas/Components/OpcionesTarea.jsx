import { Box, Grid, IconButton, ListItemDecorator, Menu, MenuItem, Typography } from "@mui/joy"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { startDeleteTarea } from "../../../../store/Tareas/thunks";
import { useNavigate } from "react-router-dom";

export const OpcionesTarea = () => {
    
        const [open, setOpen] = useState(false);
        const buttonRef = useRef();
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const onEliminarTarea = () => {
            dispatch(startDeleteTarea());
            navigate('/Proyecto', {replace: true});
        }
  
        return (
            <Grid onClick={() => setOpen(!open)}>
            <Box sx={{ cursor: 'pointer' }} width={40}>
                <IconButton ref={buttonRef}>
                    <i className="bi bi-three-dots-vertical"></i>
                </IconButton>
            </Box>
            <Menu
                size="sm"
                anchorEl={buttonRef.current}
                open={open}
                placement="bottom-end"
            >

                <MenuItem  onClick={onEliminarTarea}  color='danger'>
                    <ListItemDecorator>
                    <Typography color='danger'><i className="bi bi-trash-fill"></i></Typography>
                    </ListItemDecorator>
                    Eliminar
                </MenuItem>
                
            </Menu>
        </Grid>
  )
}
