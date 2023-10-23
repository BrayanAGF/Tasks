import { Avatar, Card, CardBody } from '@nextui-org/react';
import { useSelector } from 'react-redux'

export const ActividadView = () => {

    const { Actividad } = useSelector(state => state.actividad);

    return (
        <div className='animate__animated animate__fadeIn animate__faster'>
            <h4 className='text-3xl'> Actividad </h4>

            <Card>
            {
                    Actividad.map((act, index) => (
                            <CardBody key={index}  className='overflow-x-hidden'>
                                <div className='flex'>
                                    <div className='flex relative'>
                                        <div className='bg-[#4c4365] text-white rounded-full h-10 w-10 grid place-items-center z-10'>
                                            <span><i className={`bi bi-file-earmark-fill`}></i></span>
                                        </div>
                                        <div className='absolute left-8 z-0'>
                                                <Avatar src={act.photoURL} />                               
                                        </div>
                                    </div>
                                    <div className='ml-10'>
                                        <p className='flex gap-1'>
                                            <p className='font-bold'>{act.Integrante} </p>
                                            {act.Mensaje}
                                            <p className='font-bold'> {act.Complemento}</p>
                                        </p>
                                        <p>{act.Fecha}</p>
                                    </div>
                                </div>
                            </CardBody>
                    ))
                }
            </Card>
        </div>
    )
}

{/* <div key={index}>
                        <div >
                            <div >
                                <div sx={{ borderRadius: 100, display: 'grid', placeItems: 'center' }}
                                    bgcolor='blue' color='white' width={40} height={40} zIndex={10}>
                                    <span><i className="bi bi-file-earmark-fill"></i></span>
                                </div>
                                <Box right={8} position='relative'>
                                    <Avatar src={act.photoURL}/>
                                </Box>
                            </div>
                            <Grid>
                                <Typography>
                                    <Typography fontWeight='bold'>{act.Integrante} </Typography>
                                    {act.Mensaje}
                                    <Typography fontWeight='bold' sx={{ color: 'blue' }}> {act.Complemento}</Typography>
                                </Typography>
                                <Typography>{act.Fecha}</Typography>
                            </Grid>
                        
                        </div>
                           <Grid width='100%' mt={1}><Divider /></Grid>
                    </div> */}