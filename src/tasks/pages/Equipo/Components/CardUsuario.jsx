import { Avatar, Button } from "@nextui-org/react"
import { useState } from "react";
import { startAgregarUsuarioEquipo } from "../../../../store/Equipos";
import { useDispatch } from "react-redux";

export const CardUsuario = ({ Usuario }) => {

    const [UsuarioAgregado, setUsuarioAgregado] = useState(false);
    const dispatch = useDispatch();
    const onHandleAgregarUsuario = async (usuario) => {
        setUsuarioAgregado(true);
         dispatch(startAgregarUsuarioEquipo(usuario)); 
    }

    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Avatar src={Usuario.photoURL} />
                <p className="Fuente1">{Usuario.displayName}</p>
            </div>
            <Button className="Fuente1" onClick={() => onHandleAgregarUsuario(Usuario)} isDisabled={UsuarioAgregado}>
                {
                    UsuarioAgregado ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                    </svg>
                        :
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                            </svg>
                            Agregar
                        </div>
                }

            </Button>
        </div>
    )
}

