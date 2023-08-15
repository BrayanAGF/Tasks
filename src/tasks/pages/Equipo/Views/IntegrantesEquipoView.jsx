import { Avatar, Grid, Typography } from "@mui/joy"
import { useSelector } from "react-redux";

export const IntegrantesEquipoView = () => {

    const { active } = useSelector(state => state.equipos);

    return (
        <Grid container 
        justifyContent='space-evenly'
        mt={2} 
        sx={{flexDirection: {xs: 'column', md: 'row'}}}
        className='animate__animated animate__fadeInRight animate__faster'>
            {
                active.infoU.map((usuario, index) => (
                    <Grid container key={index} mt={{xs: 1}}>
                        <Avatar src={usuario.photoURL}></Avatar>
                        <Grid ml={1}>
                            <Typography level="h5">{usuario.displayName}</Typography>
                            <Typography level="body-sm" sx={{ color: 'gray' }}>{usuario.Rol}</Typography>
                        </Grid>
                    </Grid>
                ))
            }
        </Grid>
    )
}
