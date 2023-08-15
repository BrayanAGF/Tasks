import { Avatar, Box, Card, Divider, Grid, Typography } from '@mui/joy'
import React from 'react'

export const ActividadView = () => {
    return (
        <Grid mt={2}  className='animate__animated animate__fadeIn animate__faster'>
            <Typography level='h4' fontWeight='bold'> Actividad </Typography>

            <Card variant='outlined'>
                {
                    [1,2,3,4,5,1,2,3,4,5].map((elemento, index) => (
                        <Grid key={index}>
                            <Grid container padding={1} alignItems='center'>
                                <Grid container >
                                    <Box sx={{ borderRadius: 100, display: 'grid', placeItems: 'center' }}
                                        bgcolor='blue' color='white' width={40} height={40} zIndex={10}>
                                        <span><i className="bi bi-file-earmark-fill"></i></span>
                                    </Box>
                                    <Box right={8} position='relative'>
                                        <Avatar />
                                    </Box>
                                </Grid>
                                <Grid>
                                    <Typography>
                                        <Typography fontWeight='bold'>Brayan </Typography>
                                        ha cargado el archivo
                                        <Typography fontWeight='bold' sx={{ color: 'blue' }}> Curso ASP</Typography>
                                    </Typography>
                                    <Typography>19/05/2023 01:04</Typography>
                                </Grid>
                            
                            </Grid>
                               <Grid width='100%' mt={1}><Divider /></Grid>
                        </Grid>
                    ))
                }
            </Card>
        </Grid>
    )
}
