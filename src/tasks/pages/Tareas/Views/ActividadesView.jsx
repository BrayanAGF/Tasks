
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTActividades } from "../../../../store/Tareas/tareasSlice";
import { startCreateAndAddActividad, startMarkActividad } from "../../../../store/Tareas/thunks";
import { Button, Checkbox, Input, Textarea } from "@nextui-org/react";
import { useForm } from "../../../../hooks";

const formData = {
    Descripcion: ''
}

export const ActividadesView = () => {

    const { Descripcion, onResetForm, onInputChange } = useForm(formData);
    const { TActividades, Tactive } = useSelector(state => state.tareas);
    const [ModoEdicion, setModoEdicion] = useState(false);
    const { uid } = useSelector(state => state.auth);
    const { active } = useSelector(state => state.equipos);
    const { Owner } = active;
    const [checkState, setCheckState] = useState(new Array(TActividades.length).fill(false))
    const dispatch = useDispatch();
    const [available, setAvailable] = useState(true);

    const onCheckedActividad = (posicion) => {

        const updateCheckState = checkState.map((item, index) =>
            index === posicion ? !item : item
        );
        setCheckState(updateCheckState);
        dispatch(startMarkActividad(posicion));
    }

    const onHandleCreateActividad = () => {
        if (Descripcion.length === 0) {
            setModoEdicion(false);
            return;
        }
        const actividad = { Descripcion: Descripcion, Realizada: false };
        dispatch(startCreateAndAddActividad(actividad));
        onResetForm();
        setModoEdicion(false);
    }

    useEffect(() => {
        const arrayTemporal = new Array(TActividades.length).fill(false);
        TActividades.map((item, index) => {
            arrayTemporal[index] = item.Realizada === true ? true : false
        })
        setCheckState(arrayTemporal);

        if (Tactive.Integrantes.indexOf(uid) !== -1) setAvailable(false);
    }, [])


    return (
        <div className="mt-2">

            <div id="HeaderActividades" className="flex items-center gap-2">
                <h3 className="text-3xl font-bold Fuente1">Actividades</h3>
                {
                    Owner === uid
                    &&
                    <Button isIconOnly className="mt-2" variant="light" onClick={() => setModoEdicion(!ModoEdicion)}>
                        {
                            ModoEdicion
                                ?
                                <img src="./assets/svg/remove.svg" alt="remove" />
                                :
                                <img src="./assets/svg/addsquare.svg" alt="add" />
                        }
                    </Button>
                }
            </div>

            <div id="BodyActividades">
                <div className={`flex flex-col gap-2 mt-3 ${ModoEdicion ? '' : 'hidden'} animate__animated animate__fadeIn Fuente1`}>
                    <Textarea
                        label="Actividad"
                        placeholder="Ingresa la descripción de la actividad"
                        name="Descripcion"
                        value={Descripcion}
                        onChange={onInputChange}
                    />
                    <div className="flex justify-end">
                        <Button className="bg-secondary text-white Fuente1" onClick={onHandleCreateActividad}>Guardar</Button>
                    </div>
                </div>
                {
                    TActividades.length > 0
                        ?
                        TActividades.map((act, index) => (
                            <div key={index} className="my-1">
                                <Checkbox isDisabled={available} isSelected={checkState[index]} onChange={() => !available && onCheckedActividad(index)}
                                    className="Fuente1 animate__animated animate__pulse"
                                    classNames={{icon: "text-white"}}
                                >
                                    {act.Descripcion}
                                </Checkbox>
                            </div>
                        ))
                        :
                        <p className={`text-lg Fuente1 ${ModoEdicion ? 'hidden' : ''}`}>No tienes ninguna actividad en esta tarea</p>
                }
            </div>

        </div>
    )
}
