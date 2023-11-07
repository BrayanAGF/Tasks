import { Avatar, Button, Checkbox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs, Textarea, useDisclosure } from "@nextui-org/react";
import { useForm } from "../../../../hooks"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDiasDiff, validaControlesModal } from "../../../helpers";
import { startCreateTarea } from '../../../../store/Tareas/thunks'

const formData = {
    Nombre: '',
    Descripcion: '',
    FechaTermino: ''
}


export const ModalCrearTarea = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { Nombre, Descripcion, FechaTermino, onInputChange, formState, onResetForm } = useForm(formData);
    const [formValid, setFormValid] = useState(formData);
    const [valid, setValid] = useState(true);
    const { active } = useSelector(state => state.equipos);
    const { Tareas } = useSelector(state => state.tareas);
    const dispatch = useDispatch();

    const { infoU } = active;
    const [integrantes, setIntegrantes] = useState([]);


    const [checkState, setCheckState] = useState(new Array(infoU.length).fill(false))

    const onCheckedUsuario = (posicion, usuario, { target }) => {
        const updateCheckState = checkState.map((item, index) =>
            index === posicion ? !item : item
        );

        if (target.checked) {
            setIntegrantes([...integrantes, usuario.id])
        } else {
            setIntegrantes(integrantes.filter(u => u !== usuario.id));
        }
        setCheckState(updateCheckState);

    }

    useEffect(() => {

        integrantes.length > 0 ? setValid(false) : setValid(true)
    }, [integrantes])


    const onHandleCreateTarea = () => {

        const errores = validaControlesModal(formState, setFormValid)
        if (errores) {
            return;
        }

        let ordenTarea = 0;
        Tareas.forEach(tarea => {
            if (tarea.Orden >= ordenTarea) ordenTarea = tarea.Orden + 1;
        });

        const nuevaTarea = {
            ...formState,
            Integrantes: integrantes,
            Actividades: [],
            Notas: [],
            Orden: ordenTarea,
            progreso: 0,
            nActividades: 0,
            nActividadesRealizadas: 0,
            dias: getDiasDiff(new Date(), FechaTermino)
        };

        dispatch(startCreateTarea(nuevaTarea));
        onResetForm();
    }

    const onHandleClose = () => {
        setFormValid(formData);
        setCheckState(new Array(infoU.length).fill(false));
        setIntegrantes([]);
        onResetForm();
    }

    return (
        <div>
            <Button isIconOnly className="mt-2" variant="light" onClick={onOpen}>
                <img src="./assets/svg/addsquare.svg" alt="add" />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="h-[500px]" onClose={onHandleClose}>
                <ModalContent className="Fuente1">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <p className="text-xl Fuente1">Crear nueva tarea</p>
                                <p className="text-md font-medium Fuente1">Ingresa la información de la nueva tarea</p>
                            </ModalHeader>
                            <ModalBody>
                                <Tabs aria-label="Dynamic tabs" fullWidth
                                    className="Fuente1"
                                    classNames={{
                                        tabList: 'bg-content1 rounded-lg text-white',
                                        tabContent: 'group-data-[selected=true]:text-content2 text-content3 hover:text-secondary',
                                    }}>

                                    <Tab key={0} title='Detalles'>
                                        <div className="flex flex-col gap-2 animate__animated animate__fadeIn animate__faster">
                                            <Input
                                                label="Nombre"
                                                placeholder="Ingresa el nombre de la tarea"
                                                autoComplete="off"
                                                name="Nombre"
                                                value={Nombre}
                                                onChange={onInputChange}
                                            />
                                            <Textarea
                                                label="Descripción"
                                                placeholder="Agrega una descripción"
                                                name="Descripcion"
                                                value={Descripcion}
                                                onChange={onInputChange}
                                            />
                                            <Input
                                                label="Fecha de termino"
                                                placeholder=" "
                                                type="date"
                                                name="FechaTermino"
                                                value={FechaTermino}
                                                onChange={onInputChange}
                                            />
                                            <Button className="Fuente1 bg-secondary" onPress={onClose} isDisabled={valid} onClick={onHandleCreateTarea}>Crear</Button>
                                        </div>
                                    </Tab>

                                    <Tab key={1} title='Integrantes'>
                                        <div className="flex flex-col gap-2 animate__animated animate__fadeIn animate__faster">
                                            {
                                                infoU.map((usuario, index) => (
                                                    <div key={index} className="flex justify-between items-center">
                                                        <div className="flex items-center gap-2">
                                                            <Avatar src={usuario.photoURL} />
                                                            <p className="Fuente1">{usuario.displayName}</p>
                                                        </div>
                                                        <Checkbox isSelected={checkState[index]} onChange={(event) => onCheckedUsuario(index, usuario, event)} />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </Tab>



                                </Tabs>
                            </ModalBody>
                            <ModalFooter>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}
