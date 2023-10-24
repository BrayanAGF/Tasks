import { Avatar, Button, Checkbox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs, Textarea, useDisclosure } from "@nextui-org/react";
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

    const onCheckedUsuario = (posicion, usuario, {target}) => {
       /*  console.log(posicion, usuario, event); */
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
            <Button isIconOnly className="rounded-full mt-2 bg-[#6c5d98] text-white h-10 w-10" onClick={onOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                </svg>
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="h-[500px]" onClose={onHandleClose}>
                <ModalContent>
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
                                        tabList: 'bg-[#E9ECEF] rounded-lg text-white',
                                        tabContent: 'group-data-[selected=true]:text-[#837bb6] text-[#85898C] hover:text-[#516BEB] ',
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
                                            <Button color="primary" className="Fuente1 bg-[#6c5d98]" onPress={onClose} isDisabled={valid} onClick={onHandleCreateTarea}>Crear</Button>
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

/*  <Modal open={open}>
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
 </Modal> */