
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

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { Nombre, Descripcion, FechaTermino, onInputChange, onResetForm, formState } = useForm(formData);
    const dispatch = useDispatch();


    const onCreateProyecto = () => {
        dispatch(startCreateProyecto(formState));
        onResetForm();
    }


    return (
        <>
            <Button className="fixed bottom-5 right-5 bg-secondary text-white Fuente1" onClick={onOpen}>
                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.8" d="M21 15.9983V9.99826C21 7.16983 21 5.75562 20.1213 4.87694C19.3529 4.10856 18.175 4.01211 16 4H8C5.82497 4.01211 4.64706 4.10856 3.87868 4.87694C3 5.75562 3 7.16983 3 9.99826V15.9983C3 18.8267 3 20.2409 3.87868 21.1196C4.75736 21.9983 6.17157 21.9983 9 21.9983H15C17.8284 21.9983 19.2426 21.9983 20.1213 21.1196C21 20.2409 21 18.8267 21 15.9983Z" fill="white" />
                    <path d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z" fill="#331D2C" />
                    <path fillRule="evenodd" clip-rule="evenodd" d="M12 9.25C12.4142 9.25 12.75 9.58579 12.75 10V12.25L15 12.25C15.4142 12.25 15.75 12.5858 15.75 13C15.75 13.4142 15.4142 13.75 15 13.75L12.75 13.75L12.75 16C12.75 16.4142 12.4142 16.75 12 16.75C11.5858 16.75 11.25 16.4142 11.25 16L11.25 13.75H9C8.58579 13.75 8.25 13.4142 8.25 13C8.25 12.5858 8.58579 12.25 9 12.25L11.25 12.25L11.25 10C11.25 9.58579 11.5858 9.25 12 9.25Z" fill="#331D2C" />
                </svg>
                Nuevo proyecto
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 Fuente1">
                                <p className="text-xl">Crear nuevo proyecto</p>
                                <p className="text-md font-medium">Ingresa la información de tu nuevo proyecto</p>
                            </ModalHeader>
                            <ModalBody className="Fuente1">
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
                                    type="date" 
                                    endContent={<img src="./assets/svg/addFecha.svg" height="20px" width="20px"></img>}
                                    />
                            </ModalBody>
                            <ModalFooter>
                                <Button className="Fuente1 text-white bg-secondary" onPress={onClose} onClick={onCreateProyecto}>
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