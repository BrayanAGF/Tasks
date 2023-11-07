import { Avatar, AvatarGroup, Button, Card, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, Textarea, useDisclosure } from "@nextui-org/react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setActive, startDeleteEquipos, startEditEquipo } from "../../store";
import { useForm } from '../../hooks'


export const CardEquipos = ({ Data }) => {

    const [formData, setformData] = useState({
        "Titulo": "",
        "Descripcion": ""
    });


    const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
        const equipoEditado = { ...Data, "Nombre": Titulo, "Descripcion": Descripcion };
        dispatch(startEditEquipo(equipoEditado));
    }


    return (
        <>
            <Card className="w-full md:w-4/12 lg:w-3/12 h-full">
                <div className="flex justify-between px-3 py-2">
                    <div className="flex flex-col items-start gap-2 w-full">
                        <Link to='/Equipo' onClick={() => dispatch(setActive(Data))}>
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
                            <Button className="absolute right-2 bg-[#516BEB] text-white" onClick={() => { onEditEquipo(); setModoEdicion(false) }}>Guardar</Button>
                        </div>
                    </div>
                    {
                        (Data.Owner === uid) &&
                        <div>
                            <Popover placement="bottom-end" isOpen={OpenMenu} onOpenChange={(open) => setOpenMenu(open)}>
                                <PopoverTrigger>
                                    <Button isIconOnly className="ml-3 mt-1 hover:cursor-pointer">
                                        <img src="./assets/svg/arrow.svg" alt="arrow" height="25px" width="25px" className="mt-1" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="flex flex-col gap-1 py-2">
                                        <div className="text-small font-bold flex gap-2 items-center hover:bg-[#D4D4D8] hover:rounded-md hover:cursor-pointer p-1" onClick={() => { setModoEdicion(true); setOpenMenu(false) }}>
                                            <img src="./assets/svg/editar.svg" width="30px" height="30px" alt="editar" />
                                            Editar
                                        </div>
                                        <div className="text-small font-bold flex gap-2 items-center hover:bg-[#D4D4D8] hover:rounded-md hover:cursor-pointer p-1" onClick={() => { setOpenMenu(false); onOpen() }}>
                                            <img src="./assets/svg/eliminar.svg" width="30px" height="30px" alt="eliminar" />
                                            Eliminar
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    }
                </div>
            </Card>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="Fuente1">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                Eliminar equipo
                            </ModalHeader>
                            <ModalBody>
                                <h4 className="text-lg">¿Estas seguro de eliminar el equipo?</h4>
                                <Button color="danger" onClick={onEliminarEquipo}>
                                    <svg width="400px" height="400px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 6.38597C3 5.90152 3.34538 5.50879 3.77143 5.50879L6.43567 5.50832C6.96502 5.49306 7.43202 5.11033 7.61214 4.54412C7.61688 4.52923 7.62232 4.51087 7.64185 4.44424L7.75665 4.05256C7.8269 3.81241 7.8881 3.60318 7.97375 3.41617C8.31209 2.67736 8.93808 2.16432 9.66147 2.03297C9.84457 1.99972 10.0385 1.99986 10.2611 2.00002H13.7391C13.9617 1.99986 14.1556 1.99972 14.3387 2.03297C15.0621 2.16432 15.6881 2.67736 16.0264 3.41617C16.1121 3.60318 16.1733 3.81241 16.2435 4.05256L16.3583 4.44424C16.3778 4.51087 16.3833 4.52923 16.388 4.54412C16.5682 5.11033 17.1278 5.49353 17.6571 5.50879H20.2286C20.6546 5.50879 21 5.90152 21 6.38597C21 6.87043 20.6546 7.26316 20.2286 7.26316H3.77143C3.34538 7.26316 3 6.87043 3 6.38597Z" fill="#FFFFFF" />
                                        <path d="M11.5956 22.0001H12.4044C15.1871 22.0001 16.5785 22.0001 17.4831 21.1142C18.3878 20.2283 18.4803 18.7751 18.6654 15.8686L18.9321 11.6807C19.0326 10.1037 19.0828 9.31524 18.6289 8.81558C18.1751 8.31592 17.4087 8.31592 15.876 8.31592H8.12405C6.59127 8.31592 5.82488 8.31592 5.37105 8.81558C4.91722 9.31524 4.96744 10.1037 5.06788 11.6807L5.33459 15.8686C5.5197 18.7751 5.61225 20.2283 6.51689 21.1142C7.42153 22.0001 8.81289 22.0001 11.5956 22.0001Z" fill="#FFFFFF" />
                                        <path fillRule="evenodd" clip-rule="evenodd" d="M9.42543 11.4815C9.83759 11.4381 10.2051 11.7547 10.2463 12.1885L10.7463 17.4517C10.7875 17.8855 10.4868 18.2724 10.0747 18.3158C9.66253 18.3592 9.29499 18.0426 9.25378 17.6088L8.75378 12.3456C8.71256 11.9118 9.01327 11.5249 9.42543 11.4815Z" fill="#000000" />
                                        <path fillRule="evenodd" clip-rule="evenodd" d="M14.5747 11.4815C14.9868 11.5249 15.2875 11.9118 15.2463 12.3456L14.7463 17.6088C14.7051 18.0426 14.3376 18.3592 13.9254 18.3158C13.5133 18.2724 13.2126 17.8855 13.2538 17.4517L13.7538 12.1885C13.795 11.7547 14.1625 11.4381 14.5747 11.4815Z" fill="#000000" />
                                    </svg>
                                    Eliminar
                                </Button>
                            </ModalBody>
                            <ModalFooter />
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
