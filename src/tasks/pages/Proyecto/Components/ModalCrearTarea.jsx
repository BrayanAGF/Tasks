import { Alert, Avatar, Box, Button, Checkbox, Divider, FormControl, FormHelperText, FormLabel, Grid, IconButton, Input, Modal, ModalClose, ModalDialog, Tab, TabList, TabPanel, Tabs, Tooltip, Typography } from "@mui/joy"
import { useForm } from "../../../../hooks"
import { tabClasses } from '@mui/joy/Tab';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDiasDiff, validaControlesModal } from "../../../helpers";
import { startCreateTarea } from '../../../../store/Tareas/thunks'

const formData = {
    Nombre: '',
    Descripcion: '',
    FechaTermino: ''
}


export const ModalCrearTarea = ({ open, set }) => {

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
        integrantes.length>0 ? setValid(false) : setValid(true)    
    }, [integrantes])
    

    const onHandleCreateTarea = () => {

        const errores = validaControlesModal(formState, setFormValid)
        if(errores) {
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
        set(); 
    }

    const onHandleClose = () => {
        setFormValid(formData);
        setCheckState(new Array(infoU.length).fill(false));
        setIntegrantes([]);
        onResetForm();
        set();
    }

    return (
        <Modal open={open}>
            <ModalDialog>
                
                <ModalClose onClick={onHandleClose} />
                <Typography fontWeight='bold' fontSize={20}>Crear nueva tarea</Typography>
                <Typography> Ingresa la información de la nueva tarea </Typography>

                    <Tabs aria-label="tabs" defaultValue={0} sx={{ backgroundColor: 'transparent' }}>
                        <TabList
                            sx={{
                                backgroundColor: 'transparent',
                                '--List-padding': '0px',
                                '--List-radius': '0px',
                                '--ListItem-minHeight': '48px',
                                [`& .${tabClasses.root}`]: {
                                    boxShadow: 'none',
                                    fontWeight: 'md',
                                    [`&.${tabClasses.selected}::before`]: {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        left: 'var(--ListItem-paddingLeft)', // change to `0` to stretch to the edge.
                                        right: 'var(--ListItem-paddingRight)', // change to `0` to stretch to the edge.
                                        bottom: 0,
                                        height: 3,
                                        bgcolor: 'black',
                                    },
                                },
                            }}
                        >
                            <Tab sx={{ backgroundColor: 'transparent' }}>Detalles</Tab>
                            <Tab sx={{ backgroundColor: 'transparent' }}>Miembros</Tab>
                        </TabList>

                        <TabPanel value={0}>
                            <FormControl sx={{mb: 1}}>
                                <FormLabel sx={{ fontWeight: 'bold' }}>Nombre</FormLabel>
                                <Input name="Nombre" value={Nombre} onChange={onInputChange} autoComplete="off"/>
                                <FormHelperText sx={{color: 'red'}} >{formValid.Nombre}</FormHelperText>
                            </FormControl>
                            <FormControl sx={{mb: 1}}>
                                <FormLabel sx={{ fontWeight: 'bold' }}>Descripción</FormLabel>
                                <Input name="Descripcion" value={Descripcion} onChange={onInputChange} autoComplete="off"/>
                                <FormHelperText sx={{color: 'red'}}>{formValid.Descripcion}</FormHelperText>
                            </FormControl>
                            <Grid width='100%' mt={1} mb={1}><Divider /></Grid>
                            <FormControl>
                                <FormLabel sx={{ fontWeight: 'bold' }}>Fecha de termino</FormLabel>
                                <Input type="date" name="FechaTermino" value={FechaTermino} onChange={onInputChange} />
                                <FormHelperText sx={{color: 'red'}}>{formValid.FechaTermino}</FormHelperText>
                            </FormControl>
                            <Grid container alignItems='center' mt={1}>
                                <Button onClick={onHandleCreateTarea} disabled={valid}>
                                    Crear
                                </Button>
                                <Tooltip title={<Box width={200}>Asigna un usuario a la tarea para desbloquear el botón de crear</Box>} 
                                arrow placement="right" sx={{display: valid ? 'inline' : 'none'}}>
                                    <Box ml={1} ><i className="bi bi-patch-question-fill"></i></Box>
                                </Tooltip>
                            </Grid>
                        </TabPanel>

                        <TabPanel value={1} sx={{height: 341}}>
                            {
                                infoU.map((usuario, index) => (
                                    <Grid container justifyContent='space-between' alignItems='center' mb={1} key={index}>
                                        <Grid container alignItems='center'>
                                            <Avatar src={usuario.photoURL} />
                                            <Typography sx={{ ml: 1 }}>{usuario.displayName}</Typography>
                                        </Grid>
                                        <Checkbox checked={checkState[index]} onClick={(event) => onCheckedUsuario(index, usuario, event)} />
                                    </Grid>
                                ))
                            }
                        </TabPanel>
                    </Tabs>
            </ModalDialog>
        </Modal>
    )
}
