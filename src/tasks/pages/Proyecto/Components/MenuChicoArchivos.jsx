import { Box, Grid, IconButton, ListItemDecorator, Menu, MenuItem, Typography } from "@mui/joy";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { startDeleteArchivo } from "../../../../store";

export const MenuChicoArchivos = ({ Archivo }) => {
  const buttonRef = useRef();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const onHandleClose = () => {
    setOpen(false);
  };

  const onHandleOpen = () => {
    setOpen(true);
  }

  const onEliminarArchivo = () => {
    dispatch(startDeleteArchivo(Archivo));
  }

  return (
    <Grid onClick={onHandleOpen}>
      <Box sx={{ cursor: 'pointer' }} width={40}>
        <IconButton ref={buttonRef} sx={{ height: 10 }}>
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

        <MenuItem onClick={onEliminarArchivo} color='danger'>
          <ListItemDecorator>
            <Typography color='danger'><i className="bi bi-trash-fill"></i></Typography>
          </ListItemDecorator>
          Eliminar
        </MenuItem>

      </Menu>
    </Grid>
  )
}
