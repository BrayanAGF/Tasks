import { Avatar, Button, Card, CardBody, Input } from "@nextui-org/react"
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startUpdatePhoto } from '../../../../store/auth/thunks';
import { useForm } from '../../../../hooks';
import { updateProfileUser } from "../../../../firebase/providers";
import { AlertPositive } from "../../../components";
import { Notification } from "../../../components/Icons";

export const TuPerfil = () => {

    const { photoURL, displayName, email, rol, uid } = useSelector(state => state.auth);
    const [FormData, setformData] = useState({ 'Nombre': '', 'Correo': '', 'Rol': '' });
    const { Nombre, Correo, Rol, formState, onInputChange } = useForm(FormData);
    const [ActualizandoData, setActualizandoData] = useState(true);
    const [alertDisplay, setalertDisplay] = useState(false);
    const [alertStatus, setalertStatus] = useState(false);
    const [alertText, setalertText] = useState('');
    const fileInputRef = useRef();
    const dispatch = useDispatch();

    const onFileInputChange = ({ target }) => {
        dispatch(startUpdatePhoto(target.files[0]));
        mostrarAlert('Se ha actualizado tu foto de perfil.', true);
    }

    const onChangeData = (event) => {
        setActualizandoData(false);
        onInputChange(event);
    }

    const updateProf = async () => {
        const resp = await updateProfileUser({ uid, ...formState });
        const { ok, message } = resp;
        mostrarAlert(message, ok);
    }

    const mostrarAlert = (texto, status) => {
        setalertText(texto);
        setalertStatus(status);
        setalertDisplay(true);
        setTimeout(() => {
            setalertDisplay(false);
        }, 4000);
        setActualizandoData(true);
    }

    useEffect(() => {
        setformData({ 'Nombre': displayName, 'Correo': email, 'Rol': rol });
    }, [])



    return (
        <>
            <Card className='w-full md:w-[600px] animate__animated animate__fadeIn animate__faster Fuente1'>
                <CardBody>
                    <div className='flex justify-center items-center gap-2 mb-2'>
                        <div className='relative'>
                            <Avatar
                                src={photoURL}
                                classNames={{
                                    base: 'h-20 w-20'
                                }}
                            />
                            <div className='absolute bottom-0 right-0 z-40 w-7 h-6'>
                                <Button isIconOnly size="sm" className="bg-white border-gray-400 border-1" onClick={() => fileInputRef.current.click()}>
                                    <img src="./assets/svg/gallery.svg" height="20px" width="20px" alt="photo"/>
                                </Button>
                                <input
                                    type='file'
                                    accept="image/png, image/gif, image/jpeg"
                                    ref={fileInputRef}
                                    onChange={onFileInputChange}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 mt-2'>
                        <Input
                            label="Nombre"
                            name="Nombre"
                            value={Nombre}
                            onChange={onChangeData}
                        />
                        <Input
                            label="Rol"
                            placeholder="Ingresa tu rol"
                            name="Rol"
                            value={Rol}
                            onChange={onChangeData}
                        />
                        <Input
                            label="Correo electrónico"
                            name="Correo"
                            value={Correo}
                            onChange={onChangeData}
                        />
                    </div>
                    <div className='mt-2 flex justify-end'>
                        <Button className='bg-secondary text-white Fuente1' disabled={ActualizandoData} onClick={updateProf}>Guardar</Button>
                    </div>
                </CardBody>
            </Card>
            <AlertPositive display={alertDisplay} svg={<Notification />} type={alertStatus} texto={alertText} />
        </>
    )
}
