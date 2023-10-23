import { useSelector } from "react-redux";
import { CardLoading, CardProyectos } from "../../../components";



export const ProyectosEquipoView = () => {

    const { Proyectos, Loading } = useSelector(state => state.proyectos)

    /* if (Loading) return (<CardLoading />) */

    return (
        <div className="flex flex-col gap-2">
            {
                Proyectos.length > 0
                    ?
                    Proyectos.map((value, index) => (
                        <CardProyectos key={index} Data={value}/>
                    ))
                    :
                    <div className="grid place-items-center h-4/5">
                        <div className="flex flex-col items-center">
                            <img src="./assets/images/Team.svg" width='402px' height='300px' />
                            <p className="font-bold Fuente1 text-2xl relative">Parece que no tienes proyectos, prueba creando uno nuevo </p>
                        </div>
                    </div>
            }

        </div>
    )
}
{/* <Grid mt={1} className='animate__animated animate__fadeInLeft animate__faster'>
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
    </Grid> */}