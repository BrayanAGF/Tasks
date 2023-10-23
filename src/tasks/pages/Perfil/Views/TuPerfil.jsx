import { Avatar, Button, Card, CardBody, Input } from "@nextui-org/react"
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startUpdatePhoto } from '../../../../store/auth/thunks';

export const TuPerfil = () => {

    const { photoURL, displayName, email } = useSelector(state => state.auth);
    const fileInputRef = useRef();
    const dispatch = useDispatch();

    const onFileInputChange = ({ target }) => {
      dispatch(startUpdatePhoto(target.files[0]));
    }

    return (
        <Card className='w-[600px] animate__animated animate__fadeIn animate__faster'>
            <CardBody>
                <div className='flex justify-center items-center gap-2 mb-2'>
                    <div className='relative'>
                        <Avatar
                            src={photoURL}
                            classNames={{
                                base: 'h-20 w-20'
                            }}
                        />
                        <div className='rounded-full w-6 h-6 bg-[#6c5d98] text-white flex items-center justify-center absolute right-0 bottom-0 z-10 hover:cursor-pointer' onClick={() => fileInputRef.current.click()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
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

                <div className='flex flex-col gap-2'>
                    <Input
                        label="Nombre"
                        value={displayName}
                    />
                    <Input
                        label="Rol"
                        placeholder="Ingresa tu rol"
                    />
                    <Input
                        label="Correo electrónico"
                        value={email}
                    />
                </div>

                <div className='mt-2 flex justify-end'>
                    <Button className='bg-[#6c5d98] text-white Fuente1'>Guardar</Button>
                </div>

            </CardBody>
        </Card>
    )
}
