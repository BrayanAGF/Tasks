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
      <Button isIconOnly className="rounded-full mt-2 ml-1" onClick={onOpen}>
        <img src="./assets/svg/addUser.svg" width="30px" height="30px" alt="adduser" />
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
                <Button className="Fuente1 bg-secondary text-white" onClick={onHandleBuscarUsuario}>
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
