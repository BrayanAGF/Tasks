import { Button, Card, CardBody, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setActiveP } from "../../store";
import { useForm } from "../../hooks";
export const CardProyectos = ({ Data }) => {

    const [formData, setformData] = useState({
        "Nombre": "",
        "Descripcion": ""
    });
    const { Nombre, Descripcion, formState, onInputChange } = useForm(formData);
    const { active } = useSelector(state => state.equipos);
    const { uid } = useSelector(state => state.auth);
    const [ModoEdicion, setModoEdicion] = useState(false);
    const [OpenMenu, setOpenMenu] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setformData({
            "Nombre": Data.Nombre,
            "Descripcion": Data.Descripcion
        })
    }, [])


    return (
        <Card>
            <CardBody className="flex flex-row justify-between">
                <div>
                    <Link to="/Proyecto" onClick={() => dispatch(setActiveP(Data))}>
                        <p className={`text-xl font-bold ${ModoEdicion ? 'hidden' : ''}`}>{Nombre}</p>
                    </Link>
                    <Input
                        className={`${ModoEdicion ? '' : 'hidden'} w-[300px]`}
                        label="Nombre"
                        name="Nombre"
                        value={Nombre}
                        onChange={onInputChange}
                    />
                    <p className={`${ModoEdicion ? 'hidden' : ''}`}>{Descripcion}</p>
                    <Textarea
                        className={`${ModoEdicion ? '' : 'hidden'} mt-2`}
                        label="Descripción"
                        name="Descripcion"
                        value={Descripcion}
                        onChange={onInputChange}
                    />
                    <p className="mt-3">Fecha de termino: {Data.FechaTermino}</p>
                </div>
                {
                    active.Owner === uid 
                    &&
                    <div>
                        <Popover placement="left" isOpen={OpenMenu} onOpenChange={(open) => setOpenMenu(open)} showArrow>
                            <PopoverTrigger>
                                <Button isIconOnly className="ml-3 mt-1 hover:cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                    </svg>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="flex flex-col gap-1 py-2">
                                    <div className="text-small font-bold flex gap-2 items-center hover:bg-[#D4D4D8] hover:rounded-md hover:cursor-pointer px-1" onClick={() => { setModoEdicion(true); setOpenMenu(false) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                        Editar
                                    </div>
                                    <div className="text-small font-bold flex gap-2 items-center hover:bg-[#D4D4D8] hover:rounded-md hover:cursor-pointer px-1" onClick={() => { setOpenMenu(false) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                        Eliminar
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <div className={`w-full h-10 ${ModoEdicion ? '' : 'hidden'}`}>
                            <Button className="absolute right-4 bottom-4 bg-[#516BEB] text-white" onClick={() => { setModoEdicion(false) }}>Guardar</Button>
                        </div>
                    </div>
                }
            </CardBody>
        </Card>
    )
}
