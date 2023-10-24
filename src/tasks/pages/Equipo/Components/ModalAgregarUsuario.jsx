import { Avatar, Button, Card, CardBody, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { useForm } from "../../../../hooks"
import { LoadUsuarios } from "../../../helpers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CardUsuario } from "./CardUsuario";

const formData = {
  Nombre: ''
}

export const ModalAgregarUsuario = () => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { Nombre, onInputChange, onResetForm } = useForm(formData);
  const [usuarios, setUsuarios] = useState([]);
  const [alerta, setAlerta] = useState();
  const [flag, setFlag] = useState(true);
 
  const { active } = useSelector(state => state.equipos);
  const { Integrantes } = active;

  let resp = [];


  useEffect(() => {
    if (flag) {
      setUsuarios(usuarios);
      setAlerta('');
    } else {
      setAlerta('El usuario no se encuentra registrado');
    }
  }, [flag])

  const onHandleBuscarUsuario = async () => {
    if (Nombre.length < 2) return;

    resp = await LoadUsuarios(Nombre, Integrantes);

    if (!resp) {
      setFlag(false);
      return;
    }

    setUsuarios(resp);
    console.log(resp);
    setFlag(true);
  }

  const onHandleClose = () => {
    onResetForm();
    setUsuarios([]);
  }

  return (
    <>
      <Button isIconOnly className="rounded-full mt-2 bg-[#6c5d98] text-white" onClick={onOpen}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
          <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
        </svg>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onHandleClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className="text-xl Fuente1">Agregar un usuario</p>
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Nombre"
                  autoComplete="off"
                  placeholder="Ingresa el nombre del usuario"
                  name="Nombre"
                  value={Nombre}
                  onChange={onInputChange}
                />
                <Button color="primary" className="Fuente1" onClick={onHandleBuscarUsuario}>
                  Buscar
                </Button>
                {
                  usuarios.length > 0
                  &&
                  <Card>
                    <CardBody>
                      {
                        usuarios.map((value, index) => (
                          <CardUsuario key={index} Usuario={value} />
                        ))
                      }
                    </CardBody>
                  </Card>
                }
              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

{/* <Modal open={open}>
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
</Modal> */}