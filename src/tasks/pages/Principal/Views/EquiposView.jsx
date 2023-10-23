
import { CardEquipos } from "../../../components"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../../hooks";
import { startCrearNuevoEquipo, startSelectEquipoActive } from "../../../../store/Equipos/thunks";
import { Link, Link as RouterLink } from "react-router-dom";
import { Avatar, AvatarGroup, Button, Card, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";

const equipoNuevoData = {
    Nombre: '',
    Descripcion: '',
    Owner: ''
}

export const EquiposView = () => {

    const { uid } = useSelector(state => state.auth);
    const { Equipos } = useSelector(state => state.principal);
    const { Nombre, Descripcion, onInputChange, onResetForm } = useForm(equipoNuevoData);
    const dispatch = useDispatch();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const onCreateEquipo = () => {
        dispatch(startCrearNuevoEquipo({ Nombre, Descripcion, Owner: uid, Integrantes: [uid] }))
        onResetForm();
    }

    return (
        <div className="animate__animated animate__fadeIn animate__faster">
            {
                Equipos.length > 0
                    ?
                    <div className="flex gap-4">
                        {
                            Equipos.map((equipo, index) => (
                                <CardEquipos key={index} Data={equipo} />
                            ))
                        }
                    </div>
                    :
                    <div className="grid place-items-center h-full">
                        <div className="flex flex-col items-center">
                            <img src="./assets/images/noData.svg" width='512px' height='300px' />
                            <p className="font-bold Fuente1 text-2xl relative bottom-16">Parece que no tienes equipos, intenta crear uno o espera a que alguien te una al suyo</p>
                        </div>
                    </div>
            }

            <Button className="absolute bottom-5 right-5 bg-[#6c5d98] text-white" onClick={onOpen}><i className="bi bi-plus-lg" /> Nuevo equipo</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <p className="text-xl Fuente1">Crear nuevo equipo</p>
                                <p className="text-md font-medium Fuente1 ">Ingresa la información de tu nuevo equipo</p>
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Nombre"
                                    placeholder="Ingresa el nombre de tu equipo"
                                    autoComplete="off"
                                    name="Nombre"
                                    value={Nombre}
                                    onChange={onInputChange}
                                />
                                <Textarea
                                    placeholder="Agrega una descripción de tu equipo"
                                    label="Descripción"
                                    name="Descripcion"
                                    value={Descripcion}
                                    onChange={onInputChange}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" className="Fuente1 bg-[#6c5d98]" onPress={onClose} onClick={onCreateEquipo}>
                                    Crear
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>

    )
}
