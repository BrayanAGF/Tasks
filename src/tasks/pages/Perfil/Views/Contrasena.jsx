import { Card, CardBody, Input, Modal, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react"
import { useForm } from "../../../../hooks"
import { useState } from "react";
import { AlertPositive } from '../../../components';
import { Notification, EyeFilledIcon, EyeSlashFilledIcon } from '../../../components/Icons';
import { ModalReingresar } from "../Components/ModalReingresar";

const formData = {
    Contrasena: '',
    RepiteContrasena: ''
}


export const Contrasena = () => {

    const { Contrasena, RepiteContrasena, onInputChange } = useForm(formData);
    const [visibleContra, setvisibleContra] = useState(false);
    const [visibleContraRepite, setvisibleContraRepite] = useState(false);
    const [visibleAlert, setvisibleAlert] = useState(false);
    const [alertStatus, setalertStatus] = useState(false);
    const [alertText, setalertText] = useState('');


    return (
        <>
            <Card className="w-full md:w-[600px] animate__animated animate__fadeIn animate__faster">
                <CardBody className="flex flex-col gap-2">
                    <h3 className="text-lg Fuente1">Reestablecer contraseña</h3>
                    <Input
                        label="Contraseña nueva"
                        placeholder="Ingresa tu nueva contraseña"
                        type={visibleContra ? "text" : "password"}
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={() => setvisibleContra(!visibleContra)}>
                                {visibleContra ? (
                                    <EyeSlashFilledIcon />
                                ) : (
                                    <EyeFilledIcon />
                                )}
                            </button>
                        }
                        name="Contrasena"
                        value={Contrasena}
                        onChange={onInputChange}
                    />
                    <Input
                        label="Contraseña nueva"
                        placeholder="Repite la nueva contraseña"
                        type={visibleContraRepite ? "text" : "password"}
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={() => setvisibleContraRepite(!visibleContraRepite)}>
                                {visibleContraRepite ? (
                                    <EyeSlashFilledIcon />
                                ) : (
                                    <EyeFilledIcon />
                                )}
                            </button>
                        }
                        name="RepiteContrasena"
                        value={RepiteContrasena}
                        onChange={onInputChange}
                    />
                    <div className="flex justify-end">
                        <ModalReingresar password={Contrasena} passwordRepeat={RepiteContrasena} status={setalertStatus} alert={setvisibleAlert} text={setalertText}/>
                    </div>
                </CardBody>
            </Card>

            <AlertPositive display={visibleAlert} svg={<Notification />} texto={alertText} type={alertStatus} />


        </>
    )
}


