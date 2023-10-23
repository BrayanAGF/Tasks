import { Avatar, AvatarGroup, Button, Card, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from "@nextui-org/react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setActive, startDeleteEquipos, startEditEquipo, startSelectEquipoActive } from "../../store";
import { useForm } from '../../hooks'


export const CardEquipos = ({ Data }) => {

    const [formData, setformData] = useState({
            "Titulo": "",
            "Descripcion": ""
        });

    const { Titulo, Descripcion, onInputChange } = useForm(formData);
    const { uid } = useSelector(state => state.auth);
    const [ModoEdicion, setModoEdicion] = useState(false);
    const [OpenMenu, setOpenMenu] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setformData({
            "Titulo": Data.Nombre,
            "Descripcion": Data.Descripcion
        })
    }, [])


    const onEliminarEquipo = () => {
        dispatch(startDeleteEquipos(Data.id));
    }

    const onEditEquipo = () => {
        const equipoEditado = {...Data, "Nombre": Titulo, "Descripcion": Descripcion};
         dispatch(startEditEquipo(equipoEditado));
    }


    return (
        <Card className="w-4/12 h-full">
            <div className="flex justify-between px-3 py-2">
                <div className="flex flex-col items-start gap-2 w-full">
                    <Link to='/Equipo' onClick={() => dispatch(startSelectEquipoActive(Data))}>
                        <h3 className={`text-2xl font-bold ${ModoEdicion ? 'hidden' : ''}`}>{Data.Nombre}</h3>
                    </Link>
                    <Input 
                    className={`${ModoEdicion ? '' : 'hidden'}`}
                    autoComplete="off" 
                    label="Titulo" 
                    name="Titulo"
                    value={Titulo}
                    onChange={onInputChange} 
                    />
                    <p className={`${ModoEdicion ? 'hidden' : ''}`}> {Data.Descripcion} </p>
                    <Textarea 
                    className={`${ModoEdicion ? '' : 'hidden'}`} 
                    label="Descripción" 
                    name="Descripcion"
                    value={Descripcion}
                    onChange={onInputChange}
                    />
                    {<AvatarGroup>
                        {
                            Data.infoU.map((p, index) => (
                                <Avatar src={p.photoURL} key={index}>
                                </Avatar>
                            ))
                        }
                    </AvatarGroup>}
                    <div className={`w-full h-10 ${ModoEdicion ? '' : 'hidden'}`}>
                        <Button className="absolute right-2 bg-[#516BEB] text-white" onClick={() => {onEditEquipo();setModoEdicion(false)}}>Guardar</Button>
                    </div>


                </div>
                {
                    (Data.Owner === uid) &&
                    <div>
                        <Popover placement="bottom-end" isOpen={OpenMenu} onOpenChange={(open) => setOpenMenu(open)}>
                            <PopoverTrigger>
                                <Button isIconOnly className="ml-3 mt-1 hover:cursor-pointer"> <i className="bi bi-caret-down-fill" /> </Button>
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
                                    <div className="text-small font-bold flex gap-2 items-center hover:bg-[#D4D4D8] hover:rounded-md hover:cursor-pointer px-1" onClick={() => { onEliminarEquipo(); setOpenMenu(false) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                        Eliminar
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                }
            </div>
        </Card>
    )
}
