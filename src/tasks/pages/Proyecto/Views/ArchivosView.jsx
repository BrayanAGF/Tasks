import { Avatar, Box, Card, Grid, IconButton, Tooltip, Typography } from '@mui/joy'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLoadArchivo } from '../../../../store';
import { MenuChicoArchivos } from '../Components';


export const ArchivosView = () => {

    const fileInputRef = useRef();
    const dispatch = useDispatch();
    const { Archivos } = useSelector(state => state.archivos);

    const onFileInputChange = ({ target }) => {
        if (target.files[0] === undefined) return;

        dispatch(startLoadArchivo(target.files[0]));
    }

    return (
        <Grid mt={2} className='animate__animated animate__fadeIn animate__faster'>
            <Typography level="h4" fontWeight='bold'>Archivos</Typography>
            <Grid height={70} width={{xs: '95vw', md: '69vw'}} sx={{ border: '2px dotted #6C757D', display: 'grid', placeItems: 'center' }}>
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
                        <Card key={index} sx={{width: {xs: '91%', md: 766 ,xl: '97%'}, mb: 1}} variant='outlined'>
                            <Grid container justifyContent='space-between' alignItems='center'>
                                <Grid container alignItems='center'>
                                    <Grid container>
                                        <Box sx={{ borderRadius: 100, display: 'grid', placeItems: 'center' }}
                                            bgcolor='blue' color='white' width={40} height={40} zIndex={10}>
                                            <span><i className={`bi bi-filetype-${archivo.Extension}`}></i></span>
                                        </Box>
                                        <Box right={8} position='relative'>
                                            <Tooltip title={archivo.usuario.displayName}>
                                                <Avatar src={archivo.usuario.photoURL}/>
                                            </Tooltip>
                                        </Box>
                                    </Grid>
                                    <Grid>
                                        <Typography fontWeight='bold' sx={{ color: 'blue' }} component='span'>
                                            <Box width={{md: 600, xs: 150}}
                                            sx={{overflow: 'hidden'}}
                                            >{archivo.Nombre}</Box>
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
        </Grid>
    )
}
