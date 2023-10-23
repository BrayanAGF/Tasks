
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
                    <Button isIconOnly className="rounded-full mt-2 bg-[#6c5d98] text-white h-10 w-10" onClick={() => setModoEdicion(!ModoEdicion)}>
                        {
                            ModoEdicion
                                ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                </svg>
                        }
                    </Button>
                }
            </div>

            <div id="BodyActividades">
                <div className={`flex flex-col gap-2 mt-3 ${ModoEdicion ? '' : 'hidden'} animate__animated animate__fadeIn`}>
                    <Textarea
                        label="Actividad"
                        placeholder="Ingresa la descripción de la actividad"
                        name="Descripcion"
                        value={Descripcion}
                        onChange={onInputChange}
                    />
                    <div className="flex justify-end">
                        <Button className="bg-[#6c5d98] text-white Fuente1" onClick={onHandleCreateActividad}>Guardar</Button>
                    </div>
                </div>
                {
                    TActividades.length > 0
                        ?
                        TActividades.map((act, index) => (
                            <div key={index} className="my-1">
                                <Checkbox isDisabled={available} isSelected={checkState[index]} onChange={() => !available && onCheckedActividad(index)}
                                    className="Fuente1 animate__animated animate__pulse "

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
