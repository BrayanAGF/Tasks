
import { Avatar, Button, Card, CardBody, Input, Textarea } from "@nextui-org/react";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../../hooks";
import { startCreateNota } from "../../../../store/Tareas/thunks";

const formData = {
    Titulo: '',
    Nota: ''
}
export const NotasView = () => {

    const { Titulo, Nota, onInputChange, onResetForm, formState} = useForm(formData);
    const [ModoEdicion, setModoEdicion] = useState(false);
    const { TNotas } = useSelector(state => state.tareas);
    const {photoURL} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const onHandleCreateNota = () => {
        if (Titulo.length === 0 || Nota.length === 0) {
            setModoEdicion(false)
            return;
        }
        dispatch(startCreateNota(formState));
        onResetForm();
        setModoEdicion(false)
    }

    return (
        <div>

            <div id="HeaderNotas" className="flex items-center gap-2">
                <h3 className="text-3xl font-bold Fuente1">Notas</h3>
                <Button isIconOnly className="mt-2" variant="light" onClick={() => setModoEdicion(!ModoEdicion)}>
                    {
                        ModoEdicion
                            ?
                            <img src="./assets/svg/remove.svg" alt="remove" />
                            :
                            <img src="./assets/svg/addsquare.svg" alt="add" />
                    }
                </Button>
            </div>

            <div id="BodyNotas" className="mt-3">

                <div className={`flex flex-col gap-2 my-2 ${ModoEdicion ? '' : 'hidden'} animate__animated animate__fadeIn`}>
                    <Card className="Fuente1 bg-[#FFF7DD] text-black">
                        <CardBody>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <Avatar size="sm" src={photoURL} />
                                    <Input
                                     label="Titulo de la nota"
                                     placeholder="Escribe el titulo de la nota"
                                     autoComplete="off"
                                     name="Titulo"
                                     value={Titulo}
                                     onChange={onInputChange}
                                    />
                                </div>
                               <Textarea
                               label="Contenido de la nota"
                               name="Nota"
                               value={Nota}
                               onChange={onInputChange}
                               />
                            </div>
                            <div className="flex justify-end">
                                <p className="font-bold">{new Date().toLocaleDateString()}</p>
                            </div>
                        </CardBody>
                    </Card>
                    <div className="flex justify-end">
                        <Button className="bg-secondary text-white Fuente1" onClick={onHandleCreateNota}>Guardar</Button>
                    </div>
                </div>

                {
                    TNotas.length > 0
                        ?
                        TNotas.map((nota, index) => (
                            <Card key={index} className="Fuente1 bg-[#FFF7DD] animate__animated animate__pulse text-black">
                                <CardBody>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Avatar size="sm" src={nota.uInfo.photoURL} />
                                            <p className="font-bold">{nota.Titulo}</p>
                                        </div>
                                        <p>{nota.Nota}</p>
                                    </div>
                                    <div className="flex justify-end">
                                        <p className="font-bold">{nota.Fecha}</p>
                                    </div>
                                </CardBody>
                            </Card>
                        ))
                        :
                        <h3 className={`text-lg Fuente1 ${ModoEdicion ? 'hidden' : ''}`}>No hay notas escritas en esta tarea</h3>
                }
            </div>


        </div>
    )
}

