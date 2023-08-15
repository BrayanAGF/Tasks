import { Button, FormControl, FormLabel, Grid, Input, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import { useForm } from "../../../../hooks";
import { useDispatch, useSelector } from 'react-redux';
import { startCreateAndAddActividad } from '../../../../store/Tareas/thunks';

const formData = {
    Descripcion: ''
}

export const ModalCrearActividad = ({ open, set }) => {

    const { Descripcion, onResetForm, onInputChange } = useForm(formData)
    const dispatch = useDispatch();

    const onHandleCreateActividad = () => {
        const actividad = {Descripcion: Descripcion, Realizada: false};
        dispatch(startCreateAndAddActividad(actividad));
        onResetForm();
        set();
    }

    return (
        <Modal open={open}>
            <ModalDialog>
                <ModalClose onClick={set} />
                <Typography fontWeight='bold' fontSize={20}>Crear nueva actividad</Typography>

                <FormControl>
                    <FormLabel sx={{ fontWeight: 'bold' }}>Descripción</FormLabel>
                    <Input name="Descripcion" value={Descripcion} onChange={onInputChange} autoComplete="off" />
                </FormControl>
                <Button sx={{ marginTop: 2 }} onClick={onHandleCreateActividad}>
                    Crear
                </Button>
            </ModalDialog>
        </Modal>
    )
}
