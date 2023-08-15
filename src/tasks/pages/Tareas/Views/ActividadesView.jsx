import { Checkbox, Grid, IconButton, Typography } from "@mui/joy"
import { ModalCrearActividad } from "../Components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTActividades } from "../../../../store/Tareas/tareasSlice";
import { startMarkActividad } from "../../../../store/Tareas/thunks";

export const ActividadesView = () => {

    const [openModalCrearActividad, setOpenModalCrearActividad] = useState(false);
    const { TActividades } = useSelector(state => state.tareas);
    const [checkState, setCheckState] = useState(new Array(TActividades.length).fill(false))
    const dispatch = useDispatch();
    
    const onCheckedActividad = (posicion) => {
        const updateCheckState = checkState.map((item, index) => 
            index === posicion ? !item : item
        );
        setCheckState(updateCheckState);
        dispatch(startMarkActividad(posicion));
    }

    useEffect(() => {
      const arrayTemporal = new Array(TActividades.length).fill(false);
      TActividades.map((item, index) => {
        arrayTemporal[index] = item.Realizada === true ? true : false
      })
      setCheckState(arrayTemporal);
    }, [])
    

    return (
        <Grid mb={2}>
            <Grid container mb={1}>
                <Typography level='h3' fontWeight='bold'>Actividades</Typography>
                <IconButton sx={{ borderRadius: 100, ml: 1 }} onClick={() => setOpenModalCrearActividad(!openModalCrearActividad)}>
                    <i className="bi bi-plus-lg"></i>
                </IconButton>
            </Grid>
            {
                TActividades.map((act, index) => (
                    <Grid container mb={1} alignItems='center' key={index}>
                        <Checkbox checked={checkState[index]} onClick={() => onCheckedActividad(index)} />
                        <Typography level='h5' sx={{ ml: 1 }}>{act.Descripcion}</Typography>
                    </Grid>
                ))
            }

            <ModalCrearActividad open={openModalCrearActividad} set={() => setOpenModalCrearActividad(!openModalCrearActividad)} />{/*  */}
        </Grid>
    )
}
