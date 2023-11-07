
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLoadArchivo } from '../../../../store';

import { Avatar, Card, CardBody, Tooltip } from '@nextui-org/react';



export const ArchivosView = () => {

    const fileInputRef = useRef();
    const dispatch = useDispatch();
    const { Archivos } = useSelector(state => state.archivos);

    const onFileInputChange = ({ target }) => {
        if (target.files[0] === undefined) return;

        dispatch(startLoadArchivo(target.files[0]));
    }

    return (
        <div className='animate__animated animate__fadeIn animate__faster'>
            <h5 className="text-3xl">Archivos</h5>
            <div 
            className='grid place-items-center h-14 w-full border-dashed border-2 rounded-lg border-[#6C757D] bg-background text-[#6C757D] hover:text-content2 hover:cursor-pointer'
            onClick={() => fileInputRef.current.click()}
            >
                Haz click aquí para subir un archivo
            </div>
            <input type="file" ref={fileInputRef} style={{display: 'none'}} />

            <div className='mt-3 flex flex-col gap-2'>
            {
                Archivos.map((archivo, index) => (
                    <Card key={index}>
                        <CardBody>
                            <div className='flex'>
                                <div className='flex relative'>
                                    <div className='bg-[#4c4365] text-white rounded-full h-10 w-10 grid place-items-center z-10'>
                                        <span><i className={`bi bi-filetype-${archivo.Extension}`}></i></span>
                                    </div>
                                    <div className='absolute left-8 z-0'>
                                        <Tooltip content={archivo.usuario.displayName} showArrow>
                                            <Avatar src={archivo.usuario.photoURL} />
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className='ml-10'>
                                    <p>
                                        <div><a href={archivo.URL} download>{archivo.Nombre}</a></div>
                                    </p>
                                    <p>{archivo.Extension.toUpperCase()}</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))
            }
            </div>

        </div>
    )
}

{/* <Grid mt={2} className='animate__animated animate__fadeIn animate__faster'>
        <Typography level="h4" fontWeight='bold'>Archivos</Typography>
        <Grid height={70} sx={{ border: '2px dotted #6C757D', display: 'grid', placeItems: 'center' }}>
            <Typography
                fontWeight='bold'
                sx={{ cursor: 'pointer' }}
                onClick={() => fileInputRef.current.click()}
            >
                Haz click aquí para subir un archivo
            </Typography>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={onFileInputChange} />
        </Grid>

        <Grid mt={2}>
            {
                Archivos.map((archivo, index) => (
                    <Card key={index} sx={{ width: { xs: '91%', md: 766, xl: '97%' }, mb: 1 }} variant='outlined'>
                        <Grid container justifyContent='space-between' alignItems='center'>
                            <Grid container alignItems='center'>
                                <Grid container>
                                    <Box sx={{ borderRadius: 100, display: 'grid', placeItems: 'center' }}
                                        bgcolor='blue' color='white' width={40} height={40} zIndex={10}>
                                        <span><i className={`bi bi-filetype-${archivo.Extension}`}></i></span>
                                    </Box>
                                    <Box right={8} position='relative'>
                                        <Tooltip title={archivo.usuario.displayName}>
                                            <Avatar src={archivo.usuario.photoURL} />
                                        </Tooltip>
                                    </Box>
                                </Grid>
                                <Grid>
                                    <Typography fontWeight='bold' sx={{ color: 'blue' }} component='span'>
                                        <Box width={{ md: 600, xs: 150 }}
                                            sx={{ overflow: 'hidden' }}
                                        ><a href={archivo.URL} download>{archivo.Nombre}</a></Box>
                                    </Typography>
                                    <Typography>{archivo.Extension.toUpperCase()}</Typography>
                                </Grid>
                            </Grid>
                            <MenuChicoArchivos Archivo={archivo} />
                        </Grid>
                    </Card>
                ))
            }
        </Grid>
    </Grid> */}