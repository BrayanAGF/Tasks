import { Button, Card, CardBody, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, Textarea, Tooltip, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setActiveP, startDeleteProyecto } from "../../store";
import { useForm } from "../../hooks";
export const CardProyectos = ({ Data }) => {

    const [formData, setformData] = useState({
        "Nombre": "",
        "Descripcion": ""
    });
    const { Nombre, Descripcion, formState, onInputChange } = useForm(formData);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { active } = useSelector(state => state.equipos);
    const { uid } = useSelector(state => state.auth);
    const [ModoEdicion, setModoEdicion] = useState(false);
    const [OpenMenu, setOpenMenu] = useState(false);
    const dispatch = useDispatch();

    const onEliminarProyecto = () => {
        dispatch(startDeleteProyecto(Data.id));
    }


    useEffect(() => {
        setformData({
            "Nombre": Data.Nombre,
            "Descripcion": Data.Descripcion
        })
    }, [])


    return (
        <>
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
                        <Tooltip content="Fecha de termino" placement="right" showArrow className="font-bold Fuente1">
                            <div className="flex items-center gap-1 mt-3 w-fit ">
                                <img src="./assets/svg/addFecha.svg" alt="termino" height="20px" width="20px" />
                                <p>{Data.FechaTermino}</p>
                            </div>
                        </Tooltip>
                    </div>
                    {
                        active.Owner === uid
                        &&
                        <div>
                            <Popover placement="left" isOpen={OpenMenu} onOpenChange={(open) => setOpenMenu(open)} showArrow>
                                <PopoverTrigger>
                                    <Button isIconOnly className="ml-3 mt-1 hover:cursor-pointer">
                                        <svg className="h-[30px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M14.2788 2.15224C13.9085 2 13.439 2 12.5 2C11.561 2 11.0915 2 10.7212 2.15224C10.2274 2.35523 9.83509 2.74458 9.63056 3.23463C9.53719 3.45834 9.50065 3.7185 9.48635 4.09799C9.46534 4.65568 9.17716 5.17189 8.69017 5.45093C8.20318 5.72996 7.60864 5.71954 7.11149 5.45876C6.77318 5.2813 6.52789 5.18262 6.28599 5.15102C5.75609 5.08178 5.22018 5.22429 4.79616 5.5472C4.47814 5.78938 4.24339 6.1929 3.7739 6.99993C3.30441 7.80697 3.06967 8.21048 3.01735 8.60491C2.94758 9.1308 3.09118 9.66266 3.41655 10.0835C3.56506 10.2756 3.77377 10.437 4.0977 10.639C4.57391 10.936 4.88032 11.4419 4.88029 12C4.88026 12.5581 4.57386 13.0639 4.0977 13.3608C3.77372 13.5629 3.56497 13.7244 3.41645 13.9165C3.09108 14.3373 2.94749 14.8691 3.01725 15.395C3.06957 15.7894 3.30432 16.193 3.7738 17C4.24329 17.807 4.47804 18.2106 4.79606 18.4527C5.22008 18.7756 5.75599 18.9181 6.28589 18.8489C6.52778 18.8173 6.77305 18.7186 7.11133 18.5412C7.60852 18.2804 8.2031 18.27 8.69012 18.549C9.17714 18.8281 9.46533 19.3443 9.48635 19.9021C9.50065 20.2815 9.53719 20.5417 9.63056 20.7654C9.83509 21.2554 10.2274 21.6448 10.7212 21.8478C11.0915 22 11.561 22 12.5 22C13.439 22 13.9085 22 14.2788 21.8478C14.7726 21.6448 15.1649 21.2554 15.3694 20.7654C15.4628 20.5417 15.4994 20.2815 15.5137 19.902C15.5347 19.3443 15.8228 18.8281 16.3098 18.549C16.7968 18.2699 17.3914 18.2804 17.8886 18.5412C18.2269 18.7186 18.4721 18.8172 18.714 18.8488C19.2439 18.9181 19.7798 18.7756 20.2038 18.4527C20.5219 18.2105 20.7566 17.807 21.2261 16.9999C21.6956 16.1929 21.9303 15.7894 21.9827 15.395C22.0524 14.8691 21.9088 14.3372 21.5835 13.9164C21.4349 13.7243 21.2262 13.5628 20.9022 13.3608C20.4261 13.0639 20.1197 12.558 20.1197 11.9999C20.1197 11.4418 20.4261 10.9361 20.9022 10.6392C21.2263 10.4371 21.435 10.2757 21.5836 10.0835C21.9089 9.66273 22.0525 9.13087 21.9828 8.60497C21.9304 8.21055 21.6957 7.80703 21.2262 7C20.7567 6.19297 20.522 5.78945 20.2039 5.54727C19.7799 5.22436 19.244 5.08185 18.7141 5.15109C18.4722 5.18269 18.2269 5.28136 17.8887 5.4588C17.3915 5.71959 16.7969 5.73002 16.3099 5.45096C15.8229 5.17191 15.5347 4.65566 15.5136 4.09794C15.4993 3.71848 15.4628 3.45833 15.3694 3.23463C15.1649 2.74458 14.7726 2.35523 14.2788 2.15224Z" fill="#331D2C" />
                                            <path d="M15.5227 12C15.5227 13.6569 14.1694 15 12.4999 15C10.8304 15 9.47705 13.6569 9.47705 12C9.47705 10.3431 10.8304 9 12.4999 9C14.1694 9 15.5227 10.3431 15.5227 12Z" fill="#331D2C" />
                                        </svg>
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
                            <div className={`w-full h-10 ${ModoEdicion ? '' : 'hidden'}`}>
                                <Button className="absolute right-4 bottom-4 bg-[#516BEB] text-white" onClick={() => { setModoEdicion(false) }}>Guardar</Button>
                            </div>
                        </div>
                    }
                </CardBody>
            </Card>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="Fuente1">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                Eliminar proyecto
                            </ModalHeader>
                            <ModalBody>
                                <h4 className="text-lg">¿Estas seguro de eliminar el proyecto {Data.Nombre}?</h4>
                                <Button color="danger" onClick={onEliminarProyecto}>
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
