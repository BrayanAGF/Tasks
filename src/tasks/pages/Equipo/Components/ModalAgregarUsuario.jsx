import { Avatar, Box, Button, FormControl, FormLabel, Grid, IconButton, Input, Modal, ModalClose, ModalDialog, Typography } from "@mui/joy"
import { useForm } from "../../../../hooks"
import { LoadUsuarios } from "../../../helpers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startAgregarUsuarioEquipo } from "../../../../store/Equipos";

const formData = {
  Nombre: ''
}

export const ModalAgregarUsuario = ({ open, set }) => {

  const { Nombre, onInputChange, onResetForm } = useForm(formData);
  const [usuarios, setUsuarios] = useState([]);
  const [alerta, setAlerta] = useState();
  const [flag, setFlag] = useState(true);
  const { active } = useSelector(state => state.equipos);
  const { Integrantes } = active;
  const dispatch = useDispatch();
  let resp = [];

  
  useEffect(() => {
   if (flag) {
      setUsuarios(usuarios);
      setAlerta('');
   }else{
      setAlerta('El usuario no se encuentra registrado');
   }
  }, [flag])

  const onHandleBuscarUsuario = async() => {
    if(Nombre.length < 2) return;

    resp = await LoadUsuarios(Nombre, Integrantes); 

    if(!resp){
       setFlag(false);
       return;
    }

    setUsuarios(resp); 
    setFlag(true);
  }

  const onHandleAgregarUsuario = async(usuario) => {
    dispatch(startAgregarUsuarioEquipo(usuario));
    set();
  }

  const onHandleClose = () => {
    set();
    onResetForm();
    setUsuarios([]);
  }

  return (
    <Modal open={open}>
      <ModalDialog>
        <ModalClose onClick={onHandleClose} />
        <Typography fontWeight='bold' fontSize={20}>Agregar un usuario</Typography>
        <Typography mb={2}>Ingresa el nombre del usuario</Typography>
        <FormControl>
          <FormLabel sx={{ fontWeight: 'bold' }}>Nombre</FormLabel>
          <Input name="Nombre" value={Nombre} onChange={onInputChange} autoComplete="off" />
        </FormControl>
        <Button sx={{ marginTop: 2 }} color="success" onClick={onHandleBuscarUsuario}>
          <i className="bi bi-search"></i> <Box ml={1}>Buscar</Box>
        </Button>
        <Typography sx={{color: 'red'}}>{alerta}</Typography>
        <Grid mt={1} maxHeight={120} overflow='scroll' sx={{overflowX: 'hidden'}}>
          {
            usuarios && usuarios.map((u, index) => (
              <Grid key={index} container justifyContent='space-between'>
                <Grid container alignItems='center' mb={1}>
                  <Avatar src={u.photoURL}/>
                  <Typography sx={{ ml: 1 }}>{u.displayName}</Typography>
                </Grid>
                <IconButton sx={{ borderRadius: 100, width: 32, height: 32}} onClick={() => onHandleAgregarUsuario(u)}>
                                <i className="bi bi-plus-lg"></i>
                </IconButton>
              </Grid>
            ))
          }
        </Grid>
      </ModalDialog>
    </Modal>
  )
}
