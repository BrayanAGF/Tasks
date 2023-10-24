
import { useDispatch } from "react-redux";
import { startCreateProyecto } from "../../../../store";
import { useForm } from "../../../../hooks";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";

const formData = {
    Nombre: '',
    Descripcion: '',
    FechaTermino: ''
}

export const ModalCrearProyecto = () => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { Nombre, Descripcion, FechaTermino, onInputChange, onResetForm, formState } = useForm(formData);
    const dispatch = useDispatch();


    const onCreateProyecto = () => {
        dispatch(startCreateProyecto(formState));
        onResetForm();
    }


    return (
        <>
            <Button className="fixed bottom-5 right-5 bg-[#516BEB] text-white" onClick={onOpen}><i className="bi bi-plus-lg" /> Nuevo proyecto </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <p className="text-xl Fuente1">Crear nuevo proyecto</p>
                                <p className="text-md font-medium Fuente1 ">Ingresa la información de tu nuevo proyecto</p>
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
                                <Input label="Fecha de termino"
                                placeholder=" "
                                name="FechaTermino"
                                value={FechaTermino}
                                onChange={onInputChange} 
                                type="date" />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" className="Fuente1" onPress={onClose} onClick={onCreateProyecto}>
                                    Crear
                                </Button>
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
    <ModalClose onClick={set} />
    <Typography fontWeight='bold' fontSize={20}>Crear nuevo proyecto</Typography>
    <Typography mb={2}>Ingresa la información de tu nuevo proyecto</Typography>
    <FormControl>
    <FormLabel sx={{ fontWeight: 'bold' }}>Nombre</FormLabel>
            <Input name="Nombre" value={Nombre} onChange={onInputChange} />
        </FormControl>
        <FormControl>
            <FormLabel sx={{ fontWeight: 'bold' }}>Descripción</FormLabel>
            <Input name="Descripcion" value={Descripcion} onChange={onInputChange} />
        </FormControl>
        <FormControl>
            <FormLabel sx={{ fontWeight: 'bold' }}>Fecha de termino</FormLabel>
            <Input type="date" name="FechaTermino" value={FechaTermino} onChange={onInputChange} />
        </FormControl>
        <Button sx={{ marginTop: 2 }} onClick={onHandleCreateProyecto}>
            Crear
        </Button>
    </ModalDialog>
</Modal> */}