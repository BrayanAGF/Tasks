import { Box, Card, Grid, Link, Typography } from "@mui/joy"
import { useDispatch, useSelector } from "react-redux";
import { MenuChicoProyectos } from "../Components";
import { CardLoading } from "../../../components";
import { Link as RouterLink } from "react-router-dom";
import { setActiveP, startSetActiveProyecto } from "../../../../store";

export const ProyectosEquipoView = () => {

    const { active } = useSelector(state => state.equipos);
    const { Proyectos, Loading } = useSelector(state => state.proyectos)
    const { uid } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    if (Loading) return (<CardLoading />)

    return (
        <Grid mt={1} className='animate__animated animate__fadeInLeft animate__faster'>
            {
                Proyectos.map((proyecto, index) => (
                    <Grid mb={1} key={index}>
                        <Card variant="outlined">
                            <Grid container justifyContent='space-between'>
                                <Grid>
                                    <Link component={RouterLink} to='/Proyecto' onClick={() => dispatch(setActiveP(proyecto))}>
                                        <Typography level="h4" fontWeight='bold'>{proyecto.Nombre}</Typography>
                                    </Link>
                                    <Typography level="h6">{proyecto.Descripcion}</Typography>
                                </Grid>
                                {
                                    (active.Owner === uid) &&
                                    <Box>
                                        <MenuChicoProyectos idProyecto={proyecto.id} />
                                    </Box>
                                }
                            </Grid>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    )
}
