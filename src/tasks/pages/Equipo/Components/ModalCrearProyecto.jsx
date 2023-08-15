import { Button, FormControl, FormLabel, Input, Modal, ModalClose, ModalDialog, Typography } from "@mui/joy"
import { useDispatch } from "react-redux";
import { startCreateProyecto } from "../../../../store";
import { useForm } from "../../../../hooks";

const formData = {
    Nombre: '',
    Descripcion: '',
    FechaTermino: ''
}

export const ModalCrearProyecto = ({open, set}) => {
    
    const {Nombre, Descripcion, FechaTermino, onInputChange, onResetForm, formState}  = useForm(formData);
    const dispatch = useDispatch();
    
    const onHandleCreateProyecto = () => {
        dispatch(startCreateProyecto(formState));
        onResetForm();
        set();
    }


    return (
        <Modal open={open}>
            <ModalDialog>
                <ModalClose onClick={set} />
                <Typography fontWeight='bold' fontSize={20}>Crear nuevo proyecto</Typography>
                <Typography mb={2}>Ingresa la información de tu nuevo proyecto</Typography>
                <FormControl>
                    <FormLabel sx={{ fontWeight: 'bold' }}>Nombre</FormLabel>
                    <Input name="Nombre" value={Nombre} onChange={onInputChange} />
                </FormControl>
                <FormControl>
                    <FormLabel sx={{ fontWeight: 'bold' }}>Descripción</FormLabel>
                    <Input name="Descripcion" value={Descripcion} onChange={onInputChange} />
                </FormControl>
                <FormControl>
                    <FormLabel sx={{ fontWeight: 'bold' }}>Fecha de termino</FormLabel>
                    <Input type="date" name="FechaTermino" value={FechaTermino} onChange={onInputChange} />
                </FormControl>
                <Button sx={{ marginTop: 2 }} onClick={onHandleCreateProyecto}>
                    Crear
                </Button>
            </ModalDialog>
        </Modal>
    )
}
