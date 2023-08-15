import { Button, FormControl, FormLabel, Input, Modal, ModalClose, ModalDialog, Textarea, Typography } from "@mui/joy"
import {useForm} from '../../../../hooks'
import { useDispatch, useSelector } from "react-redux";
import { startCreateNota } from "../../../../store/Tareas/thunks";

const formData = {
    Titulo: '',
    Nota: ''
}

export const ModalCrearNota = ({ open, set }) => {

    const { Titulo, Nota, onInputChange, onResetForm, formState} = useForm(formData);
    const dispatch = useDispatch();

    const onHandleCreateNota = () => {
        dispatch(startCreateNota(formState));
        onResetForm();
        set();
    }

    return (
        <Modal open={open}>
            <ModalDialog>
                <ModalClose onClick={set} />
                <Typography fontWeight='bold' fontSize={20}>Crear una nota</Typography>
                <FormControl>
                    <FormLabel sx={{ fontWeight: 'bold' }}>Titulo</FormLabel>
                    <Input name="Titulo" value={Titulo} onChange={onInputChange} autoComplete="off" />
                </FormControl>
                <FormControl>
                    <FormLabel sx={{ fontWeight: 'bold' }}>Descripción de la nota</FormLabel>
                    <Textarea name="Nota" value={Nota} onChange={onInputChange} autoComplete="off"/>
                </FormControl>
                <Button sx={{ marginTop: 2 }} onClick={onHandleCreateNota}>
                    Crear
                </Button>
            </ModalDialog>
        </Modal>
    )
}
