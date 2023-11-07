import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { useForm } from '../../../../hooks';
import { updatePasswordUser } from '../../../../firebase/providers';

const formData = {
    'Correo': '',
    'Contrasena': ''
}
export const ModalReingresar = ({ password, passwordRepeat, status, alert, text }) => {

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { Correo, Contrasena, onInputChange } = useForm(formData);

    const onOpenModal = () => {
        if (passwordRepeat !== password || password.length === 0 && passwordRepeat.length === 0) {
            status(false);
            text('Las contraseñas no coinciden');
            alert(true);
            setTimeout(() => {
                alert(false);
            }, 4000);
            return;
        }
        onOpen();
    }

    const updatePass = async () => {
        const resp = await updatePasswordUser(Correo, Contrasena, password);
        const { ok, message } = resp;
        onClose();

        if (!ok) {
            status(false);
            text(message || 'Las creedenciales no son correctas.');
        } else {
            status(true);
            text(message);
        }

        alert(true);
        setTimeout(() => {
            alert(false);
        }, 4000);
    }

    return (
        <>
            <Button className='bg-[#6c5d98] text-white Fuente1' onClick={onOpenModal}>Guardar</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'>
                <ModalContent>
                    {
                        (onClose) => (
                            <>
                                <ModalHeader className='Fuente1'>
                                    Ingresa nuevamente tus creendeciales para actualizar tu contraseña
                                </ModalHeader>
                                <ModalBody>
                                    <Input
                                        label="Correo"
                                        placeholder='Ingresa tu correo electrónico'
                                        name='Correo'
                                        value={Correo}
                                        onChange={onInputChange}
                                    />
                                    <Input
                                        label="Contraseña"
                                        placeholder='Ingresa tu contraseña'
                                        name='Contrasena'
                                        value={Contrasena}
                                        onChange={onInputChange}
                                    />
                                    <Button className='bg-primary text-white Fuente1' onClick={updatePass}>Ingresar</Button>
                                </ModalBody>
                                <ModalFooter />
                            </>
                        )
                    }
                </ModalContent>
            </Modal>

        </>
    )
}

